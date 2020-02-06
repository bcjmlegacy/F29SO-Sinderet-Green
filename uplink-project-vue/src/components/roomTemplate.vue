<template>
  <!--Room Card-->
  <div class="item">
    <!--Switch to the room page and also set the current room to the roomName said on the card clicked-->
    <router-link to="/room" @click="updateRoom(roomName)">
      <div class="card custom-cards-rooms">
        <div class="img-cont">
          <!--Image of the room from prop roomImage-->
          <img class="card-img-top" :src="require(`../assets/${roomImage}.png`)" alt="Energy Usage" />
        </div>
        <!--Room name from prop roomName-->
        <div class="card-body">
          <h5 class="card-title text-center">{{roomName}}</h5>
        </div>
      </div>
    </router-link>
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
