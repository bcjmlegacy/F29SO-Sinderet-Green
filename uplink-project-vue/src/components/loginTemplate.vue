<template>
  <!--Login Page-->
  <div id="loginCard">
    <b-container>
      <b-row>
        <b-col sm="8" offset-sm="2">
          <div class="logo-background">
            <h1 class="logo">uplink</h1>
          </div>
        </b-col>
      </b-row>
      <div id="form">
        <b-form @submit.prevent="go">
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-username" class="labels">Username</label>
            </b-col>
            <b-col sm="7">
              <!--v-model allows you to store data thats typed or collected from form inputs-->
              <b-form-input
                id="input-username"
                placeholder="Cheerypal"
                size="md"
                v-model="form.username"
                required="required"
                type="text"
                class="inputboxes-login"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-password" class="labels">Password</label>
            </b-col>
            <b-col sm="7">
              <b-form-input
                id="input-password"
                type="password"
                v-model="form.password"
                required="required"
                placeholder="*********"
                size="md"
                class="inputboxes-login"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="7" offset-sm="3">
              <b-form-checkbox
                id="check_Save"
                value="saved"
                unchecked-value="not_saved"
                name="check_Save"
                class="check"
                v-model="form.checked"
              >Remember Me</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="7" offset-sm="3">
              <b-button class="but" type="submit">Login</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <b-row class="rows">
        <b-col sm="7" offset-sm="3">
          <b-link href="#" class="links">Forgot Password</b-link>
        </b-col>
      </b-row>
      <b-row class="rows">
        <b-col sm="7" offset-sm="3">
          <b-link href="#" class="links" @click="switchComp('Register')">Create Account</b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
//Post URL to API for login
let url = "http://localhost:5552/login";

//Bus to store current component
import { bus } from "../main";
export default {
  name: "login",
  data() {
    return {
      form: {
        //form data thats collected goes here
        username: "",
        password: "",
        checked: ""
      }
    };
  },
  methods: {
    go() {
      //onSubmit function that will trigger the server to send post request to login
      console.log(this.form);
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          //Data that gets transfered
          username: this.form.username,
          password: this.form.password
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(text) {
          console.log(text);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    switchComp(comp) {
      //Switch component
      bus.$emit("switchComp", comp);
    }
  }
};

//todo ----- Make this look nicer
</script>

<style>
/**General Styles stored here. Most of the styles for the login page is in public/style.css  */
/* Background image yet to be added to the template */
#loginCard {
  padding: 20px 50px;
  padding-top: 300px;
  margin-left: 30%;
  margin-right: 30%;

  /* border: solid 1px #005872;*/
}

#form {
  padding-bottom: 50px;
}

.inputboxes-login {
  border-bottom: 1px solid #ff9933 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  outline: none !important;
  border-radius: 0px !important;
}

.logo {
  font-family: "Harlow-solid";
  text-align: center;
  font-size: 3.5em;
  color: #000;
  margin-bottom: 10px;
}

/* Responsive CSS Queries */

@media screen and (max-width: 1024px) {
  #loginCard {
    margin-left: 5%;
    margin-right: 5%;
  }
}

@media screen and (max-width: 812px) {
  #loginCard {
    margin-left: 1%;
    margin-right: 1%;
    padding: 10px 20px;
    padding-top: 120px;
  }
  .labels {
    float: left !important;
  }
  .but {
    float: none;
  }
}
</style>
