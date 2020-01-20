<template>
  <b-col sm="4">
    <b-card no-body class="overflow-hidden card-mod-room">
      <b-row>
        <b-col xs="8">
          <b-card-body>
            <h3 class="card-title-room">Livingroom</h3>
          </b-card-body>
        </b-col>
        <b-col xs="4">
          <div class="image-cont-room">
            <img src="../assets/couchcolor.png" alt="livingroom" class="img" />
          </div>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>
<style>
.img {
  width: 70% !important;
  margin: 10px;
}
.card-title-room {
  margin-left: 10px;
  margin-top: 25px;
}

.card-mod-room {
  margin: 10px 20px;
  max-width: 310px !important;
  min-width: 310px !important;
  min-height: 120px !important;
  max-height: 120px !important;
  border-radius: 20px !important;
  text-align: center;
}

.image-cont-room {
  text-align: left !important;
  width: 100% !important;
}

@media screen and (max-width: 812px) {
  .card-title-room {
    padding-top: 30px;
  }
  .image-cont-room {
    margin-top: 10px;
  }
}
</style>
