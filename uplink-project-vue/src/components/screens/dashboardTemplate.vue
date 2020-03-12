<template>
  <!--Dashboard - main screen/page -->
  <div id="dash">
    <!--Navbar top *web view*-->
    <NavTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <!--Summary Component with the props shown as attributes below-->
    <Summary
      :userToken="this.userToken"
      sumTitle="Home"
      energy="200"
      temperature="18"
      solar="1000"
    />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="h1-titles text-center">Rooms</h3>
          <hr />
        </div>

        <div class="flex-rooms">
          <!--Vue.js for loop to loop through all rooms gathered from database with their respective icons-->
          <div v-for="result in results" :key="result.room_id">
            <!--Props filled for Room Card Component *This tag is looped until there are no more rooms in the database* -->
            <Room :roomName="result.room_name" :roomImage="result.roomImage" />
          </div>
        </div>
        <hr />
        <!--Additional Components-->
        <div class="text-center">
          <router-link
            class="advanced-links text-center links"
            :to="{ name: 'allDevicesPage' }"
          >See All Devices</router-link>
        </div>
      </div>
    </div>
    <!--Navbar bottom *mobile and tablet view*-->
    <NavBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>

<script>
//All the components needed for the dashboard
import Summary from "../helpers/summary";
import Room from "../helpers/roomTemplate";

import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";

//url for the API to get all the rooms assigned to base user. (no authorization as of yet)
let url = "http://localhost:5552/getRooms";
//Vue.js main class for data and template scripts.
export default {
  name: "dashboard-components",
  components: { Summary, NavTop, NavBottom, Room }, //Initialise Components
  data() {
    return {
      results: [] //Array to store results gathered from database but also the icon for the room
    };
  },
  props: ["userToken"],

  mounted: function() {
    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: { Authorization: this.userToken }
    }) //Fetch Command to get data from API - CORS enabled.
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        //Loop through all the data gathered from the database and pair an image to the room name.
        let img = "";
        for (let key in jsonData) {
          img = pairImg(jsonData[key].room_name);
          jsonData[key].roomImage = img;
        }
        this.results = jsonData; //Store the data
      })
      .catch(err => {
        console.log(err);
      });
  }
};

function pairImg(rooms) {
  //Pair icon with room name
  if (
    rooms.includes("Livingroom") ||
    rooms.includes("livingroom") ||
    rooms.includes("lounge") ||
    rooms.includes("Lounge")
  ) {
    return "sofa";
  } else if (
    rooms.includes("Bathroom") ||
    rooms.includes("bathroom") ||
    rooms.includes("toilet") ||
    rooms.includes("Toilet") ||
    rooms.includes("restroom") ||
    rooms.includes("Restroom") ||
    rooms.includes("Wash") ||
    rooms.includes("wash") ||
    rooms.includes("shower") ||
    rooms.includes("Shower")
  ) {
    return "bathtub";
  } else if (
    rooms.includes("Outside") ||
    rooms.includes("outside") ||
    rooms.includes("outdoors") ||
    rooms.includes("Outdoors") ||
    rooms.includes("Garden") ||
    rooms.includes("garden") ||
    rooms.includes("Roof") ||
    rooms.includes("roof")
  ) {
    return "fruit";
  } else if (
    rooms.includes("Kitchen") ||
    rooms.includes("kitchen") ||
    rooms.includes("pantry") ||
    rooms.includes("Pantry")
  ) {
    return "refrigerator";
  } else if (
    rooms.includes("Bedroom") ||
    rooms.includes("bedroom") ||
    rooms.includes("bed")
  ) {
    return "double-bed";
  } else {
    return "room";
  }
}
</script>
