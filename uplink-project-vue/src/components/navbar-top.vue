<template>
  <!--Top navbar template for website version-->
  <nav class="navbar-top fixed-top">
    <div class="container">
      <div class="flex-nav">
        <div class="image-cont-nav" @click="prev(back)">
          <img src="../assets/arrow.png" alt="Back" class="nav-image" />
        </div>
        <div class="image-cont-nav" @click="switchComp('AddItem')">
          <img src="../assets/plus.png" alt="Add" class="nav-image" />
        </div>
        <div class="image-cont-nav" @click="switchComp('Dash')">
          <img src="../assets/home-run.png" alt="Home" class="nav-image" />
        </div>
        <div class="image-cont-nav">
          <img src="../assets/exclamation.png" alt="warnings" class="nav-image" />
        </div>
        <div class="image-cont-nav" @click="switchComp('Settings')">
          <img src="../assets/user.png" alt="Profile" class="nav-image" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { bus } from "../main";
export default {
  name: "navbar-top",
  props: ["back"],
  methods: {
    switchComp(comp) {
      //Switch component
      bus.$emit("switchComp", comp);
    },
    prev(previous) {
      bus.$emit("prev", previous);
    }
  }
};
</script>