<template>
  <div>
    <NavbarTop class="top-show" />
    <div id="addRooms">
      <div class="container">
        <h3 class="display-3 text-center">Add Devices or Rooms</h3>
        <div class="flex-cont">
          <div class="flex-add">
            <div>
              <div class="card custom-cards-rooms">
                <div class="img-cont">
                  <img class="card-img-top img-add" src="../assets/room.png" alt="Add Room" />
                </div>
                <div class="card-body">
                  <h5 class="card-title text-center">Add Room</h5>
                </div>
              </div>
            </div>
            <div>
              <div class="card custom-cards-rooms">
                <div class="img-cont">
                  <img class="card-img-top img-add" src="../assets/light-bulb.png" alt="Add Room" />
                </div>
                <div class="card-body">
                  <h5 class="card-title text-center">Add Device</h5>
                </div>
              </div>
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
export default {
  name: "addPage",
  components: {
    NavbarTop,
    NavbarBottom
  }
};
</script>
<style>
#addRooms {
  margin-top: 130px;
}

.flex-cont {
  margin-top: 80px;
}

.flex-add {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
  align-items: center !important;
}

.img-add {
  padding: 10px;
}
</style>