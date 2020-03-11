<template>
  <!--Login Page-->
  <div id="loginCard">
    <div class="container">
      <div class="flex-login">
        <div class="login-section">
          <h1 class="logo logo-login text-center">uplink</h1>

          <div id="form-login">
            <div id="err">{{ error }}</div>
            <hr />

            <b-form @submit="go" id="loginForm">
              <!--v-model allows you to store data thats typed or collected from form inputs-->
              <input
                id="input-username"
                placeholder="Username"
                size="md"
                v-model="form.username"
                required="required"
                type="text"
                class="login-inputboxes"
              />
              <div class="form-rows">
                <input
                  id="input-password"
                  type="password"
                  v-model="form.password"
                  required="required"
                  placeholder="Password"
                  size="md"
                  class="login-inputboxes"
                />
              </div>
              <hr />
              <div class="text-center">
                <router-link to="#" class="links">Forgot Password</router-link>
              </div>
              <div class="form-rows-login">
                <button class="login-buttons" type="submit">Login</button>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Post URL to API for login
let url = "http://localhost:5552/login";

//Bus to store current component
import { bus } from "../../main";
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
          if (jsonData.error === "Details incorrect") {
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
<style>
.flex-login {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#form-login {
  margin-top: 10px;
}

.login-section {
  width: 100%;
}

.login-inputboxes {
  width: 100%;
  border: none;
  padding: 15px;
  border-radius: 20px;
  text-align: center;
  background-color: #d8d8d8 !important;
  outline: none;
}

.login-inputboxes::placeholder {
  color: #000 !important;
  font-weight: bold;
}

.login-buttons {
  width: 100%;
  padding: 15px;
  color: white;
  border-radius: 20px;
  border: none;
  background-color: #198fca;
}

.form-rows-login {
  margin-top: 20px;
}
</style>
