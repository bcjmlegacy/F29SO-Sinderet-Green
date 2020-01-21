<template>
  <div>
    <Summary />
    <div class="container justify-content-center">
      <div id="rooms">
        <h3 class="display-4">Rooms</h3>
        <div class="r-grid">
          <b-row>
            <Room />
            <Room />
            <Room />
            <Room />
            <AddRoom />
            <AllDevices />
          </b-row>
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

.r-grid {
  margin-top: 20px;
}

@media screen and (max-width: 1025px) {
}
</style>
