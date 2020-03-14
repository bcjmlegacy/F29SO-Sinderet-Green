<template>
  <div>
    <NavbarTop class="top-show" :userToken="userToken" />
    <div class="bottom-show">
      <div class="logo-back fixed-top">
        <h5 class="logo">
          <router-link class="links-top" :to="{ name: 'dashboard' }">uplink</router-link>
        </h5>
      </div>
    </div>
    <div id="addRooms">
      <div class="container">
        <h3 class="h1-titles text-center">Add Sensor</h3>
        <div id="form">
          <div class="flex-add">
            <div class="card custom-cards-addRooms">
              <div class="img-cont">
                <img src="../../assets/switch.png" alt="device icon" class="room-img" />
              </div>
              <div class="cont">
                <b-form @submit="insertSensor">
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <label for="input-sensor-type" class="label">Sensor Type</label>
                    </div>
                    <div class="col-sm-12">
                      <select v-model="form.sensorType" class="form-dropdown" required="required">
                        <option disabled value>Type</option>
                        <option
                          v-for="sensor in sensorTypes"
                          :key="sensor.sensor_type_id"
                          :value="sensor.sensor_type_id"
                        >{{sensor.sensor_type_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <label for="input-room-name" class="label">Sensor Room</label>
                    </div>
                    <div class="col-sm-12">
                      <select v-model="form.sensorRoom" class="form-dropdown" required="required">
                        <option disabled value>Room</option>
                        <option
                          v-for="room in rooms"
                          :key="room.room_id"
                          :value="room.room_id"
                        >{{room.room_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <button class="form-buttons" type="submit">Add Sensor</button>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" :userToken="userToken" />
  </div>
</template>

<script>
import NavbarBottom from "../navbars/navbar-bottom";
import NavbarTop from "../navbars/navbar-top";

export default {
  name: "addSensors",
  props: ["userToken"],
  components: {
    NavbarBottom,
    NavbarTop
  },
  data() {
    return {
      form: {
        sensorType: "",
        sensorRoom: ""
      },
      sensorTypes: [],
      currentSensors: [],
      rooms: []
    };
  },

  methods: {
    insertSensor(evt) {
      let url = "http://localhost:5552/insertSensor";
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          authorization: this.userToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: this.form.sensorType,
          room: this.form.sensorRoom,
          name: this.sensorNameGenerator(
            this.form.sensorType,
            this.form.sensorRoom
          )
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          this.$router.push({ name: "settings" });
        });
      evt.preventDefault();
    },

    getSensorTypes() {
      let url = "http://localhost:5552/getSensorTypes";
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
          this.sensorTypes = jsonData;
        });
    },
    getCurrentSensors() {
      let url = "http://localhost:5552/getSensors";
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
          this.currentSensors = jsonData;
        });
    },
    getRooms() {
      let url = "http://localhost:5552/getRooms";
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
          this.rooms = jsonData;
        });
    },
    sensorNameGenerator(type, roomID) {
      let sensorCounter = 0;
      for (let i in this.currentSensors) {
        if (this.currentSensors[i].sensor_room === roomID) {
          sensorCounter++;
        }
      }
      let roomName = "";
      for (let i in this.rooms) {
        if (roomID === this.rooms[i].room_id) {
          roomName = this.rooms[i].room_name;

          break;
        }
      }
      let senType = "";
      for (let i in this.sensorTypes) {
        if (type === this.sensorTypes[i].sensor_type_id) {
          senType = this.sensorTypes[i].sensor_type_name;
          if (senType.includes("Temperature")) {
            senType = "temp";
          }
          break;
        }
      }
      return (
        roomName + " " + senType.toLowerCase() + " sensor " + sensorCounter
      );
    }
  },
  mounted: function() {
    this.getSensorTypes();
    this.getCurrentSensors();
    this.getRooms();
  }
};
</script>

<style>
</style>