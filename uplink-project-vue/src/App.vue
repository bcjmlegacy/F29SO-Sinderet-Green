<!--
Main controller for the website
Euan Gordon
-->
<template>
  <!--Displays the current component on screen
    if the component is the room page then the room that was selected will be stored. 
    As roomName prop will match the roomName prop in the room page component (unique prop)
  -->
  <div id="app">
    <router-view :userToken="this.$cookies.get('token')" />
  </div>
</template>
<script>
//All the MAIN PAGES that are needed for the app
//Small components like room/device cards and navbars are generated on their respective pages.

import { bus } from "./main";

export default {
  name: "app",
  components: {
    //Initialise pages.
  },
  data() {
    return {
      userToken: "" //user token for session
    };
  },
  methods: {},
  created() {
    //Controller function to control the room data that is displayed on the room page.
    bus.$on("saveToken", token => {
      this.userToken = token;
    });
  },
  mounted: function() {
    //mounted function thats called on component load. Checks for cookie. If cookie exists then set the token to the cookie value
  }
};
</script>
