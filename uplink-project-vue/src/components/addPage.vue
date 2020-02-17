<template>
  <div>
    <NavbarTop class="top-show" :back="back" />
    <div id="Add">
      <div class="container">
        <h3 class="display-3 text-center">Add Devices or Rooms</h3>
        <div class="flex-cont">
          <div class="flex-add">
            <div>
              <router-link :to="{name:'addRoom'}">
                <div class="card custom-cards-rooms">
                  <div class="img-cont">
                    <img class="card-img-top img-add" src="../assets/room.png" alt="Add Room" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-center">Add Room</h5>
                  </div>
                </div>
              </router-link>
            </div>
            <div>
              <router-link :to="{name:'addDevice'}">
                <div class="card custom-cards-rooms" @click="switchComp('addDevices')">
                  <div class="img-cont">
                    <img class="card-img-top img-add" src="../assets/light-bulb.png" alt="Add Room" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-center">Add Device</h5>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :back="back" />
  </div>
</template>
<script>
import NavbarTop from "./navbar-top";
import NavbarBottom from "./navbar-bottom";

export default {
  name: "addPage",
  props: ["back"],
  components: {
    NavbarTop,
    NavbarBottom
  }
};
</script>
