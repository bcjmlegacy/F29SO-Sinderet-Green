<template>
  <div>
    <NavbarTop class="top-show" />
    <div id="deviceDetails">
      <div class="container">
        <div class="flex-add">
          <div class="card custom-cards-devicesDetails">
            <div class="img-cont">
              <img
                :src="require(`../assets/${deviceToAdd.deviceImage}.png`)"
                alt="device icon"
                class="device-img"
              />
            </div>
            <div class="text-wrapper">
              <h5 class="card-title text-center label-section">{{deviceToAdd.deviceName}}</h5>
              <p class="card-text text-center">{{deviceToAdd.deviceEnergy}} Watts</p>
              <p
                class="card-text text-center"
              >Device will go {{lastTime.command}} at {{lastTime.hour}}:{{lastTime.minutes}} everyday</p>
            </div>

            <div class="col-sm-12">
              <div class="text-center">
                <b-form-checkbox
                  v-model="form.checked"
                  name="check-button"
                  size="lg"
                  value="off"
                  unchecked-value="on"
                  switch
                  @input="turnOn()"
                >Turn {{form.checked}}</b-form-checkbox>
              </div>
            </div>

            <div class="form-rows">
              <div class="col-sm-12">
                <button
                  class="form-buttons"
                  type="button"
                  @click="switchComp('editDevice')"
                >Advanced</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" />
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
      lastTime: ""
    };
  },
  props: ["deviceToAdd", "userToken"],
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
            console.log(jsonData);
            this.lastTime = {
              hour: jsonData[jsonData.length - 1].timer_repeat_hour,
              minutes: jsonData[jsonData.length - 1].timer_repeat_minute,
              command: jsonData[jsonData.length - 1].timer_repeat_command
            };
            console.log(this.lastTime);
          });
      });
  }
};

function swap(command) {
  if (command === "off") {
    return "on";
  } else {
    return "off";
  }
}
</script>
<style>
#deviceDetails {
  margin-top: 140px;
}

.device-img {
  width: 50%;
  padding: 10px;
}
.label {
  font-size: 1.5rem;
}

.custom-cards-devicesDetails {
  width: 25rem;
  height: 30rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-devicesDetails:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

.text-wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-dropdown {
  width: 100%;
  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom: solid 1px #b8b8b8;
  outline: none;
  height: 3rem;
}

.form-dropdown:focus {
  outline: none;
  border-bottom: solid 1px #198fca;
}
</style>