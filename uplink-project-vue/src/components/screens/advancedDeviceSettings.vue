<template>
  <div>
    <NavbarTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="editDevice">
      <div class="container">
        <div id="form-addDevice">
          <div class="flex-add">
            <div class="card custom-cards-editDevices-adv">
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
                          :to="{name: 'device',query:{deviceID:deviceID, deviceName:deviceName, 'deviceImage': deviceImage, deviceEnergy:deviceEnergy} }"
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
    <NavbarBottom class="bottom-show" />
  </div>
</template>
<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

let url = "http://localhost:5552/getRooms";
export default {
  name: "addDevice",
  components: {
    NavbarTop,
    NavbarBottom
  },
  data() {
    return {
      currentRoom: "none",
      type: "",
      wattage: this.deviceEnergy,
      form: {
        name: this.deviceName,
        room: ""
      },
      rooms: []
    };
  },
  props: ["deviceID", "deviceName", "deviceImage", "deviceEnergy", "userToken"],
  methods: {
    deleteDevice() {
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
          type: this.type
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
        });

      evt.preventDefault();
    }
  },
  mounted: function() {
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
                    this.form.room = this.rooms[room].room_name;
                    this.type = jsonData[key].device_type;
                    console.log(this.form.room);
                  }
                }
              }
            }
          });
      });
  }
};
</script>

<style>
</style>