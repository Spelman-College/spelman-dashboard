<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'
import { getData } from '@/components/fetchSpreadsheet'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const sid = import.meta.env.VITE_WOMEN_CONTENT_SHEET_ID

const StoriesURI = `https://docs.google.com/spreadsheets/d/${sid}/export?format=csv`
const rows = ref([]);

onMounted(() => {
  getData(StoriesURI, rows);
});

</script>

<template>
  <div class="view">
    <h3>Stories</h3>
    <p>Celebrating Black women in STEM and inspiring others to make their mark on the world</p>
  </div>

  <div class="story-card-grid">
    <StoryCard v-for="(story, index) in rows" :v-key="story.name" :imgSrc="story.hosted_image_link" :alt="story.name"
      width="25">
      <template #name>{{ story.name }}</template>
      <template #story>{{ story.text }}</template>
      <template #linkText><router-link :to="{ path: '/stories/' + index }">Read her story</router-link></template>
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
