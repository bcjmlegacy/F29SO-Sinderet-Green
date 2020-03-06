<template>
  <div>
    <div id="advstats">
      <NavbarTop class="top-show" />
      <div class="bottom-show">
        <div class="logo-back fixed-top">
          <h5 class="logo">
            <router-link class="links" :to="{ name: 'dashboard' }"
              >uplink</router-link
            >
          </h5>
        </div>
      </div>
      <div class="container">
        <div class="sub-title-wrapper">
          <!--summary title that will show the room name will be labeled home-->
          <h5 class="h1-titles text-center">Energy Statistics</h5>
        </div>
        <div class="flex-stats">
          <div class="col-width">
            <div class="img-cont-summary">
              <img
                src="../../assets/energy.png"
                class="img-summary"
                alt="Energy Usage"
              />
            </div>
            <!--Energy card area for data-->
            <div class="card-body text-center">
              <h5 class="card-title">Average Energy Usage Per Day</h5>
              <h4 class="card-text">2000KWh</h4>
            </div>
          </div>

          <div class="col-width">
            <div class="img-cont-summary">
              <img
                src="../../assets/solarpanel.png"
                class="img-summary"
                alt="Energy Usage"
              />
            </div>
            <!--Solar battery card area for data-->
            <div class="card-body text-center">
              <h5 class="card-title">Average Energy Storage Per Day</h5>
              <h4 class="card-text">3000KWh</h4>
            </div>
          </div>
          <div class="cards custom-cards-stats-graph">
            <canvas id="chart"></canvas>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" />
  </div>
</template>

<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";
import Chart from "chart.js";
export default {
  name: "stats",
  components: {
    NavbarTop,
    NavbarBottom
  },
  data() {
    return {
      chartD: {
        type: "line",
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          datasets: [
            {
              label: "Energy Use",
              backgroundColor: "rgba(25, 143, 202, 0.1)",
              borderColor: "rgba(25, 143, 202, 1)",
              borderWidth: 0.7,
              data: [21211, 32221, 33312, 22211, 12121, 32323, 22222]
            },
            {
              label: "Energy Storage(solar)",
              backgroundColor: "rgba(255, 195, 0, 0.1)",
              borderColor: "rgba(255, 195, 0, 1)",
              borderWidth: 0.7,
              data: [42214, 30000, 42134, 25000, 23000, 34312, 33333]
            }
          ]
        },
        lineChartOptions: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ]
          }
        }
      }
    };
  },
  methods: {
    chartData(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.lineChartOptions
      });
    }
  },
  mounted: function() {
    this.chartData("chart", this.chartD);
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

.cards {
  margin: 20px !important;
}

.flex-stats {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.custom-cards-stats {
  width: 20%;
  padding: 20px;
  border-radius: 20px;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-stats:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

.custom-cards-stats-graph {
  width: 70%;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-stats-graph:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

@media screen and (max-width: 1025px) {
  .custom-cards-stats {
    width: 80%;
  }
  .img-stats {
    width: 40%;
  }
  .custom-cards-stats-graph {
    width: 100%;
  }
}
</style>
