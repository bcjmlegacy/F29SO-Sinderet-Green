<template>
  <!--Login Page-->
  <div id="loginCard">
    <b-container>
      <div class="flex-add">
        <div class="card custom-cards-Login">
          <div class="logo-background">
            <h1 class="logo text-center">uplink</h1>
          </div>
          <div id="form">
            <div id="err">{{ error }}</div>
            <b-form @submit="go" id="loginForm">
              <div class="col-sm-12">
                <label for="input-username" class="label">Username</label>
              </div>
              <!--v-model allows you to store data thats typed or collected from form inputs-->
              <div class="col-sm-12">
                <input
                  id="input-username"
                  placeholder="Cheerypal"
                  size="md"
                  v-model="form.username"
                  required="required"
                  type="text"
                  class="form-inputboxes"
                />
              </div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <label for="input-password" class="label">Password</label>
                </div>
                <div class="col-sm-12">
                  <input
                    id="input-password"
                    type="password"
                    v-model="form.password"
                    required="required"
                    placeholder="*********"
                    size="md"
                    class="form-inputboxes"
                  />
                </div>
              </div>

              <div class="form-rows">
                <div class="col-sm-12">
                  <button class="form-buttons" type="submit">Login</button>
                </div>
              </div>
            </b-form>
          </div>
          <div class="flex-add">
            <div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <b-link href="#" class="links text-center">Forgot Password</b-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        password: ""
      },
      error: ""
    };
  },
  methods: {
    switchComp(comp) {
      //Switch component
      bus.$emit("switchComp", comp);
    },
    saveToken(token) {
      bus.$emit("saveToken", token);
    },
    resetForm() {
      console.log("Reseting the form");
      this.form.username = "";
      this.form.password = "";
    },
    go(evt) {
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
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          if (jsonData.error == "Error logging in") {
            this.error = "Incorrect Username or Password";
            this.resetForm();
          } else {
            this.saveToken(jsonData.token);
            this.$cookies.set("token", jsonData.token);
            this.$router.push({ name: "dashboard" });
          }
        });

      evt.preventDefault();
    }
  }
};
</script>

