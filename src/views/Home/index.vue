<template>
    <div class="home">
        <img class="home__logo" src="@/assets/image/STWebCLITemplate.png" alt="" />
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

    &__logo {
        width: 300px;
    }
}
</style>
