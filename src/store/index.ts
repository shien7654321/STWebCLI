import { defineStore } from 'pinia';

const mainStore = defineStore('main', {
    state: () => ({
        time: new Date(),
    }),
    getters: {
        timestamp(state): number {
            return state.time.getTime();
        },
    },
    actions: {
        updateTime() {
            this.time = new Date();
        },
    },
});

export default mainStore;
