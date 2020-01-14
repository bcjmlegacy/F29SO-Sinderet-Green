const express = require('express'),
fs            = require('fs'),
mqtt          = require('mqtt'),
sqlite3       = require('sqlite3').verbose(),
schemaFile    = 'db/hub-schema.sql',
schema        = fs.readFileSync(schemaFile, 'utf8'),
app           = express();

// var db = new sqlite3.Database(`${__dirname}/db/data`);

// Make a temporary database in memory, NOT PERSISTENTLY TO DISK
var db = new sqlite3.Database(':memory:');

db.serialize(function()
{
  db.exec(schema, function(err)  {
    if(err) {
      console.log(`> Error creating database!`);
      console.log(`> ${err}`);
    } else  {
      console.log("> Created database");
    }
  });
});

const port    = 5552;
var client  = mqtt.connect('mqtt://127.0.0.1')

//
// Setup MQTT
//

client.on('connect', function () {
  console.log("> Connected to MQTT server");
  // client.subscribe('presence', function (err) {
  //   if (!err) {
  //     client.publish('presence', 'Hello mqtt')
  //   }
  // })
})

// This function will respond to and log messages
client.on('message', function (topic, message) {
  
  console.log(`Received message: ${topic} ${message.toString()}`);
  
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