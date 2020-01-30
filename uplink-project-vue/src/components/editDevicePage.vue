<template>
  <div>
    <NavbarTop class="top-show" />
    <div id="addDevice">
      <div class="container">
        <h3 class="display-3 text-center">Edit Device</h3>
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
                  <div class="col-sm-12">
                    <label for="input-device-name" class="label">Change Device Name</label>
                  </div>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      id="input-device-name"
                      placeholder="Hue Lights"
                      class="form-inputboxes"
                    />
                  </div>
                  <div class="form-rows">
                    <div class="newRows">
                      <p class="label-section text-center">Timered Events</p>
                    </div>
                    <div class="col-sm-12">
                      <label for="input-device-room" class="label">Set Timer Interval</label>
                    </div>
                    <div class="col-sm-12 text-center">
                      <select
                        v-model="form.day"
                        class="form-dropdown time-width"
                        required="required"
                      >
                        <option disabled value>Days</option>
                        <option selected="selected" value="0">0</option>
                        <option v-for="n in 30" :key="n" :value="n">{{n}}</option>
                      </select>
                      <select
                        v-model="form.hour"
                        class="form-dropdown time-width"
                        required="required"
                      >
                        <option disabled value>Hours</option>
                        <option selected="selected" value="0">0</option>
                        <option v-for="n in 24" :key="n" :value="n">{{n}}</option>
                      </select>
                      <select
                        v-model="form.minute"
                        class="form-dropdown time-width"
                        required="required"
                      >
                        <option disabled value>Minutes</option>
                        <option selected="selected" alue="0">0</option>
                        <option v-for="n in 60" :key="n" :value="n">{{n}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <label for="input-device-room" class="label">Set Timer Operation</label>
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
                  <!--
                  <div class="newRowSwitch">
                    <p class="label-section text-center">Quick Actions</p>
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <div class="text-center">
                        <b-form-checkbox
                          v-model="form.checked"
                          name="check-button"
                          size="lg"
                          value="on"
                          switch
                        >Turn On</b-form-checkbox>
                      </div>
                    </div>
                  </div>-->
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
  props: ["deviceToAdd", "userToken"],
  data() {
    return {
      form: {
        name: "",
        operation: "",
        type: "",
        month: "0",
        day: "",
        hour: "",
        minute: "",
        checked: "off"
      },
      operations: []
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
          type: pairImg(this.deviceToAdd.deviceImage),
          month: this.form.month,
          day: this.form.day,
          hour: this.form.hour,
          minute: this.form.minute,
          command: this.form.operation,
          device_id: pairImg(this.deviceToAdd.deviceImage)
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          this.switchComp("Dash");
        });

      evt.preventDefault();
    }
  },
  mounted: function() {
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
        this.operations = jsonData;
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
<style>
/**Styling for edit Device Page, very similar to AddDeviceMetrics pages */

#addDevice {
  margin-top: 100px;
}

#form-addDevice {
  margin-top: 40px;
}

.newRows {
  margin-top: 10%;
  margin-bottom: 10%;
}

.device-cont {
  margin-top: 0.5rem;
}
.device-img {
  width: 50%;
  padding: 10px;
}
.label {
  font-size: 1.5rem;
}

.label-section {
  font-size: 1.7em;
  font-weight: 600;
}

.newRowSwitch {
  margin-top: 10%;
  margin-bottom: 5%;
}

.time-width {
  width: 25% !important;
  margin-left: 4%;
  margin-right: 4%;
}

.custom-cards-editDevices {
  width: 25rem;
  height: 60rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-editDevices:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

.text-wrapper {
  margin-top: 20px;
  margin-bottom: 30px;
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
