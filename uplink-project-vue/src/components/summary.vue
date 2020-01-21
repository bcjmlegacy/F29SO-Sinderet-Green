<template>
  <div id="stat-cards">
    <div class="container justify-content-center">
      <h3 class="display-3">Welcome Back</h3>
      <div class="stats">
        <div class="sub-title-wrapper">
          <h5 class="display-4">Todays Usage</h5>
        </div>
        <b-row>
          <div class="col-sm-4">
            <div class="card custom-cards" style="width: 13rem; height: 20rem; padding: 20px">
              <img class="card-img-top" src="../assets/idea.png" alt="Energy Usage" />
              <div class="card-body">
                <h5 class="card-title">Energy Usage</h5>
                <p class="card-text">200 KWh</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card custom-cards" style="width: 13rem; height: 20rem; padding: 20px;">
              <img class="card-img-top" src="../assets/battery.png" alt="Energy Usage" />
              <div class="card-body">
                <h5 class="card-title">Solar Stored</h5>
                <p class="card-text">200 KWh</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card custom-cards" style="width: 13rem; height: 20rem; padding: 20px;">
              <img class="card-img-top img" src="../assets/sun.png" alt="Energy Usage" />
              <div class="card-body">
                <h5 class="card-title">Home Temperature</h5>
                <p class="card-text">200 KWh</p>
              </div>
            </div>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>
<style>
#stat-cards {
  margin-top: 60px;
}

.stats {
  margin-top: 50px;
}

.sub-title-wrapper {
  text-align: left;
  margin-bottom: 30px;
}

.title-card {
  padding: 20px;
  width: 60rem;
}
.custom-cards {
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}

@media screen and (max-width: 1025px) {
}

@media screen and (max-width: 812px) {
}
</style>