<template>
  <div id="EveryDevice">
    <NavTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div class="container">
      <div class="sub-title-wrapper">
        <h5 class="h1-titles text-center">Devices</h5>
      </div>
      <div class="flex-rooms">
        <div v-for="device in devices" :key="device.deviceID">
          <Device
            :deviceID="device.deviceID"
            :deviceName="device.deviceName"
            :deviceImage="device.deviceImage"
            :deviceEnergy="device.deviceWattage"
          />
        </div>
      </div>
    </div>
    <NavBottom class="bottom-show" />
  </div>
</template>

<script>
import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";
import Device from "../helpers/deviceCard";

let url = "http://localhost:5552/getDevices";
export default {
  name: "AllDevices",
  components: {
    NavTop,
    NavBottom,
    Device
  },
  props: ["userToken"],
  data() {
    return {
      devices: []
    };
  },
  mounted: function() {
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
        for (let dev in jsonData) {
          this.devices.push({
            deviceID: jsonData[dev].device_id,
            deviceName: jsonData[dev].device_name,
            deviceImage: pairImg(jsonData[dev].device_name),
            deviceWattage: jsonData[dev].device_wattage
          });
        }
      });
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
  } else {
    return "question";
  }
}
</script>

<style>
#EveryDevice {
  margin-top: 120px;
  margin-bottom: 80px;
}

@media screen and (max-width: 1025px) {
  #EveryDevice {
    margin-top: 110px;
    margin-bottom: 100px;
  }
}
</style>