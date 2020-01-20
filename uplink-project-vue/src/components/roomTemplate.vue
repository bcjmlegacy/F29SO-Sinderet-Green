<template>
  <div id="room-cards">
    <b-col xs="4">
      <div class="custom-cards-rooms">
        <div class="img-cont">
          <img src="../assets/couchcolor.png" alt="Livingroom" class="img-rooms" />
          <div class="text-wrapper">
            <h4 class="card-title">Livingroom</h4>
          </div>
        </div>
      </div>
    </b-col>
  </div>
</template>
<style>
.img-rooms {
  width: 40%;
  margin: 10px;
}

#room-cards {
  margin: 1%;
}

.custom-cards-rooms {
  height: 150px;
  width: 200px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22);
  transition: 0.2s ease-in-out all;
}

.custom-cards-rooms:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  cursor: pointer;
}
</style>
