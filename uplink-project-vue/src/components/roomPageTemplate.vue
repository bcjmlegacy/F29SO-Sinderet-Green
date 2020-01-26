<template>
  <!--Room Page - similar to the Dash-->
  <div>
    <!--Top Navbar (Website)-->
    <NavTop class="top-show" />
    <!--Take the roomName from props and store as title for the room page - demo data is also entered-->
    <Summary :sumTitle="roomName" energy="100" solar="1000" temperature="21" />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="display-4 text-center">Devices</h3>
        </div>
        <div class="flex-rooms">
          <!--Loop through all the devices by device name and generate cards for each of them-->
          <div v-for="device in roomDevices" :key="device.deviceName">
            <!--Data that the Device component uses to show the card.-->
            <Device
              :deviceName="device.deviceName"
              :deviceImage="device.deviceImage"
              deviceEnergy="20"
            />
          </div>
        </div>
        <!--Additional Components.-->
        <div class="flex-rooms">
          <Add />
          <AllDevices />
        </div>
      </div>
    </div>
    <!--Bottom Navbar (Mobile and Tablet)-->
    <NavBottom class="bottom-show" />
  </div>
</template>
<script>
//All the components that are needed for the roomPage
import Summary from "./summary";
import Device from "./deviceCard";
import Add from "./addCard";
import AllDevices from "./allDevices";
import NavTop from "./navbar-top";
import NavBottom from "./navbar-bottom";

//URL for getting all the devices
let url = "http://localhost:5552/getDevices";
//URL for getting all rooms
let url1 = "http://localhost:5552/getRooms";
export default {
  name: "Room",
  components: {
    //Initialise the components
    Summary,
    Device,
    Add,
    AllDevices,
    NavTop,
    NavBottom
  },
  props: ["roomName"], //props to confirm the room the page is showing
  data() {
    return {
      devices: [], //all devices stored in the database
      rooms: [], //all rooms stored in the database
      roomDevices: [] //finished array containing the device for the room and the device icon
    };
  },

  mounted: function() {
    fetch(url, { mode: "cors", method: "GET" }) //first fetch gets all the devices and stores in devices array
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.devices = jsonData;
        fetch(url1, { mode: "cors", method: "GET" }) //second fetch gets all the rooms and stored in rooms array
          .then(response => {
            return response.json();
          })
          .then(jsonData => {
            this.rooms = jsonData;
            console.log(this.rooms);
            let roomID = 0; //parses data to only get devices for the room the page is showning
            for (let key in this.rooms) {
              if (this.roomName === this.rooms[key].room_name) {
                roomID = this.rooms[key].room_id;
                console.log(roomID);
              }
            }
            for (let key in this.devices) {
              if (roomID === this.devices[key].device_room) {
                //Loop to get the icon that matches the second half of the device name
                let deviceN = this.devices[key].device_name.split(" ");
                this.roomDevices.push({
                  //generate a JSON of the device name and icon and store in roomDevices array
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

//picks image name for a select device.
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
/**Styling for the room page*/
.flex-rooms {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: space-evenly !important;
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
  .flex-rooms {
    justify-content: space-between !important;
  }
}
</style>