//dependencies.
import Vue from "vue";
import App from "./App.vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../public/style.css"; //css file

import VueRouter from "vue-router";

import Dash from "./components/dashboardTemplate";
import Room from "./components/roomPageTemplate";
import AddItem from "./components/addPage";
import AddRoom from "./components/addRoom";
import AddDevices from "./components/addDevices";
import Login from "./components/loginTemplate";
//import Register from "./components/registerTemplate";
import AddDeviceMetrics from "./components/addDeviceMetrics";
import EditSchedule from "./components/editDevicePage";
import deviceDetails from "./components/deviceDetails";
import advancedEdit from "./components/advancedDeviceSettings.vue";
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

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "dashboard",
      path: "/",
      component: Dash,
      props: true,
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    },
    {
      name: "login",
      path: "/login",
      component: Login
    },
    {
      name: "room",
      path: "/room/:name",
      component: Room,
      props: true,
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/editSchedule",
      name: "editSchedule",
      component: EditSchedule,
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      },
      props(route) {
        return route.query || {};
      }
    },
    {
      path: "/deviceDetails",
      name: "device",
      component: deviceDetails,
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      },
      props(route) {
        return route.query || {};
      }
    },
    {
      name: "add",
      path: "/add",
      component: AddItem,
      props: true,
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    },
    {
      name: "addDevice",
      path: "/addDevice",
      component: AddDevices,
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    },
    {
      name: "addRoom",
      path: "/addroom",
      component: AddRoom,
      props: true,
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    },
    {
      name: "addDeviceData",
      path: "/addData",
      component: AddDeviceMetrics,
      props(route) {
        return route.query || {};
      },
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    },
    {
      name: "editDevice",
      path: "/edit",
      component: advancedEdit,
      props(route) {
        return route.query || {};
      },
      beforeEnter: (to, from, next) => {
        let token = Vue.$cookies.get("token");
        if (token == null) {
          next({ name: "login" });
        } else {
          next();
        }
      }
    }
  ]
});

//mounts app to the html page - public/index.html
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
