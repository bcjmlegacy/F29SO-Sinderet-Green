<template>
  <b-row>
    <b-col sm="12">
      <div>
        <h1 class="summary-title">Home Usage Today</h1>
      </div>
      <div>
        <h5>
          Energy Usage
          <span>
            <img src="../assets/flash.png" class="summary-img" />
          </span>
        </h5>
      </div>
      <div>
        <h5>
          Solar Stored
          <span>
            <img src="../assets/battery.png" class="summary-img" />
          </span>
        </h5>
      </div>
      <div>
        <h5>
          Home Temperature
          <span>
            <img src="../assets/sun.png" class="summary-img" />
          </span>
        </h5>
      </div>
    </b-col>
  </b-row>
</template>
<style>
.summary-title {
  font-size: 2em;
}

.summary-img {
  width: 5% !important;
}
</style>