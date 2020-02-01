<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
    <div id="addDevice">
      <div class="container">
        <h3 class="display-3 text-center">Add Device</h3>
        <div id="form-addDevice">
          <div class="flex-add">
            <div class="card custom-cards-addDevices">
              <div class="img-cont">
                <img
                  :src="require(`../assets/${deviceToAdd.deviceImage}.png`)"
                  alt="device icon"
                  class="device-img"
                />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center">{{ deviceToAdd.deviceName }}</h5>
                <p class="card-text text-center">{{ deviceToAdd.deviceEnergy }} Watts</p>
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
    <NavbarBottom class="bottom-show" :back="back" />
  </div>
</template>
<script>
import NavbarTop from "./navbar-top";
import NavbarBottom from "./navbar-bottom";
import { bus } from "../main";
let url = "http://localhost:5552/insertDevice";
let url1 = "http://localhost:5552/getRooms";

export default {
  name: "addDevice",
  components: {
    NavbarTop,
    NavbarBottom
  },
  props: ["deviceToAdd", "userToken", "back"],
  data() {
    return {
      form: {
        name: "",
        room: "",
        wattage: this.deviceToAdd.deviceEnergy,
        type: "1"
      },
      rooms: []
    };
  },
  methods: {
    switchComp(comp) {
      bus.$emit("switchComp", comp);
    },

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
          this.switchComp("Dash");
        });

      evt.preventDefault();
    }
  },
  mounted: function() {
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
