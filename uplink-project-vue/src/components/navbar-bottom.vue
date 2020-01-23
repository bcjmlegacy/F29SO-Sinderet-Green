<template>
  <nav class="navbar fixed-bottom">
    <div class="container">
      <div class="flex-nav">
        <div class="image-cont-nav">
          <img src="../assets/plus.png" alt="profile" class="nav-image-bottom" />
        </div>
        <div class="image-cont-nav">
          <img src="../assets/report.png" alt="profile" class="nav-image-bottom" />
        </div>
        <div class="image-cont-nav">
          <h4 class="logo-small">uplink</h4>
        </div>
        <div class="image-cont-nav">
          <img src="../assets/exclamation.png" alt="profile" class="nav-image-bottom" />
        </div>
        <div class="image-cont-nav">
          <img src="../assets/user.png" alt="profile" class="nav-image-bottom" />
        </div>
      </div>
    </div>
  </nav>
</template>
<style>
.flex-nav {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  flex-flow: row wrap !important;
  justify-content: space-between !important;
}

.nav-item {
  padding: 10px;
}

.navbar {
  padding: 0 !important;
  background-color: white;
  box-shadow: 0 0px 25px rgba(0, 0, 0, 0.3) !important;
}

.nav-image-bottom {
  width: 70%;
}

.logo-small {
  font-family: "Harlow-solid";
  text-align: center;
  font-size: 1.1em;
  padding-top: 10%;
  margin: 0;
}
.image-cont-nav {
  text-align: center;
  width: 20%;
  padding: 15px;
  opacity: 0.5;
}

.image-cont-nav:hover {
  background-color: #f5f5f5;
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 12px 10px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

@media screen and (max-width: 1025px) {
  .image-cont-nav {
    width: 20%;
  }
}

@media screen and (max-width: 812px) {
  .nav-image {
    width: 80%;
  }
}
</style>