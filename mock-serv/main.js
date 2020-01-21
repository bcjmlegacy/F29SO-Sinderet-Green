//
// Mock data server
//
//  main.js
//
//  To send test MQTT message with mosquitto:
//    mosquitto_pub -h [host e.g. localhost] -t [topic] -m [message]
//

const mqtt = require('mqtt');
var d = new Date();

//
// Dummy data:
//  /Livingroom/Temperature/ABC123
//  /Livingroom/Temperature/ABC456
//  /Kitchen/Temperature/ABC789
//  /Bedroom/Temperature/DEF123
//
//  /Livingroom/Humidity/DEF456
//  /Kitchen/Humidity/DEF789
//  /Bedroom/Humidity/HIG123
//
//  /Outside/123456ABC/input
//  /Outside/123456ABC/output
var solarController = { status: "on", input: 10, output: 6 };
//
//  /Livingroom/status/123ABC123
//  /Livingroom/set_power/123ABC123
var heater1 = { status: "on" };
//
//  /Livingroom/status/456ABC123
//  /Livingroom/set_power/456ABC123
//  /Livingroom/set_colour/456ABC123
var light1 = { status: "on" };
//
//  /Kitchen/789ABC123/Temperature
//

//
// Utility functions
//

function fFromInterval(min, max) {
  var tmp = (Math.random() * (max - min) + min).toFixed(2);
  // console.log(`Got val: ${tmp} from ${min} and ${max}`);
  return tmp;
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
    } else if(h => 18 && h < 20) {
      // If it's after 6pm and before 8pm
      t_lower = 10;
      t_upper = 12;
    }
  } else  {
    // If the heater is on
    // console.log("Heater is on");

    if(h < 8 || h > 20) {
      // If it's before 8am or after 8pm
      t_lower = 7;
      t_upper = 9;
    } else if(h > 8 && h < 18)  {
      // If it's after 8am and before 6pm
      t_lower = 14;
      t_upper = 17;
    } else if(h => 18 && h < 20) {
      // If it's after 6pm and before 8pm
      t_lower = 12;
      t_upper = 14;
    }
  }
  
  // console.log(`${t_lower}, ${t_upper}`);
  client.publish('/Livingroom/Temperature/ABC123', (fFromInterval(t_lower, t_upper)).toString());
  
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
    } else if(h => 18 && h < 20) {
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
    } else if(h => 18 && h < 20) {
      // If it's after 6pm and before 8pm
      t_lower = 11;
      t_upper = 13;
    }
  }
  
  client.publish('/Livingroom/Temperature/ABC456', (fFromInterval(t_lower, t_upper)).toString());
  
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
  } else if(h => 18 && h < 20) {
    // If it's after 6pm and before 8pm
    t_lower = 4;
    t_upper = 7;
  }
  
  client.publish('/Kitchen/Temperature/ABC789', (fFromInterval(t_lower, t_upper)).toString());
  
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
  } else if(h => 18 && h < 20) {
    // If it's after 6pm and before 8pm
    t_lower = 4;
    t_upper = 7;
  }
  
  client.publish('/Bedroom/Temperature/DEF123', (fFromInterval(t_lower, t_upper)).toString());
  
}

//
// Humidity sensors
//

function l_h_sensor1()  {
  
  var h = d.getHours();
  var h_lower, h_upper = 0;
  
  if(h < 8 || h > 20) {
    // If it's before 8am or after 8pm
    h_lower = 0.3;
    h_upper = 0.4;
  } else if(h > 8 && h < 18)  {
    // If it's after 8am and before 6pm
    h_lower = 0.6;
    h_upper = 0.7;
  } else if(h => 18 && h < 20) {
    // If it's after 6pm and before 8pm
    h_lower = 0.5;
    h_upper = 0.6;
  }
  
  client.publish('/Livingroom/Humidity/DEF456', (fFromInterval(h_lower, h_upper)).toString());
  
}

