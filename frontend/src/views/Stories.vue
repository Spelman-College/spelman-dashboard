<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'

import { ref } from 'vue'

const nextButton = ref(null)

function nextPage() {
  document.getElementById('nextButton')?.click()
}
function prevPage() {
  document.getElementById('prevButton')?.click()
}

const stories = [{
  "thing": "1",
}, {
  "thing": "2",
}, {
  "thing": "3",
}, {
  "thing": "4",
}, {
  "thing": "5",
}, {
  "thing": "6",
}]

const page = ref(0)
</script>

<template>
  <div class="background">
    <h1>Read their stories</h1>
    <p>
      Celebrating Black women in STEM and inspiring others to<br />
      make their mark on the world
    </p>

    <div class="nav-buttons">
      <button @click="prevPage">&larr;</button> <button @click="nextPage">&rarr;</button>
    </div>
    <div>
      <Carousel :value="stories" :numVisible="3" :numScroll="3"
        :pt="{ previousButton: { id: 'prevButton', class: 'hidden' }, nextButton: { id: 'nextButton', class: 'hidden' } }">
        <template #item="slotProps">
          <p>{{ slotProps.data.thing }}</p>
          <StoryCard></StoryCard>
        </template>
      </Carousel>
    </div>
    <button>Read more stories</button>
  </div>
</template>

<style>
@import "/homepage.css";

.hidden {
  display: none;
}
</style>