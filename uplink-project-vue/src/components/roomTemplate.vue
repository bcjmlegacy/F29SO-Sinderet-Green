<template>
  <!--Room Card-->
  <div class="item">
    <!--Switch to the room page and also set the current room to the roomName said on the card clicked-->
    <div class="card custom-cards-rooms" @click="switchComp('Room'); updateRoom(roomName)">
      <div class="img-cont">
        <!--Image of the room from prop roomImage-->
        <img class="card-img-top" :src="require(`../assets/${roomImage}.png`)" alt="Energy Usage" />
      </div>
      <!--Room name from prop roomName-->
      <div class="card-body">
        <h5 class="card-title text-center">{{roomName}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
//Bus to keep track of the current page and to also set the room data to display on that page
import { bus } from "../main";
export default {
  name: "roomCard",
  props: ["roomName", "roomImage"], //props/data required for this card
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
/**Styling for this card */
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

@media screen and (max-width: 1025px) {
  .custom-cards-rooms {
    width: 10rem;
  }
}
</style>
