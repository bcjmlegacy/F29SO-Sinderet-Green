<template>
  <div>
    <NavbarTop class="top-show" />
    <div id="addDevice">
      <div class="container">
        <h3 class="display-3 text-center">Add Device</h3>
        <div id="form-addDevice">
          <div class="flex-add">
            <div class="card custom-cards-addDevices">
              <div class="img-cont">
                <img src="../assets/light-bulb.png" alt="device icon" class="device-img" />
              </div>
              <div class="text-wrapper">
                <h5 class="card-title text-center">Phillips Hue Lights</h5>
              </div>
              <div class="device-cont">
                <b-form @submit="go">
                  <div class="col-sm-12">
                    <label for="input-device-name" class="label">Device Name</label>
                  </div>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      id="input-device-name"
                      required="required"
                      placeholder="Hue Lights"
                      class="form-inputboxes"
                      v-model="form.deviceName"
                    />
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <label for="input-device-room" class="label">Device Room</label>
                    </div>
                    <div class="col-sm-12">
                      <input
                        type="text"
                        id="input-room-name"
                        required="required"
                        placeholder="Livingroom"
                        class="form-inputboxes"
                        v-model="form.deviceRoom"
                      />
                    </div>
                  </div>
                  <div class="form-rows">
                    <div class="col-sm-12">
                      <button class="form-buttons" type="submit">Add Device</button>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottom class="bottom-show" />
  </div>
</template>
<script>
import NavbarTop from "./navbar-top";
import NavbarBottom from "./navbar-bottom";
export default {
  name: "addDevice",
  components: {
    NavbarTop,
    NavbarBottom
  },
  data() {
    return {
      form: {
        deviceName: "",
        deviceRoom: ""
      }
    };
  },
  methods: {
    go(evt) {
      evt.preventDefault();
    }
  }
};
</script>
<style>
#addDevice {
  margin-top: 100px;
}

#form-addDevice {
  margin-top: 40px;
}
.device-cont {
  margin-top: 0.5rem;
}
.device-img {
  width: 50%;
  padding: 10px;
}
.label {
  font-size: 1.5rem;
}

.custom-cards-addDevices {
  width: 25rem;
  height: 40rem;
  padding: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
}

.custom-cards-addDevices:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

.text-wrapper {
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>