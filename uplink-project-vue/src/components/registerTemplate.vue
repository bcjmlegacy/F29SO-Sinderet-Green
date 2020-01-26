<template>
  <!--Register Page-->
  <div id="register">
    <b-container>
      <b-row>
        <b-col sm="8" offset-sm="2">
          <h1 class="form-title">Register</h1>
        </b-col>
      </b-row>
      <div id="form">
        <b-form @submit="go">
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-email" class="labels">Email</label>
            </b-col>
            <b-col sm="8">
              <!--v-model is a vue.js thing that will store the value gained from the input-->
              <b-form-input
                id="input-email"
                placeholder="example@domain.com"
                required="required"
                v-model="form.email"
                type="email"
                class="inputboxes"
                size="md"
              />
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-username" class="labels">Username</label>
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-username"
                placeholder="MadLad123"
                type="text"
                size="md"
                required="required"
                class="inputboxes"
                v-model="form.username"
              />
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-firstname" class="labels">First Name</label>
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-firstname"
                class="inputboxes"
                type="text"
                size="md"
                required="required"
                placeholder="Euan"
                v-model="form.firstname"
              />
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-surname" class="labels">Surname</label>
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-surname"
                class="inputboxes"
                type="text"
                size="md"
                required="required"
                placeholder="Gordon"
                v-model="form.surname"
              />
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-password" class="labels">Password</label>
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-password"
                class="inputboxes"
                type="password"
                size="md"
                required="required"
                placeholder="******"
                v-model="form.password"
              />
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="3">
              <label for="input-confirm-password" class="labels">Confirm Password</label>
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-confirm-password"
                class="inputboxes"
                type="password"
                size="md"
                required="required"
                placeholder="******"
                v-model="form.cPassword"
              />
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="8" offset-sm="3">
              <b-form-checkbox
                id="acceptTerms"
                value="true"
                unchecked-value="false"
                name="acceptTerms"
                class="check"
                v-model="form.acceptTerms"
              >Accept Terms and Conditions</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="8" offset-sm="3">
              <b-button class="but" type="submit">Register</b-button>
            </b-col>
          </b-row>
        </b-form>
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
          "Content-Type": "application/json"
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
  padding: 20px 50px;
  padding-top: 200px;
  margin-left: 25%;
  margin-right: 25%;
}

@media screen and (max-width: 1024px) {
  #register {
    margin-left: 5%;
    margin-right: 5%;
  }
}

@media screen and (max-width: 812px) {
  #register {
    margin-left: 1%;
    margin-right: 1%;
    padding: 10px 20px;
    padding-top: 40px;
  }

  .labels {
    float: left !important;
  }

  .but {
    float: none;
  }
}
</style>
