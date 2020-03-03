<template>
  <div class="col-width-warnings">
    <div class="custom-cards-warnings">
      <div class="img-cont-summary">
        <img src="../../assets/sun.png" class="img-warning" alt="Energy Usage" />
      </div>
      <!--Energy card area for data-->
      <div class="card-body text-center">
        <h3 class="card-title">{{deviceName}}</h3>
        <h5 class="card-text tip">{{warningMessage}}</h5>
        <h5 class="card-text tip">{{warningClarified}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WarningCard",
  props: [
    "deviceID",
    "deviceName",
    "deviceImage",
    "deviceEnergy",
    "warningClarified",
    "warningMessage"
  ]
};
</script>

<style scoped>
.col-width-warnings {
  width: 25%;
  padding: 10px;
}

.img-warning {
  width: 30%;
}

.tip {
  font-weight: bold;
}
.custom-cards-warnings {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
  border: 3px solid #e30000;
}

.custom-cards-warnings:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}

@media screen and (max-width: 1025px) {
  .col-width-warnings {
    width: 50%;
    padding: 10;
  }
}
</style>