<template>
  <div>
    <!--Navbar top *web view*-->
    <NavTop class="top-show" :back="back" />
    <!--Settings - shows user profile and options for editing -->
    <div id="settings">
      <div class="flex-add">
        <div class="custom-card-settings">
          <button type="button" class="btn btn-light logout-right" v-on:click="configure" v-show="!logout">Logout</button>
          <h4 class="display3 text-center">Profile</h4>
          <hr />
          <button
            type="button"
            class="btn btn-light"
            v-on:click="configure"
            v-show="!edit"
          >
            Edit
          </button>
          <img
            id="profilepic"
            src="../../assets/user.png"
            alt="Profile"
            class="nav-image"
          />
          <div class="userDetails">
            <b-form-group
              id="username-input"
              label="Username:"
              label-for="input-username"
            >
              <b-form-input
                v-if="!edit"
                id="input-username"
                v-model="username"
                plaintext
              ></b-form-input>
              <b-form-input
                v-if="edit"
                id="input-username"
                v-model="username"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="password-input"
              label="Password:"
              label-for="input-password"
            >
              <b-form-input
                v-if="!edit"
                id="input-password"
                v-model="password"
                type="password"
                plaintext
              ></b-form-input>
              <b-form-input
                v-if="edit"
                id="input-password"
                v-model="password"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="email-input"
              label="Email:"
              label-for="input-email"
            >
              <b-form-input
                v-if="!edit"
                id="input-email"
                v-model="email"
                type="email"
                plaintext
              ></b-form-input>
              <b-form-input
                v-if="edit"
                id="input-email"
                v-model="email"
                type="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="forename-input"
              label="Forename:"
              label-for="input-forename"
            >
              <b-form-input
                v-if="!edit"
                id="input-forename"
                v-model="forename"
                plaintext
              ></b-form-input>
              <b-form-input
                v-if="edit"
                id="input-forename"
                v-model="forename"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="surname-input"
              label="Surname:"
              label-for="input-surname"
            >
              <b-form-input
                v-if="!edit"
                id="input-surname"
                v-model="surname"
                plaintext
              ></b-form-input>
              <b-form-input
                v-if="edit"
                id="input-surname"
                v-model="surname"
              ></b-form-input>
            </b-form-group>
            <b-button-toolbar
              id="savebuttons"
              v-show="edit"
              aria-label="Save/Cancel buttons"
            >
              <b-button-group size="sm">
                <b-button class="btn btn-light">Save</b-button>
                <b-button class="btn btn-light">Cancel</b-button>
              </b-button-group>
            </b-button-toolbar>
          </div>
        </div>
        <!--Navbar bottom *mobile and tablet view*-->
        <NavBottom class="bottom-show" :back="back" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";
import { bus } from "../../main";

let url = "http://localhost:5552/getUsers";

export default {
  name: "settings-components",
  components: { NavTop, NavBottom },
  data() {
    return {
      username: "",
      password: "********",
      email: "test@test.com",
      forename: "test_forename",
      surname: "test_surname",
      edit: false
    };
  },
  props: ["userToken", "back"],
  methods: {
    switchComp(comp) {
      //Switch component
      bus.$emit("switchComp", comp);
    },
    prev(previous) {
      bus.$emit("prev", previous);
    },
    configure(event) {
      if (this.edit === false) {
        this.edit = true;
      }
      event.preventDefault();
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
        this.username = jsonData[0].user_username;
        console.log(jsonData[0].user_username);
      });
  }
};
</script>
<style>
#settings {
  margin-top: 10%;
}

#profilepic {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10%;
  margin-top: 1em;
}

#savebuttons {
  width: 100%;
}

.labels {
  text-align: center;
}

.userDetails {
  margin-top: 1em;
  margin-left: 3em;
  margin-right: 3em;
}

.custom-card-settings {
  width: 90%;
  height: 75%;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.siblings {
  float: left;
  display: inline;
  width: 49%;
}

.logout-right {
  float: right;
}

.custom-card-settings:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
}

@media screen and (max-width: 1025px) {
  #settings {
    margin-top: 2%;
  }
  .custom-cards-settings {
    width: 60%;
  }
}
</style>
