//dependencies.
import Vue from "vue";
import App from "./App.vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../public/style.css"; //css file

import VueRouter from "vue-router";

//Main screen imports.
import Dash from "./components/screens/dashboardTemplate";
import Room from "./components/screens/roomPageTemplate";
import AddItem from "./components/screens/addPage";
import AddRoom from "./components/screens/addRoom";
import AddDevices from "./components/screens/addDevices";
import AddSensor from "./components/screens/addSensors";
import Login from "./components/screens/loginTemplate";
//import Register from "./components/registerTemplate";
import AddDeviceMetrics from "./components/screens/addDeviceMetrics";
import EditSchedule from "./components/screens/editDevicePage";
import deviceDetails from "./components/screens/deviceDetails";
import advancedEdit from "./components/screens/advancedDeviceSettings";
import Warnings from "./components/screens/warnings";
import AdvancedStats from "./components/screens/statsPage";
import Settings from "./components/screens/settingsTemplate";
import AllDevicesPage from "./components/screens/allDevicesPage";
import Automate from "./components/screens/automateDevice";
import NotFound from "./components/screens/404";
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

// Routing system. This will take the name of the link, path that will be generated in the url for it and the component that will be used.
// The routing system will make use of checks to make sure that the user is logged in if the user is not logged in then the user will be redirected to the login screen
// Login is checked by checking if the user has a cookie stored on their computer.

//Each object below consists of a different page and route.
//Some pages make use of the props system that Vue provides this will look at the query section in the router-link tab to find the passable props.
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
      name: "addSensor",
      path: "/addSensor",
      component: AddSensor,
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
    },
    {
      name: "warnings",
      path: "/warnings",
      component: Warnings,
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
      name: "stats",
      path: "/home_stats",
      component: AdvancedStats,
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
      name: "settings",
      path: "/profile",
      component: Settings,
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
      name: "allDevicesPage",
      path: "/allDevicesPage",
      component: AllDevicesPage,
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
      name: "automate",
      path: "/automate",
      component: Automate,
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
      name: "404",
      path: "*",
      component: NotFound
    }
  ]
});
fetch("http://localhost:5552/getVapidKey", {
  mode: "cors",
  method: "GET",
  headers: { authorization: Vue.$cookies.get("token") }
})
  .then(Response => {
    return Response.json();
  })
  .then(jsonData => {
    const vapid_key = jsonData.public_vapid_key;
    if ("serviceWorker" in navigator) {
      send().catch(err => console.log(err));
    }

    function urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    async function send() {
      console.log("Register Service Worker....");
      const register = await navigator.serviceWorker.register("/sw.js", {
        scope: "/"
      });
      console.log("Registered Service Worker....");

      console.log("Registered Push....");
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapid_key)
      });

      console.log("Sending Push....");
      await fetch("http://localhost:5552/subscribe", {
        mode: "cors",
        method: "POST",
        headers: {
          authorization: Vue.$cookies.get("token"),
          "content-type": "application/json"
        },
        body: JSON.stringify(subscription)
      });

      console.log("Push sent...");
    }
  });

//mounts app to the html page - public/index.html
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
