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
          <div class="item-deviceDetails item-padding">
            <div class="custom-card-settings">
              <div class="flex-buttons">
                <button
                  type="button"
                  class="form-buttons-settings-top"
                  v-on:click="configure"
                  v-bind:style="{ visibility: editButton ? 'visible' : 'hidden' }"
                >Edit</button>

                <h2 class="text-center">Profile</h2>
                <button
                  type="button"
                  class="form-buttons-settings-top logout"
                  @click="logout"
                >Logout</button>
              </div>
              <hr />
              <img id="profilepic" src="../../assets/user.png" alt="Profile" class="nav-image" />
              <div class="userDetails">
                <b-form class="text-center" @submit="editUserDetails">
                  <hr />

                  <div class="form-rows">
                    <b-form-group
                      id="forename-input"
                      label="Firstname"
                      label-for="input-forename"
                      class="label"
                    >
                      <b-form-input
                        v-if="!edit"
                        id="input-forename"
                        v-model="form.forename"
                        class="inputs-b center-inputs"
                        plaintext
                      ></b-form-input>
                      <input
                        v-if="edit"
                        id="input-forename"
                        v-model="form.forename"
                        class="form-inputboxes center-inputs"
                        required="required"
                      />
                    </b-form-group>
                  </div>

                  <hr />

                  <div class="form-rows">
                    <b-form-group
                      id="surname-input"
                      label="Surname"
                      label-for="input-surname"
                      class="label"
                    >
                      <b-form-input
                        v-if="!edit"
                        id="input-surname"
                        v-model="form.surname"
                        class="inputs-b center-inputs"
                        plaintext
                      ></b-form-input>
                      <input
                        v-if="edit"
                        id="input-surname"
                        v-model="form.surname"
                        class="form-inputboxes center-inputs"
                        required="required"
                      />
                    </b-form-group>
                  </div>

                  <hr />

                  <div class="form-rows">
                    <b-form-group
                      id="email-input"
                      label="Email"
                      label-for="input-email"
                      class="label"
                    >
                      <b-form-input
                        v-if="!edit"
                        id="input-email"
                        v-model="form.email"
                        type="email"
                        class="inputs-b center-inputs"
                        plaintext
                      ></b-form-input>
                      <input
                        v-if="edit"
                        id="input-email"
                        v-model="form.email"
                        type="email"
                        class="form-inputboxes center-inputs"
                        required="required"
                      />
                    </b-form-group>
                  </div>

                  <hr />

                  <div class="form-rows">
                    <b-form-group
                      id="username-input"
                      label="Username"
                      label-for="input-username"
                      class="label"
                    >
                      <b-form-input
                        v-if="!edit"
                        id="input-username"
                        v-model="form.username"
                        type="text"
                        class="inputs-b center-inputs"
                        autocomplete="new-username"
                        plaintext
                      ></b-form-input>
                      <input
                        v-if="edit"
                        id="input-username"
                        v-model="form.username"
                        type="text"
                        class="form-inputboxes center-inputs"
                        autocomplete="new-username"
                        required="required"
                      />
                    </b-form-group>
                  </div>

                  <hr />

                  <div class="form-rows">
                    <b-form-group
                      v-show="edit"
                      id="password-input"
                      label="Password"
                      label-for="input-password"
                      class="label"
                    >
                      <div id="err">{{error}}</div>
                      <b-form-input
                        v-if="!edit"
                        id="input-password"
                        v-model="form.password"
                        type="password"
                        class="inputs-b center-inputs"
                        autocomplete="new-password"
                        plaintext
                      ></b-form-input>
                      <input
                        v-if="edit"
                        id="input-password"
                        v-model="form.password"
                        type="password"
                        class="form-inputboxes center-inputs"
                        autocomplete="new-password"
                        required="required"
                      />
                      <hr />
                    </b-form-group>
                  </div>

                  <!--<div class="form-rows">
                    <b-form-group
                      v-show="edit"
                      id="password-input"
                      label="Confirm New Password"
                      label-for="input-confirm-password"
                      class="label"
                    >
                      <b-form-input
                        v-if="!edit"
                        id="input-confirm-password"
                        v-model="form.confirmpassword"
                        type="password"
                        class="inputs-b center-inputs"
                        autocomplete="new-confirm-password"
                        plaintext
                      ></b-form-input>
                      <input
                        v-if="edit"
                        id="input-confirm-password"
                        v-model="form.confirmpassword"
                        type="password"
                        class="form-inputboxes center-inputs"
                        autocomplete="new-confirm-password"
                      />
                      <hr />
                    </b-form-group>
                  </div>-->

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
          </div>

          <div class="item-deviceDetails item-padding">
            <div class="custom-card-settings">
              <div class="flex-buttons">
                <h2 class="width-sensor">Accounts</h2>

                <button
                  type="button"
                  class="form-buttons-settings-top"
                  v-on:click="configureUsers"
                  v-bind:style="{ visibility: editButton2 ? 'visible' : 'hidden' }"
                >Edit</button>
              </div>
              <hr />
              <div class="form-rows" />
              <ul class="list-schedule">
                <li class="scheduleItem" v-for="user in displayData.users" :key="user.user_id">
                  {{user.user_username}}
                  <br />
                  <span class="delete" v-show="edit2" @click="deleteUser(user.user_id)">Delete</span>
                </li>
              </ul>
              <hr />
              <div class="button-cont" v-show="edit2">
                <router-link :to="{name: 'register'}" class="links">
                  <button type="button" class="form-buttons-settings save-cancel">Add Accounts</button>
                </router-link>
              </div>
              <div class="button-cont" v-show="edit2">
                <button
                  type="button"
                  class="form-buttons-settings save-cancel"
                  v-on:click="undoEdit2"
                >Finish</button>
              </div>
            </div>

            <div class="custom-card-settings">
              <div class="flex-buttons">
                <h2 class="width-sensor">Rooms</h2>
                <button
                  type="button"
                  class="form-buttons-settings-top"
                  v-on:click="configureRooms"
                  v-bind:style="{ visibility: editButton3 ? 'visible' : 'hidden' }"
                >Edit</button>
              </div>
              <hr />
              <div class="form-rows" />
              <ul class="list-schedule">
                <li class="scheduleItem" v-for="room in displayData.rooms" :key="room.room_id">
                  {{room.room_name}}
                  <br />
                  <span class="delete" v-show="edit3" @click="deleteRoom(room.room_id)">Delete</span>
                </li>
              </ul>
              <hr />
              <div class="button-cont" v-show="edit3">
                <router-link :to="{name: 'addRoom'}" class="links">
                  <button type="button" class="form-buttons-settings save-cancel">Add Rooms</button>
                </router-link>
              </div>
              <div class="button-cont" v-show="edit3">
                <button
                  type="button"
                  class="form-buttons-settings save-cancel"
                  v-on:click="undoEdit3"
                >Finish</button>
              </div>
            </div>
          </div>

          <div class="item-deviceDetails item-padding">
            <div class="custom-card-settings">
              <div class="flex-buttons">
                <h2 class="width-sensor">Devices</h2>
                <button
                  type="button"
                  class="form-buttons-settings-top"
                  v-on:click="configureDevices"
                  v-bind:style="{ visibility: editButton4 ? 'visible' : 'hidden' }"
                >Edit</button>
              </div>
              <hr />
              <div class="form-rows" />
              <ul class="list-schedule">
                <li
                  class="scheduleItem"
                  v-for="device in displayData.devices"
                  :key="device.device_id"
                >
                  {{device.device_name}}
                  <br />
                  <span
                    class="delete"
                    v-show="edit4"
                    @click="deleteDevices(device.device_id)"
                  >Delete</span>
                </li>
              </ul>
              <hr />
              <div class="button-cont" v-show="edit4">
                <router-link :to="{name: 'addDevice'}" class="links">
                  <button type="button" class="form-buttons-settings save-cancel">Add Devices</button>
                </router-link>
              </div>
              <div class="button-cont" v-show="edit4">
                <button
                  type="button"
                  class="form-buttons-settings save-cancel"
                  v-on:click="undoEdit4"
                >Finish</button>
              </div>
            </div>

            <div class="custom-card-settings sensors">
              <div class="flex-buttons">
                <h2 class="width-sensor">Sensors</h2>
                <button
                  type="button"
                  class="form-buttons-settings-top"
                  v-on:click="configureSensors"
                  v-bind:style="{ visibility: editButton1 ? 'visible' : 'hidden' }"
                >Edit</button>
              </div>
              <hr />
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
              <hr />
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
      </div>
      <!--Navbar bottom *mobile and tablet view*-->
    </div>
    <NavBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>

