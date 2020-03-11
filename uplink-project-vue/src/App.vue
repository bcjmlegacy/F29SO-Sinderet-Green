<!--
Main controller for the website
Euan Gordon
-->
<template>
  <!--This is the section that will keep a hold of the current template that is being displayed-->
  <div id="app">
    <router-view :userToken="this.$cookies.get('token')" />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
