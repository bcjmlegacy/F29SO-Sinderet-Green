<template>
  <div>
    <NavbarTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="automate">
      <div class="flex-deviceDetails">
        <div class="custom-cards-editDevices">
          <div class="img-cont">
            <img
              class="device-img"
              :src="require(`../../assets/${deviceImage}.png`)"
              alt="device icon"
            />
          </div>
          <div class="text-wrapper">
            <h5 class="card-title text-center label-section">{{deviceName}}</h5>
            <p class="card-text text-center">{{deviceEnergy}} Watts</p>
          </div>
          <div class="device-cont">
            <b-form>
              <p class="label-section text-center">Add Automated Events</p>
            </b-form>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" />
  </div>
</template>

<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

export default {
  name: "automate",
  props: [
    "deviceID",
    "deviceName",
    "deviceImage",
    "deviceEnergy",
    "deviceType",
    "userToken"
  ],
  components: {
    NavbarTop,
    NavbarBottom
  }
};
</script>

<style>
#automate {
  margin-top: 120px;
  margin-bottom: 80px;
}
</style>