<script>
import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";

export default {
  name: "settings-components",
  components: { NavTop, NavBottom },
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        forename: "",
        surname: "",
        id: "",
        admin: "",
        accountType: ""
      },

      edit: false,
      edit1: false,
      edit2: false,
      edit3: false,
      edit4: false,
      editButton: true,
      editButton1: true,
      editButton2: true,
      editButton3: true,
      editButton4: true,
      displayData: {
        users: [],
        sensors: [],
        rooms: [],
        devices: []
      },
      error: ""
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

    configureRooms() {
      if (this.edit3 === false) {
        this.edit3 = true;
        this.editButton3 = false;
      }
    },

    configureDevices() {
      if (this.edit4 === false) {
        this.edit4 = true;
        this.editButton4 = false;
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

    undoEdit3() {
      if (this.edit3 === true) {
        this.edit3 = false;
        this.editButton3 = true;
        location.reload();
      }
    },

    undoEdit4() {
      if (this.edit4 === true) {
        this.edit4 = false;
        this.editButton4 = true;
        location.reload();
      }
    },

    getUsers() {
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

    getRooms() {
      let url = "http://localhost:5552/getRooms";
      fetch(url, {
        modE: "cors",
        method: "GET",
        headers: {
          Authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.displayData.rooms = jsonData;
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

    getDevices() {
      let url = "http://localhost:5552/getDevices";
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
          this.displayData.devices = jsonData;
        });
    },

    deleteSensorItem(id) {
      if (!confirm("Are you sure you want to delete this sensor?")) {
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
    },

    deleteRoom(id) {
      if (!confirm("Are you sure you want to delete this room?")) {
        return false;
      }
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
        })
        .catch(err => {
          console.log(err);
          alert(
            "This room is being used. Please edit or delete all items releated to the room "
          );
        });
    },

    deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) {
        return false;
      }
      if (id === 1) {
        alert("You cannot delete the Admin Account");
        return false;
      }
      let url = "http://localhost:5552/deleteUser?id=" + id;
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
          alert("This user cannot be deleted right now");
        });
    },

    deleteDevices(id) {
      if (!confirm("Are you sure you want to delete this device?")) {
        return false;
      }
      let url = "http://localhost:5552/deleteDevice?id=" + id;
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
          alert("This user cannot be deleted right now");
        });
    },

    logout() {
      if (!confirm("Are you sure you want to logout?")) {
        return false;
      }
      this.$cookies.remove("token");
      this.$router.push({ name: "login" });
    },

    getUserLoggedIn() {
      let url = "http://localhost:5552/getAuthByToken?id=" + this.userToken;
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
          for (let i in this.displayData.users) {
            if (
              this.displayData.users[i].user_id === jsonData[0].auth_user_id
            ) {
              this.form.forename = this.displayData.users[i].user_forename;
              this.form.surname = this.displayData.users[i].user_surname;
              this.form.email = this.displayData.users[i].user_email;
              this.form.username = this.displayData.users[i].user_username;
              this.form.id = this.displayData.users[i].user_id;
              this.form.admin = this.displayData.users[i].user_admin;
              this.form.accountType = this.displayData.users[
                i
              ].user_account_type;
            }
          }
        });
    },

    editUserDetails(evt) {
      evt.preventDefault();
      let url = "http://localhost:5552/editUser";
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: this.userToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.form.id,
          account_type: this.form.accountType,
          username: this.form.username,
          password: this.form.password,
          forename: this.form.forename,
          surname: this.form.surname,
          admin: this.form.admin,
          email: this.form.email
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (jsonData.error === "Details incorrect")
            this.error = "Incorrect Username or Password";
          else location.reload();
        });
    }
  },

  mounted: function() {
    this.getUsers();
    this.getSensors();
    this.getRooms();
    this.getDevices();
    this.getUserLoggedIn();
  }
};
</script>

<style>
#settings {
  margin-top: 120px;
  margin-bottom: 120px;
}

.center-inputs {
  text-align: center;
}

.flex-settings {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.item-padding {
  padding: 10px;
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
  font-size: 0.8em;
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
  width: 28%;
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
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.sensors {
  width: 100%;
  padding-right: 15px;
  padding-left: 10px;
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

  #profilepic {
    width: 40%;
  }
}

@media screen and (max-width: 750px) {
  #profilepic {
    width: 30%;
  }
  .item-padding {
    padding: 10px;
  }
  .sensors {
    padding: 20px;
  }
}

@media screen and (max-width: 550px) {
  #settings {
    margin-top: 80px;
  }
  #profilepic {
    width: 35%;
  }
}
</style>
