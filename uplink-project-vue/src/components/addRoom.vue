<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
    <div id="addRooms">
      <div class="container">
        <h3 class="display-3 text-center">Add Room</h3>
        <div id="form">
          <div class="flex-add">
            <div class="card custom-cards-addRooms">
              <div class="img-cont">
                <img src="../assets/room.png" alt="device icon" class="room-img" />
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
import NavbarTop from "./navbar-top";
import NavbarBottom from "./navbar-bottom";
import { bus } from "../main";

let url = "http://localhost:5552/insertRoom";
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
    switchComp(comp) {
      //Switch component
      bus.$emit("switchComp", comp);
    },
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
          this.switchComp("Dash");
        });
      evt.preventDefault();
    }
  }
};
</script>

