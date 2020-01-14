<template>
  <div id="dash">
    <b-container>
      <h1 class="title">Welcome Back ...</h1>
      <div id="rooms">
        <!--Dummy Rooms-->
        <b-row>
          <b-col sm="5">
            <b-card>
              <b-row class="cards">
                <b-col sm="6">
                  <div class="image-container">
                    <img src="../assets/couchcolor.png" class="card-img" />
                  </div>
                </b-col>
                <b-col sm="6">
                  <div class="text-container">
                    <h2 class="card-title">Livingroom</h2>
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col sm="5">
            <b-card>
              <b-row class="cards">
                <b-col sm="6">
                  <div class="image-container">
                    <img src="../assets/couchcolor.png" class="card-img" />
                  </div>
                </b-col>
                <b-col sm="6">
                  <div class="text-container">
                    <h2 class="card-title">Livingroom</h2>
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
#dash {
  padding-top: 120px;
}

#rooms {
  margin-top: 60px;
}

.title {
  font-size: 4em;
}

.cards {
  border-radius: 30px !important;
  width: 100%;
}

.card-title {
  text-align: center;
  font-size: 2em;
}

.image-container {
  text-align: center;
  width: 100%;
}

.text-container {
  text-align: center;
  padding: 14%;
  width: 100%;
}

.card-img {
  width: 50% !important;
}
</style>