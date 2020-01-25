<template>
  <div class="item">
    <div class="card custom-cards-rooms" @click="switchComp('Room'); updateRoom(roomName)">
      <div class="img-cont">
        <img class="card-img-top" :src="require(`../assets/${roomImage}.png`)" alt="Energy Usage" />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">{{roomName}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: "roomCard",
  props: ["roomName", "roomImage"],
  methods: {
    switchComp(comp) {
      bus.$emit("switchComp", comp);
    },
    updateRoom(room) {
      bus.$emit("updateRoom", room);
    }
  }
};
</script>


<style>
.img-cont {
  text-align: center;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

.card {
  margin-bottom: 30px !important;
  user-select: none !important;
}

.custom-cards-rooms {
  width: 11rem;
  height: 12rem;
  padding: 1px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-rooms:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}
</style>
