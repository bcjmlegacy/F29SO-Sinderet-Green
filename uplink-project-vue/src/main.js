import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../public/style.css";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
export const bus = new Vue();
new Vue({
  render: h => h(App)
}).$mount("#app");
