<template>
  <div>
    <NavbarTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links" :to="{ name: 'dashboard' }"
            >uplink</router-link
          >
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
                  class="device-img"
                />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center label-section">
                  {{ deviceName }}
                </h5>
                <p class="card-text text-center">{{ deviceEnergy }} Watts</p>
              </div>
              <div class="text-center">
                <b-form-checkbox
                  v-model="form.checked"
                  name="check-button"
                  size="lg"
                  value="off"
                  unchecked-value="on"
                  switch
                  @input="turnOn()"
                  >Turn {{ form.checked }}</b-form-checkbox
                >
              </div>
              <div class="form-rows">
                <router-link
                  :to="{
                    name: 'editDevice',
                    query: {
                      deviceID: deviceID,
                      deviceName: deviceName,
                      deviceImage: deviceImage,
                      deviceEnergy: deviceEnergy
                    }
                  }"
                >
                  <button class="form-buttons" type="button">Edit</button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="item-deviceDetails">
            <div class="custom-cards-devicesDetails-schedule">
              <h5 class="card-title text-center label-section">
                Daily Schedule
              </h5>
              <div class="form-rows" />
              <ul class="list-schedule">
                <li
                  class="scheduleItem"
                  v-for="command in scheduledCommands"
                  :key="command.id"
                >
                  {{ command.command }} at {{ command.hour }}:{{
                    command.minutes
                  }}
                </li>
              </ul>
              <div class="form-rows">
                <router-link
                  :to="{
                    name: 'editSchedule',
                    query: {
                      deviceID: deviceID,
                      deviceName: deviceName,
                      deviceImage: deviceImage,
                      deviceEnergy: deviceEnergy
                    }
                  }"
                >
                  <button class="form-buttons" type="button">Edit</button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="item-deviceDetails">
            <div class="custom-cards-devicesDetails-schedule">
              <h5 class="card-title text-center label-section">
                Automated Tasks
              </h5>
              <div class="form-rows" />
              <ul class="list-schedule">
                <!--List all the automated tasks that were set up like how the schedule looks
                -->
              </ul>
              <div class="form-rows">
                <router-link
                  :to="{
                    name: '',
                    query: {
                      deviceID: deviceID,
                      deviceName: deviceName,
                      deviceImage: deviceImage,
                      deviceEnergy: deviceEnergy
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
              <h5 class="card-title text-center label-section">
                Device Energy
              </h5>
              <div class="graph-container">
                <canvas id="chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :back="back" />
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
    return {
      form: {
        checked: "on"
      },
      device: "",
      scheduledCommands: [],
      chartD: {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "june"],
          datasets: [
            {
              label: "Energy Use",
              backgroundColor: "rgba(25, 143, 202, 0.1)",
              borderColor: "rgba(25, 143, 202, 1)",
              borderWidth: 0.7,
              data: [65, 59, 80, 81, 56, 90]
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
    "userToken",
    "back"
  ],
  methods: {
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
          command: swap(this.form.checked)
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
        });
    },
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
    chartData(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted: function() {
    let url = "http://localhost:5552/getRepeatTimers?id=" + this.deviceID;
    this.chartData("chart", this.chartD);
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
