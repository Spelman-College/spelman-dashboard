<script setup lang="ts">
import Splash from '@/home/Splash.vue'
import ExploreData from '@/home/ExploreData.vue'
import Stories from '@/home/Stories.vue'
import Stat from '@/home/Stat.vue'
import MoreToExplore from '@/home/MoreToExplore.vue'
</script>

<template>
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
</template>

<style scoped>
div.gradient {
  background: linear-gradient(180deg, rgba(34, 38, 43, 0.00) 0%, #181818 100%);
}
</style>