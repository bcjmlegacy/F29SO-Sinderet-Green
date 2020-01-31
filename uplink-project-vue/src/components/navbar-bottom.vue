<template>
	<!--bottom navbar template for mobile devices-->
	<nav class="navbar-bottom fixed-bottom">
		<div class="container">
			<div class="flex-nav">
				<div class="image-cont-nav" @click="prev(this.back)">
					<img src="../assets/arrow.png" alt="Back" class="nav-image-bottom" />
				</div>
				<div class="image-cont-nav" @click="switchComp('AddItem')">
					<img src="../assets/plus.png" alt="Plus" class="nav-image-bottom" />
				</div>
				<div class="image-cont-nav">
					<img
						src="../assets/home-run.png"
						alt="Home"
						class="nav-image-bottom"
					/>
				</div>
				<div class="image-cont-nav">
					<img
						src="../assets/exclamation.png"
						alt="Warnings"
						class="nav-image-bottom"
					/>
				</div>
				<div class="image-cont-nav">
					<img
						src="../assets/user.png"
						alt="Profile"
						class="nav-image-bottom"
					/>
				</div>
			</div>
		</div>
	</nav>
</template>
<script>
import { bus } from "../main";
export default {
	name: "navbar-top",
	props: ["back"],
	methods: {
		switchComp(comp) {
			//Switch component
			bus.$emit("switchComp", comp);
		},
		prev(previous) {
			bus.$emit("prev", previous);
		}
	}
};
</script>
<style>
/** Navbar styling for bottom navbar */
.flex-nav {
	display: flex !important;
	flex-direction: row !important;
	flex-wrap: wrap !important;
	flex-flow: row wrap !important;
	justify-content: space-between !important;
}

.nav-item {
	padding: 10px;
}

.navbar-bottom {
	padding: 0 !important;
	background-color: white;
	box-shadow: 0 0px 25px rgba(0, 0, 0, 0.3) !important;
	border-top: 1px solid #198fca;
}

.nav-image-bottom {
	width: 50%;
}

.logo-small {
	font-family: "Harlow-solid";
	text-align: center;
	font-size: 1.1em;
	padding-top: 10%;
	margin: 0;
}
.image-cont-nav {
	text-align: center;
	width: 20%;
	padding: 15px;
	opacity: 0.5;
}

.image-cont-nav:hover {
	background-color: #f5f5f5;
	opacity: 1;
	cursor: pointer;
	box-shadow: 0 12px 10px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22) !important;
}

@media screen and (max-width: 1025px) {
	.image-cont-nav {
		width: 20%;
	}
}

@media screen and (max-width: 812px) {
	.nav-image {
		width: 80%;
	}
}
</style>
