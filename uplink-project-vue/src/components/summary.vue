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
              <div class="img-cont">
                <img class="card-img-top img" src="../assets/idea.png" alt="Energy Usage" />
              </div>
              <!--Energy usage per room or overall home usage-->
              <div class="card-body text-center">
                <h5 class="card-title">Energy Usage</h5>
                <p class="card-text">{{energy}} KWh</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card custom-cards">
              <div class="img-cont">
                <img class="card-img-top img" src="../assets/battery.png" alt="Energy Usage" />
              </div>
              <!--Solar Energy Stored for whole home-->
              <div class="card-body text-center">
                <h5 class="card-title">Solar Energy Stored</h5>
                <p class="card-text">{{solar}} KWh</p>
              </div>
            </div>
          </div>
          <div>
            <div class="card custom-cards">
              <div class="img-cont">
                <img class="card-img-top img" src="../assets/sun.png" alt="Energy Usage" />
              </div>
              <!--Temperature of the whole home or for each room-->
              <div class="card-body text-center">
                <h5 class="card-title">Current Temperature</h5>
                <p class="card-text">{{temperature}}&#x2103;</p>
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
  props: ["sumTitle", "energy", "temperature", "solar"] //props/data for the summary section
};
</script>
