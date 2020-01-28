const express = require("express"),
crypto = require("crypto"),
mqtt = require("mqtt"),
DBHandler = require("./dbhandler.js"),
app = express(),
cors = require("cors");

// So we can parse the req body for POST data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  const port = 5552;
  var client = mqtt.connect("mqtt://127.0.0.1");
  var db = new DBHandler();
  
  function getWholeDate() {
    var d = new Date();
    var dateString = `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return dateString.padEnd(19, " ");
  }
  
  //
  // Setup MQTT
  //
  
  client.on("connect", function() {
    console.log(`[${getWholeDate()}] > Connected to MQTT server`);
    
    client.subscribe("#", function(err) {
      if (err) {
        console.log(`[${getWholeDate()}] ! Unable to subscribe to topics`);
      } else {
        console.log(`[${getWholeDate()}] > Subscribed to all topics`);
      }
    });
  });
  
  // Decide what the message is and how to deal
  //  with it
  function parseTopic(topic, message) {
    // Split the topic into sections
    var topicSplit = topic.split("/");
    var thingId = topicSplit[topicSplit.length - 1];
    
    try {
      if (thingId.length === 6) {
        // Check if this is a sensor
        
        db.getSensorById(thingId, function(err, rows) {
          if (err) {
            console.log(`[${getWholeDate()}] ! Error looking up sensor`);
            console.log(`[${getWholeDate()}] ! ${err}`);
          } else if (rows) {
            db.insertSensorReading(thingId, message);
          } else {
            console.log(`[${getWholeDate()}] ! Sensor ${thingId} not found`);
          }
        });
      } else if (thingId.length === 9) {
        // Check if this is a device
        
        db.getDeviceById(thingId, function(err, rows) {
          if (err) {
            console.log(`[${getWholeDate()}] ! Error looking up device`);
            console.log(`[${getWholeDate()}] ! ${err}`);
          } else if (rows) {
            var dataType = topicSplit[topicSplit.length - 2];
            db.insertDeviceReading(thingId, dataType, message);
          } else {
            console.log(`! Device ${thingId} not found`);
          }
        });
      }
    } catch (e) {
      console.log(`[${getWholeDate()}] ! An error occured while parsing an MQTT message:`);
      console.log(`[${getWholeDate()}] ! ${e}`);
    }
  }
  
  // This function will respond to and log messages
  client.on("message", function(topic, message) {
    console.log(`[${getWholeDate()}] = Received message: ${topic} ${message.toString()}`);
    
    parseTopic(topic, message.toString());
  });
  
  //
  // Check timers
  //
  
  function procTimersAndTriggers() {
    console.log(`[${getWholeDate()}] > Checking timers and triggers`);
  }
  
  setInterval(procTimersAndTriggers, 60000);
  
  //
  // Define API
  //
  
  function getNewToken(user_id) {
    var id           = '',
    idPiece          = '',
    length           = 5,
    characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charactersLength = characters.length;
    
    for( var x = 0; x < length; x++)    {
      idPiece = '';
      for( var i = 0; i < length; i++ ) {
        idPiece += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      if(x != 4)  {
        id = id += idPiece;
      }
    }
    
    id = user_id + ":" + id;
    
    return Buffer.from(id).toString('base64');
  }
  
  app.get("/", (req, res) => {
    res.send("Uplink HUB API running");
  });
  
  app.get('/hash', (req, res) => {
    
    var str = req.query.str;
    
    var hash      = crypto.createHash('sha512');
    res.send(hash.update(str).digest('hex'));
    
  });
  
  /* #######################################
  
  Login functions.
  
  ####################################### */
  
  app.post('/login', (req, res) => {
    if(req.body.username && req.body.password)  {
      
      var username = req.body.username;
      var password = req.body.password;
      
      var hash     = crypto.createHash('sha512');
      var hpasswd  = hash.update(password).digest('hex');
      
      db.getUserByUsernameAndPassword(username, hpasswd, function(err, user_id) {
        if(err) {
          res.send( { "error": "Error logging in" } );
        } else if(user_id)  {
          
          var token = getNewToken(user_id);
          console.log(`[${getWholeDate()}] > Generated token: ${token}`);
          
          db.insertNewAuthToken(user_id, token, null, function(err) {
            if(err) {
              res.send( { "error": "Error creating auth token" } );
            } else  {
              res.send( { "token": token } );
            }
          })
          
        } else  {
          res.send( { "error": "Details incorrect" } );
        }
      })
    } else  {
      res.send( { "error": "Missing data!" } );
    }
  });
  
  /* #######################################
  
  Checking auth token.
  
  ANYTHING AFTER THIS FUNCTION IS AUTHENTICATED.
  AKA. It is blocked if it does not pass authentication.
  
  ####################################### */
  
  app.use(function(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    } else  {
      
      try {
        
        var auth = Buffer.from(req.headers.authorization, 'base64').toString('ascii').split(":");
        console.log(`[${getWholeDate()}] > Received request with auth: ${req.headers.authorization}`);
        user_id = auth[0];
        
        db.checkToken(user_id, req.headers.authorization, function(err) {
          if(err) {
            console.log(`[${getWholeDate()}] > Invalid header: ${err}`);
            res.status(403).json({ error: 'Invalid auth header' });
          } else  {
            next();
          }
        })
        
      } catch(err)  {
        console.log(`[${getWholeDate()}] > Error while checking header: ${err}`);
        return res.status(403).json({ error: 'Invalid auth header' });
      }
      
    }
  });
  
  /* #######################################
  
  Get by ID.
  
  ####################################### */
  
  app.get("/getAccountTypeById", (req, res) => {
    db.getAccountTypeById(req.query.id, function(err, rows) {
      res.send(rows);
    });
  });
  
  app.get("/getSensorTypeById", (req, res) => {
    db.getSensorTypeById(req.query.id, function(err, rows) {
      res.send(rows);
    });
  });
  
  app.get("/getRoomById", (req, res) => {
    db.getRoomById(req.query.id, function(err, rows) {
      res.send(rows);
    });
  });
  
  app.get("/getDeviceTypeById", (req, res) => {
    db.getDeviceTypeById(req.query.id, function(err, rows) {
      res.send(rows);
    });
  });
  
  app.get("/getSensorById", (req, res) => {
    db.getSensorById(req.query.id, function(err, rows) {
      res.send(rows);
    });
  });
  
  app.get("/getDeviceById", (req, res) => {
    db.getDeviceById(req.query.id, function(err, rows) {
      res.send(rows);
    });
  });
  
  /* #######################################
  
  Get by room.
  
  ####################################### */
  
  app.get("/getSensorByRoom", (req, res) => {
    db.getSensorByRoom(req.query.room, function(err, rows) {
      res.send(rows);
    });
  });
  
  app.get("/getDeviceByRoom", (req, res) => {
    db.getDeviceByRoom(req.query.room, function(err, rows) {
      res.send(rows);
    });
  });
  
  /* #######################################
  
  Get all of something with limits.
  
  ####################################### */
  
  app.get("/getAccountTypes", (req, res) => {
    db.getAccountTypes(
      function(err, rows) {
        res.send(rows);
      },
      req.query.limit,
      req.query.offset
      );
    });
    
    app.get("/getSensorTypes", (req, res) => {
      db.getSensorTypes(
        function(err, rows) {
          res.send(rows);
        },
        req.query.limit,
        req.query.offset
        );
      });
      
      app.get("/getRooms", (req, res) => {
        db.getRooms(
          function(err, rows) {
            res.send(rows);
          },
          req.query.limit,
          req.query.offset
          );
        });
        
        app.get("/getDeviceTypes", (req, res) => {
          db.getDeviceTypes(
            function(err, rows) {
              res.send(rows);
            },
            req.query.limit,
            req.query.offset
            );
          });
          
          app.get("/getSensors", (req, res) => {
            db.getSensors(
              function(err, rows) {
                res.send(rows);
              },
              req.query.limit,
              req.query.offset
              );
            });
            
            app.get("/getDevices", (req, res) => {
              db.getDevices(
                function(err, rows) {
                  res.send(rows);
                },
                req.query.limit,
                req.query.offset
                );
              });
              
              app.get("/getUsers", (req, res) => {
                db.getUsers(
                  function(err, rows) {
                    res.send(rows);
                  },
                  req.query.limit,
                  req.query.offset
                  );
                });
                
                app.get("/getSensorReadings", (req, res) => {
                  db.getSensorReadings(
                    function(err, rows) {
                      res.send(rows);
                    },
                    req.query.limit,
                    req.query.offset
                    );
                  });
                  
                  app.get("/getDeviceReadings", (req, res) => {
                    db.getDeviceReadings(
                      function(err, rows) {
                        res.send(rows);
                      },
                      req.query.limit,
                      req.query.offset
                      );
                    });
                    
                    /* #######################################
                    
                    Inserting auxiliary data.
                    
                    ####################################### */
                    
                    app.get("/insertProperty", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.get("/insertAccountType", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.get("/insertSensorType", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.get("/insertRoom", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.get("/insertDeviceType", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.post("/insertProperty", (req, res) => {
                      if (req.body.name) {
                        db.insertProperty(req.body.name, function(err, rowId) {
                          if (err) {
                            res.send({ error: err });
                          } else {
                            res.send({ rowId: rowId });
                          }
                        });
                      } else {
                        res.send({ error: "No name parameter given!" });
                      }
                    });
                    
                    app.post("/insertAccountType", (req, res) => {
                      if (req.body.name) {
                        db.insertAccountType(req.body.name, function(err, rowId) {
                          if (err) {
                            res.send({ error: err });
                          } else {
                            res.send({ rowId: rowId });
                          }
                        });
                      } else {
                        res.send({ error: "No name parameter given!" });
                      }
                    });
                    
                    app.post("/insertSensorType", (req, res) => {
                      if (req.body.name) {
                        db.insertSensorType(req.body.name, function(err, rowId) {
                          if (err) {
                            res.send({ error: err });
                          } else {
                            res.send({ rowId: rowId });
                          }
                        });
                      } else {
                        res.send({ error: "No name parameter given!" });
                      }
                    });
                    
                    app.post("/insertRoom", (req, res) => {
                      if (req.body.name) {
                        db.insertRoom(req.body.name, function(err, rowId) {
                          if (err) {
                            res.send({ error: err });
                          } else {
                            res.send({ rowId: rowId });
                          }
                        });
                      } else {
                        res.send({ error: "No name parameter given!" });
                      }
                    });
                    
                    app.post("/insertDeviceType", (req, res) => {
                      if (req.body.name) {
                        db.insertDeviceType(req.body.name, function(err, rowId) {
                          if (err) {
                            res.send({ error: err });
                          } else {
                            res.send({ rowId: rowId });
                          }
                        });
                      } else {
                        res.send({ error: "No name parameter given!" });
                      }
                    });
                    
                    /* #######################################
                    
                    Inserting larger records.
                    
                    ####################################### */
                    
                    app.get("/insertUser", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.get("/insertSensor", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.get("/insertDevice", (req, res) => {
                      res.send({ error: "Use POST instead!" });
                    });
                    
                    app.post('/insertUser', (req, res) => {
                      if(req.body.account_type && req.body.username && req.body.password && req.body.email && req.body.forename && req.body.surname)  {
                        db.insertUser(req.body.account_type, req.body.username, req.body.password, req.body.email, req.body.forename, req.body.surname, function(err, rowId) {
                          if(err) {
                            res.send( { "error": err } );
                          } else  {
                            res.send( { "rowId": rowId } );
                          }
                        })
                      } else  {
                        res.send( { "error": "Missing parameter! Needs account_type, username, password, email, forename and surname" } );
                      }
                    });
                    
                    app.post("/insertSensor", (req, res) => {
                      if (req.body.room && req.body.type && req.body.name) {
                        db.insertSensor(req.body.room, req.body.type, req.body.name, function(
                          err,
                          rowId
                          ) {
                            if (err) {
                              res.send({ error: err });
                            } else {
                              res.send({ rowId: rowId });
                            }
                          });
                        } else {
                          res.send({ error: "Missing parameter! Needs room, type and name" });
                        }
                      });
                      
                      app.post("/insertDevice", (req, res) => {
                        if (req.body.room && req.body.type && req.body.name && req.body.wattage) {
                          db.insertDevice(req.body.room, req.body.type, req.body.wattage, req.body.name, function(
                            err,
                            rowId
                            ) {
                              if (err) {
                                res.send({ error: err });
                              } else {
                                res.send({ rowId: rowId });
                              }
                            });
                          } else {
                            res.send({
                              error: "Missing parameter! Needs account_type, username and password"
                            });
                          }
                        });
                        
                        /* #######################################
                        
                        Get certain things with filters.
                        
                        ####################################### */
                        
                        app.get('/getSensorReadingsByTimeframe', (req, res) => {
                          console.log(req.query.id, req.query.start, req.query.end);
                          db.getSensorReadingsByTimeframe(req.query.id, req.query.start, req.query.end, function(err, rows) {
                            if(err) {
                              res.send( { "error": err } );
                            } else  {
                              res.send( rows );
                            }
                          });
                        });
                        
                        app.get('/getDeviceReadingsByTimeframe', (req, res) => {
                          console.log(req.query.id, req.query.start, req.query.end);
                          db.getDeviceReadingsByTimeframe(req.query.id, req.query.start, req.query.end, function(err, rows) {
                            if(err) {
                              res.send( { "error": err } );
                            } else  {
                              res.send( rows );
                            }
                          });
                        });
                        
                        /* #######################################
                        
                        Device command functions.
                        
                        ####################################### */
                        
                        app.get("/getCommandsByDevice", (req, res) => {
                          db.getCommandsByDevice(req.query.id, function(err, rows) {
                            res.send(rows);
                          });
                        });

                        app.get("/executeCommand", (req, res) => {
                          db.getCommandById(req.query.id, function(err, rows) {
                            if(rows[0]) {
                              
                            }
                          });
                        });
                        
                        //
                        // Start the API
                        //
                        
                        app.listen(port, () => {
                          console.log(`[${getWholeDate()}] > Uplink HUB API listening on port ${port}`);
                        });
                        
                        