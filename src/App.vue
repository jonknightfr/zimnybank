<template>
	<v-app>
		<component v-bind:is="layout"></component>
	</v-app>
</template>

<script>

	import AppLayout from './layouts/AppLayout'
	import SimpleLayout from './layouts/SimpleLayout'
	import { useStore }  from '@/stores/state'
	import IdentityService from '@/services/identityService.js';

	var store;
	export default {
		name: 'App',
		setup() { 
			store = useStore();
		},
		computed: {
			layout () {
				return store.layout
			}
		},
		components: {
			'app-layout': AppLayout,
			'simple-layout': SimpleLayout
		},
		methods: {
			async init(target) {
				// NOTE: This method handles both the return back from a centralised login as well as normal browser refresh
				var user, tokens;
				[ user, tokens ] = await IdentityService.init(); 
				if (user != null) {
					//this.userObject = user;
					//this.tokenObject = tokens;             
					store.layout = 'app-layout';

					this.$router.push(target);
				}
			},     
			async loginUser() {
				await IdentityService.login();
			},           
		},
		beforeMount() {
			this.init('/accounts');
		}, 
	}

</script>
