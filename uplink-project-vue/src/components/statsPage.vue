<template>
  <div>
    <div id="advstats">
      <NavbarTop class="top-show" />
      <div class="bottom-show">
        <div class="logo-back fixed-top">
          <h5 class="logo">
            <router-link class="links" :to="{ name: 'dashboard' }">uplink</router-link>
          </h5>
        </div>
      </div>
      <div class="container">
        <div class="sub-title-wrapper">
          <!--summary title that will show the room name will be labeled home-->
          <h5 class="display-2 text-center">Energy Statistics</h5>
        </div>
        <div class="flex-stats">
          <div>
            <div class="cards custom-cards-stats">
              <div class="img-cont-stats">
                <img src="../assets/idea.png" class="img-stats" alt="Energy Usage" />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">Average Energy Usage</h5>
                <h4 class="display-3">2000KWh</h4>
                <h5 class="card-title">This Week</h5>
              </div>
            </div>
          </div>
          <div>
            <div class="cards custom-cards-stats-graph">
              <GChart type="LineChart" :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="stats-energy">
      <div class="container">
        <div class="sub-title-wrapper">
          <!--summary title that will show the room name will be labeled home-->
          <h5 class="display-2 text-center">Solar Statistics</h5>
        </div>
        <div class="flex-stats">
          <div>
            <div class="cards custom-cards-stats">
              <div class="img-cont-stats">
                <img src="../assets/battery.png" class="img-stats" alt="Energy Usage" />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">Average Solar Stored</h5>
                <h4 class="display-3">12000KW</h4>
                <h5 class="card-title">This Week</h5>
              </div>
            </div>
          </div>
          <div>
            <div class="cards custom-cards-stats-graph">
              <GChart type="LineChart" :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" />
  </div>
</template>

<script>
import NavbarTop from "./navbar-top";
import NavbarBottom from "./navbar-bottom";
import { GChart } from "vue-google-charts";
export default {
  name: "stats",
  components: {
    NavbarTop,
    NavbarBottom,
    GChart
  },
  data() {
    return {
      chartData: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      }
    };
  }
};
</script>

<style scoped>
#advstats {
  padding-top: 120px;
  margin-left: 0;
  margin-right: 0;
  padding-bottom: 50px;
}

#stats-energy {
  background-color: #eeeeee;
  padding-top: 50px;
  padding-bottom: 50px;
}

.img-cont-stats {
  text-align: center;
  width: 100%;
}

.img-stats {
  width: 50%;
  padding: 5px;
}

.flex-stats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 40px;
}

.custom-cards-stats {
  width: 20rem;
  height: 23rem;
  padding: 20px;
  border-radius: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-stats:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

.custom-cards-stats-graph {
  width: 55rem;
  height: 23rem;
  padding: 20px;
  border-radius: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-stats-graph:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}
</style>