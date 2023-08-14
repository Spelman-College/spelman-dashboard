<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/views/Header.vue'
import Footer from '@/views/Footer.vue'
</script>

<template>
    <div id="container">
        <Header></Header>
        <RouterView />
        <Footer></Footer>
    </div>
</template>

<style>
body {
    margin: 0;
    display: flex;
    justify-content: center;
    background-color: #22262b;
}

div#container {
    width: 90rem;
}
</style>