<template>
  <div>
    <NavTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="settings">
      <div class="flex-add">
        <div class="custom-card-settings">
          <div class="flex-buttons">
            <button
              type="button"
              class="form-buttons-settings-top"
              v-on:click="configure"
              v-bind:style="{ visibility: editButton ? 'visible' : 'hidden' }"
            >Edit</button>

            <h4 class="display3 text-center">Profile</h4>
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
        <!--Navbar bottom *mobile and tablet view*-->
        <NavBottom class="bottom-show" />
      </div>
    </div>
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
      logout: false,
      editButton: true
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
    undoEdit() {
      if (this.edit === true) {
        this.edit = false;
        this.editButton = true;
      }
    }
  },
  mounted: function() {
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

.labels {
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
  width: 25%;
  height: 75%;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
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
    width: 90%;
  }
  #profilepic {
    width: 30%;
  }
}

@media screen and (max-width: 550px) {
  #settings {
    margin-top: 100px;
  }
}
</style>
