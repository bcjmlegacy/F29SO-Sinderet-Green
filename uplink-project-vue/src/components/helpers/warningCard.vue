<template>
  <div class="col-width-warnings">
    <div class="custom-cards-warnings">
      <div class="img-cont-warnings">
        <img class="img-warnings" src="../../assets/close.png" @click="deleteWarning" />
      </div>
      <router-link
        class="links"
        :to="{
				name: 'device',
				query: {
					deviceID: deviceID,
					deviceName: deviceName,
					deviceImage: deviceImage,
					deviceEnergy: deviceEnergy,
					deviceType: deviceType,
					roomID: roomID
				}
			}"
      >
        <div class="img-cont-summary">
          <img
            :src="require(`../../assets/${deviceImage}.png`)"
            class="img-warning"
            alt="Energy Usage"
          />
        </div>
        <!--Energy card area for data-->
        <div class="card-body text-center">
          <h2 class="card-title">{{deviceName}}</h2>
          <br />
          <h4 class="warning">Warning:</h4>
          <h5 class="card-text tip">{{message}}</h5>
        </div>
      </router-link>
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
    "deviceType",
    "roomID",
    "message",
    "warningID",
    "userToken"
  ],
  methods: {
    //Method will delete the warning selected 
    deleteWarning() {
      if (!confirm("Do really want to delete the warning?")) {
        return false;
      }
      let url = "http://localhost:5552/deleteWarning?id=" + this.warningID;
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          authorization: this.userToken
        }
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          location.reload();
        });
    }
  }
};
</script>

<style scoped>
.col-width-warnings {
  width: 40%;
  padding: 10px;
}

.img-warning {
  width: 25%;
}

.img-warnings {
  width: 10%;
}

.img-cont-warnings {
  text-align: right;
  padding: 10px;
  opacity: 0.8;
  z-index: 10;
}

.img-cont-warnings:hover {
  opacity: 1;
  cursor: pointer;
}

.warning {
  color: #e30000;
}

.custom-cards-warnings {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  transition: 0.2s ease-in-out all !important;
  border: 1px solid grey;
}

.custom-cards-warnings:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

@media screen and (max-width: 1025px) {
  .col-width-warnings {
    width: 40%;
    margin: 5px;
  }
}

@media screen and (max-width: 750px) {
  .col-width-warnings {
    width: 60%;
    margin: 5px;
  }
}

@media screen and (max-width: 750px) {
  .col-width-warnings {
    width: 100%;
  }
}
</style>