import { createStore } from 'vuex';

export default () => createStore({
    state() {
        return {
            count: 0,
        };
    },
    mutations: {
        increment(state) {
            state.count += 1;
        },
    },
    actions: {
        increment({ commit }) {
            setTimeout(() => {
                commit('increment');
            }, 300);
        },
    },
});
