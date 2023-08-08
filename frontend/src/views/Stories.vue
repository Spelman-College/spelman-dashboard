<script setup lang="ts">
import '@/components/StoryCard.vue'
</script>

<template>
  <div class="background">
    <h1>Read their stories</h1>
    <p>
      Celebrating Black women in STEM and inspiring others to<br />
      make their mark on the world
    </p>

    <div class="nav-buttons">
      <button>&larr;</button> <button>&rarr;</button>
    </div>
    <div>
      <StoryCard></StoryCard>
      <StoryCard></StoryCard>
      <StoryCard></StoryCard>
    </div>
    <button>Read more stories</button>
  </div>
</template>

<style scoped>
@import "/homepage.css"
</style>