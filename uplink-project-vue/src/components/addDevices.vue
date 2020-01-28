<template>
  <div>
    <NavbarTop class="top-show" />
    <div class="container">
      <div id="devices">
        <div class="sub-title-wrapper">
          <h3 class="display-3 text-center">Connect a Device</h3>
        </div>
        <div class="flex-rooms">
          <DeviceCard
            defaultDeviceName="Phillips Hue Bulb"
            deviceImage="light-bulb"
            deviceEnergy="10"
          />
          <DeviceCard defaultDeviceName="Ring Door Bell" deviceImage="doorbell" deviceEnergy="10" />
          <DeviceCard
            defaultDeviceName="Hive CCTV Camera"
            deviceImage="security-camera"
            deviceEnergy="60"
          />
          <DeviceCard defaultDeviceName="Smart Socket" deviceImage="plug" deviceEnergy="120" />
          <DeviceCard defaultDeviceName="Smart Socket" deviceImage="plug" deviceEnergy="120" />
          <DeviceCard defaultDeviceName="Smart Socket" deviceImage="plug" deviceEnergy="120" />
          <DeviceCard
            defaultDeviceName="Hive CCTV Camera"
            deviceImage="security-camera"
            deviceEnergy="60"
          />
          <DeviceCard
            defaultDeviceName="Phillips Hue Bulb"
            deviceImage="light-bulb"
            deviceEnergy="10"
          />
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" />
  </div>
</template>
<script>
import NavbarTop from "../components/navbar-top";
import NavbarBottom from "../components/navbar-bottom";
import DeviceCard from "../components/deviceCard";
import { bus } from "../main";
export default {
  name: "devices",
  components: {
    NavbarTop,
    NavbarBottom,
    DeviceCard
  },
  methods: {
    switchComp(comp) {
      bus.$emit("switchComp", comp);
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
    margin-bottom: 100px;
  }
}
</style>