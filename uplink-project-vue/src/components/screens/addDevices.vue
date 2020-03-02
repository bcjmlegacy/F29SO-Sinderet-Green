<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div class="container">
      <div id="devices">
        <div class="sub-title-wrapper">
          <h3 class="display-3 text-center">Connect a Device</h3>
        </div>
        <div class="flex-rooms">
          <AddDeviceCard deviceName="Phillips Hue Bulb" deviceImage="light-bulb" deviceEnergy="10" />
          <AddDeviceCard deviceName="Ring Door Bell" deviceImage="doorbell" deviceEnergy="10" />
          <AddDeviceCard
            deviceName="Hive CCTV Camera"
            deviceImage="security-camera"
            deviceEnergy="60"
          />
          <AddDeviceCard deviceName="Smart Socket" deviceImage="plug" deviceEnergy="120" />
          <AddDeviceCard deviceName="Smart Socket" deviceImage="plug" deviceEnergy="120" />
          <AddDeviceCard deviceName="Smart Socket" deviceImage="plug" deviceEnergy="120" />
          <AddDeviceCard
            deviceName="Hive CCTV Camera"
            deviceImage="security-camera"
            deviceEnergy="60"
          />
          <AddDeviceCard deviceName="Phillips Hue Bulb" deviceImage="light-bulb" deviceEnergy="10" />
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :back="back" />
  </div>
</template>
<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";
import AddDeviceCard from "../helpers/addDeviceCard";

export default {
  name: "devices",
  props: ["back"],
  components: {
    NavbarTop,
    NavbarBottom,
    AddDeviceCard
  }
};
</script>
