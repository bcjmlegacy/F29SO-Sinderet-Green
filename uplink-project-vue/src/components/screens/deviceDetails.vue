<template>
  <div>
    <NavbarTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="deviceDetails">
      <div class="container">
        <div class="flex-deviceDetails">
          <div class="item-deviceDetails">
            <div class="custom-cards-devicesDetails">
              <div class="img-cont">
                <img
                  :src="require(`../../assets/${deviceImage}.png`)"
                  alt="device icon"
                  class="device-img-details"
                />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center label-section">{{ deviceName }}</h5>
                <p class="card-text text-center">{{ deviceEnergy }} Watts</p>
              </div>
              <div class="text-center" v-bind:style="{ display: isAvailable ? 'block' : 'none' }">
                <b-form-checkbox
                  v-model="form.checked"
                  name="check-button"
                  size="lg"
                  value="off"
                  unchecked-value="on"
                  switch
                  @input="turnOn()"
                >Turn {{ form.checked }}</b-form-checkbox>
              </div>
              <div class="form-rows">
                <router-link
                  :to="{
										name: 'editDevice',
										query: {
											deviceID: deviceID,
											deviceName: deviceName,
											deviceImage: deviceImage,
											deviceEnergy: deviceEnergy,
											deviceType: deviceType,
											roomID: roomID
										}
									}"
                >
                  <button class="form-buttons" type="button">Edit</button>
                </router-link>
              </div>
            </div>
          </div>
          <div
            class="item-deviceDetails"
            v-bind:style="{ display: isAvailable ? 'block' : 'none' }"
          >
            <div class="custom-cards-devicesDetails-schedule">
              <h5 class="card-title text-center label-section">Daily Schedule</h5>
              <div class="form-rows" />
              <ul class="list-schedule">
                <li class="scheduleItem" v-for="command in scheduledCommands" :key="command.id">
                  {{ command.command }} at {{ command.hour }}:{{
                  command.minutes
                  }}
                </li>
              </ul>
              <div id="empty">{{ empty.emptySchedule }}</div>
              <div class="form-rows">
                <router-link
                  :to="{
										name: 'editSchedule',
										query: {
											deviceID: deviceID,
											deviceName: deviceName,
											deviceImage: deviceImage,
											deviceEnergy: deviceEnergy,
											deviceType: deviceType,
											roomID: roomID
										}
									}"
                >
                  <button class="form-buttons" type="button">Edit</button>
                </router-link>
              </div>
            </div>
          </div>
          <div
            class="item-deviceDetails"
            v-bind:style="{ display: isAvailable ? 'block' : 'none' }"
          >
            <div class="custom-cards-devicesDetails-schedule">
              <h5 class="card-title text-center label-section">Automated Tasks</h5>
              <div class="form-rows" />
              <ul class="list-schedule">
                <li
                  class="scheduleItem"
                  v-for="automation in automations"
                  :key="automation.id"
                >{{automation.command}} when the {{getType(automation.type)}} is {{translateSymbol(automation.symbol)}} &nbsp; {{automation.value}}{{getUnits(automation.type)}}</li>
              </ul>
              <div id="empty">{{ empty.emptyAutomation }}</div>
              <div class="form-rows">
                <router-link
                  :to="{
										name: 'automate',
										query: {
											deviceID: deviceID,
											deviceName: deviceName,
											deviceImage: deviceImage,
											deviceEnergy: deviceEnergy,
											deviceType: deviceType,
											roomID: roomID
										}
									}"
                >
                  <button class="form-buttons" type="button">Edit</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex-deviceDetails">
            <div class="card custom-cards-devicesDetails-graph">
              <h5 class="card-title text-center label-section">Device Energy</h5>
              <div class="graph-container">
                <canvas id="chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>
<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";
import Chart from "chart.js";

