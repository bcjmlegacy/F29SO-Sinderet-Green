const express = require('express'),
fs            = require('fs'),
mqtt          = require('mqtt'),
DBHandler     = require('./dbhandler.js'),
app           = express();

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
      
      db.isSensor(thingId, function(err, rows)  {
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
      
      db.isDevice(thingId, function(err, rows)  {
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

app.listen(port, () => {
  console.log(`> Uplink HUB API listening on port ${port}`)
});