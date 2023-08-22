<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'
import { ref, onMounted } from 'vue';
import Papa from 'papaparse';
const sid = import.meta.env.VITE_WOMEN_CONTENT_SHEET_ID

const StoriesURI = `https://docs.google.com/spreadsheets/d/${sid}/export?format=csv`
const rows = ref([]);

async function getData() {
  await Papa.parse(StoriesURI, {
    header: true,
    download: true,
    worker: true,
    complete: function (results, file) {
      rows.value = results.data;
    },
  });
}

onMounted(() => {
  getData();
});

</script>

<template>
  <div class="view">
    <h3>Stories</h3>
    <p>Celebrating Black women in STEM and inspiring others to make their mark on the world</p>
  </div>

  <div class="story-card-grid">
    <StoryCard v-for="story in rows" :v-key="story.name" :imgSrc="story.hosted_image_link" :alt="story.name" width="25">
      <template #name>{{ story.name }}</template>
      <template #story>{{ story.text }}</template>
      <template #linkText>Read her story</template>
    </StoryCard>
  </div>
</template>

<style scoped>
p {
  width: 36rem;
}

div.story-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 12rem;
}
</style>
