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
    <Stat></Stat>
  </div>
  <div class="view stories-view">
    <Stories></Stories>
  </div>
  <div class="view">
    <MoreToExplore></MoreToExplore>
  </div>
</template>

<style scoped>
.stories-view {
  display: flex;
}
div.gradient {
  background: linear-gradient(180deg, rgba(34, 38, 43, 0) 0%, #181818 100%);
}
</style>
