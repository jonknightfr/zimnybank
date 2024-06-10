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
					      v-model="newRecipientDialog"
					      persistent
					      width="1024"
					    >
		      				<template v-slot:activator="{ props }">
								<v-card
								variant="flat"
								color="#f3f5f7"
								>
									<v-card-item>
										<v-card-title>Add a Recipient</v-card-title>
										<v-card-subtitle>You'll need their account<br> number and sort code</v-card-subtitle>
										<v-btn
										class="ma-2"
										color="orange-darken-4"
										icon="mdi-plus"
										v-bind="props"
										></v-btn>
										<v-card-actions>
											<v-btn variant="text" color="orange-darken-4"
											v-bind="props"
											>
												CREATE NEW
											</v-btn>
										</v-card-actions>
									</v-card-item>
								</v-card>
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
							                md="6"
							              	>
			                					<v-text-field
		                  							label="First name"
		                  							v-model="newRecipient.givenName"
		                  							hint="Person's or organisation's first name"
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
				                  				label="Second name"
		                  						v-model="newRecipient.sn"
		                  						hint="Person's or organisation's second name"
		                  						persistent-hint
		                						></v-text-field>
		              						</v-col>
		              						<v-col
							                cols="12"
							                sm="6"
							                md="6"
							              	>
			                					<v-text-field
		                  							label="Account number"
		                  							v-model="newRecipient.accountNo"
		                  							required
		                						></v-text-field>
		              						</v-col>
		              						<v-col
							                cols="12"
							                sm="6"
							                md="6"
								            >
		        					        	<v-text-field
				                  				label="Sort code"
				                  				v-model="newRecipient.sortCode"
		                  						hint="Sort code or IBAN number"
		                  						persistent-hint
		                						></v-text-field>
		              						</v-col>
		              						<v-col
							                cols="12"
								            >
		        					        	<v-text-field
				                  				label="Logo URL"
				                  				v-model="newRecipient.logo"
		                  						hint="Optional logo or image for this recipient"
		                  						persistent-hint
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
						            @click="newRecipientDialog = false"
						          	>
						            	Close
						          	</v-btn>
						          	<v-btn
						            color="orange-darken-4"
						            variant="text"
						            @click="createNewRecipient(bankAccount)"
						          	>
						            Save
						          	</v-btn>
						        </v-card-actions>
		      				</v-card>
		    			</v-dialog>
					</v-row>


					<v-row  v-for="(recipient,index) in bankAccount.recipients">
						<v-card
						class="mx-4 my-6"
						min-width="800"
						color="#f3f5f7"
						>
							<v-card-title style="background-color: #f3f5f7">	
								<v-img v-if="recipient.logo"
								class="mx-0 my-4"
								:src="recipient.logo"
								max-height="100px"
								max-width="100px"
								></v-img>
								<div class="mx-0 my-4 avatar" v-if="recipient.logo == null">{{ recipient.givenName[0] + recipient.sn[0] }}</div>
								{{ recipient.givenName + ' ' + recipient.sn }}
							</v-card-title>

							<v-card-subtitle  style="background-color: #f3f5f7">
								Account: {{ recipient.accountNo }}
								<br>
								Sort Code: {{ recipient.sortCode }}
							</v-card-subtitle>

							<v-card-actions  style="background-color: #f3f5f7">
								<v-btn
								color="orange-darken-4"
								variant="text"
								>
								Manage
								</v-btn>

								<v-spacer></v-spacer>

								<v-btn
								:icon="bankAccount.show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
								@click="bankAccount.show[index] = !bankAccount.show[index]"
								></v-btn>
							</v-card-actions>

							<v-expand-transition>
								<div v-show="bankAccount.show[index]">
									<v-divider></v-divider>

									<v-card-text style="background-color: white">
										<div class="font-weight-bold ms-1 mb-2">
											<br>
											Recent Transactions
										</div>

										<v-timeline density="compact" align="start">
											<v-timeline-item
											v-for="transaction in recipientTransactions(bankAccount, recipient.accountNo)"
											:key="transaction.date"
											:dot-color="(transaction.value > 0.0) ? 'purple' : 'green'"
											size="x-small"
											>
												<div class="mb-4">
													<div class="font-weight-normal">
														<strong>{{ transaction.description }}</strong> @{{ transaction.date }}
													</div>
													<div>£{{ transaction.value }}</div>

												</div>

											</v-timeline-item>
										</v-timeline>
									</v-card-text>
								</div>
							</v-expand-transition>
						</v-card>
					</v-row>
				</v-container>
				</v-window-item>
			</v-window>
		</v-card>
	</v-container>
</template>




<script>
	import IdentityService from '@/services/identityService.js';

	export default {
		data() {
			return {
				tab: 0,
				snackbar: { "show": false, "color": "success", "msg": "Recipient saved" },
				bankAccounts: [],
				newRecipientDialog: false,
				newRecipient: { "givenName":"", "sn":"", "accountNo":"", "sortCode":"", "logo":"" }
			}
		},
		created() {
			IdentityService.getBankAccounts()
				.then(accounts => {
					this.bankAccounts = accounts;
					this.bankAccounts.forEach((account,index) => {
						account.show = new Array(account.recipients.length);
						account.show.fill(false);
					});
				});
		},
		methods: {
			recipientTransactions(bankAccount, accountNo) {
				return bankAccount.transactions.filter(trans => trans.recipient == accountNo)
			},		
			createNewRecipient(bankAccount) {
				console.log(bankAccount);
				console.log(this.newRecipient);
				IdentityService.createNewRecipient(bankAccount._id, this.newRecipient)
					.then(resp => {
						bankAccount.recipients.push(this.newRecipient);
						this.snackbar["show"] = true;
						this.newRecipientDialog = false;
					});
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
		background-color: white;
		border-radius: 50%;
		display: flex;
		height: 80px;
		width: 80px;
		font-size: 28px;
		font-weight: 600;
		color: #666;
	}
</style>