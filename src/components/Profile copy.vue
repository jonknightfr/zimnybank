<template>
	<v-container v-if="userObject != null">
		<v-row no-gutters>
			<v-col cols="12">
				<v-sheet class="pa-2 ma-2">
					<h1>Your details</h1>
					<br>
					<div class="avatar">{{ userObject.givenName[0] + userObject.sn[0] }}</div>
					<br><br>
					<p class="section">Personal information</p>
				</v-sheet>
			</v-col>

			<v-col cols="4">
				<v-sheet class="pa-2 ma-2">
					<p class="desc">Full legal first name</p>
					<p>{{ userObject.givenName }}</p>
					<br>
					<p class="desc">Date of birth</p>
					<p>{{ userObject.frIndexedString1 }}</p>

				</v-sheet>
			</v-col>
			<v-col cols="4">
				<v-sheet class="pa-2 ma-2">
					<p class="desc">Full legal last name(s)</p>
					<p>{{ userObject.sn }}</p>
					<br>
					<p class="desc">Email address</p>
					<p>{{ userObject.mail }}</p>						
				</v-sheet>
			</v-col>
		</v-row>

		<v-divider></v-divider>
		<v-row no-gutters>
			<v-col cols="12">
				<v-sheet class="pa-2 ma-2">
					<p class="section">Personal address</p>
				</v-sheet>
			</v-col>

			<v-col cols="4">
				<v-sheet class="pa-2 ma-2">
					<p class="desc">Country</p>
					<p>{{ userObject.country }}</p>
					<br>
					<p class="desc">City</p>
					<p>{{ userObject.city }}</p>

				</v-sheet>
			</v-col>
			<v-col cols="4">
				<v-sheet class="pa-2 ma-2">
					<p class="desc">Address</p>
					<p>{{ userObject.postalAddress }}</p>
					<br>
					<p class="desc">Postal code</p>
					<p>{{ userObject.postalCode }}</p>						
				</v-sheet>
			</v-col>
		</v-row>
		<br>
		<v-divider></v-divider>
		<br>
		<v-btn color="#f3f5f7">Update</v-btn>
	</v-container>
</template>






<script>

	import IdentityService from '@/services/identityService.js';

	export default {
		data() {
			return {
				userObject: null
			}
		},		
		created() {
			IdentityService.getUser()
				.then(userObject => this.userObject = userObject);
		},
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