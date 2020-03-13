<template>
  <div>
    <NavTop :userToken="userToken" class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="settings">
      <div class="container">
        <div class="flex-settings">
          <div class="custom-card-settings">
            <div class="flex-buttons">
              <button
                type="button"
                class="form-buttons-settings-top"
                v-on:click="configure"
                v-bind:style="{ visibility: editButton ? 'visible' : 'hidden' }"
              >Edit</button>

              <h1 class="text-center">Profile</h1>
              <button type="button" class="form-buttons-settings-top logout" v-show="!logout">Logout</button>
            </div>
            <hr />
            <img id="profilepic" src="../../assets/user.png" alt="Profile" class="nav-image" />
            <div class="userDetails">
              <b-form>
                <hr />
                <div class="form-rows">
                  <b-form-group id="forename-input" label="Forename:" label-for="input-forename">
                    <b-form-input
                      v-if="!edit"
                      id="input-forename"
                      v-model="form.forename"
                      class="inputs-b"
                      plaintext
                    ></b-form-input>
                    <input
                      v-if="edit"
                      id="input-forename"
                      v-model="form.forename"
                      class="form-inputboxes"
                    />
                  </b-form-group>
                </div>
                <hr />
                <div class="form-rows">
                  <b-form-group id="surname-input" label="Surname:" label-for="input-surname">
                    <b-form-input
                      v-if="!edit"
                      id="input-surname"
                      v-model="form.surname"
                      class="inputs-b"
                      plaintext
                    ></b-form-input>
                    <input
                      v-if="edit"
                      id="input-surname"
                      v-model="form.surname"
                      class="form-inputboxes"
                    />
                  </b-form-group>
                </div>
                <hr />
                <div class="form-rows">
                  <b-form-group id="email-input" label="Email:" label-for="input-email">
                    <b-form-input
                      v-if="!edit"
                      id="input-email"
                      v-model="form.email"
                      type="email"
                      class="inputs-b"
                      plaintext
                    ></b-form-input>
                    <input
                      v-if="edit"
                      id="input-email"
                      v-model="form.email"
                      type="email"
                      class="form-inputboxes"
                    />
                  </b-form-group>
                </div>
                <hr />
                <div class="form-rows">
                  <b-form-group id="username-input" label="Username:" label-for="input-username">
                    <b-form-input
                      v-if="!edit"
                      id="input-username"
                      v-model="form.username"
                      type="text"
                      class="inputs-b"
                      plaintext
                    ></b-form-input>
                    <input
                      v-if="edit"
                      id="input-username"
                      v-model="form.username"
                      type="text"
                      class="form-inputboxes"
                    />
                  </b-form-group>
                </div>
                <hr />
                <div class="form-rows">
                  <b-form-group
                    v-show="edit"
                    id="password-input"
                    label="New Password:"
                    label-for="input-password"
                  >
                    <b-form-input
                      v-if="!edit"
                      id="input-password"
                      v-model="form.password"
                      type="password"
                      class="inputs-b"
                      plaintext
                    ></b-form-input>
                    <input
                      v-if="edit"
                      id="input-password"
                      v-model="form.password"
                      type="password"
                      class="form-inputboxes"
                    />
                    <hr />
                  </b-form-group>
                </div>
                <div class="form-rows">
                  <b-form-group
                    v-show="edit"
                    id="password-input"
                    label="Confirm New Password:"
                    label-for="input-confirm-password"
                  >
                    <b-form-input
                      v-if="!edit"
                      id="input-confirm-password"
                      v-model="form.confirmpassword"
                      type="password"
                      class="inputs-b"
                      plaintext
                    ></b-form-input>
                    <input
                      v-if="edit"
                      id="input-confirm-password"
                      v-model="form.confirmpassword"
                      type="password"
                      class="form-inputboxes"
                    />
                    <hr />
                  </b-form-group>
                </div>
                <div class="form-rows">
                  <div class="flex-buttons-bottom" v-show="edit">
                    <div class="button-cont">
                      <button class="form-buttons-settings save-cancel">Save Changes</button>
                    </div>
                    <div class="button-cont">
                      <button
                        type="button"
                        class="form-buttons-settings save-cancel"
                        v-on:click="undoEdit"
                      >Cancel</button>
                    </div>
                  </div>
                </div>
              </b-form>
            </div>
          </div>

          <div class="custom-card-settings">
            <div class="flex-buttons">
              <h1 class="width-sensor">Accounts</h1>
              <button
                type="button"
                class="form-buttons-settings-top"
                v-on:click="configureUsers"
                v-bind:style="{ visibility: editButton2 ? 'visible' : 'hidden' }"
              >Edit</button>
            </div>
            <div class="form-rows" />
            <ul class="list-schedule">
              <li class="scheduleItem" v-for="user in displayData.users" :key="user.user_id">
                {{user.user_username}}
                <br />
                <span
                  class="delete"
                  v-show="edit2"
                  @click="deleteSensorItem(sensor.sensor_id)"
                >Delete</span>
              </li>
            </ul>
            <div class="button-cont" v-show="edit2">
              <button
                type="button"
                class="form-buttons-settings save-cancel"
                v-on:click="undoEdit2"
              >Finish</button>
            </div>
          </div>

          <div class="custom-card-settings sensors">
            <div class="flex-buttons">
              <h1 class="display3 width-sensor">Sensors</h1>
              <button
                type="button"
                class="form-buttons-settings-top"
                v-on:click="configureSensors"
                v-bind:style="{ visibility: editButton1 ? 'visible' : 'hidden' }"
              >Edit</button>
            </div>
            <div class="form-rows" />
            <ul class="list-schedule">
              <li
                class="scheduleItem"
                v-for="sensor in displayData.sensors"
                :key="sensor.sensor_id"
              >
                {{sensor.sensor_name}}
                <br />
                <span
                  class="delete"
                  v-show="edit1"
                  @click="deleteSensorItem(sensor.sensor_id)"
                >Delete</span>
              </li>
            </ul>
            <div class="button-cont" v-show="edit1">
              <router-link :to="{name: 'addSensor'}" class="links">
                <button type="button" class="form-buttons-settings save-cancel">Add Sensors</button>
              </router-link>
            </div>
            <div class="button-cont" v-show="edit1">
              <button
                type="button"
                class="form-buttons-settings save-cancel"
                v-on:click="undoEdit1"
              >Finish</button>
            </div>
          </div>
        </div>
      </div>
      <!--Navbar bottom *mobile and tablet view*-->
    </div>
    <NavBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>

