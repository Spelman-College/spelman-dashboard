<script setup lang="ts">
import Splash from '@/components/about/Splash.vue'
import Mission from '@/components/about/Mission.vue'
import Vision from '@/components/about/Vision.vue'
import Goal from '@/components/about/Goal.vue'
import TeamStories from '@/about/TeamStories.vue'
</script>

<template>
  <div class="view">
    <Splash></Splash>
  </div>
  <div class="view gradient">
    <Mission></Mission>
  </div>
  <div class="view">
    <Vision></Vision>
  </div>
  <div class="view gradient">
    <Goal></Goal>
  </div>
  <div class="view">
    <TeamStories></TeamStories>
  </div>
</template>

<style scoped>
div.gradient {
  background: linear-gradient(180deg, rgba(34, 38, 43, 0.00) 0%, #181818 100%);
}
</style>