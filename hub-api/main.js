const express = require("express"),
  fs = require("fs"),
  crypto = require("crypto"),
  mqtt = require("mqtt"),
  DBHandler = require("./dbhandler.js"),
  app = express(),
  cors = require("cors"),
  webPush = require("web-push");

if (!fs.existsSync(__dirname + "/vapid.env")) {
  console.log("Generating new VAPID keys...");
  const vapidKeys = webPush.generateVAPIDKeys();
  // console.log(vapidKeys);
  fs.appendFileSync(
    "./vapid.env",
    `PUBLIC_VAPID_KEY=${vapidKeys.publicKey}\nPRIVATE_VAPID_KEY=${vapidKeys.privateKey}\n`,
    function(err) {
      if (err) console.log(err);
    }
  );
}

require("dotenv").config({ path: "vapid.env" });

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails(
  "mailto:bm56@hw.ac.uk",
  publicVapidKey,
  privateVapidKey
);

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

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Push notifications with Service Workers"
  });

  webPush
    .sendNotification(subscription, payload)
    .catch(error => console.error(error));

  console.log(`[${getWholeDate()}] > Subscribed to push notifications`);
});

function getWholeDate() {
  var d = new Date();
  var dateString = `${d.getFullYear()}-${d.getMonth() +
    1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return dateString.padEnd(19, " ");
}

function getUnixTime() {
  return new Date().valueOf();
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
    console.log(
      `[${getWholeDate()}] ! An error occured while parsing an MQTT message:`
    );
    console.log(`[${getWholeDate()}] ! ${e}`);
  }
}

// This function will respond to and log messages
client.on("message", function(topic, message) {
  console.log(
    `[${getWholeDate()}] = Received message: ${topic} ${message.toString()}`
  );

  parseTopic(topic, message.toString());
});

function sendCommand(topic, command, topic_res, command_res) {
  client.publish(topic, command);
}

//
// Check timers
//

function procTimersAndTriggers() {
  console.log(`[${getWholeDate()}] > Checking timers and triggers`);

  var rows = db.getRepeatTimers();
  if (rows > 0) {
    // console.log(rows);

    var d = new Date();

    for (x in rows) {
      switch (rows[x]["timer_repeat_type"]) {
        case "Month":
          if (getUnixTime() - 2629746 > rows[x]["timer_repeat_last_run"]) {
            if (
              rows[x]["timer_repeat_day"] == d.getDate() &&
              rows[x]["timer_repeat_hour"] == d.getHours() &&
              rows[x]["timer_repeat_minute"] == d.getMinutes()
            ) {
              // Execute
              sendCommand(
                `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}}`,
                rows[x]["device_command_value"],
                rows[x]["device_command_mqtt_res"],
                rows[x]["device_command_value_res"]
              );
              db.updateRepeatTimerLastRun(
                getUnixTime(),
                rows[x]["timer_repeat_id"]
              );
            }
          }
          break;

        case "Week":
          if (getUnixTime() - 604800 > rows[x]["timer_repeat_last_run"]) {
            if (
              rows[x]["timer_repeat_day"] == d.getDate() &&
              rows[x]["timer_repeat_hour"] == d.getHours() &&
              rows[x]["timer_repeat_minute"] == d.getMinutes()
            ) {
              // Execute
              sendCommand(
                `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}}`,
                rows[x]["device_command_value"],
                rows[x]["device_command_mqtt_res"],
                rows[x]["device_command_value_res"]
              );
              db.updateRepeatTimerLastRun(
                getUnixTime(),
                rows[x]["timer_repeat_id"]
              );
            }
          }
          break;

        case "Day":
          if (getUnixTime() - 86400 > rows[x]["timer_repeat_last_run"]) {
            if (
              rows[x]["timer_repeat_hour"] == d.getHours() &&
              rows[x]["timer_repeat_minute"] == d.getMinutes()
            ) {
              // Execute
              sendCommand(
                `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}}`,
                rows[x]["device_command_value"],
                rows[x]["device_command_mqtt_res"],
                rows[x]["device_command_value_res"]
              );
              db.updateRepeatTimerLastRun(
                getUnixTime(),
                rows[x]["timer_repeat_id"]
              );
            }
          }
          break;

        case "Hour":
          if (getUnixTime() - 3600 > rows[x]["timer_repeat_last_run"]) {
            if (rows[x]["timer_repeat_minute"] == d.getMinutes()) {
              // Execute
              sendCommand(
                `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}}`,
                rows[x]["device_command_value"],
                rows[x]["device_command_mqtt_res"],
                rows[x]["device_command_value_res"]
              );
              db.updateRepeatTimerLastRun(
                getUnixTime(),
                rows[x]["timer_repeat_id"]
              );
            }
          }
          break;

        case "Minute":
          // No need to check time since last run, since we only check timers every minute
          // anyway
          sendCommand(
            `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}`,
            rows[x]["device_command_value"],
            rows[x]["device_command_mqtt_res"],
            rows[x]["device_command_value_res"]
          );
          db.updateRepeatTimerLastRun(
            getUnixTime(),
            rows[x]["timer_repeat_id"]
          );
          break;

        default:
          console.log(`[${getWholeDate()}] ! Unknown timer value`);
      }

      rows = db.getOneshotTimers();
      if (rows > 0) {
        for (x in rows) {
          if (getUnixTime() >= rows[x]["timer_oneshot_trigger"]) {
            // console.log("Running oneshot timer...");
            sendCommand(
              `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}`,
              rows[x]["device_command_value"],
              rows[x]["device_command_mqtt_res"],
              rows[x]["device_command_value_res"]
            );

            db.deleteOneshotTimer(rows[x]["timer_oneshot_id"]);
          }
        }
      }
    }
  }

  rows = db.getDeviceTriggers();
  if (rows.length > 0) {
    for (x in rows) {
      var reading = db.getSensorReadings(
        1,
        0,
        rows[x]["device_trigger_sensor_id"]
      );
      if (reading.length > 0) {
        var value = reading[0]["sensor_reading_value"];

        switch (rows[x]["device_trigger_gt_lt_eq"]) {
          case "<":
            if (value < rows[x]["device_trigger_sensor_value"]) {
              sendCommand(
                `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}`,
                rows[x]["device_command_value"],
                rows[x]["device_command_mqtt_res"],
                rows[x]["device_command_value_res"]
              );
            }
            break;

          case "=":
            if (value == rows[x]["device_trigger_sensor_value"]) {
              sendCommand(
                `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}`,
                rows[x]["device_command_value"],
                rows[x]["device_command_mqtt_res"],
                rows[x]["device_command_value_res"]
              );
            }
            break;

          case ">":
            if (value > rows[x]["device_trigger_sensor_value"]) {
              sendCommand(
                `/${rows[x]["room_name"]}/${rows[x]["device_command_mqtt"]}/${rows[x]["device_id"]}`,
                rows[x]["device_command_value"],
                rows[x]["device_command_mqtt_res"],
                rows[x]["device_command_value_res"]
              );
            }
            break;
        }
      } else {
        console.log(`[${getWholeDate()}] > No data for trigger`);
      }
    }
  }
}

function procWarnings() {
  console.log(`[${getWholeDate()}] > Checking warnings`);

  // If a heater is on for more than 2 hours

  var heaters = db.getDeviceByType(1);
  if (heaters.length > 0) {
    for (x in heaters) {
      var deets = db.getDeviceStatusTime(heaters[x]["device_id"]);
      if (deets && deets[0] == "on" && getUnixTime() - deets[1] > 3600000) {
        var warn = db.checkWarningExists(
          heaters[x]["device_id"],
          "This heater has been on for over 2 hours!"
        );

        // If a warning already exists
        if (warn) {
          if (getUnixTime() - warn["warning_last_updated_ts"] > 1800000) {
            db.updateWarning(warn["warning_id"], 0);
          } else {
            // Otherwise just update the existing warning to track that it's still happening
            db.updateWarning(warn["warning_id"], null);
            console.log(`[${getWholeDate()}] ! Updated warning for a heater`);
          }
          // If a warning does not exist
        } else {
          db.insertWarning(
            heaters[x]["device_id"],
            null,
            "This heater has been on for over 2 hours!",
            3
          );
          console.log(`[${getWholeDate()}] ! Created warning for a heater`);
        }
      }
    }
  }

  // If the fridge temp raises above 6 degrees
  var fridges = db.getDeviceByType(2);
  if (fridges.length > 0) {
    for (x in fridges) {
      var deets = db.getLastDeviceReadingByType(
        fridges[x]["device_id"],
        "Temperature"
      );
      if (deets && deets["device_reading_value"] > 6) {
        var warn = db.checkWarningExists(
          fridges[x]["device_id"],
          "This fridge has risen above 6 degrees!"
        );

        // If a warning already exists
        if (warn) {
          if (getUnixTime() - warn["warning_last_updated_ts"] > 1800000) {
            db.updateWarning(warn["warning_id"], 0);
          } else {
            // Otherwise just update the existing warning to track that it's still happening
            db.updateWarning(warn["warning_id"], null);
            console.log(`[${getWholeDate()}] ! Updated warning for a fridge`);
          }
          // If a warning does not exist
        } else {
          db.insertWarning(
            fridges[x]["device_id"],
            null,
            "This fridge has risen above 6 degrees!",
            3
          );
          console.log(`[${getWholeDate()}] ! Created warning for a fridge`);
        }
      }
    }
  }
}

setInterval(procTimersAndTriggers, 60000);
setInterval(procWarnings, 60000);

//
// Define API
//

function getNewToken(user_id) {
  var id = "",
    idPiece = "",
    length = 5,
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    charactersLength = characters.length;

  for (var x = 0; x < length; x++) {
    idPiece = "";
    for (var i = 0; i < length; i++) {
      idPiece += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    if (x != 4) {
      id = id += idPiece;
    }
  }

  id = user_id + ":" + id;

  return Buffer.from(id).toString("base64");
}

app.get("/", (req, res) => {
  res.send("Uplink HUB API running");
});

app.get("/hash", (req, res) => {
  var str = req.query.str;

  var hash = crypto.createHash("sha512");
  res.send(hash.update(str).digest("hex"));
});

/* #######################################
 
Login functions.
 
####################################### */

app.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;

    var hash = crypto.createHash("sha512");
    var hpasswd = hash.update(password).digest("hex");

    var user = db.getUserByUsernameAndPassword(username, hpasswd);
    if (!user) {
      res.send({ error: "Details incorrect" });
    } else {
      var token = getNewToken(user.user_id);
      console.log(`[${getWholeDate()}] > Generated token: ${token}`);

      var info = db.insertNewAuthToken(user.user_id, token, null);
      if (!info) {
        res.send({ error: "Error inserting token!" });
      } else {
        res.send({ token: token });
      }
    }
  } else {
    res.send({ error: "Missing data!" });
  }
});

/* #######################################
 
Checking auth token.
 
ANYTHING AFTER THIS FUNCTION IS AUTHENTICATED.
AKA. It is blocked if it does not pass authentication.
 
####################################### */

app.use(function(req, res, next) {
  if (!req.headers.authorization) {
    console.log(`[${getWholeDate()}] ! Received request with no auth header!`);
    console.log(`[${getWholeDate()}] ! Request URI: ${req.url}`);
    return res.status(403).json({ error: "No credentials sent!" });
  } else {
    try {
      var auth = Buffer.from(req.headers.authorization, "base64")
        .toString("ascii")
        .split(":");
      console.log(
        `[${getWholeDate()}] > Received request with auth: ${
          req.headers.authorization
        }`
      );
      console.log(`[${getWholeDate()}] > Request URI: ${req.url}`);
      req._user_id = auth[0];

      var token = db.checkToken(req._user_id, req.headers.authorization);
      if (token) {
        next();
      } else {
        console.log(`[${getWholeDate()}] ! Invalid header`);
        res.status(403).json({ error: "Invalid auth header" });
      }
    } catch (err) {
      console.log(`[${getWholeDate()}] ! Error while checking header: ${err}`);
      return res.status(403).json({ error: "Invalid auth header" });
    }
  }
});

/* #######################################
 
Get VAPID public key.
 
####################################### */

app.get("/getVapidKey", (req, res) => {
  res.send({ public_vapid_key: publicVapidKey });
});

/* #######################################
 
Execute command.
 
####################################### */

app.get("/execute", (req, res) => {
  db.getCommandById(req.query.commandId, function(err, command) {
    db.getDeviceById(req.query.deviceId, function(err, device) {
      db.getRoomById(deviceRows["device_room"], function(err, room) {
        sendCommand(
          `/${room[0]["room_name"]}/${command[0]["device_command_mqtt"]}/${deviceId}`,
          command[0]["device_command_value"],
          command[0]["device_command_mqtt_res"],
          command[0]["device_command_value_res"]
        );
      });
    });
  });
});

/* #######################################
 
Get by ID.
 
####################################### */

app.get("/getAccountTypeById", (req, res) => {
  res.send(db.getAccountTypeById(req.query.id));
});

app.get("/getSensorTypeById", (req, res) => {
  res.send(db.getSensorTypeById(req.query.id));
});

app.get("/getRoomById", (req, res) => {
  res.send(db.getRoomById(req.query.id));
});

app.get("/getDeviceTypeById", (req, res) => {
  res.send(db.getDeviceTypeById(req.query.id));
});

app.get("/getSensorById", (req, res) => {
  res.send(db.getSensorById(req.query.id));
});

app.get("/getDeviceById", (req, res) => {
  res.send(db.getDeviceById(req.query.id));
});

/* #######################################
 
Get by room.
 
####################################### */

app.get("/getSensorByRoom", (req, res) => {
  res.send(db.getSensorByRoom(req.query.room));
});

app.get("/getDeviceByRoom", (req, res) => {
  res.send(db.getDeviceByRoom(req.query.room));
});

/* #######################################
 
Get all of something with limits.
 
####################################### */

app.get("/getAccountTypes", (req, res) => {
  res.send(db.getAccountTypes(req.query.limit, req.query.offset));
});

app.get("/getSensorTypes", (req, res) => {
  res.send(db.getSensorTypes(req.query.limit, req.query.offset));
});

app.get("/getRooms", (req, res) => {
  res.send(db.getRooms(req.query.limit, req.query.offset));
});

app.get("/getDeviceTypes", (req, res) => {
  res.send(db.getDeviceTypes(req.query.limit, req.query.offset));
});

app.get("/getSensors", (req, res) => {
  res.send(db.getSensors(req.query.limit, req.query.offset));
});

app.get("/getDevices", (req, res) => {
  res.send(db.getDevices(req.query.limit, req.query.offset));
});

app.get("/getUsers", (req, res) => {
  res.send(db.getUsers(req.query.limit, req.query.offset));
});

app.get("/getSensorReadings", (req, res) => {
  res.send(db.getSensorReadings(req.query.limit, req.query.offset));
});

app.get("/getDeviceReadings", (req, res) => {
  res.send(db.getDeviceReadings(req.query.limit, req.query.offset));
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
    var info = db.insertProperty(req.body.name);
    if (info) {
      res.send({ rowId: info.lastInsertRowid });
    } else {
      res.send({ error: "Error" });
    }
  } else {
    res.send({ error: "No name parameter given!" });
  }
});

app.post("/insertAccountType", (req, res) => {
  if (req.body.name) {
    var info = db.insertAccountType(req.body.name);
    if (info) {
      res.send({ rowId: info.lastInsertRowid });
    } else {
      res.send({ error: "Error" });
    }
  } else {
    res.send({ error: "No name parameter given!" });
  }
});

app.post("/insertSensorType", (req, res) => {
  if (req.body.name) {
    var info = db.insertSensorType(req.body.name);
    if (info) {
      res.send({ rowId: info.lastInsertRowid });
    } else {
      res.send({ error: "Error" });
    }
  } else {
    res.send({ error: "No name parameter given!" });
  }
});

app.post("/insertRoom", (req, res) => {
  if (req.body.name) {
    var info = db.insertRoom(req.body.name);
    if (info) {
      res.send({ rowId: info.lastInsertRowid });
    } else {
      res.send({ error: "Error" });
    }
  } else {
    res.send({ error: "No name parameter given!" });
  }
});

app.post("/insertDeviceType", (req, res) => {
  if (req.body.name) {
    var info = db.insertDeviceType(req.body.name);
    if (info) {
      res.send({ rowId: info.lastInsertRowid });
    } else {
      res.send({ error: "Error" });
    }
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

app.post("/insertUser", (req, res) => {
  if (
    req.body.account_type &&
    req.body.username &&
    req.body.password &&
    req.body.email &&
    req.body.forename &&
    req.body.surname &&
    req.body.admin
  ) {
    var authed = db.checkAuth(req._user_id, null, null);
    if (authed) {
      var info = db.insertUser(
        req.body.account_type,
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.forename,
        req.body.surname,
        req.body.admin
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    }
  } else {
    res.send({
      error:
        "Missing parameter! Needs account_type, username, password, email, forename and surname"
    });
  }
});

app.post("/insertSensor", (req, res) => {
  if (req.body.room && req.body.type && req.body.name) {
    var authed = db.checkAuth(req._user_id, null, null);
    if (authed) {
      var info = db.insertSensor(req.body.room, req.body.type, req.body.name);
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    }
  } else {
    res.send({
      error: "Missing parameter! Needs room, type, wattage and name"
    });
  }
});

app.post("/editSensor", (req, res) => {
  if (req.body.id && req.body.room && req.body.type && req.body.name) {
    var authed = db.checkAuth(req._user_id, null, req.body.id);
    if (authed) {
      var info = db.insertSensor(
        req.body.id && req.body.room,
        req.body.type,
        req.body.name
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    }
  } else {
    res.send({
      error: "Missing parameter! Needs sensor id, room, type, wattage and name"
    });
  }
});

app.post("/insertDevice", (req, res) => {
  if (req.body.room && req.body.type && req.body.name && req.body.wattage) {
    var authed = db.checkAuth(req._user_id, null, null);
    if (authed) {
      var info = db.insertDevice(
        req.body.room,
        req.body.type,
        req.body.wattage,
        req.body.name
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    }
  } else {
    res.send({
      error: "Missing parameter! Needs room, type, wattage and name"
    });
  }
});

app.post("/insertTrigger", (req, res) => {
  if (
    req.body.deviceId &&
    req.body.sensorId &&
    req.body.symbol &&
    req.body.value &&
    req.body.commandId
  ) {
    var authed = db.checkAuth(req._user_id, req.body.deviceId, null);
    if (authed) {
      var info = db.insertDeviceTrigger(
        req.body.deviceId,
        req.body.sensorId,
        req.body.symbol,
        req.body.value,
        req.body.commandId
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    } else {
      console.log("Auth failed!");
      res.send({
        error: "You do not have permission to do this!"
      });
    }
  } else {
    res.send({
      error:
        "Missing parameter! Needs deviceId, sensorId, symbol (>, <, =), value and commandId"
    });
  }
});

app.post("/editDevice", (req, res) => {
  if (
    req.body.id &&
    req.body.room &&
    req.body.type &&
    req.body.name &&
    req.body.wattage
  ) {
    var authed = db.checkAuth(req._user_id, req.body.id, null);
    if (authed) {
      var info = db.editDevice(
        req.body.id,
        req.body.room,
        req.body.type,
        req.body.wattage,
        req.body.name
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    }
  } else {
    res.send({
      error: "Missing parameter! Needs device id, room, type, wattage and name"
    });
  }
});

app.post("/insertUserPermission", (req, res) => {
  if (req.body.user_id && (req.body.device_id || req.body.sensor_id)) {
    var authed = db.checkAuth(req._user_id, req.body.id, null);
    if (authed) {
      var info = db.insertUserPermission(
        req.body.id,
        req.body.room,
        req.body.type,
        req.body.wattage,
        req.body.name
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    }
  } else {
    res.send({
      error: "Missing parameter! Needs user_id, device_id / sensor_id"
    });
  }
});

/* #######################################
 
Get certain things with filters.
 
####################################### */

app.get("/getSensorReadingsByTimeframe", (req, res) => {
  res.send(
    db.getSensorReadingsByTimeframe(
      req.query.id,
      req.query.start,
      req.query.end
    )
  );
});

app.get("/getDeviceReadingsByTimeframe", (req, res) => {
  res.send(
    db.getDeviceReadingsByTimeframe(
      req.query.id,
      req.query.start,
      req.query.end
    )
  );
});

/* #######################################
 
Device command functions.
 
####################################### */

app.get("/getCommandsByDevice", (req, res) => {
  res.send(db.getCommandsByDevice(req.query.id));
});

app.get("/executeCommand", (req, res) => {
  res.send(db.getCommandById(req.query.id));
});

app.get("/getRepeatTimers", (req, res) => {
  res.send(db.getRepeatTimerByDeviceId(req.query.id));
});

app.get("/getOneshotTimers", (req, res) => {
  res.send(db.getOneshotTimersByDeviceId(req.query.id));
});

app.post("/insertRepeatTimer", (req, res) => {
  if (
    req.body.type &&
    req.body.month &&
    req.body.day &&
    req.body.hour &&
    req.body.minute &&
    req.body.device_id &&
    req.body.command
  ) {
    if (db.checkAuth(req._user_id, req.body.device_id, null)) {
      var info = db.insertRepeatTimer(
        req.body.type,
        req.body.month,
        req.body.day,
        req.body.hour,
        req.body.minute,
        req.body.device_id,
        req.body.command
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    } else {
      console.log("Auth failed!");
      res.send({
        error: "You do not have permission to do this!"
      });
    }
  } else {
    res.send({
      error:
        "Missing parameter! Needs type, month, day, hour, minute, device_id and command"
    });
  }
});

app.post("/insertOneshotTimer", (req, res) => {
  if (req.body.trigger && req.body.device_id && req.body.command) {
    var authed = db.checkAuth(req._user_id, req.body.device_id, null);
    if (authed) {
      var info = db.insertOneshotTimer(
        req.body.trigger,
        req.body.device_id,
        req.body.command
      );
      if (info) {
        res.send({ rowId: info.lastInsertRowid });
      } else {
        res.send({ Error: "There was an error" });
      }
    }
  } else {
    res.send({
      error: "Missing parameter! Needs trigger (UNIX TIME), device_id, command"
    });
  }
});

/* #######################################
 
Delete functions.
 
####################################### */

app.get("/deleteProperty", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteProperty(req.query.id));
  }
});

app.get("/deleteAccountType", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteAccountType(req.query.id));
  }
});

app.get("/deleteSensorType", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteSensorType(req.query.id));
  }
});

app.get("/deleteRoom", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteRoom(req.query.id));
  }
});

app.get("/deleteDeviceType", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteDeviceType(req.query.id));
  }
});

app.get("/deleteDeviceCommand", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteDeviceCommand(req.query.id));
  }
});

app.get("/deleteUser", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteUser(req.query.id));
  }
});

app.get("/deleteAuth", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteAuth(req.query.id));
  }
});

app.get("/deleteSensor", (req, res) => {
  db.deleteSensor(req.query.id);
  db.deleteTriggerBySensorId(req.query.id);
  if (req.query.data == "true") db.deleteSensorReadingBySensorId(req.query.id);

  res.send({ status: "success" });
});

app.get("/deleteDevice", (req, res) => {
  db.deleteDevice(req.query.id);
  db.deleteRepeatTimerByDeviceId(req.query.id);
  db.deleteOneshotTimerByDeviceId(req.query.id);
  db.deleteTriggerByDeviceId(req.query.id);
  if (req.query.data == "true") db.deleteDeviceReading(req.query.id);

  res.send({ status: "success" });
});

app.get("/deleteRepeatTimer", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteRepeatTimer(req.query.id));
  }
});

app.get("/deleteOneshotTimer", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteOneshotTimer(req.query.id));
  }
});

app.get("/deleteSensorReading", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteSensorReading(req.query.id));
  }
});

app.get("/deleteDeviceReading", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteDeviceReading(req.query.id));
  }
});

app.get("/deleteDeviceTrigger", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteDeviceTrigger(req.query.id));
  }
});

app.get("/deleteWarning", (req, res) => {
  var authed = db.checkAuth(req._user_id, null, null);
  if (authed) {
    res.send(db.deleteWarning(req.query.id));
  }
});

//
// Start the API
//

app.listen(port, () => {
  console.log(`[${getWholeDate()}] > Uplink HUB API listening on port ${port}`);
});

// setTimeout(procTimersAndTriggers, 1000);
