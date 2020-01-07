const express = require('express'),
mqtt    = require('mqtt'),
app     = express();

const port    = 5552;
var   client  = mqtt.connect('mqtt://127.0.0.1')

//
// Setup MQTT
//

client.on('connect', function () {
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
  console.log(`Uplink HUB API listening on port ${port}`)
});