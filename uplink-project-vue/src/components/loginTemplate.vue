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
            <div id="err">{{error}}</div>
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
            <div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <b-link
                    href="#"
                    class="links text-center"
                    @click="switchComp('Register');"
                  >Create Account</b-link>
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
            this.switchComp("Dash");
            this.saveToken(jsonData.token);
          }
        });

      evt.preventDefault();
    }
  }
};

//todo ----- Make this look nicer
</script>

<style>
/**General Styles stored here. Most of the styles for the login page is in public/style.css  */
/* Background image yet to be added to the template */
#loginCard {
  margin-top: 80px;

  /* border: solid 1px #005872;*/
}

#form {
  margin-top: 10px;
}

#err {
  text-align: center;
  color: #ff1e1e;
}

.flex-add {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  align-items: center !important;
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

.custom-cards-Login {
  width: 25rem;
  height: 34rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-Login:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
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