export default {
  name: "addDevice",
  components: {
    NavbarTop,
    NavbarBottom
  },
  data() {
    //below is all the data that is stored for this page.
    //This contains the chart data.
    return {
      form: { //data from the form
        checked: "on"
      },
      device: "", 
      scheduledCommands: [],
      deviceCommands: [],
      sensorType: "",
      automations: [],
      isAvailable: true,
      empty: {
        emptySchedule: "",
        emptyAutomation: ""
      },
      chartD: {
        type: "line",
        data: {
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          datasets: [
            {
              label: "Energy Use",
              backgroundColor: "rgba(25, 143, 202, 0.1)",
              borderColor: "rgba(25, 143, 202, 1)",
              borderWidth: 0.7,
              data: [65, 59, 80, 81, 56, 90, 65]
            }
          ]
        },
        lineChartOptions: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ]
          }
        }
      }
    };
  },
  props: [
    "deviceID",
    "deviceName",
    "deviceImage",
    "deviceEnergy",
    "deviceType",
    "userToken",
    "roomID"
  ],
  methods: {
    //method will get all the device commands for this device.
    getDeviceCommands() {
      let url =
        "http://localhost:5552/getCommandsByDevice?id=" + this.deviceType;
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.deviceCommands = jsonData;
          console.log(this.deviceCommands);
        });
    },


    //Method will take an english command and convert to an id.
    mapCommands(textCommand) {
      for (let i in this.deviceCommands) {
        if (this.deviceCommands[i].device_command_value === textCommand) {
          return this.deviceCommands[i].device_command_id;
        }
      }
    },

    //Method will take a sensortype and give it a plain english name.
    getType(sensorType) {
      if (sensorType === 1) {
        return "temperature";
      }
      if (sensorType === 2) {
        return "humidity";
      }
      return null;
    },

    //Method will translate symbols to english.
    translateSymbol(sym) {
      if (sym === "<") {
        return "lower than";
      }
      if (sym === ">") {
        return "higher than";
      }
      return null;
    },

    //Method will get ascii characters
    ascii(a) {
      return String.fromCharCode(a);
    },

    //Method will get units depending on the sensor type.
    getUnits(unit) {
      if (unit === 1) {
        unit = this.ascii(176) + "c";
        return unit;
      }
      if (unit === 2) {
        return "%";
      }
      return "";
    },

    //Get the current Automations for the device.
    getAutomationData() {
      let url = "http://localhost:5552/getTriggers";
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          for (let i in this.deviceCommands) {
            for (let j in jsonData) {
              if (this.deviceID === jsonData[j].device_trigger_device_id) {
                if (
                  this.deviceCommands[i].device_command_id ===
                  jsonData[j].device_trigger_command
                ) {
                  let url1 =
                    "http://localhost:5552/getSensorById?id=" +
                    jsonData[j].device_trigger_sensor_id;

                  fetch(url1, {
                    mode: "cors",
                    method: "GET",
                    headers: {
                      Authorization: this.userToken
                    }
                  })
                    .then(response => {
                      return response.json();
                    })
                    .then(jsonData1 => {
                      this.automations.push({
                        id: jsonData[j].device_trigger_id,
                        symbol: jsonData[j].device_trigger_gt_lt_eq,
                        value: jsonData[j].device_trigger_sensor_value,
                        command: this.deviceCommands[i].device_command_name,
                        type: jsonData1[0].sensor_type
                      });
                    });
                }
              }
            }
          }

          console.log(this.automations);
        });
    },

    //Async function to turn on the device via the switch.
    async turnOn() {
      await this.$nextTick();
      let url = "http://localhost:5552/insertOneshotTimer";
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: this.userToken
        },
        body: JSON.stringify({
          device_id: this.deviceID,
          trigger: getOpposite(this.form.checked),
          command: this.mapCommands(swap(this.form.checked))
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
        });
    },


    //method will check if the device is on or off.
    checkDeviceActivity() {
      let url = "http://localhost:5552/getOneshotTimers?id=" + this.deviceID;
      let result = null;
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          result = jsonData[jsonData.length - 1].timer_oneshot_trigger;
          this.form.checked = swap(map(result));
        });
    },

    //Method will generate a chart.
    chartData(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },

    //Method will check if the device can make use of the schedule, automation and on and off 
    checkDevice() {
      if (
        this.deviceType != 1 &&
        this.deviceType != 4 &&
        this.deviceType != 9
      ) {
        this.isAvailable = !this.isAvailable;
      }
    }
  },


  mounted: function() {
    //Methods are called on page load.
    let url = "http://localhost:5552/getRepeatTimers?id=" + this.deviceID;
    this.chartData("chart", this.chartD);
    this.checkDevice();
    this.getDeviceCommands();
    this.getAutomationData();

    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: this.userToken
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        //Some formating for finding on and off commands
        if (jsonData.length < 1) {
          this.empty.emptySchedule = "Schedule is Empty";
        }

        for (let key in jsonData) {
          if (
            jsonData[key].timer_repeat_command === 1 ||
            jsonData[key].timer_repeat_command === 3
          ) {
            jsonData[key].timer_repeat_command = "on";
          } else if (
            jsonData[key].timer_repeat_command === 2 ||
            jsonData[key].timer_repeat_command === 4
          ) {
            jsonData[key].timer_repeat_command = "off";
          }
          //creates a json for the scheduled item and pushes to the schedule array
          this.scheduledCommands.push({
            id: jsonData[key].timer_repeat_id,
            hour: formatTime(jsonData[key].timer_repeat_hour),
            minutes: formatTime(jsonData[key].timer_repeat_minute),
            command: capitalize(jsonData[key].timer_repeat_command)
          });
        }
        /*this.lastTime = {
              hour: jsonData[jsonData.length - 1].timer_repeat_hour,
              minutes: jsonData[jsonData.length - 1].timer_repeat_minute,
              command: jsonData[jsonData.length - 1].timer_repeat_command
            };*/
        console.log(this.scheduledCommands);
        this.scheduledCommands.sort((a, b) => {
          return a.hour - b.hour;
        });
        this.checkDeviceActivity();
      });
  }
};

//formatting for the schedule.
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

//Find the current value of the device - 1 = on - 2 = off for oneshot timers.
function getOpposite(command) {
  if (command === "on") {
    return 2;
  } else {
    return 1;
  }
}

//Maps on and off to the commands
function map(command) {
  if (command === 1) {
    return "on";
  } else if (command === 2) {
    return "off";
  }
}

//Swaps the on off switch
//Once device is turned on the device will ask if the user wants to turn it off otherwise ask to turn the device on.
function swap(command) {
  if (command === "off") {
    return "on";
  } else {
    return "off";
  }
}
</script>
<style>
.graph-container {
  padding: 10px;
}
</style>
