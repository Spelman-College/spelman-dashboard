<script setup lang="ts">
import Splash from '@/components/about/Splash.vue'
import Mission from '@/components/about/Mission.vue'
import Vision from '@/components/about/Vision.vue'
import TeamStories from '@/about/TeamStories.vue'
</script>

<template>
  <div class="view">
    <Splash></Splash>
  </div>
  <div class="view gradient">
    <Mission></Mission>
  </div>
  <!-- TODO: Debug gradient -->
  <div class="view">
    <Vision></Vision>
  </div>
  <div class="view gradient">
    <TeamStories></TeamStories>
  </div>
</template>