<template>
  <!--Summary section that shows energy, solar usage and temperature for the whole home/room-->
  <div id="stat-cards">
    <div class="container">
      <div class="stats">
        <div class="sub-title-wrapper">
          <!--summary title that will show the room name will be labeled home-->
          <h1 class="h1-titles text-center">Todays Usage</h1>
          <hr />
        </div>
        <div class="flex-b">
          <div class="col-width">
            <div class="img-cont-summary">
              <img src="../../assets/energy.png" class="img-summary" alt="Energy Usage" />
            </div>
            <!--Energy card area for data-->
            <div class="card-body text-center">
              <h5 class="card-title">Current Energy Usage</h5>
              <h4 class="card-text">{{energy}}KWh</h4>
            </div>
          </div>

          <div class="col-width">
            <div class="img-cont-summary">
              <img src="../../assets/solarpanel.png" class="img-summary" alt="Energy Usage" />
            </div>
            <!--Solar battery card area for data-->
            <div class="card-body text-center">
              <h5 class="card-title">Solar Stored Today</h5>
              <h4 class="card-text">{{solar}}KWh</h4>
            </div>
          </div>

          <div class="col-width">
            <div class="img-cont-summary">
              <img src="../../assets/thermometer.png" class="img-summary" alt="Energy Usage" />
            </div>
            <!--Temperature card area for data-->
            <div class="card-body text-center">
              <h5 class="card-title">Average Temperature Inside</h5>
              <h4 class="card-text">{{temperature}}&#x2103;</h4>
            </div>
          </div>

          <div class="col-width">
            <div class="img-cont-summary">
              <img
                :src="require(`../../assets/${dayNightIcon}.png`)"
                class="img-summary"
                alt="Energy Usage"
              />
            </div>
            <!--Temperature card area for data-->
            <div class="card-body text-center slide">
              <h5 class="card-text">Outside it's</h5>
              <h4 class="card-text">{{temperatures.temp}}&#x2103;</h4>
              <h5 class="card-text">{{temperatures.currentDescription}}</h5>
            </div>
          </div>
        </div>
        <hr />
        <div class="text-center">
          <router-link
            :to="{name: 'stats'}"
            class="advanced-links text-center links"
          >See Advanced Stats</router-link>
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
      temperatures: "",
      dayNightIcon: "sun"
    };
  },
  props: ["userToken", "sumTitle", "energy", "temperature", "solar"],
  methods: {
    //Method will change the icon depending onn the type of day.
    getIcon() {
      let hours = new Date().getHours();
      let mins = new Date().getMinutes();
      console.log(hours + ":" + mins);
      if (hours >= 8 && hours <= 17) this.dayNightIcon = "sun";
      if ((hours >= 18 && hours <= 24) || (hours >= 0 && hours <= 7))
        this.dayNightIcon = "half-moon";
    }
  },

  mounted: function() {
    //Dark sky api to get data for outside weather. Set to Edinburgh
    fetch("https://dark-sky.p.rapidapi.com/55.9533,3.1883?lang=en&units=auto", {
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
        this.temperatures = {
          currentDescription: jsonData.currently.summary,
          temp: Math.round(jsonData.currently.temperature),
          loc: "Outside"
        };
        this.getIcon();
        //this.findRooms();
        //this.startInterval(this.temperatures.length);
        console.log(this.temperatures);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
