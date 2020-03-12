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
                  deviceImage: pairImg(this.devices[j].device_name),
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

function pairImg(device) {
  if (
    device.includes("heater") ||
    device.includes("Heater") ||
    device.includes("heating")
  ) {
    return "heating";
  } else if (device.includes("light") || device.includes("Light")) {
    return "light-bulb";
  } else if (device.includes("fridge") || device.includes("Fridge")) {
    return "fridge";
  } else if (device.includes("Solar") || device.includes("solar")) {
    return "solarpanel";
  } else if (
    device.includes("camera") ||
    device.includes("Camera") ||
    device.includes("Security") ||
    device.includes("security") ||
    device.includes("CCTV") ||
    device.includes("cctv")
  ) {
    return "security-camera";
  } else if (
    device.includes("Bell") ||
    device.includes("bell") ||
    device.includes("Door") ||
    device.includes("door")
  ) {
    return "doorbell";
  } else if (
    device.includes("socket") ||
    device.includes("plug") ||
    device.includes("Plug") ||
    device.includes("Socket")
  ) {
    return "plug";
  } else if (
    device.includes("TV") ||
    device.includes("Television") ||
    device.includes("tv") ||
    device.includes("television") ||
    device.includes("Tv")
  ) {
    return "tv";
  } else {
    return "question";
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