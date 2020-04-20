<template>
  <div>
    <NavbarTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="editDevice">
      <div class="container">
        <div id="form-addDevice">
          <div class="flex-add">
            <div class="custom-cards-editDevices-adv">
              <div class="img-cont">
                <img
                  :src="require(`../../assets/${deviceImage}.png`)"
                  alt="device icon"
                  class="device-img"
                />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center label-section">{{ deviceName }}</h5>
                <p class="card-text text-center">{{ deviceEnergy }} Watts</p>
              </div>
              <div class="device-cont">
                <b-form @submit="updateDevice">
                  <p class="label-section text-center"></p>
                  <div class="col-sm-12">
                    <label for="input-device-name" class="label">Rename Device</label>
                  </div>
                  <div class="col-sm-12">
                    <input
                      id="input-device-name"
                      type="text"
                      class="form-inputboxes"
                      :placeholder="deviceName"
                      v-model="form.name"
                      size="md"
                    />
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <label for="input-device-room" class="label">Change Device Room</label>
                    </div>

                    <div class="col-sm-12">
                      <select id="input-device-room" v-model="form.room" class="form-dropdown">
                        <option disabled value>Please Select A Room</option>
                        <option
                          v-for="r in rooms"
                          :key="r.room_name"
                          :value="r.room_id"
                        >{{ r.room_name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="newRowSwitch">
                    <div class="form-rows">
                      <div class="col-sm-12">
                        <button class="form-buttons" type="submit">Save Changes</button>
                      </div>
                    </div>
                    <div class="form-rows">
                      <div class="col-sm-12">
                        <router-link
                          :to="{
                            name: 'device',
                            query: {
                              deviceID: deviceID,
                              deviceName: deviceName,
                              deviceImage: deviceImage,
                              deviceEnergy: deviceEnergy,
                              deviceType : deviceType
                            }
                          }"
                        >
                          <button class="form-buttons" type="submit">Cancel</button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="newRowSwitch-delete">
                    <div class="form-rows">
                      <div class="col-sm-12">
                        <button
                          class="form-buttons-delete"
                          type="button"
                          @click="deleteDevice"
                        >Delete Device</button>
                      </div>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>
<script>

//import the navigation bar. 
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

//URL for the API call to get all the rooms.
let url = "http://localhost:5552/getRooms";

export default {
  name: "addDevice",
  components: {
    NavbarTop,
    NavbarBottom
  },
  data() {
    return {
      currentRoom: "",
      wattage: this.deviceEnergy,
      form: {
        name: this.deviceName,
        room: ""
      },
      rooms: []
    };
  },
  props: [
    "deviceID",
    "deviceName",
    "deviceImage",
    "deviceEnergy",
    "deviceType",
    "userToken"
  ],
  methods: {
    //This method deletes a device. 
    deleteDevice() { 
      //This will ask the user if they want to delete a device before the device is deleted from the server
      //This will stop the user from accidentally deletes an item
      if (!confirm("Do really want to delete " + this.deviceName + "?")) {
        return false;
      }
      let url = "http://localhost:5552/deleteDevice?id=" + this.deviceID;
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          this.$router.push({ name: "dashboard" });
        });
    },

    getURL(roomID) {
      for (let i in this.rooms) {
        if (roomID === this.rooms[i].room_id) {
          return this.rooms[i].room_name;
        }
      }
      return null;
    },
    //This function will update the devices name and room
    //Once the device has been updated the user will be redirected to the room page they chose to place the device.
    updateDevice(evt) {
      let url = "http://localhost:5552/editDevice";
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: this.userToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.deviceID,
          name: this.form.name,
          room: this.form.room,
          wattage: this.wattage,
          type: this.deviceType
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          this.$router.push({
            name: "room",
            params: { name: this.getURL(this.form.room) }
          });
        });

      evt.preventDefault();
    }
  },
  mounted: function() {
    //Method will be called when the page loads.
    //This will fetch the the current devices details and will match it with the room the device is currently in.
    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: this.userToken
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.rooms = jsonData;
        console.log(this.rooms);
        let url = "http://localhost:5552/getDevices";
        fetch(url, {
          mode: "cors",
          method: "GET",
          headers: { Authorization: this.userToken }
        })
          .then(response => {
            return response.json();
          })
          .then(jsonData => {
            for (let key in jsonData) {
              if (jsonData[key].device_id === this.deviceID) {
                for (let room in this.rooms) {
                  if (jsonData[key].device_room === this.rooms[room].room_id) {
                    this.form.room = this.rooms[room].room_id;
                    this.currentRoom = this.rooms[room].room_name;
                  }
                }
              }
            }
          });
      });
  }
};
</script>

<style></style>
