<template>
  <div>
    <NavTop class="top-show" />
    <Summary sumTitle="Home" energy="200" temperature="18" solar="1000" />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="display-4 text-center">Rooms</h3>
        </div>
        <div class="flex-rooms">
          <div v-for="result in results" :key="result.room_id">
            <Room :roomName="result.room_name" :roomImage="result.roomImage" />
          </div>
        </div>
        <div class="flex-rooms">
          <Add />
          <AllDevices />
        </div>
      </div>
    </div>
    <NavBottom class="bottom-show" />
  </div>
</template>

<script>
import Summary from "./summary";
import Room from "./roomTemplate";
import Add from "./addCard";
import AllDevices from "./allDevices";
import NavTop from "./navbar-top";
import NavBottom from "./navbar-bottom";
let url = "http://localhost:5552/getRooms";
//let rooms = [];
export default {
  name: "dashboard-components",
  components: { Summary, Add, AllDevices, NavTop, NavBottom, Room },
  data() {
    return {
      results: []
    };
  },

  mounted: function() {
    fetch(url, { mode: "cors", method: "GET" })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        let img = "";
        for (let key in jsonData) {
          img = pairImg(jsonData[key].room_name);
          jsonData[key].roomImage = img;
        }
        this.results = jsonData;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

function pairImg(rooms) {
  switch (rooms) {
    case "Livingroom":
      return "couchcolor";
    case "Kitchen":
      return "kitchencolor";
    case "Bedroom":
      return "bedcolor";

    case "Outside":
      return "outsidecolor";

    default:
      return null;
  }
}
</script>

<style>
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
