<template>
  <!--Add card 
    Takes custom-cards-menu class from allDevices.vue
  -->
  <div class="item">
    <div class="card custom-cards-menu" @click="switchComp('AddItem')">
      <div class="img-cont-plus">
        <img class="card-img-top img-plus" src="../assets/plus.png" alt="Energy Usage" />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Add</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: "addCard",
  methods: {
    switchComp(comp) {
      //Switch component
      bus.$emit("switchComp", comp);
    }
  }
};
</script>
<style>
.img-plus {
  opacity: 0.4 !important;
  padding: 10px;
}
.img-cont-plus {
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0;
}
</style>
    