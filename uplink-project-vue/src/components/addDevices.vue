<template>
  <div>
    <NavbarTop class="top-show" />
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
    <NavbarBottom class="bottom-show" />
  </div>
</template>
<script>
import NavbarTop from "../components/navbar-top";
import NavbarBottom from "../components/navbar-bottom";
import AddDeviceCard from "../components/addDeviceCard";
import { bus } from "../main";
export default {
  name: "devices",
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
<style>
#devices {
  margin-top: 100px;
}

@media screen and (max-width: 1025px) {
  #devices {
    margin-top: 80px;
    margin-bottom: 100px;
  }
}
</style>