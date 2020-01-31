<template>
  <!--Register Page-->
  <div id="register">
    <b-container>
      <div class="flex-add">
        <div class="card custom-cards-Register">
          <h1 class="form-title">Sign Up</h1>

          <div id="form">
            <b-form @submit="go">
              <div class="col-sm-12">
                <label for="input-email" class="label">Email</label>
              </div>
              <!--v-model is a vue.js thing that will store the value gained from the input-->
              <div class="col-sm-12">
                <input
                  id="input-email"
                  placeholder="example@domain.com"
                  required="required"
                  v-model="form.email"
                  type="email"
                  class="form-inputboxes"
                  size="md"
                />
              </div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <label for="input-username" class="label">Username</label>
                </div>
                <div class="col-sm-12">
                  <input
                    id="input-username"
                    placeholder="MadLad123"
                    type="text"
                    size="md"
                    required="required"
                    class="form-inputboxes"
                    v-model="form.username"
                  />
                </div>
              </div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <label for="input-firstname" class="label">First Name</label>
                </div>
                <div class="col-sm-12">
                  <input
                    id="input-firstname"
                    class="form-inputboxes"
                    type="text"
                    size="md"
                    required="required"
                    placeholder="Euan"
                    v-model="form.firstname"
                  />
                </div>
              </div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <label for="input-surname" class="label">Surname</label>
                </div>
                <div class="col-sm-12">
                  <input
                    id="input-surname"
                    class="form-inputboxes"
                    type="text"
                    size="md"
                    required="required"
                    placeholder="Gordon"
                    v-model="form.surname"
                  />
                </div>
              </div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <label for="input-password" class="label">Password</label>
                </div>
                <div class="col-sm-12">
                  <input
                    id="input-password"
                    class="form-inputboxes"
                    type="password"
                    size="md"
                    required="required"
                    placeholder="******"
                    v-model="form.password"
                  />
                </div>
              </div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <label for="input-confirm-password" class="label">Confirm Password</label>
                </div>
                <div class="col-sm-12">
                  <input
                    id="input-confirm-password"
                    class="form-inputboxes"
                    type="password"
                    size="md"
                    required="required"
                    placeholder="******"
                    v-model="form.cPassword"
                  />
                </div>
              </div>
              <div class="form-rows">
                <div class="col-sm-12">
                  <button class="form-buttons" type="submit">Sign Up</button>
                </div>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
//API URL for POST request that will register a user.
let url = "http://localhost:5552/insertUser";

export default {
  data() {
    return {
      form: {
        //Data from form is stored here.
        accountType: "1",
        email: "",
        username: "",
        firstname: "",
        surname: "",
        password: "",
        cPassword: "",
        acceptTerms: ""
      }
    };
  },
  methods: {
    go(evt) {
      //Fetch request to send the data to the API and Database for storing uses CORS
      fetch(url, {
        mode: "cors",
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "MTpSMmM1blZkVlJZWTVKTWFPRlpiSQ=="
        },
        body: JSON.stringify({
          //Data sent to the API goes here.
          account_type: this.form.accountType,
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          forename: this.form.firstname,
          surname: this.form.surname
        })
      })
        .then(function(response) {
          return response;
        })
        .then(function(text) {
          console.log("Request successful", text);
        })
        .catch(function(error) {
          console.log("Request failed", error);
        });
      //Checks that the data entered is registered
      //Data entered is stored in a JSON Ready to be sent to the server
      evt.preventDefault();
      console.log(this.form);
      if (this.form.acceptTerms === "false") {
        console.log("Not Accepted");
      } else {
        console.log("accepted");
      }
    }
  }
};
</script>
<style>
/**General Styles stored here. Most of the styles for the register page is in public/style.css  */
#register {
  margin-top: 80px;
}

.custom-cards-Register {
  width: 25rem;
  height: 58rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-Register:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

@media screen and (max-width: 1024px) {
  #register {
    margin-top: 70px;
  }
  .custom-cards-Register {
    width: 20rem;
  }
}

@media screen and (max-width: 812px) {
  .labels {
    float: left !important;
  }

  .but {
    float: none;
  }
}
</style>
