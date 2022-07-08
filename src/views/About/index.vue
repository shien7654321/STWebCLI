<template>
    <router-link to="/">Home</router-link>
    <p>count: {{ count }}</p>
    About
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'About',
    setup() {
        const store = useStore();
        const count = computed(() => store.state.count);
        return {
            count,
        };
    },
});
</script>
