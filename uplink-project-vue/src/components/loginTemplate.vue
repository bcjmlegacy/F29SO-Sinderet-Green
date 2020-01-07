<template>
  <div id="loginCard">
    <b-row>
      <b-col sm="12">
        <b-container>
          <b-card-text><h1 class="form-title">Login</h1></b-card-text>
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
                    >
                    </b-form-input>
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
                      size="md"
                    >
                    </b-form-input>
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
                    >
                      Remember Me
                    </b-form-checkbox>
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
  padding-top: 300px;
  margin-left: 30%;
  margin-right: 30%;
}

.form-title {
  text-align: center;
  font-size: 3.2em;
  padding-top: 20px;
  padding-bottom: 10px;
}

.labels {
  float: right;
  font-size: 1.3em !important;
}

.rows {
  text-align: center;
  padding-top: 10px;
}

.check {
  float: left !important;
}

.but-row {
  float: left;
}
.but-left {
  margin-left: 0;
}

.but {
  float: left;
  width: 100%;
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
