<template>
    <router-link to="/">Home</router-link>
    <p>timestamp: {{ store.timestamp }}</p>
    About
</template>

<script>
import { defineComponent } from 'vue';
import mainStore from '../../store';

export default defineComponent({
    name: 'About',
    setup() {
        const store = mainStore();
        return {
            store,
        };
    },
});
</script>
