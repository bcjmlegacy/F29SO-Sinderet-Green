<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="addRooms">
      <div class="container">
        <h3 class="display-3 text-center">Add Room</h3>
        <div id="form">
          <div class="flex-add">
            <div class="card custom-cards-addRooms">
              <div class="img-cont">
                <img src="../../assets/room.png" alt="device icon" class="room-img" />
              </div>
              <div class="cont">
                <b-form @submit="go">
                  <div class="col-sm-12">
                    <label for="input-room-name" class="label">Room Name</label>
                  </div>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      id="input-room-name"
                      required="required"
                      placeholder="Livingroom"
                      class="form-inputboxes"
                      v-model="form.roomName"
                    />
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <button class="form-buttons" type="submit">Add Room</button>
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
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

let url = "http://192.168.0.11:5552/insertRoom";
export default {
  name: "addRoom",
  components: { NavbarTop, NavbarBottom },
  data() {
    return {
      form: {
        roomName: ""
      }
    };
  },
  props: ["userToken", "back"],
  methods: {
    go(evt) {
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.userToken
        },
        body: JSON.stringify({
          name: this.form.roomName
        })
      })
        .then(response => {
          return response.json();
        })
        .then(responseText => {
          console.log(responseText);
          this.$router.push({ name: "dashboard" });
        });
      evt.preventDefault();
    }
  }
};
</script>

