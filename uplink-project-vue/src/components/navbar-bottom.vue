<template>
  <!--bottom navbar template for mobile devices-->
  <nav class="navbar-bottom fixed-bottom">
    <div class="container">
      <div class="flex-nav">
        <div class="image-cont-nav" @click="prev(back)">
          <img src="../assets/arrow.png" alt="Back" class="nav-image-bottom" />
        </div>
        <div class="image-cont-nav" @click="switchComp('AddItem')">
          <img src="../assets/plus.png" alt="Plus" class="nav-image-bottom" />
        </div>
        <div class="image-cont-nav">
          <img
            src="../assets/home-run.png"
            alt="Home"
            class="nav-image-bottom"
            @click="switchComp('Dash')"
          />
        </div>
        <div class="image-cont-nav">
          <img src="../assets/exclamation.png" alt="Warnings" class="nav-image-bottom" />
        </div>
        <div class="image-cont-nav">
          <img src="../assets/user.png" alt="Profile" class="nav-image-bottom" />
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
