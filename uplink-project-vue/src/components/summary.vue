<template>
  <!--Summary section that shows energy, solar usage and temperature for the whole home/room-->
  <div id="stat-cards">
    <div class="container">
      <div class="stats">
        <div class="sub-title-wrapper">
          <!--summary title that will show the room name will be labeled home-->
          <h5 class="display-2 text-center">Todays Home Usage</h5>
        </div>
        <div class="flex-b">
          <div>
            <div class="card custom-cards">
              <div class="flex-cards">
                <div>
                  <div class="col-width">
                    <div class="img-cont-summary">
                      <img src="../assets/idea.png" class="img" alt="Energy Usage" />
                    </div>
                    <div class="card-body text-center">
                      <h5 class="card-title">Current Energy Usage</h5>
                      <h4 class="card-text">{{energy}}KWh</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="col-width">
                    <div class="card-body text-center">
                      <h4 class="display-2">2000</h4>
                      <h4 class="display-4">KWh</h4>
                      <h5 class="card-text">Used Today</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card custom-cards">
              <div>
                <div class="flex-cards">
                  <div>
                    <div class="col-width">
                      <div class="img-cont-summary">
                        <img src="../assets/battery.png" class="img" alt="Energy Usage" />
                      </div>
                      <div class="card-body text-center">
                        <h5 class="card-title">Solar Stored Today</h5>
                        <h4 class="card-text">{{solar}}KWh</h4>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="col-width">
                      <div class="card-body text-center">
                        <h4 class="display-2">60%</h4>
                        <h5 class="card-text">charged</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card custom-cards">
              <div class="flex-cards">
                <div>
                  <div class="col-width">
                    <div class="img-cont-summary">
                      <img src="../assets/sun.png" class="img" alt="Energy Usage" />
                    </div>
                    <div class="card-body text-center">
                      <h5 class="card-title">Inside Temperature</h5>
                      <h4 class="card-text">{{temperature}}&#x2103;</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="col-width">
                    <div class="card-body text-center">
                      <h5 class="card-text">Outside it's</h5>
                      <h4 class="display-2">{{weather.temp}}&#x2103;</h4>
                      <h5 class="card-text">{{weather.currentDescription}}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Summary",
  data() {
    return {
      weather: ""
    };
  },
  props: ["sumTitle", "energy", "temperature", "solar"],
  methods: {
    findIcon(data) {
      data = 0;
      data;
    }
  },
  mounted: function() {
    fetch("https://dark-sky.p.rapidapi.com/55.9716,3.6026?lang=en&units=auto", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "dark-sky.p.rapidapi.com",
        "x-rapidapi-key": "39c6b84121mshcccbac8f083af53p11df54jsn38030202a7d6"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.weather = {
          currentDescription: jsonData.currently.summary,
          currentIcon: this.findIcon(jsonData.currently.icon),
          temp: Math.round(jsonData.currently.temperature)
        };
        console.log(this.weather);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
#stat-cards {
  padding-top: 100px;
  padding-bottom: 30px;
  background-color: #e7e7e7;
}

.img {
  padding: 15px;
  width: 80%;
  text-align: center;
}

.img-cont-summary {
  text-align: center;
  width: 100%;
}

.col-width {
  width: 12rem;
}

.flex-b {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: space-around !important;
  align-items: flex-start !important;
}

.stats {
  margin-top: 50px;
}

.sub-title-wrapper {
  margin-bottom: 30px;
}

.flex-cards {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  align-items: center !important;
}

.custom-cards {
  width: 28rem;
  height: 20rem;
  padding: 1px;
  margin: 5px;
  border-radius: 20px;
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
    padding-top: 50px;
    padding-bottom: 20px;
  }
  .custom-cards {
    width: 24rem;
  }
  .flex-b {
    justify-content: space-evenly !important;
  }
  .col-width {
    width: 11rem;
  }
  .img {
    width: 70%;
  }
}
</style>
