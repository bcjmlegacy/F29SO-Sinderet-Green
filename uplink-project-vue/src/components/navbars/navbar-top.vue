<template>
  <!--Top navbar template for website version-->
  <nav class="navbar-top fixed-top">
    <div class="container">
      <div class="flex-nav">
        <router-link :to="{name:'dashboard'}" class="image-cont-nav-top">
          <div>
            <img src="../../assets/home-run.png" alt="Home" class="nav-image" />
          </div>
        </router-link>
        <router-link :to="{name:'add'}" class="image-cont-nav-top">
          <div>
            <img src="../../assets/add.png" alt="Add" class="nav-image" />
          </div>
        </router-link>
        <h5 class="logo-top">
          <router-link class="links-top" :to="{name: 'dashboard'}">uplink</router-link>
        </h5>
        <router-link :to="{name: 'warnings'}" class="image-cont-nav-top">
          <div class="notifications">
            <img src="../../assets/exclamation.png" alt="warnings" class="nav-image" />
            <h5 class="warningCounter">{{warningCounter}}</h5>
          </div>
        </router-link>
        <router-link :to="{name: 'settings'}" class="image-cont-nav-top">
          <div>
            <img src="../../assets/user.png" alt="Profile" class="nav-image" />
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "navbar-top",
  data() {
    return {
      warningCounter: 1
    };
  },
  props: ["userToken"],
  methods: {
    getWarningNumber() { //This will get the number of warnings (notfications)
      let url = "http://localhost:5552/getWarnings";
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
          this.warningCounter = jsonData.length;
        });
    }
  },
  mounted: function() {
    //Method will call this function when the page loads
    this.getWarningNumber();
  }
};
</script>
<style scoped>
.notifications {
  display: inline-block;
  position: relative;
  text-decoration: none;
}
.notifications .warningCounter {
  height: 20px;
  min-width: 20px;
  border-radius: 20px;
  position: absolute;
  top: -14px;
  right: -3px;
  color: white;
  font-size: 1em;
  background-color: #ff4a4a;
}

.warningCounter:hover {
  background-color: #ff2f2f;
}
</style>