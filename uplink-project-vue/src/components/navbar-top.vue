<template>
  <!--Top navbar template for website version-->
  <nav class="navbar-top fixed-top">
    <div class="container">
      <div class="flex-nav">
        <router-link :to="{name:'dashboard'}" class="image-cont-nav">
          <div>
            <img src="../assets/home-run.png" alt="Home" class="nav-image" />
          </div>
        </router-link>
        <router-link :to="{name:'add'}" class="image-cont-nav">
          <div>
            <img src="../assets/plus.png" alt="Add" class="nav-image" />
          </div>
        </router-link>
        <h5 class="logo-top">
          <router-link class="links" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
        <router-link :to="{name: 'warnings'}" class="image-cont-nav">
          <div>
            <img src="../assets/exclamation.png" alt="warnings" class="nav-image" />
          </div>
        </router-link>
        <router-link :to="{name: 'settings'}" class="image-cont-nav">
          <div>
            <img src="../assets/user.png" alt="Profile" class="nav-image" />
          </div>
        </router-link>
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
    prev(previous) {
      bus.$emit("prev", previous);
    }
  }
};
</script>