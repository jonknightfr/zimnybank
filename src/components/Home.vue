<template>
	<v-container fluid>

	  <v-parallax 
	    src="https://images.pexels.com/photos/1366922/pexels-photo-1366922.jpeg"
	  >
    <div class="d-flex flex-row-reverse mb-6">
    	<v-btn class="ma-2 pa-2" v-on:click="this.$root.loginUser">Login</v-btn>
    	<v-btn variant="outlined" class="ma-2 pa-2">Register</v-btn>
    	<v-btn variant="outlined" class="ma-2 pa-2" prepend-icon="mdi-web">EN</v-btn>
    	<v-btn variant="plain" class="ma-2 pa-2">Help</v-btn>
    	<v-btn variant="plain" class="ma-2 pa-2">Pricing</v-btn>
    	<v-btn variant="plain" class="ma-2 pa-2" append-icon="mdi-chevron-down">Features</v-btn>

    </div>

	    <div class="d-flex flex-column fill-height justify-center align-center text-white">
	      <h1 class="text-white text-h1 font-weight-thin mb-4">
	        Zimny Bank
	      </h1>
	      <h2 class="subheading font-weight-light">
	        Saving your future. Today!
	      </h2>
	    </div>
	  </v-parallax>


	  <v-row no-gutters>
	<v-card class="mx-auto" width="300" variant="flat">
		<v-img src="https://wise.com/static-assets/app/_next/static/media/send.2e93977b.jpg"></v-img>
		<center>
			<h2 class="text-indigo font-weight-light">Send money cheaper and easier than old-school banks.</h2>
			<h4 class="font-weight-light">Send money at the exchange rate with no hidden fees.</h4>
		</center>
	</v-card>

	<v-card class="mx-auto" width="300" variant="flat">
		<v-img src="https://wise.com/static-assets/app/_next/static/media/send.2e93977b.jpg"></v-img>
		<center>
			<h2 class="text-indigo font-weight-light">Spend abroad without the hidden fees.</h2>
			<h4 class="font-weight-light">Use a card in 175 countries, spend with Apple and Google Pay, and withdraw anywhere.</h4>
		</center>	
	</v-card>

		<v-card class="mx-auto" width="300" variant="flat">
		<v-img src="https://wise.com/static-assets/app/_next/static/media/send.2e93977b.jpg"></v-img>
		<center>
			<h2 class="text-indigo font-weight-light">Receive payments like a local in 10 currencies.</h2>
			<h4 class="font-weight-light">Get your own UK account number, Euro IBAN, US routing number, and more.</h4>
		</center>	
	</v-card>

</v-row>

	</v-container>
</template>






<script>


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