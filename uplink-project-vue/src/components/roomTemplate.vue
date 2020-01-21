<template>
  <div class="item">
    <div class="card custom-cards-rooms">
      <div class="img-cont">
        <img class="card-img-top" src="../assets/couchcolor.png" alt="Energy Usage" />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Livingroom</h5>
      </div>
    </div>
  </div>
</template>
<style>
.img-cont {
  text-align: center;
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

.card {
  margin-bottom: 30px !important;
  user-select: none !important;
}

.custom-cards-rooms {
  width: 13rem;
  height: 13rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-rooms:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}
</style>
