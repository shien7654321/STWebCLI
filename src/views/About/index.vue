<template>
    <div class="about">
        <img class="about__logo" src="@/assets/image/STWebCLITemplate.png" alt="" />
        <p>About</p>
        <router-link to="Home">Home</router-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'About',
});
</script>

<style lang="less" scoped>
.about {
    text-align: center;

    &__logo {
        width: 300px;
    }
}
</style>
