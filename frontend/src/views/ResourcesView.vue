<script setup lang="ts">
import Splash from '@/components/resources/Splash.vue'
import Reads from '@/components/resources/Reads.vue'
import Organizations from '@/components/resources/Organizations.vue'
import News from '@/components/resources/News.vue'
</script>

<template>
  <div class="view">
    <Splash></Splash>
  </div>
  <div class="view">
    <Reads></Reads>
  </div>
  <div class="view gradient">
    <Organizations></Organizations>
  </div>
  <div class="view">
    <News></News>
  </div>
</template>