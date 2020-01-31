<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
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
import NavbarTop from "../components/navbar-top";
import NavbarBottom from "../components/navbar-bottom";
import AddDeviceCard from "../components/addDeviceCard";
import { bus } from "../main";
export default {
  name: "devices",
  props: ["back"],
  components: {
    NavbarTop,
    NavbarBottom,
    AddDeviceCard
  },
  methods: {
    switchComp(comp) {
      bus.$emit("switchComp", comp);
    },
    deviceToAdd(device) {
      bus.$emit("deviceToAdd", device);
    }
  }
};
</script>
