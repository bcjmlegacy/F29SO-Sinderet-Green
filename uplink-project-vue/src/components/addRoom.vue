<template>
  <div>
    <NavbarTop class="top-show" />
    <div id="addRooms">
      <div class="container">
        <h3 class="display-3 text-center">Add Room</h3>
        <div id="form">
          <div class="flex-add">
            <div class="card custom-cards-addRooms">
              <div class="img-cont">
                <img src="../assets/room.png" alt="device icon" class="device-img" />
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
    <NavbarBottom class="bottom-show" />
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
  props: ["userToken"],
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
<style>
#addRooms {
  margin-top: 170px;
}
#form {
  margin-top: 30px;
}

.cont {
  margin-top: 2rem;
}

.form-rows {
  margin-top: 20px;
}

.form-inputboxes {
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #b8b8b8;
  border-left: none;
  border-top: none;
  border-right: none;
}

.form-inputboxes:focus {
  outline: none;
  background-color: white;
  border-bottom: 1px solid #198fca;
}

.form-buttons {
  width: 100%;
  height: 3rem;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  border: none;
  outline: none;
  color: white;
  background-color: #198fca;
}

.form-buttons:focus {
  outline: none;
  box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.3), 0 1px 5px rgba(0, 0, 0, 0.22) !important;
}

.custom-cards-addRooms {
  width: 25rem;
  height: 27rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-addRooms:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}
</style>