<template>
  <div id="loginCard">
    <b-container>
      <b-row>
        <b-col sm="8" offset-sm="2">
          <h1 class="form-title">Login</h1>
        </b-col>
      </b-row>
      <div id="form">
        <b-form @submit="go">
          <b-row class="rows">
            <b-col sm="2">
              <label for="input-username" class="labels">Username</label>
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-username"
                placeholder="Cheerypal"
                size="md"
                v-model="form.username"
                required="required"
                type="text"
                class="inputboxes"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="2">
              <label for="input-password" class="labels">Password</label>
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-password"
                type="password"
                v-model="form.password"
                required="required"
                placeholder="*********"
                size="md"
                class="inputboxes"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="rows">
            <b-col sm="8" offset-sm="2">
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
            <b-col sm="8" offset-sm="2">
              <b-button class="but" type="submit">Submit</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <b-row class="rows">
        <b-col sm="8" offset-sm="2">
          <b-link href="#" class="links">Forgot Password</b-link>
        </b-col>
      </b-row>
      <b-row class="rows">
        <b-col sm="8" offset-sm="2">
          <b-link href="#" class="links">Create Account</b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        checked: ""
      }
    };
  },
  methods: {
    go(evt) {
      //Checks that the data entered is registered
      //Data entered is stored in a JSON Ready to be sent to the server
      evt.preventDefault();
      console.log(this.form);
    }
  }
};
</script>

<style>
/* Background image yet to be added to the template*/
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
    float: left;
  }
  .but {
    float: none;
  }
}
</style>
