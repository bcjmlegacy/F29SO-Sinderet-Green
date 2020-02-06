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
import EditDevice from "./components/editDevicePage";
import deviceDetails from "./components/deviceDetails";

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
			props: true
		},
		{
			name: "login",
			path: "/login",
			component: Login
		},
		{
			name: "room",
			path: "/room",
			component: Room,
			props: true,
			children: [
				{
					path: "deviceDetails",
					component: deviceDetails,
					children: [
						{ path: "editDevice", component: EditDevice, props: true }
					],
					props: true
				}
			]
		},
		{
			name: "add",
			path: "/add",
			component: AddItem,
			props: true,
			children: [
				{ path: "room", component: AddRoom, props: true },
				{
					path: "device",
					component: AddDevices,
					children: [
						{ path: "AddData", component: AddDeviceMetrics, props: true }
					]
				}
			]
		}
	]
});

//mounts app to the html page - public/index.html
new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
