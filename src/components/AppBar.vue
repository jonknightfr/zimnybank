<template>
	<v-app-bar elevation="1"
	color="white"
	>

	<template v-slot:prepend>
		<v-app-bar-nav-icon></v-app-bar-nav-icon>
	</template>

	<v-btn icon>
		<v-icon>mdi-cloud-outline</v-icon>
	</v-btn>

	<v-app-bar-title class="text-h4 font-weight-light">Zimny Bank</v-app-bar-title>

	<v-spacer></v-spacer>

	<v-btn icon>
		<v-icon>mdi-magnify</v-icon>
	</v-btn>

</v-app-bar>
</template>


<script>
	export default {
		name: 'AppBar',
		setup() {
		},
		data() {
			return {
			}
		},
		methods: {		
		}
	}
</script>

