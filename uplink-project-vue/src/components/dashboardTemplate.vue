<template>
  <div>
    <Summary />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="display-4 text-center">Rooms</h3>
        </div>
        <div class="flex-rooms">
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />

          <AddRoom />
          <AllDevices />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Summary from "./summary";
import Room from "./roomTemplate";
import AddRoom from "./addRoomTemplate";
import AllDevices from "./allDevices";
let url = "http://localhost:5552/getRooms";
let rooms = [{}];
export default {
  name: "dashboard-components",
  components: { Summary, Room, AddRoom, AllDevices },

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

@media screen and (max-width: 1025px) {
  .item {
    margin: 0;
  }
}
</style>
