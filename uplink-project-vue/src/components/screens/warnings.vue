<template>
  <div id="warnings">
    <NavTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div class="container">
      <div class="sub-title-wrapper">
        <!--summary title that will show the room name will be labeled home-->
        <h5 class="h1-titles text-center">Warnings</h5>
        <hr />
      </div>
      <div class="warnings-tree">
        <div class="flex-warnings">
          <WarningCard
            v-for="warning in warnings"
            :key="warning.id"
            :deviceID="warning.deviceID"
            :deviceName="warning.deviceName"
            :deviceImage="warning.deviceImage"
            :deviceEnergy="warning.deviceEnergy"
            :deviceType="warning.deviceType"
            :roomID="warning.roomID"
            :message="warning.message"
            :warningID="warning.id"
            :userToken="userToken"
          />
        </div>
      </div>
    </div>
    <NavBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>

<script>
import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";
import WarningCard from "../helpers/warningCard";
export default {
  name: "warnings",
  components: { NavTop, NavBottom, WarningCard },
  props: ["userToken"],
  data() {
    return {
      warnings: [],
      devices: []
    };
  },
  methods: {
    getDevices() {
      let url = "http://localhost:5552/getDevices";
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
          this.devices = jsonData;
          console.log(this.devices);
        });
    },
    getWarnings() {
      let url = "http://localhost:5552/getWarnings";
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
            for (let j in this.devices) {
              if (jsonData[i].warning_device_id === this.devices[j].device_id) {
                this.warnings.push({
                  id: jsonData[i].warning_id,
                  message: jsonData[i].warning_message,
                  deviceID: this.devices[j].device_id,
                  deviceName: this.devices[j].device_name,
                  deviceImage: pairImg(this.devices[j].device_type),
                  deviceEnergy: this.devices[j].device_wattage,
                  deviceType: this.devices[j].device_type,
                  roomID: this.devices[j].device_room
                });
              }
            }
          }
          console.log(this.warnings);
        });
    }
  },
  mounted: function() {
    this.getDevices();
    this.getWarnings();
  }
};

function pairImg(deviceType) {
  if (deviceType == 1) {
    return "heating";
  }
  if (deviceType == 2) {
    return "fridge";
  }
  if (deviceType == 3) {
    return "solarpanel";
  }
  if (deviceType == 4) {
    return "light-bulb";
  }
  if (deviceType == 5) {
    return "doorbell";
  }
  if (deviceType == 6) {
    return "solarpanel";
  }
  if (deviceType == 7) {
    return "security-camera";
  }
  if (deviceType == 8) {
    return "tv";
  }
  if (deviceType == 9) {
    return "plug";
  }
}
</script>

<style>
#warnings {
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 120px;
  margin-bottom: 50px;
}
.warning-title-text {
  font-size: 3.8em;
}
.warnings-tree {
  margin-top: 20px;
}

.flex-warnings {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: row;
}

@media screen and (max-width: 1025px) {
  #warnings {
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 100px;
    margin-top: 100px;
  }
}
</style>