<template>
  <div class="item">
    <div class="card custom-cards-menu">
      <div class="img-cont-menu">
        <img class="card-img-top img-menu" src="../assets/menu.png" alt="Energy Usage" />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">All Devices</h5>
      </div>
    </div>
  </div>
</template>
<style>
.img-menu {
  opacity: 0.4 !important;
  padding: 10px;
}
.img-cont-menu {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0;
}

.custom-cards-menu {
  width: 10rem;
  height: 11rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-menu:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}
</style>