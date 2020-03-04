<template>
  <!--Summary section that shows energy, solar usage and temperature for the whole home/room-->
  <div id="stat-cards">
    <div class="container">
      <div class="stats">
        <div class="sub-title-wrapper">
          <!--summary title that will show the room name will be labeled home-->
          <h5 class="display-2 text-center">Todays {{sumTitle}} Usage</h5>
          <hr />
        </div>
        <div class="flex-b-rooms">
          <div class="col-width">
            <div class="img-cont-summary">
              <img src="../../assets/idea.png" class="img-summary" alt="Energy Usage" />
            </div>
            <!--Energy card area for data-->
            <div class="card-body text-center">
              <h5 class="card-title">Current Energy Usage</h5>
              <h3 class="card-text">{{energy}}KWh</h3>
            </div>
          </div>

          <div class="col-width">
            <div class="img-cont-summary">
              <img src="../../assets/sun.png" class="img-summary" alt="Energy Usage" />
            </div>
            <!--Temperature card area for data-->
            <div class="card-body text-center">
              <h5 class="card-title">{{sumTitle}} temperature</h5>
              <h3 class="card-text">{{temperature}}&#x2103;</h3>
            </div>
          </div>
        </div>
        <hr />
        <div class="text-center">
          <router-link
            class="advanced-links text-center links"
            :to="{name: 'stats'}"
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
    getIcon() {
      let hours = new Date().getHours();
      let mins = new Date().getMinutes();
      console.log(hours + ":" + mins);
      if (hours >= 8 && hours <= 17) this.dayNightIcon = "sun";
      if ((hours >= 18 && hours <= 24) || (hours >= 0 && hours <= 7))
        this.dayNightIcon = "moon";
    }
  },
  mounted: function() {
    //Dark sky api to get data for outside weather. Set to Edinburgh
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
