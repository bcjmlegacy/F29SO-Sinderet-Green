<template>
  <div class="summary">
    <b-row>
      <b-col xs="12">
        <div>
          <h1 class="summary-title">Todays Usage</h1>
        </div>
      </b-col>
    </b-row>
    <div>
      <b-row>
        <b-col xs="4">
          <b-card no-body class="overflow-hidden card-mod">
            <b-row>
              <b-col xs="8">
                <b-card-body>
                  <h3 class="card-title">Energy Usage</h3>
                  <b-card-text class="result">200 KWh</b-card-text>
                  <b-link class="links">See More Details</b-link>
                </b-card-body>
              </b-col>
              <b-col xs="4">
                <div class="image-cont">
                  <img src="../assets/flash.png" class="summary-img" />
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col xs="4">
          <b-card no-body class="overflow-hidden card-mod">
            <b-row>
              <b-col xs="8">
                <b-card-body>
                  <h3 class="card-title">Solar Stored</h3>
                  <b-card-text class="result">200 KWh</b-card-text>
                  <b-link class="links">See More Details</b-link>
                </b-card-body>
              </b-col>
              <b-col xs="4">
                <div class="image-cont">
                  <img src="../assets/battery.png" class="summary-img" />
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col xs="4">
          <b-card no-body class="overflow-hidden card-mod">
            <b-row>
              <b-col xs="8">
                <b-card-body>
                  <h3 class="card-title">Home Temperature</h3>
                  <b-card-text class="result">200 KWh</b-card-text>
                  <b-link class="links">See More Details</b-link>
                </b-card-body>
              </b-col>
              <b-col xs="4">
                <div class="image-cont">
                  <img src="../assets/sun.png" class="summary-img" />
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
//let url = "http://localhost:5552/";

export default {};
</script>
<style>
.summary-title {
  font-size: 2.2em;
  text-align: center;
  padding-bottom: 10px;
}

.summary-img {
  width: 70% !important;
}

.image-cont {
  text-align: left !important;
  width: 100% !important;
  padding: 10px;
  margin-top: 5px;
}

.card-mod {
  margin: 10px 20px;
  border-radius: 20px !important;
  max-width: 310px !important;
  min-width: 310px !important;
  min-height: 120px !important;
}

.result {
  font-size: 1.3em;
  margin-bottom: 0 !important;
}

@media screen and (max-width: 812px) {
  .image-cont {
    text-align: right !important;
    margin-top: 10px;
  }
  .summary-img {
    width: 80% !important;
  }
  .card-mod {
    margin: 10px 40px;
    text-align: center;
  }
}
</style>