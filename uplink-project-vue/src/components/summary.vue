<template>
  <div id="stat-cards">
    <div class="container">
      <h3 class="display-3 text-center">Welcome Back</h3>
      <div class="stats">
        <div class="sub-title-wrapper">
          <h5 class="display-4 text-center">Todays Usage</h5>
        </div>
        <div class="flex-b">
          <div>
            <div class="card custom-cards">
              <div class="img-cont">
                <img class="card-img-top img" src="../assets/idea.png" alt="Energy Usage" />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">Energy Usage</h5>
                <p class="card-text">200 KWh</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card custom-cards">
              <div class="img-cont">
                <img class="card-img-top img" src="../assets/battery.png" alt="Energy Usage" />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">Solar Stored</h5>
                <p class="card-text">1200 KWh</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card custom-cards">
              <div class="img-cont">
                <img class="card-img-top img" src="../assets/sun.png" alt="Energy Usage" />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">Home Temperature</h5>
                <p class="card-text">20&#x2103;</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card custom-cards">
              <div class="img-cont">
                <img class="card-img-top img-menu" src="../assets/report.png" alt="Energy Usage" />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">Advanced Stats</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
#stat-cards {
  margin-top: 100px;
}

.img {
  padding: 10px;
}

.flex-b {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
}

.stats {
  margin-top: 50px;
}

.sub-title-wrapper {
  margin-bottom: 30px;
}

.custom-cards {
  width: 13rem;
  height: 17rem;
  padding: 5px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}

@media screen and (max-width: 1025px) {
  #stat-cards {
    margin-top: 50px;
  }
}
</style>