<template>
  <div id="EveryDevice">
    <NavTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
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
            :deviceType="device.deviceType"
            :roomID="device.roomID"
          />
        </div>
      </div>
    </div>
    <NavBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>

<script>

//Imports the navbars and the device card component.

import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";
import Device from "../helpers/deviceCard";


//Url to get all the devices stored in the database.
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
    //This will get the all the device details for all the devices stored in the database. 
    //This will be presented using the array 'devices' and the 'devicecard' on the this page.
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
            deviceImage: pairImg(jsonData[dev].device_type),
            deviceWattage: jsonData[dev].device_wattage,
            deviceType: jsonData[dev].device_type,
            roomID: jsonData[dev].device_room
          });
        }
      });
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
