<template>
  <div id="stat-cards">
    <h1 class="title">Welcome Back Euan</h1>
    <div id="stats">
      <b-row class="justify-content-md-center">
        <b-col cols="3">
          <div class="custom-cards">
            <div class="img-cont">
              <img src="../assets/idea.png" alt="Energy Usage" class="img" />
              <div class="text-wrapper">
                <h4 class="card-title">Energy Usage</h4>
                <h5 class="sub-title">200 KWh</h5>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="3" class="custom-cols">
          <div class="custom-cards">
            <div class="img-cont">
              <img src="../assets/battery.png" alt="Energy Usage" class="img" />
              <div class="text-wrapper">
                <h4 class="card-title">Energy Usage</h4>
                <h5 class="sub-title">200 KWh</h5>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="3">
          <div class="custom-cards">
            <div class="img-cont">
              <img src="../assets/sun.png" alt="Energy Usage" class="img" />
              <div class="text-wrapper">
                <h4 class="card-title">Home Temperature</h4>
                <h5 class="sub-title">200 KWh</h5>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<style>
#stat-cards {
  margin-top: 100px;
  margin-right: 10%;
  margin-left: 10%;
}

#stats {
  padding: 20px;
  margin: 20px;
}

.title {
  font-size: 3.2em;
  padding: 10px;
  text-align: left;
  margin-left: 14%;
}

.card-title {
  font-size: 1.4em;
}

.sub-title {
  font-size: 1.2em;
}

.img-cont {
  text-align: center;
}

.img {
  width: 35%;
  margin: 10px;
}

.text-wrapper {
  margin-top: 4%;
}

.custom-cols {
  margin-left: 0%;
  margin-right: 0%;
}

.custom-cards {
  height: 200px;
  width: 200px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22);
  transition: 0.2s ease-in-out all;
}

.custom-cards:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  cursor: pointer;
}

@media screen and (max-width: 1025px) {
  .custom-cols {
    margin-left: 0%;
    margin-right: 0%;
  }
  .card-title {
    font-size: 1.1em;
  }

  .sub-title {
    font-size: 1em;
  }

  .title {
    font-size: 2.8em;
    padding: 1px;
    margin-left: 15%;
  }

  .custom-cards {
    height: 170px;
    width: 170px;
  }
  #stats {
    margin: 0px;
  }
  #stat-cards {
    margin-right: 0;
    margin-left: 0;
  }
}

@media screen and (max-width: 812px) {
  .custom-cols {
    margin-left: 6%;
    margin-right: 6%;
  }
  .custom-cards {
    height: 135px;
    width: 100px;
  }

  .title {
    margin-left: 5%;
  }

  #stats {
    margin: 0px;
  }
}
</style>