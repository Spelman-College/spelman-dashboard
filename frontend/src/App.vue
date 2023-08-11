<script setup lang="ts">
import Header from '@/views/Header.vue'
import Splash from '@/views/Splash.vue'
import ExploreData from '@/views/ExploreData.vue'
import Stories from '@/views/Stories.vue'
import Stat from '@/views/Stat.vue'
import MoreToExplore from '@/views/MoreToExplore.vue'
import Footer from '@/views/Footer.vue'
</script>

<template>
    <div id="container">
        <Header></Header>
        <div class="view">
            <Splash></Splash>
        </div>
        <div class="view gradient">
            <ExploreData></ExploreData>
        </div>
        <div class="view">
            <Stories></Stories>
        </div>
        <div class="view gradient">
            <Stat></Stat>
        </div>
        <div class="view">
            <MoreToExplore></MoreToExplore>
        </div>
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

div.view {
    padding: 2rem 3rem;
}

div.gradient {
    background: linear-gradient(180deg, rgba(34, 38, 43, 0.00) 0%, #181818 100%);
}
</style>