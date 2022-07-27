<template>
    <img class="home-logo" src="@/assets/image/STWebCLITemplate.png" alt="" />
    <router-link class="home-link" to="/about"> About </router-link>
    Home
    <p>time: {{ store.time }}</p>
    <button @click="handleUpdate">update</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainStore from '../../store';

export default defineComponent({
    name: 'Home',
    setup() {
        const store = mainStore();
        function handleUpdate() {
            store.updateTime();
        }
        return {
            store,

            handleUpdate,
        };
    },
});
</script>

<style lang="less" scoped>
.home-logo {
    width: 400px;
}

.home-link {
    display: block;
}
</style>
