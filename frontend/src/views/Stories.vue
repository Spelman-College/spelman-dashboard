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

const stories = [
  {
    name: "Dr. Helene D. Gayle - President of Spelman College",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non."
  },
  {
    name: "Shakiyla Huggins - Meeting the Challenge",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non."
  },
  {
    name: "Deanna Clemmer - An Invaluable Lab",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non."
  },
  {
    name: "4",
    story: "Story 4"
  },
  {
    name: "5",
    story: "Story 5"
  },
  {
    name: "6",
    story: "Story 6"
  },
]

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
          <StoryCard>
            <template #name>{{ slotProps.data.name }}</template>
            <template #story>{{ slotProps.data.story }}</template>
          </StoryCard>
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