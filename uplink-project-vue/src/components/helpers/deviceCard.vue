<template>
	<!--Device Card-->
	<div class="item">
		<router-link
			class="links"
			:to="{
				name: 'device',
				query: {
					deviceID: deviceID,
					deviceName: deviceName,
					deviceImage: deviceImage,
					deviceEnergy: deviceEnergy,
					deviceType: deviceType,
					roomID: roomID
				}
			}"
		>
			<div class="card custom-cards-devices">
				<div class="img-cont">
					<!--Image name is taken from the prop called deviceImage-->
					<img
						class="card-img-top"
						:src="require(`../../assets/${deviceImage}.png`)"
						alt="Energy Usage"
					/>
				</div>
				<!--Device Name and Energy taken from prop passed to component - deviceName, deviceEnergy-->
				<div class="card-body text-center">
					<h5 class="card-title text-center">{{ deviceName }}</h5>
					<p class="card-text">{{ deviceEnergy }} watt</p>
				</div>
			</div>
		</router-link>
	</div>
</template>
<script>
//Bus to transfer data between component and main app.vue component
export default {
	name: "roomCard",
	props: [
		"roomID",
		"deviceID",
		"deviceName",
		"deviceImage",
		"deviceEnergy",
		"deviceType"
	] //props - data transfered to the component
};
</script>
