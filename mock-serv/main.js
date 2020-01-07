//
// Mock data server
//
//  main.js
//

const mqtt = require('mqtt');
var d = new Date();

//
// Dummy data:
//  /livingroom/temperature/sensor1
//  /livingroom/temperature/sensor2
//  /kitchen/temperature/sensor1
//  /bedroom/temperature/sensor1
//
//  /livingroom/humidity/sensor1
//  /kitchen/humidity/sensor1
//  /bedroom/humidity/sensor1
//
//  /solar/controller1/input
//  /solar/controller1/output
var solarController = { status: "on", input: 10, output: 6 };
//
//  /livingroom/heater1/status
//  /livingroom/heater1/set_power
var heater1 = { status: "on" };
//
//  /livingroom/light1/status
//  /livingroom/light1/set_power
//  /livingroom/light1/set_colour
var light1 = { status: "on" };
//
//  /kitchen/fridge/temperature
//

//
// Utility functions
//

function fFromInterval(min, max) {
  return (Math.random() * (max - min + 1) + min).toFixed(2);
}

function update_time()  {
  // console.log("Updating time");
  d = new Date();
}

//
// Temperature sensors
//

function l_t_sensor1()  {
  
  var h = d.getHours();
  var t_lower, t_upper = 0;
  
  if(heater1.status === "off") {
    // If the heater is off
    if(h < 8 || h > 20) {
      // If it's before 8am or after 8pm
      t_lower = 5;
      t_upper = 6;
    } else if(h > 8 && h < 18)  {
      // If it's after 8am and before 6pm
      t_lower = 12;
      t_upper = 15;
    } else if(h > 18 && h < 20) {
      // If it's after 6pm and before 8pm
      t_lower = 10;
      t_upper = 12;
    }
  } else  {
    // If the heater is on
    if(h < 8 || h > 20) {
      // If it's before 8am or after 8pm
      t_lower = 7;
      t_upper = 9;
    } else if(h > 8 && h < 18)  {
      // If it's after 8am and before 6pm
      t_lower = 14;
      t_upper = 17;
    } else if(h > 18 && h < 20) {
      // If it's after 6pm and before 8pm
      t_lower = 12;
      t_upper = 14;
    }
  }
  
  client.publish('/livingroom/temperature/sensor1', (fFromInterval(t_lower, t_upper)).toString());
  
}

function l_t_sensor2()  {
  
  var h = d.getHours();
  var t_lower, t_upper = 0;
  
  if(heater1.status === "off") {
    // If the heater is off
    if(h < 8 || h > 20) {
      // If it's before 8am or after 8pm
      t_lower = 6;
      t_upper = 7;
    } else if(h > 8 && h < 18)  {
      // If it's after 8am and before 6pm
      t_lower = 11;
      t_upper = 15;
    } else if(h > 18 && h < 20) {
      // If it's after 6pm and before 8pm
      t_lower = 9;
      t_upper = 11;
    }
  } else  {
    // If the heater is on
    if(h < 8 || h > 20) {
      // If it's before 8am or after 8pm
      t_lower = 8;
      t_upper = 9;
    } else if(h > 8 && h < 18)  {
      // If it's after 8am and before 6pm
      t_lower = 13;
      t_upper = 17;
    } else if(h > 18 && h < 20) {
      // If it's after 6pm and before 8pm
      t_lower = 11;
      t_upper = 13;
    }
  }
  
  client.publish('/livingroom/temperature/sensor2', (fFromInterval(t_lower, t_upper)).toString());
  
}

function k_t_sensor1()  {
  
  var h = d.getHours();
  var t_lower, t_upper = 0;
  
  if(h < 8 || h > 20) {
    // If it's before 8am or after 8pm
    t_lower = 3;
    t_upper = 4;
  } else if(h > 8 && h < 18)  {
    // If it's after 8am and before 6pm
    t_lower = 10;
    t_upper = 13;
  } else if(h > 18 && h < 20) {
    // If it's after 6pm and before 8pm
    t_lower = 4;
    t_upper = 7;
  }
  
  client.publish('/kitchen/temperature/sensor2', (fFromInterval(t_lower, t_upper)).toString());
  
}

function b_t_sensor1()  {
  
  var h = d.getHours();
  var t_lower, t_upper = 0;
  
  if(h < 8 || h > 20) {
    // If it's before 8am or after 8pm
    t_lower = 3;
    t_upper = 4;
  } else if(h > 8 && h < 18)  {
    // If it's after 8am and before 6pm
    t_lower = 10;
    t_upper = 13;
  } else if(h > 18 && h < 20) {
    // If it's after 6pm and before 8pm
    t_lower = 4;
    t_upper = 7;
  }
  
  client.publish('/bedroom/temperature/sensor2', (fFromInterval(t_lower, t_upper)).toString());
  
}

//
// Humidity sensors
//

function l_h_sensor1()  {
  
}

function k_h_sensor1()  {
  
}

function b_h_sensor1()  {
  
}

//
// Solar controller
//

function solar_controller()  {
  
}

//
// Livingroom heater
//

function l_heater1()  {
  
}

// Livingroom light

function l_light1() {
  
}

//
// Kitchen fridge
//

function k_fridge() {
  
}

//
// Setup MQTT
//

process.stdout.write("Connecting to MQTT server...");
var client = mqtt.connect('mqtt://127.0.0.1')

client.on('connect', function () {
  
  console.log(" done");
  client.subscribe('#', function(err) {
    if(err)  {
      console.log("Unable to subscribe to topics");
    } else  {
      console.log("Subscribed to all topics");
    }
  })
  
  setInterval(update_time, 1000);
  setInterval(l_t_sensor1, 10200);
  setInterval(l_t_sensor2, 10200);
  setInterval(k_t_sensor1, 10200);
  setInterval(b_t_sensor1, 10200);
  
})

// This function will respond to and log messages
client.on('message', function (topic, message) {
  
  console.log(`Received message: ${topic} ${message.toString()}`);
  
});