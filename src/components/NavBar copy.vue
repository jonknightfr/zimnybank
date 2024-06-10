<template>
	<v-navigation-drawer style="background: #f1f3f6;" permanent location="left" width="280">
		<template v-slot:prepend>
			<v-list-item
				class="my-4"
				color="indigo"
				lines="two"
				:prepend-avatar="userObject.profileImage"
				append-icon="mdi-chevron-down"
				@click="showUserMenu = !showUserMenu"
				:title="userObject.givenName + ' ' + userObject.sn"
				subtitle="Logged in">
			</v-list-item>
		</template>


		<v-expand-transition>
		<v-list elevation="5" v-if="showUserMenu" transition="scroll-y-transition" class="mx-8 my-4">


			<v-list-item prepend-icon="mdi-account" title="Your details" to='/profile' router v-on:click="showUserMenu=false"></v-list-item>
			<v-list-item prepend-icon="mdi-cog" title="Settings"></v-list-item>
			<v-list-item prepend-icon="mdi-help-circle" title="Help center"></v-list-item>
			<v-list-item prepend-icon="mdi-logout" title="Logout" v-on:click="logoutUser"></v-list-item>
		</v-list>
	</v-expand-transition>

		<v-divider></v-divider>

		<v-list>
			<v-list-item title="Accounts" value="home" to='/accounts' router>
				<template v-slot:prepend>
					<v-icon color="lightblue" icon="mid-home-outline"></v-icon>
				</template>
			</v-list-item>
			<v-list-item prepend-icon="mdi-credit-card-outline" title="Cards"></v-list-item>
			<v-list-item prepend-icon="mdi-account-multiple" title="Recipients" value="recipients" to='/recipients' router></v-list-item>
			<v-list-item prepend-icon="mdi-shape" title="Manage"></v-list-item>
			<v-list-item prepend-icon="mdi-gift-outline" title="Earn £75"></v-list-item>

		</v-list>
	</v-navigation-drawer>
</template>


<script>

	import IdentityService from '@/services/identityService.js';

	var showUserMenu = false;

	export default {
		data() {
			return {
				userObject: {},
				showUserMenu: showUserMenu
			}
		},		
		created() {
			IdentityService.getUser()
				.then(userObject => this.userObject = userObject);
		},
		methods: {
			async logoutUser() {
				await IdentityService.logout();
				await this.$router.push('/');
				this.$router.go();
			},			
		}
	}
</script>


<style scoped>
</style>