<template>
  <div id="app">
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import Login from "./components/loginTemplate";
import Register from "./components/registerTemplate";
import Dash from "./components/dashboardTemplate";
import { bus } from "./main";
export default {
  name: "app",
  components: {
    Login,
    Register,
    Dash
  },
  data() {
    return {
      currentComponent: "Login"
    };
  },
  created() {
    bus.$on("switchComp", comp => {
      this.currentComponent = comp;
    });
  }
};
</script>

<style></style>
