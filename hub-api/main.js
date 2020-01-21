const express = require('express'),
fs            = require('fs'),
mqtt          = require('mqtt'),
DBHandler     = require('./dbhandler.js'),
app           = express();

// So we can parse the req body for POST data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port    = 5552;
var client    = mqtt.connect('mqtt://127.0.0.1')
var db        = new DBHandler();

//
// Setup MQTT
//

client.on('connect', function () {
  console.log("> Connected to MQTT server");
  
  client.subscribe('#', function(err) {
    if(err)  {
      console.log("! Unable to subscribe to topics");
    } else  {
      console.log("> Subscribed to all topics");
    }
  })
})

// Decide what the message is and how to deal
//  with it
function parseTopic(topic, message) {
  
  // Split the topic into sections
  var topicSplit = topic.split("/");
  var thingId = (topicSplit[topicSplit.length-1]);
  
  try
  {
    
    if(thingId.length === 6)  {
      // Check if this is a sensor
      
      db.getSensorById(thingId, function(err, rows)  {
        if(err) {
          console.log("! Error looking up sensor");
          console.log(`! ${err}`);
        } else if(rows) {
          db.insertSensorReading(thingId, message);
        } else  {
          console.log(`! Sensor ${thingId} not found`)
        }
      });
      
    } else if(thingId.length === 9) {
      // Check if this is a device
      
      db.getDeviceById(thingId, function(err, rows)  {
        if(err) {
          console.log("! Error looking up device");
          console.log(`! ${err}`);
        } else if(rows) {
          var dataType = (topicSplit[topicSplit.length-2]);
          db.insertDeviceReading(thingId, dataType, message);
        } else  {
          console.log(`! Device ${thingId} not found`)
        }
      });
      
    }
    
  } 
  catch(e)  
  {
    console.log(`! An error occured while parsing an MQTT message:`);
    console.log(`! ${e}`);
  }
  
}

// This function will respond to and log messages
client.on('message', function (topic, message) {
  
  console.log(`= Received message: ${topic} ${message.toString()}`);
  
  parseTopic(topic, message.toString());
  
});

//
// Define API
//

app.get('/', (req, res) => {
  res.send('Uplink HUB API running')
});

/* #######################################

Get by ID.

####################################### */

app.get('/getAccountTypeById', (req, res) => {
  db.getAccountTypeById(req.query.id, function(err, rows) {
    res.send(rows);
  })
});

app.get('/getSensorTypeById', (req, res) => {
  db.getSensorTypeById(req.query.id, function(err, rows) {
    res.send(rows);
  })
});

app.get('/getRoomById', (req, res) => {
  db.getRoomById(req.query.id, function(err, rows) {
    res.send(rows);
  })
});

app.get('/getDeviceTypeById', (req, res) => {
  db.getDeviceTypeById(req.query.id, function(err, rows) {
    res.send(rows);
  })
});

app.get('/getSensorById', (req, res) => {
  db.getSensorById(req.query.id, function(err, rows) {
    res.send(rows);
  })
});

app.get('/getDeviceById', (req, res) => {
  db.getDeviceById(req.query.id, function(err, rows) {
    res.send(rows);
  })
});

/* #######################################

Get by room.

####################################### */

app.get('/getSensorByRoom', (req, res) => {
  db.getSensorByRoom(req.query.room, function(err, rows) {
    res.send(rows);
  })
});

app.get('/getDeviceByRoom', (req, res) => {
  db.getDeviceByRoom(req.query.room, function(err, rows) {
    res.send(rows);
  })
});

/* #######################################

Get all of something with limits.

####################################### */

app.get('/getAccountTypes', (req, res) => {
  db.getAccountTypes(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getSensorTypes', (req, res) => {
  db.getSensorTypes(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getRooms', (req, res) => {
  db.getRooms(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getDeviceTypes', (req, res) => {
  db.getDeviceTypes(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getSensors', (req, res) => {
  db.getSensors(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getDevices', (req, res) => {
  db.getDevices(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getUsers', (req, res) => {
  db.getUsers(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getSensorReadings', (req, res) => {
  db.getSensorReadings(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

app.get('/getDeviceReadings', (req, res) => {
  db.getDeviceReadings(function(err, rows) {
    res.send(rows);
  }, req.query.limit, req.query.offset)
});

/* #######################################

Inserting auxiliary data.

####################################### */

app.get('/insertProperty', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.get('/insertAccountType', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.get('/insertSensorType', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.get('/insertRoom', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.get('/insertDeviceType', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.post('/insertProperty', (req, res) => {
  if(req.body.name)  {
    db.insertProperty(req.body.name, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "No name parameter given!" } );
  }
});

app.post('/insertAccountType', (req, res) => {
  if(req.body.name)  {
    db.insertAccountType(req.body.name, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "No name parameter given!" } );
  }
});

app.post('/insertSensorType', (req, res) => {
  if(req.body.name)  {
    db.insertSensorType(req.body.name, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "No name parameter given!" } );
  }
});

app.post('/insertRoom', (req, res) => {
  if(req.body.name)  {
    db.insertRoom(req.body.name, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "No name parameter given!" } );
  }
});

app.post('/insertDeviceType', (req, res) => {
  if(req.body.name)  {
    db.insertDeviceType(req.body.name, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "No name parameter given!" } );
  }
});

/* #######################################

Inserting larger records.

####################################### */

app.get('/insertUser', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.get('/insertSensor', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.get('/insertDevice', (req, res) => {
  res.send( { "error": "Use POST instead!" } );
});

app.post('/insertUser', (req, res) => {
  if(req.body.account_type && req.body.username && req.body.password)  {
    db.insertUser(req.body.account_type, req.body.username, req.body.password, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "Missing parameter! Needs account_type, username and password" } );
  }
});

app.post('/insertSensor', (req, res) => {
  if(req.body.room && req.body.type && req.body.name)  {
    db.insertSensor(req.body.room, req.body.type, req.body.name, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "Missing parameter! Needs room, type and name" } );
  }
});

app.post('/insertDevice', (req, res) => {
  if(req.body.room && req.body.type && req.body.name)  {
    db.insertDevice(req.body.room, req.body.type, req.body.name, function(err, rowId) {
      if(err) {
        res.send( { "error": err } );
      } else  {
        res.send( { "rowId": rowId } );
      }
    })
  } else  {
    res.send( { "error": "Missing parameter! Needs account_type, username and password" } );
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

//
// Start the API
//

app.listen(port, () => {
  console.log(`> Uplink HUB API listening on port ${port}`)
});