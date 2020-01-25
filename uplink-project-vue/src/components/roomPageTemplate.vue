<template>
  <div>
    <NavTop class="top-show" />
    <Summary sumTitle="Livingroom" energy="100" solar="1000" temperature="21" />
    <div class="container">
      <div id="rooms">
        <div class="sub-title-wrapper">
          <h3 class="display-4 text-center">Devices</h3>
        </div>
        <div class="flex-rooms">
          <Device deviceName="Hive" device-image="fire" deviceEnergy="10" />
          <Device deviceName="Camera" deviceImage="security-camera" deviceEnergy="20" />
          <Add />
          <AllDevices />
        </div>
      </div>
    </div>
    <NavBottom class="bottom-show" />
  </div>
</template>
<script>
import Summary from "./summary";
import Device from "./deviceCard";
import Add from "./addCard";
import AllDevices from "./allDevices";
import NavTop from "./navbar-top";
import NavBottom from "./navbar-bottom";
export default {
  name: "Room",
  components: {
    Summary,
    Device,
    Add,
    AllDevices,
    NavTop,
    NavBottom
  }
};
</script>
<style>
.flex-rooms {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
}

.item {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 10px;
}

.bottom-show {
  display: none !important;
}

@media screen and (max-width: 1025px) {
  .item {
    margin: 0;
  }
  .top-show {
    display: none !important;
  }
  .bottom-show {
    display: block !important;
  }
}
</style>