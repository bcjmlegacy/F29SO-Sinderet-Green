<template>
  <div>
    <NavTop class="top-show" />
    <Summary :sumTitle="roomName" energy="100" solar="1000" temperature="21" />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="display-4 text-center">Devices</h3>
        </div>
        <div class="flex-rooms">
          <div v-for="device in roomDevices" :key="device.deviceName">
            <Device
              :deviceName="device.deviceName"
              :deviceImage="device.deviceImage"
              deviceEnergy="20"
            />
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
import Device from "./deviceCard";
import Add from "./addCard";
import AllDevices from "./allDevices";
import NavTop from "./navbar-top";
import NavBottom from "./navbar-bottom";
let url = "http://localhost:5552/getDevices";
let url1 = "http://localhost:5552/getRooms";
export default {
  name: "Room",
  components: {
    Summary,
    Device,
    Add,
    AllDevices,
    NavTop,
    NavBottom
  },
  props: ["roomName"],
  data() {
    return {
      devices: [],
      rooms: [],
      roomDevices: []
    };
  },

  mounted: function() {
    fetch(url, { mode: "cors", method: "GET" })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.devices = jsonData;
        fetch(url1, { mode: "cors", method: "GET" })
          .then(response => {
            return response.json();
          })
          .then(jsonData => {
            this.rooms = jsonData;
            console.log(this.rooms);
            let roomID = 0;
            for (let key in this.rooms) {
              if (this.roomName === this.rooms[key].room_name) {
                roomID = this.rooms[key].room_id;
                console.log(roomID);
              }
            }
            for (let key in this.devices) {
              if (roomID === this.devices[key].device_room) {
                let deviceN = this.devices[key].device_name.split(" ");
                this.roomDevices.push({
                  deviceName: this.devices[key].device_name,
                  deviceImage: pairImg(deviceN[1].toLowerCase())
                });
              }
            }
            console.log(this.roomDevices);
          });
      });
  }
};

function pairImg(device) {
  switch (device) {
    case "heater":
      return "fire";
    case "light":
      return "light-bulb";
    case "fridge":
      return "fridgecolor";
    case "controller":
      return "solarpanelcolor";
    default:
      return "question";
  }
}
</script>
<style>
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