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
    <div id="addRooms">
      <div class="container">
        <h3 class="h1-titles text-center">Add Room</h3>
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
    <NavbarBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>
<script>
//Imports for the navigation bars.
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

let url = "http://localhost:5552/insertRoom";
export default {
  name: "addRoom",
  components: { NavbarTop, NavbarBottom },
  data() {
    return {
      form: {//Form data
        roomName: ""
      }
    };
  },
  props: ["userToken"],
  methods: {
    //Method that happens on submit of the form.
    //Will send the room name to the database and create a new room.
    //Sends the user back to the dashboard when the room is added to the database. 
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
