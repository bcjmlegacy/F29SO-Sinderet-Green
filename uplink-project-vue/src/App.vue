<template>
  <div id="app">
    <component :is="currentComponent" :roomName="currentRoom"></component>
  </div>
</template>

<script>
import Login from "./components/loginTemplate";
import Register from "./components/registerTemplate";
import Dash from "./components/dashboardTemplate";
import Room from "./components/roomPageTemplate";
import { bus } from "./main";
export default {
  name: "app",
  components: {
    Login,
    Register,
    Dash,
    Room
  },
  data() {
    return {
      currentComponent: "Dash",
      currentRoom: ""
    };
  },
  methods: {},
  created() {
    bus.$on("switchComp", comp => {
      this.currentComponent = comp;
    });
    bus.$on("updateRoom", room => {
      this.currentRoom = room;
    });
  }
};
</script>

<style></style>