<script>
import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";

let url = "http://localhost:5552/getUsers";

export default {
  name: "settings-components",
  components: { NavTop, NavBottom },
  data() {
    return {
      form: {
        username: "",
        password: "********",
        email: "test@test.com",
        forename: "test_forename",
        surname: "test_surname",
        confirmpassword: ""
      },

      edit: false,
      edit1: false,
      edit2: false,
      logout: false,
      editButton: true,
      editButton1: true,
      editButton2: true,
      displayData: {
        users: [],
        sensors: []
      }
    };
  },
  props: ["userToken"],
  methods: {
    configure() {
      if (this.edit === false) {
        this.edit = true;
        this.editButton = false;
      }
    },
    configureUsers() {
      if (this.edit2 === false) {
        this.edit2 = true;
        this.editButton2 = false;
      }
    },
    configureSensors() {
      if (this.edit1 === false) {
        this.edit1 = true;
        this.editButton1 = false;
      }
    },
    undoEdit() {
      if (this.edit === true) {
        this.edit = false;
        this.editButton = true;
      }
    },
    undoEdit1() {
      if (this.edit1 === true) {
        this.edit1 = false;
        this.editButton1 = true;
        location.reload();
      }
    },
    undoEdit2() {
      if (this.edit2 === true) {
        this.edit2 = false;
        this.editButton2 = true;
        location.reload();
      }
    },
    getRooms() {
      let url = "http://localhost:5552/getUsers";
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
          this.displayData.users = jsonData;
        });
    },
    getSensors() {
      let url = "http://localhost:5552/getSensors";
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
          this.displayData.sensors = jsonData;
        });
    },

    deleteSensorItem(id) {
      if (!confirm("Do really want to delete this sensor?")) {
        return false;
      }
      let url = "http://localhost:5552/deleteSensor?id=" + id;
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
        })
        .catch(err => {
          console.log(err);
          alert("This Sensor is being used");
        });
    }
    /*
    deleteRoomItem(id) {
      let url = "http://localhost:5552/deleteRoom?id=" + id;
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
        });
    }
    */
  },
  mounted: function() {
    this.getRooms();
    this.getSensors();
    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: { Authorization: this.userToken }
    }) //Fetch Command to get data from API - CORS enabled.
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
      });
  }
};
</script>

<style>
#settings {
  margin-top: 120px;
  margin-bottom: 120px;
}

.flex-settings {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}

#profilepic {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  margin-top: 1em;
  padding: 20px;
}

.inputs-b {
  color: white !important;
  outline: none;
}

.flex-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.flex-buttons-bottom {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.width-sensor {
  flex: 1;
  text-align: center;
}

.button-cont {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.form-buttons-settings {
  width: 100%;
  height: 3rem;
  border-radius: 20px;
  border: none;
  outline: none;
  color: white;
  background-color: #198fca;
}

.form-buttons-settings-top {
  width: 30%;
  height: 2.5rem;
  border-radius: 20px;
  border: none;
  outline: none;
  color: white;
  background-color: #198fca;
}

.logout {
  background-color: #e30000;
}

.custom-card-settings {
  width: 30%;
  padding: 20px;
  border-radius: 20px;
  margin: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.sensors {
  width: 30%;
}

.siblings {
  display: inline;
}

.logout-right {
  float: right;
}

.custom-card-settings:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
}

@media screen and (max-width: 1025px) {
  #settings {
    margin-top: 120px;
  }
  .custom-card-settings {
    width: 60%;
  }
  #profilepic {
    width: 20%;
  }
}

@media screen and (max-width: 750px) {
  .custom-card-settings {
    width: 100%;
    margin: 20px;
  }
  #profilepic {
    width: 30%;
  }
}

@media screen and (max-width: 550px) {
  #settings {
    margin-top: 80px;
  }
}
</style>
