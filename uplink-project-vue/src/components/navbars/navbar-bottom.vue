<template>
  <!--bottom navbar template for mobile devices-->
  <nav class="navbar-bottom fixed-bottom">
    <div class="container">
      <div class="flex-nav">
        <router-link :to="{name:'add'}" class="image-cont-nav-bottom">
          <div>
            <img src="../../assets/add.png" alt="Add" class="nav-image-bottom" />
          </div>
        </router-link>

        <router-link :to="{name:'dashboard'}" class="image-cont-nav-bottom">
          <div>
            <img src="../../assets/home-run.png" alt="Home" class="nav-image-bottom" />
          </div>
        </router-link>

        <router-link :to="{name: 'warnings'}" class="image-cont-nav-bottom">
          <div class="notifications">
            <img src="../../assets/exclamation.png" alt="warnings" class="nav-image-bottom" />
            <h5 class="warningCounter">{{warningCounter}}</h5>
          </div>
        </router-link>
        <router-link :to="{name: 'settings'}" class="image-cont-nav-bottom">
          <div>
            <img src="../../assets/user.png" alt="Profile" class="nav-image-bottom" />
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
      warningCounter: ""
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
    //Method will get called on page load
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
  padding-left: 3px;
  padding-right: 3px;
  min-width: 17px;
  border-radius: 25px;
  position: absolute;
  text-align: center;
  top: -10px;
  right: -12px;
  color: white;
  font-size: 0.9em;
  background-color: #ff4a4a;
}

.warningCounter:hover {
  background-color: #ff2f2f;
}
</style>
