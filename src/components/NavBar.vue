<template>
	<v-navigation-drawer style="background: #f1f3f6;" permanent location="left" width="280">
		<template v-slot:prepend>
			<v-menu
			v-model="menu"
			:close-on-content-click="false"
			location="end"
			open-on-hover
			>
			<template v-slot:activator="{ props }">
				<v-list-item
				class="my-4"
				lines="two"
				:prepend-avatar="userObject.profileImage"
				append-icon="mdi-chevron-down"
				v-bind="props"
				:title="userObject.givenName + ' ' + userObject.sn"
				subtitle="Logged in">
			</v-list-item>
		</template>

		<v-card min-width="300">
			<v-list>
					<v-list-item
					:prepend-avatar="userObject.profileImage"
					:title="userObject.givenName + ' ' + userObject.sn"
					:subtitle="userObject.description"
					>
					<template v-slot:append>
						<v-btn
						variant="text"
						icon="mdi-heart"
						></v-btn>
					</template>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list class="">
				<v-list-item title="Your details" to='/profile' router v-on:click="menu=false">
					<template v-slot:prepend>
						<v-icon color="orange-darken-4" size="large" icon="mdi-account"></v-icon>
					</template>
				</v-list-item>
				<v-list-item title="Settings">
					<template v-slot:prepend>
						<v-icon color="orange-darken-4" size="large" icon="mdi-cog"></v-icon>
					</template>				
				</v-list-item>
				<v-list-item title="Help center">
					<template v-slot:prepend>
						<v-icon color="orange-darken-4" size="large" icon="mdi-help-circle"></v-icon>
					</template>				
				</v-list-item>
				<v-divider></v-divider>
				<v-list-item title="Logout" v-on:click="logoutUser">
					<template v-slot:prepend>
						<v-icon color="orange-darken-4" size="large" icon="mdi-logout"></v-icon>
					</template>				
				</v-list-item>
			</v-list>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
				color="orange-darken-4"
				variant="text"
				@click="menu = false"
				>
					Cancel
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>

	</template>

	<v-divider></v-divider>

		<v-list v-for="(menu, index) in topMenu">
			<v-list-item v-if="menu.to" :title="menu.title" :to="menu.to" router>
				<template v-slot:prepend>
					<v-icon color="orange-darken-4" size="large" :icon="menu.icon"></v-icon>
				</template>
			</v-list-item>
			<v-list-item v-else="menu.to" :title="menu.title">
				<template v-slot:prepend>
					<v-icon color="orange-darken-4" size="large" :icon="menu.icon"></v-icon>
				</template>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>


<script>

	import IdentityService from '@/services/identityService.js';

	export default {
		data() {
			return {
				menu: false,
				userObject: {},
				topMenu: [ 
					{ "title": "Accounts", "icon": "mdi-home-outline", "to": "/accounts" },
					{ "title": "Cards", "icon": "mdi-credit-card-outline", "to": null },
					{ "title": "Recipients", "icon": "mdi-account-multiple", "to": "/recipients" },
					{ "title": "Manage", "icon": "mdi-shape", "to": null },
					{ "title": "Earn £75", "icon": "mdi-gift-outline", "to": null },
					]
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
		},
	}
</script>


<style scoped>
</style>