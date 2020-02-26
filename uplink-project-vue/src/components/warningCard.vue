<template>
  <div class="item">
    <div class="card custom-cards-warnings">
      <div class="flex-cards">
        <div>
          <div class="col-width">
            <div class="img-cont">
              <img src="../assets/idea.png" class="img-warning" alt="Warning-Device-Img" />
            </div>
          </div>
        </div>
        <div>
          <div class="col-width-warnings">
            <div class="card-body text-center">
              <h2 class="card-title-warning">Livingroom-Lights</h2>
              <h4 class="card-subtitle-warning">On for Too Long</h4>
              <h4 class="warning-text">Uptime --> 50mins</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WarningCard",
  props: ["deviceID", "deviceName", "deviceImage", "deviceEnergy"]
};
</script>

<style scoped>
.img-cont-warning {
  text-align: center;
}

.img-warning {
  width: 100%;
  padding: 1px;
}

.card {
  margin-bottom: 30px !important;
  user-select: none !important;
}

.col-width-warnings {
  width: 40rem;
}

.card-title-warning {
  font-size: 2.5em;
  padding-bottom: 3px;
}
.card-subtitle-warning {
  padding-top: 2px;
  padding-bottom: 2px;
}

.warning-text {
  font-size: 1.9em;
  font-weight: bold;
}

.custom-cards-warnings {
  width: 60rem;
  min-height: 11rem;
  max-height: 20rem;
  padding: 1px;
  border-radius: 20px;
  background-color: white !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.22) !important;
  transition: 0.2s ease-in-out all !important;
  border: 3px solid #e30000;
}

.custom-cards-warnings:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
  cursor: pointer !important;
}

@media screen and (max-width: 1025px) {
  .custom-cards-warnings {
    width: 20rem;
  }
  .col-width-warnings {
    width: 20rem;
  }
  .card-title-warning {
    font-size: 1.5em;
  }
  .warning-text {
    font-size: 1.5em;
  }
  .card-subtitle-warning {
    font-size: 1.3em;
  }
}
</style>