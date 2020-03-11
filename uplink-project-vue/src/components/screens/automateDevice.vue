<template>
  <div>
    <NavbarTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="editDevice">
      <div class="container">
        <div class="flex-deviceDetails">
          <div class="card custom-cards-editDevices">
            <div class="img-cont">
              <img
                class="device-img"
                :src="require(`../../assets/${deviceImage}.png`)"
                alt="device icon"
              />
            </div>
            <div class="text-wrapper">
              <h5 class="card-title text-center label-section">{{ deviceName }}</h5>
              <p class="card-text text-center">{{ deviceEnergy }} Watts</p>
            </div>
            <div class="device-cont">
              <b-form @submit="sendAutomation">
                <p class="label-section text-center">Add Automation</p>
                <div class="form-rows">
                  <div class="col-sm-12">
                    <label for="sensorTypes" class="label">Set Sensor Type</label>
                  </div>
                  <div class="col-sm-12">
                    <select
                      class="form-dropdown"
                      required="required"
                      v-model="form.type"
                      @input="displaySensors"
                    >
                      <option disabled value>Please Select a Sensor Type</option>
                      <option
                        v-for="sensor in sensorTypes"
                        :key="sensor.sensor_type_id"
                        :value="sensor.sensor_type_id"
                      >{{ sensor.sensor_type_name }}</option>
                    </select>
                  </div>
                  <div
                    class="form-rows"
                    v-bind:style="{ display: formStages.isAvailable0 ? 'block' : 'none' }"
                  >
                    <div class="col-sm-12">
                      <label for="sensorTypes" class="label">Set Sensor</label>
                    </div>
                    <div class="col-sm-12">
                      <select
                        class="form-dropdown"
                        required="required"
                        v-model="form.sensor"
                        @input="sensorStage"
                      >
                        <option disabled value>Please Select a Sensor</option>
                        <option
                          v-for="sensor in sensorAvailable"
                          :key="sensor.id"
                          :value="sensor.id"
                        >{{ sensor.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="form-rows"
                    v-bind:style="{ display: formStages.isAvailable1 ? 'block' : 'none' }"
                  >
                    <div class="col-sm-12">
                      <label for="sensorTypes" class="label">Device Command</label>
                    </div>
                    <div class="col-sm-12">
                      <select
                        class="form-dropdown"
                        required="required"
                        v-model="form.operation"
                        @input="commandStage"
                      >
                        <option disabled value>Please Select a Command</option>
                        <option
                          v-for="op in operations"
                          :key="op.device_command_id"
                          :value="op.device_command_id"
                        >{{ capitalize(op.device_command_name) }}</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="form-rows"
                    v-bind:style="{ display: formStages.isAvailable2 ? 'block' : 'none' }"
                  >
                    <div class="col-sm-12">
                      <label
                        for="sensorTypes"
                        class="label"
                      >If the {{ sensorTypeName.toLowerCase() }} is</label>
                    </div>
                    <div class="col-sm-12">
                      <select
                        v-model="form.option"
                        class="form-dropdown option-width"
                        required="required"
                      >
                        <option disabled value>Option</option>
                        <option value="<">Lower than</option>
                        <option value=">">Higher than</option>
                      </select>
                      <div
                        v-bind:style="{ display: formStages.isAvailableTemp ? 'inline' : 'none' }"
                      >
                        <select
                          v-model="form.value"
                          class="form-dropdown time-width"
                          required="required"
                          @input="finalStage"
                        >
                          <option disabled value>Value</option>
                          <option v-for="t in range(15, 30)" :key="t" :value="t">{{ t }}&#x2103;</option>
                        </select>
                      </div>
                      <div
                        v-bind:style="{ display: formStages.isAvailableHumid ? 'inline' : 'none' }"
                      >
                        <select
                          v-model="form.value"
                          class="form-dropdown time-width"
                          required="required"
                          @input="finalStage"
                        >
                          <option disabled value>Value</option>
                          <option v-for="h in range(0, 100)" :key="h" :value="h">{{ h }}&#37;</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    class="newRowSwitch"
                    v-bind:style="{ display: formStages.isAvailable3 ? 'block' : 'none' }"
                  >
                    <div class="form-rows">
                      <div class="col-sm-12">
                        <button class="form-buttons" type="submit">Add Automation</button>
                      </div>
                    </div>
                  </div>
                </div>
              </b-form>
            </div>
          </div>
          <div class="card custom-cards-devicesDetails-schedule-edit">
            <h5 class="card-title text-center label-section">Delete Automations</h5>
            <div class="form-rows" />
            <ul class="list-schedule"></ul>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" />
  </div>
</template>

<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

export default {
  name: "automate",
  props: [
    "deviceID",
    "deviceName",
    "deviceImage",
    "deviceEnergy",
    "deviceType",
    "roomID",
    "userToken"
  ],
  components: {
    NavbarTop,
    NavbarBottom
  },
  data() {
    return {
      form: {
        deviceID: this.deviceID,
        type: "",
        sensor: "",
        operation: "",
        option: "",
        value: ""
      },
      formStages: {
        isAvailable0: false,
        isAvailable1: false,
        isAvailable2: false,
        isAvailable3: false,
        isAvailableTemp: false,
        isAvailableHumid: false
      },
      sensorTypeName: "",
      sensorTypes: [],
      sensorAvailable: [],
      operations: []
    };
  },
  methods: {
    getSensorType() {
      let url = "http://localhost:5552/getSensorTypes";
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.sensorTypes = jsonData;
          console.log(this.sensorTypes);
        })
        .catch(err => {
          console.log(err);
        });
    },

    async displaySensors() {
      await this.$nextTick();
      this.formStages.isAvailable0 = true;

      if (this.form.type === 1) {
        this.formStages.isAvailableTemp = true;
        this.formStages.isAvailableHumid = false;
      } else if (this.form.type === 2) {
        this.formStages.isAvailableTemp = false;
        this.formStages.isAvailableHumid = true;
      }

      this.sensorAvailable = [];
      for (let i in this.sensorTypes) {
        if (this.sensorTypes[i].sensor_type_id === this.form.type) {
          this.sensorTypeName = this.sensorTypes[i].sensor_type_name;
          break;
        }
      }
      let url = "http://localhost:5552/getSensors";
      let type = this.form.type;
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);

          for (let i in jsonData) {
            if (
              jsonData[i].sensor_room == this.roomID &&
              type === jsonData[i].sensor_type
            ) {
              this.sensorAvailable.push({
                id: jsonData[i].sensor_id,
                name: jsonData[i].sensor_name
              });
            }
          }
          console.log(this.sensorAvailable);
        });
    },

    async sensorStage() {
      await this.$nextTick();
      this.formStages.isAvailable1 = true;
    },

    async commandStage() {
      await this.$nextTick();
      this.formStages.isAvailable2 = true;
    },

    async finalStage() {
      await this.$nextTick();
      this.formStages.isAvailable3 = true;
    },

    getDeviceOperations() {
      let url =
        "http://localhost:5552/getCommandsByDevice?id=" + this.deviceType;
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.operations = jsonData;
          console.log(this.operations);
        });
    },

    sendAutomation(evt) {
      let url = "http://localhost:5552/insertTrigger";
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          authorization: this.userToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          deviceId: this.form.deviceID,
          sensorId: this.form.sensor,
          symbol: this.form.option,
          value: this.form.value,
          commandId: this.form.operation
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
        });
      evt.preventDefault();
    },

    getTriggers() {},
    deleteAutomation() {},

    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },

    range(min, max) {
      let array = [],
        j = 0;
      for (var i = min; i <= max; i++) {
        array[j] = i;
        j++;
      }
      return array;
    }
  },
  mounted: function() {
    this.getSensorType();
    this.getDeviceOperations();
  }
};
</script>

<style>
.option-width {
  width: 50%;
}
</style>
