import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            noScrollCount: 0
        }
    },
    actions: {
    }
})