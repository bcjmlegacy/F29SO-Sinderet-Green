<template>
  <!--Dashboard - main screen/page -->
  <div>
    <!--Navbar top *web view*-->
    <NavTop class="top-show" />
    <!--Summary Component with the props shown as attributes below-->
    <Summary sumTitle="Home" energy="200" temperature="18" solar="1000" />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="display-4 text-center">Rooms</h3>
        </div>
        <div class="flex-rooms">
          <!--Vue.js for loop to loop through all rooms gathered from database with their respective icons-->
          <div v-for="result in results" :key="result.room_id">
            <!--Props filled for Room Card Component *This tag is looped until there are no more rooms in the database* -->
            <Room :roomName="result.room_name" :roomImage="result.roomImage" />
          </div>
        </div>
        <!--Additional Components-->
        <div class="additional">
          <div class="flex-rooms">
            <AllDevices />
          </div>
        </div>
      </div>
    </div>
    <!--Navbar bottom *mobile and tablet view*-->
    <NavBottom class="bottom-show" />
  </div>
</template>

<script>
//All the components needed for the dashboard
import Summary from "./summary";
import Room from "./roomTemplate";

import AllDevices from "./allDevices";
import NavTop from "./navbar-top";
import NavBottom from "./navbar-bottom";

//url for the API to get all the rooms assigned to base user. (no authorization as of yet)
let url = "http://localhost:5552/getRooms";
//Vue.js main class for data and template scripts.
export default {
  name: "dashboard-components",
  components: { Summary, AllDevices, NavTop, NavBottom, Room }, //Initialise Components
  data() {
    return {
      results: [] //Array to store results gathered from database but also the icon for the room
    };
  },

  mounted: function() {
    fetch(url, { mode: "cors", method: "GET" }) //Fetch Command to get data from API - CORS enabled.
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
  switch (rooms) {
    case "Livingroom":
      return "couchcolor";
    case "Kitchen":
      return "kitchencolor";
    case "Bedroom":
      return "bedcolor";
    case "Outside":
      return "outsidecolor";
    case "Bathroom":
      return "bathtub";
    default:
      return "question";
  }
}
</script>

<style>
/**Dash Styling*/
#rooms {
  margin-top: 50px;
  margin-bottom: 50px;
}

.flex-rooms {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
}

.item {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 10px;
}

.bottom-show {
  display: none !important;
}

.additional {
  margin-top: 30px;
}

@media screen and (max-width: 1025px) {
  .item {
    margin: 0;
  }
  .top-show {
    display: none !important;
  }
  .bottom-show {
    display: block !important;
  }
}
</style>
