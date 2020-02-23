<template>
  <!--Summary section that shows energy, solar usage and temperature for the whole home/room-->
  <div id="stat-cards">
    <div class="container">
      <div class="stats">
        <div class="sub-title-wrapper">
          <!--summary title that will show the room name will be labeled home-->
          <h5 class="display-2 text-center">Todays {{sumTitle}} Usage</h5>
        </div>
        <div class="flex-b">
          <div>
            <div class="card custom-cards">
              <div class="flex-cards">
                <div>
                  <div class="col-width">
                    <div class="img-cont-summary">
                      <img src="../assets/idea.png" class="img-summary" alt="Energy Usage" />
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
                      <h4 class="display-4">KWs</h4>
                      <h5 class="card-text">Used Today</h5>
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
                      <img src="../assets/sun.png" class="img-summary" alt="Energy Usage" />
                    </div>
                    <div class="card-body text-center">
                      <h5 class="card-title">Average Temperature Inside</h5>
                      <h4 class="card-text">{{temperature}}&#x2103;</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="col-width">
                    <div class="card-body text-center slide">
                      <h5 class="card-text">{{temperatures[0].loc}} it's</h5>
                      <h4 class="display-2">{{temperatures[0].temp}}&#x2103;</h4>
                      <p class="card-text">and</p>
                      <h5 class="card-text">{{temperatures[0].currentDescription}}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <router-link class="advanced-links text-center links" to="#">See Advanced Stats</router-link>
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
      temperatures: [],
      currentTemp: ""
    };
  },
  props: ["userToken", "sumTitle", "energy", "temperature", "solar"],
  methods: {
    findRooms() {
      fetch("http://localhost:5552/getRooms", {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: this.userToken
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          for (let room in jsonData) {
            this.temperatures.push({
              temp: Math.floor(Math.random() * (25 - 16 + 1)) + 16,
              currentDescription: "",
              loc: jsonData[room].room_name
            });
          }
        });
    }
    /*
    let i = 0;
    startInterval: function(temp) {
      
      setInterval(function() {
        if (i > temp) {
          i = 0;
        } else {
          i++;
          console.log(this.temperatures[i].loc);
          this.currentTemp = {
            loc: this.temperatures[i].loc,
            temp: this.temperatures[i].temp,
            currentDescription: this.temperatures[i].currentDescription
          };
        }
      }, 10000);
      
    }*/
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
        this.temperatures.push({
          currentDescription: jsonData.currently.summary,
          temp: Math.round(jsonData.currently.temperature),
          loc: "Outside"
        });

        this.findRooms();
        //this.startInterval(this.temperatures.length);
        console.log(this.temperatures);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
