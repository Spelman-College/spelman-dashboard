<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { getData } from '@/sheets/client'
const sid = import.meta.env.VITE_WOMEN_CONTENT_SHEET_ID

const StoriesURI = `https://docs.google.com/spreadsheets/d/${sid}/export?format=csv`
const rows = ref([]);

onMounted(() => {
  const pout = getData(StoriesURI);
  pout.then((data) => {
	  rows.value = data;
	 })
});

const router = useRouter();

const nextButton = ref(null)

function nextPage() {
  document.getElementById('nextButton')?.click()
}
function prevPage() {
  document.getElementById('prevButton')?.click()
}

function goToStoriesView() {
  router.push({ name: 'stories' })
}

const page = ref(0)
</script>

<template>
  <h2>Read their stories</h2>
  <p>
    Celebrating Black women in STEM and inspiring others to<br />
    make their mark on the world
  </p>

  <div class="carousel-nav">
    <button class="carousel-nav-buttons" @click="prevPage">&larr;</button> <button class="carousel-nav-buttons"
      @click="nextPage">&rarr;</button>
  </div>
  <div>
    <Carousel :value="rows" :numVisible="3" :numScroll="3" :show-indicators="false" :circular="true"
      :pt="{ previousButton: { id: 'prevButton', class: 'hidden' }, nextButton: { id: 'nextButton', class: 'hidden' } }">
      <template #item="slotProps">
        <StoryCard :img-src="slotProps.data.hosted_image_link" width="25">
          <template #name>{{ slotProps.data.name }}</template>
          <template #profession>{{ slotProps.data.profession }}</template>
          <template #story>{{ slotProps.data.how_did_you_choose_this_path }}</template>
          <template #linkText><router-link :to="{path: '/stories/' + index}">Read her story</router-link></template>
        </StoryCard>
      </template>
    </Carousel>
  </div>
  <button class="center" @click="goToStoriesView">Read more stories</button>
</template>

<style>
@import "/homepage.css";

.carousel-nav {
  display: flex;
  justify-content: flex-end;
  margin-right: 5em;
  margin-bottom: 4em;
}

.carousel-nav button {
  text-align: center;
  width: 4em;
  height: 4em;
  margin-left: 2em;
}

.hidden {
  visibility: hidden;
}
</style>