function k_h_sensor1()  {
  
  var h = d.getHours();
  var h_lower, h_upper = 0;
  
  if(h < 8 || h > 20) {
    // If it's before 8am or after 8pm
    h_lower = 0.3;
    h_upper = 0.4;
  } else if(h > 8 && h < 18)  {
    // If it's after 8am and before 6pm
    h_lower = 0.6;
    h_upper = 0.7;
  } else if(h => 18 && h < 20) {
    // If it's after 6pm and before 8pm
    h_lower = 0.5;
    h_upper = 0.6;
  }
  
  client.publish('/Kitchen/Humidity/DEF789', (fFromInterval(h_lower, h_upper)).toString());
  
}

function b_h_sensor1()  {
  
  var h = d.getHours();
  var h_lower, h_upper = 0;
  
  if(h < 8 || h > 20) {
    // If it's before 8am or after 8pm
    h_lower = 0.3;
    h_upper = 0.4;
  } else if(h > 8 && h < 18)  {
    // If it's after 8am and before 6pm
    h_lower = 0.6;
    h_upper = 0.7;
  } else if(h => 18 && h < 20) {
    // If it's after 6pm and before 8pm
    h_lower = 0.5;
    h_upper = 0.6;
  }
  
  client.publish('/Bedroom/Humidity/HIG123', (fFromInterval(h_lower, h_upper)).toString());
  
}

//
// Solar controller
//

function solar_controller()  {
  
  var h = d.getHours();
  var i_lower, i_upper, o_lower, o_upper = 0;
  
  if(h < 8 || h > 20) {
    // If it's before 8am or after 8pm
    i_lower = 3;
    i_upper = 4;
    o_lower = 2;
    o_upper = 3;
  } else if(h > 8 && h < 18)  {
    // If it's after 8am and before 6pm
    i_lower = 6;
    i_upper = 7;
    o_lower = 5;
    o_upper = 6;
  } else if(h => 18 && h < 20) {
    // If it's after 6pm and before 8pm
    i_lower = 5;
    i_upper = 6;
    o_lower = 4;
    o_upper = 5;
  }

  if(heater1.status === "on") {
    o_lower = o_lower + 0.5;
    o_upper = o_upper + 0.5;
  }

  if(light1.status === "on") {
    o_lower = o_lower + 0.2;
    o_upper = o_upper + 0.2;
  }

  client.publish('/Solar/input/123456ABC', (fFromInterval(i_lower, i_upper)).toString());
  client.publish('/Solar/output/123456ABC', (fFromInterval(o_lower, o_upper)).toString());

}

// //
// // Livingroom heater
// //

// function l_heater1()  {
  
// }

// // Livingroom light

// function l_light1() {
  
// }

//
// Kitchen fridge
//

function k_fridge() {
  
  client.publish('/Kitchen/Temperature/789ABC123', (fFromInterval(1, 4)).toString());

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
  setInterval(l_h_sensor1, 10200);
  setInterval(k_h_sensor1, 10200);
  setInterval(b_h_sensor1, 10200);
  setInterval(solar_controller, 10200);
  setInterval(k_fridge, 10200);
  
})

//  /Livingroom/heater1/status
//  /Livingroom/heater1/set_power
// var heater1 = { status: "on" };
//
//  /Livingroom/light1/status
//  /Livingroom/light1/set_power
//  /Livingroom/light1/set_colour
// var light1 = { status: "on" };

// This function will respond to and log messages
client.on('message', function (topic, message) {
  // console.log(d.getUTCDate());
  
  console.log(`Received message: ${topic} ${message.toString()}`);

  if(topic === "/Livingroom/set_power/123ABC123") {
    if(message.toString() === "on") {
      heater1.status = "on"
      client.publish('/Livingroom/status/123ABC123', "on");
    } else  {
      heater1.status = "off"
      client.publish('/Livingroom/status/123ABC123', "off");
    }
  }

  if(topic === "/Livingroom/get_status/123ABC123") {
    client.publish('/Livingroom/status/123ABC123', heater1.status);
  }

  if(topic === "/Livingroom/set_power/456ABC123") {
    if(message.toString() === "on") {
      light1.status = "on"
      client.publish('/Livingroom/status/456ABC123', light1.status);
    } else  {
      light1.status = "off"
      client.publish('/Livingroom/status/456ABC123', light1.status);
    }
  }

  if(topic === "/Livingroom/get_status/456ABC123") {
    client.publish('/Livingroom/status/456ABC123', light1.status);
  }
  
});