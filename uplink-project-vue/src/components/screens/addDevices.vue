<template>
  <div>
    <NavbarTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div class="container">
      <div id="devices">
        <div class="sub-title-wrapper">
          <h3 class="h1-titles text-center">Connect a Device</h3>
        </div>
        <div class="flex-rooms">
          <AddDeviceCard
            deviceName="Philips Hue Bulb"
            deviceImage="light-bulb"
            deviceEnergy="10"
            deviceType="4"
          />
          <AddDeviceCard
            deviceName="Ring Door Bell"
            deviceImage="doorbell"
            deviceEnergy="10"
            deviceType="5"
          />
          <AddDeviceCard
            deviceName="Hive CCTV Camera"
            deviceImage="security-camera"
            deviceEnergy="60"
            deviceType="7"
          />
          <AddDeviceCard
            deviceName="Smart Socket"
            deviceImage="plug"
            deviceEnergy="120"
            deviceType="9"
          />
          <AddDeviceCard
            deviceName="Smart Socket"
            deviceImage="plug"
            deviceEnergy="120"
            deviceType="9"
          />
          <AddDeviceCard
            deviceName="Smart Socket"
            deviceImage="plug"
            deviceEnergy="120"
            deviceType="9"
          />
          <AddDeviceCard
            deviceName="Hive CCTV Camera"
            deviceImage="security-camera"
            deviceEnergy="60"
            deviceType="7"
          />
          <AddDeviceCard
            deviceName="Philips Hue Bulb"
            deviceImage="light-bulb"
            deviceEnergy="10"
            deviceType="4"
          />
          <AddDeviceCard
            deviceName="Phillips Smart TV"
            deviceImage="tv"
            deviceEnergy="100"
            deviceType="8"
          />
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>
<script>

//Imports for the Navbars and the card component for the Devices that are visibile to the U-Hub
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";
import AddDeviceCard from "../helpers/addDeviceCard";

export default {
  name: "devices",
  props: ["userToken"],
  components: {
    NavbarTop,
    NavbarBottom,
    AddDeviceCard
  }
};
</script>
