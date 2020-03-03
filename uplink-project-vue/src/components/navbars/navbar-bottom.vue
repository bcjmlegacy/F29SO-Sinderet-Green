<template>
  <!--bottom navbar template for mobile devices-->
  <nav class="navbar-bottom fixed-bottom">
    <div class="container">
      <div class="flex-nav">
        <router-link :to="{name:'add'}" class="image-cont-nav-bottom">
          <div>
            <img src="../../assets/plus.png" alt="Add" class="nav-image-bottom" />
          </div>
        </router-link>

        <router-link :to="{name:'dashboard'}" class="image-cont-nav-bottom">
          <div>
            <img src="../../assets/home-run.png" alt="Home" class="nav-image-bottom" />
          </div>
        </router-link>

        <router-link :to="{name: 'warnings'}" class="image-cont-nav-bottom">
          <div>
            <img src="../../assets/exclamation.png" alt="warnings" class="nav-image-bottom" />
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
  name: "navbar-top"
};
</script>
