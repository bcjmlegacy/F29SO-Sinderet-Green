<template>
  <div>
    <NavbarTop :userToken="userToken" class="top-show" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="p404">
      <div class="container">
        <div class="flex-404">
          <h1 class="display-1">404</h1>
          <h1 class="text-404">Page Not Found</h1>
          <router-link :to="{name: 'dashboard'}" class="links-404">Back to Dashboard</router-link>
        </div>
      </div>
    </div>
    <NavbarBottom :userToken="userToken" class="bottom-show" />
  </div>
</template>

<script>
import NavbarTop from "../navbars/navbar-top";
import NavbarBottom from "../navbars/navbar-bottom";
export default {
  name: "404",
  components: {
    NavbarTop,
    NavbarBottom
  },
  props: ["userToken"]
};
</script>

<style>
#p404 {
  margin-top: 120px;
  margin-bottom: 50px;
  height: 80vh;
}

.display-1 {
  font-size: 10em !important;
}

.links-404 {
  text-decoration: none;
  color: #198fca;
  font-size: 1.8em;
  padding-top: 100px;
}

.links-404:hover {
  cursor: pointer;
  color: #23aef3;
  text-decoration: none;
}

.flex-404 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.text-404 {
  font-size: 2em;
}
</style>