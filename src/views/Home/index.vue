<template>
    <router-link class="home-link" to="/about"> About </router-link>
    Home
    <p>count: {{ count }}</p>
    <button @click="handleClick">increment</button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'Home',
    setup() {
        const store = useStore();
        const count = computed<number>(() => store.state.count);
        function handleClick() {
            store.dispatch('increment');
        }
        return {
            count,

            handleClick,
        };
    },
});
</script>

<style lang="less" scoped>
.home-link {
    display: block;
}
</style>
