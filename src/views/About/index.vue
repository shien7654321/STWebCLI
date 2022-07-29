<template>
    <div class="about">
        <img src="@/assets/image/STWebCLITemplate.png" alt="" />
        <p>About</p>
        <router-link to="/">Home</router-link>
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
}
</style>
