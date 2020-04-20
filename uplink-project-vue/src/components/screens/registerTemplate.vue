<template>
  <div>
    <!--Register Page-->
    <NavTop :userToken="userToken" class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="register">
      <h2 class="form-title">Add Account</h2>
      <b-container>
        <div class="flex-add">
          <div class="custom-cards-Register">
            <img id="profilepic" src="../../assets/user.png" alt="Profile" class="nav-image" />
            <div id="form">
              <b-form @submit="checkPasswords">
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
                      autocomplete="new-username"
                    />
                  </div>
                </div>
                <div class="form-rows">
                  <div class="col-sm-12">
                    <label for="input-password" class="label">Password</label>
                  </div>
                  <div id="err">{{ errorLength }}</div>
                  <div class="col-sm-12">
                    <input
                      id="input-password"
                      class="form-inputboxes"
                      type="password"
                      size="md"
                      required="required"
                      placeholder="******"
                      v-model="form.password"
                      autocomplete="new-password"
                      v-on:keyup="checkPasswordLength"
                    />
                  </div>
                </div>
                <div class="form-rows">
                  <div class="col-sm-12">
                    <label for="input-confirm-password" class="label">Confirm Password</label>
                  </div>
                  <div id="err">{{errorConfirm}}</div>
                  <div class="col-sm-12">
                    <input
                      id="input-confirm-password"
                      class="form-inputboxes"
                      type="password"
                      size="md"
                      required="required"
                      placeholder="******"
                      v-model="form.cPassword"
                      autocomplete="new-password"
                    />
                  </div>
                </div>
                <div class="form-rows">
                  <div class="col-sm-12">
                    <hr />
                    <button class="form-buttons" type="submit">Sign Up</button>
                  </div>
                </div>
              </b-form>
            </div>
          </div>
        </div>
      </b-container>
    </div>
    <NavBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>
<script>
import NavTop from "../navbars/navbar-top";
import NavBottom from "../navbars/navbar-bottom";
export default {
  name: "registerPage",
  props: ["userToken"],
  components: {
    NavTop,
    NavBottom
  },

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
        admin: "1"
      },
      errorLength: "",
      errorConfirm: ""
    };
  },
  methods: {

    //Method to check password length. Is activated on every keypress in the form inputbox
    checkPasswordLength() {
      if (this.form.password.length < 8) {
        this.errorLength = "Password must be longer than 8 characters long";
      } else if (this.form.password.length >= 8) {
        this.errorLength = "";
      }
    },

    //Method will check if the password and confirm password are the same before the form is submitted.
    checkPasswords(evt) {
      evt.preventDefault();
      if (this.form.password === this.form.cPassword) {
        if (this.form.password.length >= 8) {
          this.go();
        } else {
          this.form.cPassword = "";
          this.form.password = "";
        }
      } else {
        this.errorConfirm = "Passwords Do Not Match";
        this.form.cPassword = "";
      }
    },

    //Method will be called when the form is submitted.
    //Method will insert the user into the database.
    //Method will redirect the user to the settings page after the form is completed.
    go() {
      let url = "http://localhost:5552/insertUser";
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          authorization: this.userToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          account_type: this.form.accountType,
          forename: this.form.firstname,
          surname: this.form.surname,
          password: this.form.password,
          username: this.form.username,
          admin: this.form.admin,
          email: this.form.email
        })
      }).then(response => {
        this.$router.push({ name: "settings" });
        return response.json();
      });
    }
  }
};
</script>
