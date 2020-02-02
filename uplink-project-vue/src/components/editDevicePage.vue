<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
    <div id="editDevice">
      <div class="container">
        <h3 class="display-3 text-center">Edit Schedule</h3>
        <div id="form-addDevice">
          <div class="flex-add">
            <div class="card custom-cards-editDevices">
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
              <div class="device-cont">
                <b-form @submit="go">
                  <div class="form-rows">
                    <div class="newRows">
                      <p class="label-section text-center">Scheduled Events</p>
                    </div>
                    <div class="col-sm-12">
                      <label for="input-device-room" class="label">Set Time</label>
                    </div>
                    <div class="col-sm-12">
                      <select
                        v-model="form.hour"
                        class="form-dropdown time-width"
                        required="required"
                      >
                        <option disabled value>Hours</option>
                        <option selected="selected" value="0">0</option>
                        <option v-for="n in 24" :key="n" :value="n">
                          {{
                          n
                          }}
                        </option>
                      </select>
                      <select
                        v-model="form.minute"
                        class="form-dropdown time-width"
                        required="required"
                      >
                        <option disabled value>Minutes</option>
                        <option selected="selected" alue="0">0</option>
                        <option v-for="n in 60" :key="n" :value="n">
                          {{
                          n
                          }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <label for="input-device-room" class="label">Set Operation</label>
                    </div>
                    <div class="col-sm-12">
                      <select v-model="form.operation" class="form-dropdown" required="required">
                        <option disabled value>Please Select An Operation</option>
                        <option
                          v-for="op in operations"
                          :key="op.device_command_id"
                          :value="op.device_command_value"
                        >{{ op.device_command_name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="newRowSwitch">
                    <div class="form-rows">
                      <div class="col-sm-12">
                        <button class="form-buttons" type="submit">Save Changes</button>
                      </div>
                    </div>
                  </div>
                </b-form>
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
  props: ["deviceToAdd", "userToken", "back"],
  data() {
    return {
      form: {
        name: "",
        operation: "",
        month: "0",
        day: "0",
        hour: "",
        minute: "",
        checked: "off"
      },
      operations: [],
      device: ""
    };
  },
  methods: {
    switchComp(comp) {
      bus.$emit("switchComp", comp);
    },

    go(evt) {
      let url = "http://localhost:5552/insertRepeatTimer";
      console.log(this.form);
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.userToken
        },
        body: JSON.stringify({
          type: "Day",
          month: this.form.month,
          day: this.form.day,
          hour: this.form.hour,
          minute: this.form.minute,
          command: this.form.operation,
          device_id: this.device
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          this.switchComp("deviceDetails");
        });

      evt.preventDefault();
    }
  },
  mounted: function() {
    //Get command for device via icon thats displayed
    let url = "http://localhost:5552/getCommandsByDevice?id=";
    let id = pairImg(this.deviceToAdd.deviceImage);
    let urlComplete = url + id;
    fetch(urlComplete, {
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
        this.operations = jsonData; //after we get commands find device ID
        let url1 = "http://localhost:5552/getDevices";
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
            for (let device in jsonData) {
              if (
                jsonData[device].device_name === this.deviceToAdd.deviceName &&
                jsonData[device].device_wattage ===
                  this.deviceToAdd.deviceEnergy
              ) {
                this.device = jsonData[device].device_id;
                console.log(this.device);
              }
            }
          });
      });
  }
};

//Add more when more devices are available
function pairImg(img) {
  switch (img) {
    case "fire":
      return "1";
    case "fridgecolor":
      return "2";
    case "solarpanelcolor":
      return "3";
    case "light-bulb":
      return "4";
  }
}
</script>
