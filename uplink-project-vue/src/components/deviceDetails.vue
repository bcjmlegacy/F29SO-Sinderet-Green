<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
    <div id="deviceDetails">
      <div class="container">
        <div class="flex-deviceDetails">
          <div class="item-deviceDetails">
            <div class="card custom-cards-devicesDetails">
              <div class="img-cont">
                <img
                  :src="require(`../assets/${deviceToAdd.deviceImage}.png`)"
                  alt="device icon"
                  class="device-img"
                />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center label-section">{{ deviceToAdd.deviceName }}</h5>
                <p class="card-text text-center">{{ deviceToAdd.deviceEnergy }} Watts</p>
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
                <button class="form-buttons" type="button" @click="switchComp('editDevice')">Edit</button>
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
import { bus } from "../main";
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
    switchComp(comp) {
      bus.$emit("switchComp", comp);
    },
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
        for (let device in jsonData) {
          if (
            jsonData[device].device_name === this.deviceToAdd.deviceName &&
            jsonData[device].device_wattage === this.deviceToAdd.deviceEnergy
          ) {
            this.device = jsonData[device].device_id;
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
