<template>
  <div class="item">
    <div class="card custom-cards-devices" @click="switchComp('Room')">
      <div class="img-cont">
        <img
          class="card-img-top img"
          :src="require(`../assets/${deviceImage}.png`)"
          alt="Energy Usage"
        />
      </div>
      <div class="card-body text-center">
        <h5 class="card-title text-center">{{deviceName}}</h5>
        <p class="card-text">{{deviceEnergy}}KWh</p>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: "roomCard",
  props: ["deviceName", "deviceImage", "deviceEnergy"],
  methods: {
    switchComp(comp) {
      bus.$emit("switchComp", comp);
    }
  }
};
</script>
<style>
.img-cont {
  text-align: center;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

.card {
  margin-bottom: 30px !important;
  user-select: none !important;
}

.custom-cards-devices {
  width: 11rem;
  height: 14rem;
  padding: 1px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-devices:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}
</style>