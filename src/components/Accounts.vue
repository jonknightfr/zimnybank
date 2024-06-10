<template>
	<v-container>

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
			<v-tabs
			v-model="tab"
			class="text-orange-darken-4"
			align-tabs="center"
			>
			<v-tab v-for="(bankAccount,index) in bankAccounts" :value="index">{{ bankAccount.nickname }}</v-tab>
		</v-tabs>
		<v-window v-model="tab">
			<v-window-item
			v-for="(bankAccount,index) in bankAccounts"
			:key="index"
			:value="index"       
			>
			<v-container fluid>


					<v-row no-gutters>
					    <v-dialog
					      v-model="newPaymentDialog"
					      persistent
					      width="1024"
					    >
		      				<template v-slot:activator="{ props }">
		      					<v-btn
		      					variant="outlined"
		      					v-bind="props"
										color="orange-darken-4"
		      					>
		      						MAKE PAYMENT
		      					</v-btn>

		      				</template>

		      				<v-card>
		        				<v-card-title>
		          					<span class="text-h5">Recipient Details</span>
		        				</v-card-title>
		        				<v-card-text>
		          					<v-container>
		            					<v-row>
											<v-col
											cols="12"
											sm="6"
											>
												<v-autocomplete
												v-model="newPayment.recipient"
												:items="bankAccount.recipients"
												item-title="givenName"
												item-value="accountNo"
												label="Select Recipient"
												>
													<template v-slot:item="{ props, item }">
														<v-list-item
														v-bind="props"
														:title="item?.raw?.givenName + ' ' + item?.raw?.sn"
														:subtitle="'Account Number: ' + item?.raw?.accountNo"
														></v-list-item>
													</template>
												</v-autocomplete>
											</v-col>

		              						<v-col
							                cols="12"
							                sm="6"
							                md="6"
							              	>
			                					<v-text-field
		                  							label="Amount"
		                  							type="number"
		                  							v-model="newPayment.value"
		                  							hint="Please enter the amount you'd like to pay or transfer."
		                  							persistent-hint
		                  							required
		                						></v-text-field>
		              						</v-col>            						
		              						<v-col
							                cols="12"
							                sm="6"
							                md="6"
							              	>
			                					<v-text-field
		                  							label="Description"
		                  							v-model="newPayment.description"
		                  							hint="Please enter a description for this payment."
		                  							persistent-hint
		                  							required
		                						></v-text-field>
		              						</v-col>
							            </v-row>
		          					</v-container>
						        </v-card-text>
		        				<v-card-actions>
		          					<v-spacer></v-spacer>
						          	<v-btn
						            color="orange-darken-4"
						            variant="text"
						            @click="newPaymentDialog = false"
						          	>
						            	CANCEL
						          	</v-btn>
						          	<v-btn
						            color="orange-darken-4"
						            variant="text"
						            @click="createNewPayment(bankAccount)"
						          	>
						            PAY
						          	</v-btn>
						        </v-card-actions>
		      				</v-card>
		    			</v-dialog>
					</v-row>



				<v-row>

					<v-card
					class="mx-4 my-6"
					min-width="400"
					variant="flat"
					>

					<template v-slot:title>
						<span class="text-orange-darken-4">{{ bankAccount.nickname }}</span>
					</template>
					<template v-slot:subtitle>
						Account: {{ bankAccount.accountNumber }}
						<br>
						Sort Code: {{ bankAccount.sortCode }}
					</template>

					<v-card-text>

						<v-row no-gutters>
							<v-col
							class="text-h3 text-orange-darken-4"
							cols="8"
							>
							£{{ bankAccount.balance}}
						</v-col>

						<v-col cols="4" class="text-right">
							<v-icon
							:color="(bankAccount.balance > 0.00 ? 'success' : 'error')"
							:icon="(bankAccount.balance > 0.00 ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold')"
							size="60"
							></v-icon>
						</v-col>
					</v-row>


					<v-divider></v-divider>
					
					<div class="font-weight-bold ms-1 mb-2 money">
						<br>
						Recent Transactions
					</div>

					<v-timeline density="compact" align="start">
						<v-timeline-item
						v-for="transaction in bankAccount.transactions"
						:key="transaction.date"
						:dot-color="(transaction.value > 0.0) ? 'purple' : 'green'"
						size="x-small"
						>
						<div class="mb-4">
							<div class="font-weight-normal">
								<strong>{{ transaction.description }}</strong> @{{ transaction.date }}
							</div>
							<div>£{{ transaction.value }}</div>
							<div>{{ getRecipient(bankAccount, transaction.recipient) }}</div>

						</div>
					</v-timeline-item>
				</v-timeline>

			</v-card-text>
		</v-card>


	</v-row>
</v-container>
</v-window-item>
</v-window>
</v-card>


<v-row no-gutters>
	<v-card v-for="advert in adverts"
	class="mx-4 my-12"
	width="200"
	height="200"
	variant="flat"
	color="#f3f5f7"
	>
	<v-card-item>
		<v-btn
		class="ma-2"
		color="orange-darken-4"
		:icon="advert.icon"
		></v-btn>
		<v-card-actions class="mt-16">
			{{ advert.msg }}
		</v-card-actions>
	</v-card-item>

</v-card>
</v-row>


</v-container>
</template>


<script>
	import IdentityService from '@/services/identityService.js';

	
	export default {
		data() {
			const now = new Date();
			return {
				tab: 0,
				snackbar: { "show": false, "color": "success", "msg": "Payment successful" },
				bankAccounts: [],
				newPaymentDialog: false,

  				newPayment: {
            		"date": `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`,
            		"value": 0.00,
            		"description": "",
            		"details": null,
            		"recipient": ""
        		},
				adverts: [
					{ "msg": "Schedule transfers", "icon": "mdi-calendar" },
					{ "msg": "Dontate to charities", "icon": "mdi-heart-outline" },
					{ "msg": "Setup direct debits", "icon": "mdi-alarm" },
					{ "msg": "Auto convert", "icon": "mdi-chart-areaspline" },
					]
			}
		},
		created() {
			IdentityService.getBankAccounts()
			.then(accounts => this.bankAccounts = accounts);
		},
		methods: {	
			getRecipient(bankAccount, recipient) {
				var name;
				bankAccount.recipients.forEach(item => {
					if (item.accountNo == recipient) name = (item.givenName + " " + item.sn);
				})
				return name;
			},
			createNewPayment(bankAccount) {
				console.log(bankAccount);
				console.log(this.newPayment);
				IdentityService.createNewPayment(bankAccount._id, this.newPayment)
					.then(resp => {
						bankAccount.transactions.push(this.newPayment);
						this.snackbar["show"] = true;
						this.newPaymentDialog = false;
					});
			}			
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