<script setup lang="ts">
import TeamStoryCard from '@/components/TeamStoryCard.vue'
import bios from '@/about/bios.ts'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

function nextPage() {
  document.getElementById('nextButton')?.click()
}
function prevPage() {
  document.getElementById('prevButton')?.click()
}

function goToBiosView() {
  router.push({ name: 'bios' })
}

</script>

<template>
  <h2>The Spelman Team</h2>
  <p>
    Amplifying Black Women's Voices in STEM - Meet the<br />
    Minds Fueling the Movement
  </p>

  <div class="carousel-nav">
    <button class="carousel-nav-buttons" @click="prevPage">&larr;</button> <button class="carousel-nav-buttons"
      @click="nextPage">&rarr;</button>
  </div>
  <div>
    <Carousel :value="bios" :numVisible="4" :numScroll="1" :show-indicators="false" :circular="true"
      :pt="{ previousButton: { id: 'prevButton', class: 'hidden' }, nextButton: { id: 'nextButton', class: 'hidden' } }">
      <template #item="slotProps">
        <TeamStoryCard :img-src="slotProps.data.imgSrc" width="19.7">
          <template #name>{{ slotProps.data.name }}</template>
          <template #story>{{ slotProps.data.story }}</template>
          <template #linkText><router-link :to="{path: '/bios/' + slotProps.index}">Read her story<span class="material-symbols-outlined">arrow_right_alt</span></router-link></template>
        </TeamStoryCard>
      </template>
    </Carousel>
  </div>
  <button class="center" @click="goToBiosView">View all bios</button>
</template>

<style>
@import "/homepage.css";


.p-carousel {
  flex: 0;
  padding: 043m;
}

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

a {
  color: #313B49;
  font-family: Noto Sans Mono;
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.875rem; /* 142.857% */
}

.material-symbols-outlined {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  color: #313B49;
  margin-left: 0.81rem;
  vertical-align:middle;
}

</style>
