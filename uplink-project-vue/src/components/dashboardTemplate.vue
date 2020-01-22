<template>
  <div>
    <NavTop class="top-show" />
    <Summary />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="display-4 text-center">Rooms</h3>
        </div>
        <div class="flex-rooms">
          <Room />
          <Room />

          <AddRoom />
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
import AddRoom from "./addRoomTemplate";
import AllDevices from "./allDevices";
import NavTop from "./navbar-top";
import NavBottom from "./navbar-bottom";
let url = "http://localhost:5552/getRooms";
let rooms = [{}];
export default {
  name: "dashboard-components",
  components: { Summary, Room, AddRoom, AllDevices, NavTop, NavBottom },

  mounted: function() {
    fetch(url, { mode: "cors", method: "GET" })
      .then(function(response) {
        return response.json();
      })
      .then(function(roomData) {
        consume(roomData);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
function consume(roomData) {
  for (let key in roomData) {
    rooms[key] = roomData[key];
  }
  console.log(rooms);
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
