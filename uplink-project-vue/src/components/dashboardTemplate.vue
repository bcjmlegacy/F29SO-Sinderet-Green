<template>
  <div id="dash">
    <b-container>
      <div class="title-container">
        <h1 class="title">Welcome Back ...</h1>
      </div>
      <div id="summary">
        <Summary />
      </div>
      <div id="rooms">
        <!--Dummy Rooms-->
        <b-row id="current-rooms">
          <Room />
          <Room />
          <Room />
          <Room />
        </b-row>
      </div>
      <b-row>
        <b-col sm="11">
          <div class="dash-link">
            <b-link href="#" class="links">View All Devices</b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Summary from "./summary";
import Room from "./roomTemplate";
export default {
  name: "dashboard-components",
  components: { Room, Summary }
};
</script>

<style>
#dash {
  padding-top: 90px;
}

#summary {
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 20px;
  margin-bottom: 30px;
}

#rooms {
  margin-top: 60px;
}

.title {
  font-size: 3em;
}
.title-container {
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 0;
}
.rooms {
  margin: 30px !important;
  margin-top: 0 !important;
}

.room-title {
  font-size: 1.3em;
}
.image-container {
  text-align: center;
}

.text-container {
  text-align: center;
  padding: 14%;
  width: 100%;
}

.card-img {
  width: 40% !important;
  padding: 0 !important;
  margin: 0 !important;
}

.room-container {
  border: solid 1px grey;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin: 0 !important;
  border-radius: 40px;
}

.dash-link {
  text-align: center;
}
</style>