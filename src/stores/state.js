import { defineStore } from 'pinia'

export const useStore = defineStore('state', {
	state: () => ({ 
		layout: 'simple-layout'
	}),
	getters: { },
	actions: { },
})
