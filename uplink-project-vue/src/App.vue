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
    <component
      :is="currentComponent"
      :roomName="currentRoom"
      :userToken="userToken"
      :deviceToAdd="deviceToAdd"
      :back="previousPage"
    ></component>
  </div>
</template>
<script>
//All the MAIN PAGES that are needed for the app
//Small components like room/device cards and navbars are generated on their respective pages.
import Dash from "./components/dashboardTemplate";
import Room from "./components/roomPageTemplate";
import AddItem from "./components/addPage";
import AddRoom from "./components/addRoom";
import AddDevices from "./components/addDevices";
import Login from "./components/loginTemplate";
import Register from "./components/registerTemplate";
import AddDeviceMetrics from "./components/addDeviceMetrics";
import EditDevice from "./components/editDevicePage";
import deviceDetails from "./components/deviceDetails";
import Settings from "./components/settingsTemplate";
import { bus } from "./main";

export default {
  name: "app",
  components: {
    //Initialise pages.
    Login,
    Register,
    Dash,
    Room,
    AddItem,
    AddRoom,
    AddDevices,
    AddDeviceMetrics,
    EditDevice,
    deviceDetails,
    Settings
  },
  data() {
    return {
      currentComponent: "Login", //set the current page to be the Dash. Dash will appear when project is loaded on browser.
      currentRoom: "",
      userToken: "", //user token for session
      deviceToAdd: "",
      previousPage: ""
    };
  },
  methods: {},
  created() {
    //Controller function to control the component and/or page that is seen on the browser.
    bus.$on("switchComp", comp => {
      this.previousPage = this.currentComponent;
      this.currentComponent = comp;
    }); //Controller function to control the room data that is displayed on the room page.
    bus.$on("updateRoom", room => {
      this.currentRoom = room;
    });
    bus.$on("saveToken", token => {
      this.userToken = token;
    });
    bus.$on("deviceToAdd", device => {
      this.deviceToAdd = device;
    });
    bus.$on("prev", prev => {
      this.currentComponent = prev;
    });
  },
  mounted: function() {
    //mounted function thats called on component load. Checks for cookie. If cookie exists then set the token to the cookie value
    if (this.$cookies.isKey("token")) {
      this.userToken = this.$cookies.get("token");
      this.currentComponent = "Dash";
    } else {
      this.currentComponent = "Login";
    }
  }
};
</script>
