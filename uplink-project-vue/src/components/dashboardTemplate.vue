<template>
  <div id="dash">
    <b-container>
      <div class="title-container">
        <h1 class="title">Welcome Back ...</h1>
      </div>
      <div class="summary-cont">
        <Summary />
      </div>

      <div id="rooms">
        <h1 class="sub-title">Rooms</h1>

        <!--Dummy Rooms-->
        <b-row id="current-rooms" class="justify-content-center">
          <Room />
          <Room />
          <Room />
          <AddRoom />
        </b-row>
      </div>
      <div class="dash-link">
        <b-link href="#" class="links">View All Devices</b-link>
      </div>
    </b-container>
  </div>
</template>

<script>
import Summary from "./summary";
import Room from "./roomTemplate";
import AddRoom from "./addRoomTemplate";
let url = "http://localhost:5552/getRooms";
let rooms = [{}];
export default {
  name: "dashboard-components",
  components: { Room, Summary, AddRoom },

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
#dash {
  padding-top: 90px;
}

.summary-cont {
  margin-top: 40px;
}

#rooms {
  margin-top: 90px;
  margin-bottom: 20px;
}

.title {
  font-size: 3em;
  text-align: center;
}

.sub-title {
  text-align: center;
  font-size: 2.2em;
  padding-bottom: 10px;
}
.title-container {
  margin-top: 10px;
  margin-bottom: 20px;
}

.dash-link {
  text-align: center;
}

@media screen and (max-width: 812px) {
  #dash {
    padding-top: 50px;
  }
}
</style>
