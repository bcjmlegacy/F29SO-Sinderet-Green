<template>
  <div>
    <NavbarTop :userToken="userToken" class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="addDevice">
      <div class="container">
        <div id="form-addDevice">
          <div class="flex-add">
            <div class="card custom-cards-addDevices">
              <div class="img-cont">
                <img
                  :src="require(`../../assets/${deviceImage}.png`)"
                  alt="device icon"
                  class="device-img"
                />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center">{{ deviceName }}</h5>
                <p class="card-text text-center">{{ deviceEnergy }} Watts</p>
              </div>
              <div class="device-cont">
                <b-form @submit="go">
                  <div class="col-sm-12">
                    <label for="input-device-name" class="label">Device Name</label>
                  </div>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      id="input-device-name"
                      required="required"
                      placeholder="Hue Lights"
                      class="form-inputboxes"
                      v-model="form.name"
                    />
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <label for="input-device-room" class="label">Device Room</label>
                    </div>
                    <div class="col-sm-12">
                      <select v-model="form.room" class="form-dropdown" required="required">
                        <option disabled value>Please Select A Room</option>
                        <option
                          v-for="r in rooms"
                          :key="r.room_id"
                          :value="r.room_id"
                        >{{ r.room_name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <button class="form-buttons" type="submit">Add Device</button>
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
//Imports for the Navigation bars

import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

//API url calls for getting rooms and inserting devices.

let url = "http://localhost:5552/insertDevice";
let url1 = "http://localhost:5552/getRooms";

export default {
  name: "addDevice",
  components: {
    NavbarTop,
    NavbarBottom
  },
  props: [
    "deviceID",
    "deviceName",
    "deviceImage",
    "deviceEnergy",
    "deviceType",
    "userToken"
  ],
  data() {
    return {
      form: { //data from the form
        name: "",
        room: "",
        wattage: this.deviceEnergy,
        type: this.deviceType
      },
      rooms: []
    };
  },
  methods: {
    //Submit method for the form. Once the device has been inserted then return to the dashboard page.
    go(evt) {
      console.log(this.form);
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.userToken
        },
        body: JSON.stringify({
          name: this.form.name,
          type: this.form.type,
          wattage: this.form.wattage,
          room: this.form.room
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          this.$router.push({ name: "dashboard" });
        });

      evt.preventDefault();
    }
  },
  mounted: function() {
    //Function that will get called on the page load.
    //This will call all the rooms from the database. This will get used for the dropdown to pick a room.
    fetch(url1, {
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
      });
  }
};
</script>
