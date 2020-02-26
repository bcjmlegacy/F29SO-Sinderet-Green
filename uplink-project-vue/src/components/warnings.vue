<template>
  <div id="warnings">
    <NavTop class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
      </div>
    </div>
    <div class="container">
      <div class="sub-title-wrapper">
        <!--summary title that will show the room name will be labeled home-->
        <h5 class="warning-title-text text-center">Warnings</h5>
      </div>
      <div class="warnings-tree">
        <div class="flex-warnings">
          <WarningCard />
          <WarningCard />
          <WarningCard />
        </div>
      </div>
    </div>
    <NavBottom class="bottom-show" />
  </div>
</template>

<script>
import NavTop from "./navbar-top.vue";
import NavBottom from "./navbar-bottom";
import WarningCard from "./warningCard";
export default {
  name: "warnings",
  components: { NavTop, NavBottom, WarningCard }
};
</script>

<style>
#warnings {
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 120px;
  margin-bottom: 50px;
}
.warning-title-text {
  font-size: 3.8em;
}
.warnings-tree {
  margin-top: 20px;
}

.flex-warnings {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media screen and (max-width: 1025px) {
  #warnings {
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 70px;
    margin-top: 80px;
  }
}
</style>