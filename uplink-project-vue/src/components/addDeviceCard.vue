<template>
  <!--Device Card-->
  <div class="item">
    <div
      class="card custom-cards-devices"
      @click="deviceToAdd({deviceName: deviceName, 'deviceImage':deviceImage, deviceEnergy: deviceEnergy}); switchComp('AddDeviceMetrics')"
    >
      <div class="img-cont">
        <!--Image name is taken from the prop called deviceImage-->
        <img
          class="card-img-top img"
          :src="require(`../assets/${deviceImage}.png`)"
          alt="Energy Usage"
        />
      </div>
      <!--Device Name and Energy taken from prop passed to component - deviceName, deviceEnergy-->
      <div class="card-body text-center">
        <h5 class="card-title text-center">{{deviceName}}</h5>
        <p class="card-text">{{deviceEnergy}} watt</p>
      </div>
    </div>
  </div>
</template>
<script>
//Bus to transfer data between component and main app.vue component
import { bus } from "../main";
export default {
  name: "roomCard",
  props: ["deviceName", "deviceImage", "deviceEnergy"], //props - data transfered to the component
  methods: {
    //Changes the component (not in use here yet)
    switchComp(comp) {
      bus.$emit("switchComp", comp);
    },
    deviceToAdd(device) {
      bus.$emit("deviceToAdd", device);
    }
  }
};
</script>
