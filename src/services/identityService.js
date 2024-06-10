import { Config, UserManager, TokenManager, FRUser } from "@forgerock/javascript-sdk"
import FRconfig from "@/FRconfig.json";
import axios from 'axios'


class IdentityService {

	constructor() {
		Config.set(FRconfig);
	}

	async init() {
		try {
			const user = await UserManager.getCurrentUser();
			const tokens = await TokenManager.getTokens();
			const userObject = await this.getUser(tokens.accessToken, user.sub);
			return [ userObject, tokens ];
		} catch(error) {
			const url = new URL(document.location);
			const params = url.searchParams;
			const authCode = params.get('code');
			const state = params.get('state');
			if (state && authCode) {
				return this.authorize(authCode, state);
			} else return [ null, null ];
		} 
	}

	async login() {
		try {
			await TokenManager.getTokens({ login: 'redirect' });
		} catch(error) {
			console.log("LOGIN ERROR: " + error);
		}
	}

	async logout() {
		try {
			await FRUser.logout();
		} catch (error) {
			console.error(error);
		}
	}

	async authorize(code, state) {
		const tokens = await TokenManager.getTokens({ query: { code, state } });
		const user = await UserManager.getCurrentUser();
		const userObject = await this.getUser(tokens.accessToken, user.sub);
		return [ userObject, tokens ];
	}

	async getUser() {
		const user = await UserManager.getCurrentUser();
		const tokens = await TokenManager.getTokens();
		axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
		const response = await axios.get(FRconfig.serverConfig.baseUrl + '../openidm/managed/alpha_user/' + user.sub);
		return response.data;
	} 

	async putUser(userObject) {
		const ATTRIBS = [ 'givenName', 'sn', 'mail', 'telephoneNumber', 'postalAddress', 'city', 'postalCode', 'country' ];
		var op = [];
		ATTRIBS.forEach(attr => op.push({ "operation": "replace", "field": "/"+attr, "value": userObject[attr]}));
		const user = await UserManager.getCurrentUser();
		const tokens = await TokenManager.getTokens();
		var config = { headers: { "content-type": "application/json;charset=UTF-8" } };
		axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
		const response = await axios.patch(FRconfig.serverConfig.baseUrl + '../openidm/managed/alpha_user/' + user.sub, op, config);
		return response.data;
	} 

	async getBankAccounts() {
		const user = await UserManager.getCurrentUser();
		const tokens = await TokenManager.getTokens();
		axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
		const response = await axios.get(FRconfig.serverConfig.baseUrl + '../openidm/managed/alpha_bank?_queryFilter=true');
		return response.data.result;		
	}

	async createNewRecipient(bankAccountID, recipientObject) {
		var op = [ { "operation": "add", "field": "/recipients/-", "value": recipientObject } ];
		const user = await UserManager.getCurrentUser();
		const tokens = await TokenManager.getTokens();
		var config = { headers: { "content-type": "application/json;charset=UTF-8" } };
		axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
		const response = await axios.patch(FRconfig.serverConfig.baseUrl + '../openidm/managed/alpha_bank/' + bankAccountID, op, config);
		console.log("NEW RECIPIENT RESPONSE: " + JSON.stringify(response.data));
		return response.data;
	}

	async createNewPayment(bankAccountID, paymentObject) {
		var op = [ { "operation": "add", "field": "/transactions/-", "value": paymentObject } ];
		const user = await UserManager.getCurrentUser();
		const tokens = await TokenManager.getTokens();
		var config = { headers: { "content-type": "application/json;charset=UTF-8" } };
		axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
		const response = await axios.patch(FRconfig.serverConfig.baseUrl + '../openidm/managed/alpha_bank/' + bankAccountID, op, config);
		console.log("NEW RECIPIENT RESPONSE: " + JSON.stringify(response.data));
		return response.data;
	}

}
export default new IdentityService();