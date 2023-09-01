<script setup lang="ts">
import TeamStoryCard from '@/components/TeamStoryCard.vue'
import bios from '@/about/bios.ts'

</script>

<template>
  <div class="view">
    <h3>The Spelman Team</h3>
    <p>Amplifying Black Women's Voices in STEM – Meet the Minds Fueling the Movement</p>
  </div>

  <div class="story-card-grid">
    <TeamStoryCard v-for="(story, index) in bios" :v-key="story.name" :imgSrc="story.imgSrc" :alt="story.name" width="20">
      <template #name>{{ story.name }}</template>
      <template #story>{{ story.story }}</template>
      <template #linkText><router-link :to="{path: '/bios/' + index}">Read her story<span class="material-symbols-rounded">arrow_right_alt</span></router-link></template>
    </TeamStoryCard>
  </div>
</template>

<style scoped>
p {
  width: 36rem;
}

div.story-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 12rem;
}

/* 'Read Her Story' link' */
a {
  position: absolute;
  margin-bottom: 2.81rem;
  box-sizing: content-box;

  color: #313B49;
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.875rem; /* 142.857% */

  width: 11.3125rem;
  height: 2rem;
  flex-shrink: 0;

  white-space: nowrap;
}

.material-symbols-rounded {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  color: #313B49;
  margin-left: 0.81rem;
  vertical-align:middle;
}

</style>
