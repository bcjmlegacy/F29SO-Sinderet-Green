<template>
  <!--All Devices Card -->
  <div class="item">
    <router-link :to="{name: 'allDevicesPage'}" class="links">
      <div class="card custom-cards-menu">
        <div class="img-cont-menu">
          <img class="card-img-top img-menu" src="../assets/menu.png" alt="Energy Usage" />
        </div>
        <div class="card-body">
          <h5 class="card-title text-center">All Devices</h5>
        </div>
      </div>
    </router-link>
  </div>
</template>