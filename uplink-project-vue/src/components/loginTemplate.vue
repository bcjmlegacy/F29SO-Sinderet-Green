<template>
	<div id="loginCard">
		<b-row>
			<b-col sm="12">
				<b-container>
					<b-card-text>
						<b-row>
							<b-col sm="8" offset-sm="2">
								<h1 class="form-title">Login</h1>
							</b-col>
						</b-row>
					</b-card-text>
					<b-card-text>
						<div id="form">
							<b-form @submit="ss">
								<b-row class="rows">
									<b-col sm="2">
										<label for="input-username" class="labels">Username:</label>
									</b-col>
									<b-col sm="8">
										<b-form-input
											id="input-username"
											placeholder="Cheerypal"
											size="md"
											required="required"
											type="text"
											class="inputboxes"
										></b-form-input>
									</b-col>
								</b-row>
								<b-row class="rows">
									<b-col sm="2">
										<label for="input-password" class="labels">Password:</label>
									</b-col>
									<b-col sm="8">
										<b-form-input
											id="input-password"
											type="password"
											required="required"
											placeholder="*********"
											size="md"
											class="inputboxes"
										></b-form-input>
									</b-col>
								</b-row>
								<b-row class="rows">
									<b-col sm="8" offset-sm="2">
										<b-form-checkbox
											id="check_Save"
											value="saved"
											unchecked-value="not_saved"
											name="check_Save"
											class="check"
											>Remember Me</b-form-checkbox
										>
									</b-col>
								</b-row>
								<b-row class="rows">
									<b-col sm="8" offset-sm="2">
										<b-button class="but">Submit</b-button>
									</b-col>
								</b-row>
							</b-form>
						</div>
						<b-row class="rows">
							<b-col sm="8" offset-sm="2">
								<b-link href="#" class="links">Forgot Password</b-link>
							</b-col>
						</b-row>
						<b-row class="rows">
							<b-col sm="8" offset-sm="2">
								<b-link href="#" class="links">Create Account</b-link>
							</b-col>
						</b-row>
					</b-card-text>
				</b-container>
			</b-col>
		</b-row>
	</div>
</template>

<script></script>

<style>
#loginCard {
	padding: 20px 50px;
	padding-top: 300px;
	margin-left: 30%;
	margin-right: 30%;

	/* border: solid 1px #005872;*/
}

#form {
	padding-bottom: 50px;
}

.form-title {
	text-align: center;
	font-size: 3.2em;
	padding-bottom: 10px;
}

.labels {
	float: right;
	color: #000;
	font-size: 1.2em !important;
}

.rows {
	text-align: center;
	padding-top: 10px;
}

.check {
	float: left !important;
}

.but {
	float: left;
	width: 100%;
	font-size: 1.3em !important;
	background-color: transparent !important;
	color: #000 !important;
	border: solid 1px #005872 !important;
	border-radius: 30 !important;
}

.but:focus {
	box-shadow: none !important;
	outline: none !important;
}

.but:hover {
	border: solid 1px #0492bd !important;
}

.inputboxes {
	border: solid 1px #005872 !important;
	border-radius: 40 !important;
	outline: none !important;
}

.links {
	text-decoration: none !important;
}

@media screen and (max-width: 1024px) {
	#loginCard {
		margin-left: 5%;
		margin-right: 5%;
	}
}

@media screen and (max-width: 812px) {
	#loginCard {
		margin-left: 1%;
		margin-right: 1%;
		padding: 10px 20px;
		padding-top: 120px;
	}
	.labels {
		float: left;
	}
	.but {
		float: none;
	}
}
</style>
