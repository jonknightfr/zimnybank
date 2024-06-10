<template>
	<v-container v-if="userObject">


		<v-snackbar
		v-model="snackbar.show"
		location="top"
		:color="snackbar.color"
		rounded="pill"
		>
			<p>{{ snackbar.msg }}</p>

			<template v-slot:actions>
				<v-btn
				color="white"
				variant="text"
				@click="snackbar.show = false"
				>
				Close
				</v-btn>
			</template>
		</v-snackbar>



<v-card>
	<v-card-title>
		<span class="text-h5">User Profile</span>
	</v-card-title>
	<v-card-text>
		<v-container>
			<v-row>
				<v-col
				cols="12"
				sm="6"
				md="4"
				>
				<v-text-field
				label="Legal first name*"
				required
				v-model="userObject.givenName"
				></v-text-field>
			</v-col>
			<v-col
			cols="12"
			sm="6"
			md="4"
			>
			<v-text-field
			label="Legal middle name"
			></v-text-field>
		</v-col>
		<v-col
		cols="12"
		sm="6"
		md="4"
		>
		<v-text-field
		label="Legal last name*"
		v-model="userObject.sn"
		required
		></v-text-field>
	</v-col>
	<v-col cols="12">
		<v-text-field
		label="Email*"
		:rules="[ v => /.+@.+/.test(v) || 'Invalid Email address' ]"
		required
		v-model="userObject.mail"                  
		></v-text-field>
	</v-col>


	<v-col
	cols="12"
	>
	<v-text-field
	label="Telephone Number"
	hint="Full telephone number including country code, e.g.: +44 7123 123456"
	persistent-hint
	required
	v-model="userObject.telephoneNumber"
	></v-text-field>

</v-col>

<v-col
cols="12"
sm="6"
md="6"
>
<v-text-field
label="Address"
hint="First line of your address"
persistent-hint
required
v-model="userObject.postalAddress"
></v-text-field>
</v-col>
<v-col
cols="12"
sm="6"
md="6"
>
<v-text-field
label="City"
v-model="userObject.city"
required
></v-text-field>

</v-col>

<v-col
cols="12"
sm="6"
md="6"
>
<v-text-field
label="Postal / Zip Code"
v-model="userObject.postalCode"
required
></v-text-field>
</v-col>
<v-col
cols="12"
sm="6"
md="6"
>
<v-text-field
label="Country"
required
v-model="userObject.country"
></v-text-field>

</v-col>


<v-col
cols="12"
sm="6"
>
<v-autocomplete
:items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
label="Interests"
chips
closable-chips
multiple
></v-autocomplete>
</v-col>
</v-row>
</v-container>
<small>*indicates required field</small>
</v-card-text>
<v-card-actions>
	<v-spacer></v-spacer>
	<v-btn
	color="orange-darken-4"
	variant="text"
	@click="saveUserObject"
	>
	Save
</v-btn>
</v-card-actions>
</v-card>

</v-container>
</template>






<script>

	import IdentityService from '@/services/identityService.js';

	export default {
		data() {
			return {
				userObject: null,
				snackbar: { "show": false, "color": "success", "msg": "Your profile has been updated" }
			}
		},		
		created() {
			IdentityService.getUser()
			.then(userObject => this.userObject = userObject);
		},	
		methods: {
			saveUserObject() {
				console.log("saveUserObject: " + JSON.stringify(this.userObject));
				IdentityService.putUser(this.userObject)
					.then(_ => this.snackbar["show"] = true);
			}
		}
	}
</script>


<style scoped>
.float-container {
	margin-left: 30px;
    padding-left: 20px;
    text-align: left;
}

.float-child {
    width: 40%;
    float: left;
}  


h1 { color: #555; }
.section {
	font-size: 14px;
	font-weight: 600;
	margin-bottom:10px;
}
.desc {
	font-size: 12px;
	font-weight: 400;
}
p {
	font-size: 16px;
	margin: 0px;
	color: #555;
}
.avatar {
	align-items: center;
	justify-content: center;
	background-color: #f3f5f7;
	border-radius: 50%;
	display: flex;
	height: 80px;
	width: 80px;
	font-size: 28px;
	font-weight: 600;
	color: #666;
}
</style>