<template>
  <div>
    <NavbarTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="deviceDetails">
      <div class="container">
        <div class="flex-deviceDetails">
          <div class="item-deviceDetails">
            <div class="card custom-cards-devicesDetails">
              <div class="img-cont">
                <img
                  :src="require(`../assets/${deviceImage}.png`)"
                  alt="device icon"
                  class="device-img"
                />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center label-section">{{ deviceName }}</h5>
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
                >Turn {{ form.checked }}</b-form-checkbox>
              </div>

              <div class="form-rows">
                <button class="form-buttons" type="button">Advanced</button>
              </div>
            </div>
          </div>
          <div class="item-deviceDetails">
            <div class="card custom-cards-devicesDetails-schedule">
              <h5 class="card-title text-center label-section">Daily Schedule</h5>
              <div class="form-rows" />
              <ul class="list-schedule">
                <li
                  class="scheduleItem"
                  v-for="command in scheduledCommands"
                  :key="command.id"
                >{{command.command}} at {{command.hour}}:{{command.minutes}}</li>
              </ul>
              <div class="form-rows">
                <router-link
                  :to="{name: 'editSchedule', query:{deviceName:deviceName, 'deviceImage': deviceImage, deviceEnergy:deviceEnergy}}"
                >
                  <button class="form-buttons" type="button">Edit</button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="item-deviceDetails">
            <div class="card custom-cards-devicesDetails-schedule">
              <h5 class="card-title text-center label-section">Automated Tasks</h5>
              <div class="form-rows" />
              <ul class="list-schedule">
                <!--List all the automated tasks that were set up like how the schedule looks
                -->
              </ul>
              <div class="form-rows">
                <router-link
                  :to="{name: '#', query:{deviceName:deviceName, 'deviceImage': deviceImage, deviceEnergy:deviceEnergy}}"
                >
                  <button class="form-buttons" type="button">Edit</button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="item-deviceDetails">
            <div class="card custom-cards-devicesDetails-graph">
              <div class="text-center">
                <h1>Device Graph</h1>
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
import NavbarTop from "./navbar-top";
import NavbarBottom from "./navbar-bottom";
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
      scheduledCommands: []
    };
  },
  props: ["deviceName", "deviceImage", "deviceEnergy", "userToken", "back"],
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
          device_id: this.device,
          trigger: 1,
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
    loadOnce: function() {
      location.reload();
      console.log("reloaded");
    }
  },
  mounted: function() {
    //find device ID
    let url = "http://localhost:5552/getDevices";
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
        console.log(jsonData);
        let deviceNo = 0;
        for (deviceNo in jsonData) {
          if (
            jsonData[deviceNo].device_name === this.deviceName &&
            jsonData[deviceNo].device_wattage === this.deviceEnergy
          ) {
            this.device = jsonData[deviceNo].device_id;
            console.log(this.device);
          }
        }
        let url1 = "http://localhost:5552/getRepeatTimers?id=" + this.device;

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
          .then(jsonData => {
            console.log("nn");
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
          });
      });
  }
};

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

function swap(command) {
  if (command === "off") {
    return "on";
  } else {
    return "off";
  }
}
</script>
