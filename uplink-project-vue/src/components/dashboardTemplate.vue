<template>
  <div>
    <Summary />
    <div id="room-title">
      <h1 class="title">Rooms</h1>
    </div>
    <div id="rooms">
      <b-row>
        <Room />
        <Room />
        <Room />
        <Room />
      </b-row>
    </div>
  </div>
</template>

<script>
import Summary from "./summary";
import Room from "./roomTemplate";
//import AddRoom from "./addRoomTemplate";
let url = "http://localhost:5552/getRooms";
let rooms = [{}];
export default {
  name: "dashboard-components",
  components: { Summary, Room },

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
#room-title {
  margin-top: 20px;
  margin-right: 10%;
  margin-left: 10%;
}

#rooms {
  margin-left: 21%;
  margin-right: 2%;
  margin-bottom: 10%;
  padding: 10px;
}

@media screen and (max-width: 1025px) {
  #room-title {
    margin-right: 0;
    margin-left: 0;
  }
  #rooms {
    margin-left: 12%;
    margin-right: 0;
  }
}
</style>
