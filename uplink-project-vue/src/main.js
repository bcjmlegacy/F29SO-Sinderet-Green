//dependencies.

import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../public/style.css"; //css file

//bootstrap vue tags can be used
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

//data controller variable.
export const bus = new Vue();

//mounts app to the html page - public/index.html
new Vue({
  render: h => h(App)
}).$mount("#app");
