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

//cookies
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config("7d");

// set global cookie
Vue.$cookies.set("theme", "default");
Vue.$cookies.set("hover-time", "1s");

//data controller variable.
export const bus = new Vue();

//mounts app to the html page - public/index.html
new Vue({
	render: h => h(App)
}).$mount("#app");
