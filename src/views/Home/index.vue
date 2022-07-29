<template>
    <div class="home">
        <img src="@/assets/image/STWebCLITemplate.png" alt="" />
        <p>Home</p>
        <router-link class="home-link" to="/about"> About </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Home',
});
</script>

<style lang="less" scoped>
.home {
    text-align: center;
}
</style>
