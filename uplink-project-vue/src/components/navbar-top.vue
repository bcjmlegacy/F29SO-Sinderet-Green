<template>
  <!--Top navbar template for website version-->
  <nav class="navbar-top fixed-top">
    <div class="container">
      <div class="flex-nav">
        <router-link to="#" class="image-cont-nav">
          <div>
            <img src="../assets/arrow.png" alt="Back" class="nav-image" />
          </div>
        </router-link>

        <router-link :to="{name:'add'}" class="image-cont-nav">
          <div>
            <img src="../assets/plus.png" alt="Add" class="nav-image" />
          </div>
        </router-link>

        <router-link :to="{name:'dashboard'}" class="image-cont-nav">
          <div>
            <img src="../assets/home-run.png" alt="Home" class="nav-image" />
          </div>
        </router-link>

        <router-link to="#" class="image-cont-nav">
          <div>
            <img src="../assets/exclamation.png" alt="warnings" class="nav-image" />
          </div>
        </router-link>
        <router-link to="#" class="image-cont-nav">
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