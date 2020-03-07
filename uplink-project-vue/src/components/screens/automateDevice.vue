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
</style>