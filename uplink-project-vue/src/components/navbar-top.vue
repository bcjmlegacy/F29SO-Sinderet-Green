<template>
  <!--Top navbar template for website version-->
  <nav class="navbar fixed-top">
    <div class="container">
      <div class="flex-nav">
        <div class="image-cont-nav" @click="switchComp('AddItem')">
          <img src="../assets/plus.png" alt="profile" class="nav-image" />
        </div>
        <div class="image-cont-nav">
          <img src="../assets/report.png" alt="profile" class="nav-image" />
        </div>
        <div class="image-cont-nav">
          <h4 class="logo-small-top">uplink</h4>
        </div>
        <div class="image-cont-nav">
          <img src="../assets/exclamation.png" alt="profile" class="nav-image" />
        </div>
        <div class="image-cont-nav">
          <img src="../assets/user.png" alt="profile" class="nav-image" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { bus } from "../main";
export default {
  name: "navbar-top",
  methods: {
    switchComp(comp) {
      //Switch component
      bus.$emit("switchComp", comp);
    }
  }
};
</script>
<style>
/**Top navbar style */
.flex-nav {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  flex-flow: row wrap !important;
  justify-content: space-between !important;
}

.logo-small-top {
  font-family: "Harlow-solid";
  font-size: 2.2em;
  padding-top: 2%;
  margin: 0;
}

.nav-item {
  padding: 10px;
}

.navbar {
  padding: 0 !important;
  background-color: white;
  box-shadow: 0 0px 25px rgba(0, 0, 0, 0.3) !important;
}

.nav-image {
  width: 20%;
}

.image-cont-nav {
  text-align: center;
  width: 15%;
  padding: 20px;
  opacity: 0.5;
}

.image-cont-nav:hover {
  background-color: #f5f5f5;
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 12px 10px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}
</style>