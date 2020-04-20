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
                   
                          @input="finalStage"
                        >
                          <option disabled value>Value</option>
                          <option v-for="t in range(15, 31)" :key="t" :value="t">{{ t }}&#x2103;</option>
                        </select>
                      </div>
                      <div
                        v-bind:style="{ display: formStages.isAvailableHumid ? 'inline' : 'none' }"
                      >
                        <select
                          v-model="form.value"
                          class="form-dropdown time-width"
                          
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
            <ul class="list-schedule">
              <li class="scheduleItem" v-for="automation in automations" :key="automation.id">
                {{automation.command}} when the {{getType(automation.type)}} is {{translateSymbol(automation.symbol)}} &nbsp; {{automation.value}}{{getUnits(automation.type)}}
                <br />
                <span class="delete" @click="deleteAutomationItem(automation.id)">Delete</span>
              </li>
            </ul>
            <div id="empty">{{ empty.emptyAutomation }}</div>
            <div class="form-rows">
              <button
                class="form-buttons-delete"
                type="button"
                @click="deleteAllAutomations"
              >Delete All Automations</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>

<script>

//Import the navbars.
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

export default {
  name: "automatePage",
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
  //Data system for the automation page
  data() {
    return {
      form: { //form data
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
      operations: [],
      automations: [],
      empty: {
        emptyAutomation: ""
      }
    };
  },
  methods: {
    //method to display all the sensor types available.
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

    //Async class to display all the sensors for the available sensor type that was chosen by the user.
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

    //Shows the next stage of the form for the user with the correct details.
    async sensorStage() {
      await this.$nextTick();
      this.formStages.isAvailable1 = true;
    },

    //Shows the command stage of the form to show commands the device can do.
    async commandStage() {
      await this.$nextTick();
      this.formStages.isAvailable2 = true;
    },

    //Shows the final stage to the form which will show the units and the more than or less than values.
    async finalStage() {
      await this.$nextTick();
      this.formStages.isAvailable3 = true;
    },

    //Gets all the device opertations for that device type
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

    //method is called on submit of the form. Will insert the trigger into the database.
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
          location.reload();
        });
      evt.preventDefault();
    },

    //Following methods format data from the database to be presented in plain english
    //Gets the sensor type and converts to english
    getType(sensorType) {
      if (sensorType === 1) {
        return "temperature";
      }
      if (sensorType === 2) {
        return "humidity";
      }
      return null;
    },

    //Converts the symbol from the database to english
    translateSymbol(sym) {
      if (sym === "<") {
        return "lower than";
      }
      if (sym === ">") {
        return "higher than";
      }
      return null;
    },


    //Gets an ascii character from a character code.
    ascii(a) {
      return String.fromCharCode(a);
    },

    //get the correct units depending on the sensor type.
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

    //get the currently stored automations for the current device
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
          for (let i in this.operations) {
            for (let j in jsonData) {
              if (this.deviceID === jsonData[j].device_trigger_device_id) {
                if (
                  this.operations[i].device_command_id ===
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
                      this.automations.push({ //Pushes a JSON to the array to store all the this data. This data will get looped and formatted to plain english.
                        id: jsonData[j].device_trigger_id,
                        symbol: jsonData[j].device_trigger_gt_lt_eq,
                        value: jsonData[j].device_trigger_sensor_value,
                        command: this.operations[i].device_command_name,
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

    //Method will delete an automation depending on the id that is used.
    //Will check with the user before the automation is deleted.
    deleteAutomationItem(id) {
      if (!confirm("Do really want to delete this automated event?")) {
        return false;
      }
      let url = "http://localhost:5552/deleteDeviceTrigger?id=" + id;
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
          location.reload();
        });
    },


    //Method will delete all the automations for the device. 
    //Will check with the user before the automation is deleted.
    deleteAllAutomations() {
      if (!confirm("Do really want to delete the entire schedule?")) {
        return false;
      }
      //loops through the schedule and deletes each schedule item one by one using the id
      for (let i in this.automations) {
        let url =
          "http://localhost:5552/deleteDeviceTrigger?id=" +
          this.automations[i].id;
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
            location.reload();
          });
      }
    },

    //Will capitalise a string
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },


    //Will get the range of numbers between two values.
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
    //Methods that will get called when the page loads.
    this.getSensorType();
    this.getDeviceOperations();
    this.getAutomationData();
  }
};
</script>

<style>
.option-width {
  width: 50%;
}
</style>
