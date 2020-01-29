<template>
	<div>
		<NavbarTop class="top-show" />
		<div id="addDevice">
			<div class="container">
				<h3 class="display-3 text-center">Edit Device</h3>
				<div id="form-addDevice">
					<div class="flex-add">
						<div class="card custom-cards-addDevices">
							<div class="img-cont">
								<img
									:src="require(`../assets/${deviceToAdd.deviceImage}.png`)"
									alt="device icon"
									class="device-img"
								/>
							</div>
							<div class="text-wrapper">
								<h5 class="card-title text-center">
									{{ deviceToAdd.deviceName }}
								</h5>
								<p class="card-text text-center">
									{{ deviceToAdd.deviceEnergy }} Watts
								</p>
							</div>
							<div class="device-cont">
								<b-form>
									<div class="col-sm-12">
										<label for="input-device-name" class="label"
											>Change Device Name</label
										>
									</div>
									<div class="col-sm-12">
										<input
											type="text"
											id="input-device-name"
											placeholder="Hue Lights"
											class="form-inputboxes"
										/>
									</div>
									<div class="form-rows">
										<div class="col-sm-12">
											<label for="input-device-room" class="label"
												>Set Timer</label
											>
										</div>
										<div class="col-sm-12">
											<select
												v-model="form.operation"
												class="form-dropdown"
												required="required"
											>
												<option disabled value
													>Please Select An Operation</option
												>
												<option
													v-for="op in operations"
													:key="op.device_command_id"
													:value="op.device_command_id"
													>{{ op.device_command_name }}</option
												>
											</select>
										</div>
									</div>
									<div class="form-rows">
										<div class="col-sm-12">
											<button class="form-buttons" type="submit">
												Save Changes
											</button>
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
import { bus } from "../main";
//let url = "http://localhost:5552/insertDevice";
let url1 = "http://localhost:5552/getCommandsByDevice";

export default {
	name: "addDevice",
	components: {
		NavbarTop,
		NavbarBottom
	},
	props: ["deviceToAdd", "userToken"],
	data() {
		return {
			form: {
				name: "",
				operation: "",
				type: "1"
			},
			operations: []
		};
	},
	methods: {
		switchComp(comp) {
			bus.$emit("switchComp", comp);
		}
		/*
    go(evt) {
      console.log(this.form);
      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.userToken
        },
        body: JSON.stringify({
          name: this.form.name,
          type: this.form.type,
          wattage: this.form.wattage,
          room: this.form.room
        })
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
          this.switchComp("Dash");
        });

      evt.preventDefault();
    }*/
	},
	mounted: function() {
		fetch(url1, {
			mode: "cors",
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
				Authorization: this.userToken
			},
			query: JSON.stringify({
				id: "123ABC123"
			})
		})
			.then(response => {
				return response.json();
			})
			.then(jsonData => {
				this.operations = jsonData;
				console.log(jsonData);
			});
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

.form-dropdown {
	width: 100%;
	border-left: none;
	border-top: none;
	border-right: none;
	border-bottom: solid 1px #b8b8b8;
	outline: none;
	height: 3rem;
}

.form-dropdown:focus {
	outline: none;
	border-bottom: solid 1px #198fca;
}
</style>
