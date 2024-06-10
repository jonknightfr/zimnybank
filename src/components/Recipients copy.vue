<template>
	<v-container v-if="bankAccounts.length > 0" v-for="(recipient,index) in bankAccounts[0].recipients">

		<v-card
		class="mx-0 my-8"
		max-width="800"
		>

			<v-card-title>	
				<v-img v-if="recipient.logo"
				class="mx-0 my-4"
				:src="recipient.logo"
				max-height="40px"
				max-width="100px"
				></v-img>
				<div class="mx-0 my-4 avatar" v-if="recipient.logo == null">{{ recipient.givenName[0] + recipient.sn[0] }}</div>
				{{ recipient.givenName + ' ' + recipient.sn }}
			</v-card-title>

			<v-card-subtitle>
				Account: {{ recipient.accountNo }}
				<br>
				Sort Code: {{ recipient.sortCode }}
			</v-card-subtitle>

			<v-card-actions>
				<v-btn
				color="orange-darken-3"
				variant="text"
				>
				Manage
				</v-btn>

				<v-spacer></v-spacer>

				<v-btn
				:icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				@click="click(index)"
				></v-btn>
			</v-card-actions>

			<v-expand-transition>
				<div v-show="show[index]">
					<v-divider></v-divider>

					<v-card-text>
						<div class="font-weight-bold ms-1 mb-2">
							<br>
							Recent Transactions
						</div>

						<v-timeline density="compact" align="start">
							<v-timeline-item
							v-for="transaction in recipientTransactions(recipient.accountNo)"
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

		<v-divider></v-divider>
	</v-container>
</template>




<script>
	import IdentityService from '@/services/identityService.js';

	export default {
		data() {
			return {
				bankAccounts: [],
				show: []
			}
		},
		created() {
			IdentityService.getBankAccounts()
				.then(accounts => {
					this.bankAccounts = accounts;
					this.show = [];
					this.bankAccounts[0].recipients.forEach(_ => this.show.push(false));
				});
		},
		methods: {
			recipientTransactions(accountNo) {
				return this.bankAccounts[0].transactions.filter(trans => trans.recipient == accountNo)
			},
			click(index) {
				console.log("CLICK: " + index);
				this.show[index] = !this.show[index];
				console.log(this.show);
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