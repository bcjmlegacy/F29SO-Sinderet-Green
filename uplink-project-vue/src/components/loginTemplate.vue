<template>
  <div id="loginCard">
    <b-row>
      <b-col sm="12">
        <b-container>
          <b-card-text>
            <h1 class="form-title">Login</h1>
          </b-card-text>
          <b-card-text>
            <div id="form">
              <b-form @submit="ss">
                <b-row class="rows">
                  <b-col sm="3">
                    <label for="input-username" class="labels">Username:</label>
                  </b-col>
                  <b-col sm="7">
                    <b-form-input
                      id="input-username"
                      placeholder="Cheerypal"
                      size="md"
                      required="required"
                      type="text"
                      class="inputboxes"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="rows">
                  <b-col sm="3">
                    <label for="input-password" class="labels">Password:</label>
                  </b-col>
                  <b-col sm="7">
                    <b-form-input
                      id="input-password"
                      type="password"
                      required="required"
                      placeholder="*********"
                      size="md"
                      class="inputboxes"
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
                    >Remember Me</b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row class="rows">
                  <b-col sm="7" offset-sm="3">
                    <b-button class="but">Submit</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </b-card-text>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script></script>

<style>
#loginCard {
  padding: 20px 50px;
  margin-top: 300px;
  margin-left: 30%;
  margin-right: 30%;

  /* border: solid 1px #005872;*/
}

.form-title {
  text-align: center;
  font-size: 3.2em;
  padding-bottom: 10px;
}

.labels {
  float: right;
  color: #000;
  font-size: 1.4em !important;
}

.rows {
  text-align: center;
  padding-top: 10px;
}

.check {
  float: left !important;
}

.but {
  float: left;
  width: 100%;
  font-size: 1.3em !important;
  background-color: transparent !important;
  color: #000 !important;
  border: solid 1px #005872 !important;
  border-radius: 30 !important;
}

.but:focus {
  box-shadow: none !important;
  outline: none !important;
}

.inputboxes {
  border: solid 1px #005872 !important;
  border-radius: 40 !important;
  outline: none !important;
}

@media screen and (max-width: 1024px) {
  #loginCard {
    margin-left: 5%;
    margin-right: 5%;
  }
}

@media screen and (max-width: 812px) {
  #loginCard {
    padding-top: 150px;
  }
  .labels {
    float: left;
  }
  .but {
    float: none;
  }
}
</style>
