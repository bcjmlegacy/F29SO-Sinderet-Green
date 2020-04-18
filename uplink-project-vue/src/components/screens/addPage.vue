<template>
  <div>
    <NavbarTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="Add">
      <div class="container">
        <h3 class="h1-titles text-center">Add</h3>
        <hr />
        <div class="flex-cont">
          <div class="flex-add">
            <div>
              <router-link class="links" :to="{name:'addRoom'}">
                <div class="card custom-cards-rooms">
                  <div class="img-cont">
                    <img class="card-img-top" src="../../assets/room.png" alt="Add Room" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-center">Add Room</h5>
                  </div>
                </div>
              </router-link>
            </div>
            <div>
              <router-link class="links" :to="{name:'addDevice'}">
                <div class="card custom-cards-rooms">
                  <div class="img-cont">
                    <img class="card-img-top" src="../../assets/light-bulb.png" alt="Add Room" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-center">Add Device</h5>
                  </div>
                </div>
              </router-link>
            </div>
            <div>
              <router-link class="links" :to="{name:'addSensor'}">
                <div class="card custom-cards-rooms">
                  <div class="img-cont">
                    <img class="card-img-top" src="../../assets/switch.png" alt="Add Room" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-center">Add Sensor</h5>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>
<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";

export default {
  name: "addPage",
  props: ["userToken"],
  components: {
    NavbarTop,
    NavbarBottom
  }
};
</script>
