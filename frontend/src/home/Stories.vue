<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router';

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

const stories = [
  {
    name: "Dr. Helene D. Gayle, President of Spelman College",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "/story_placeholder1.jpg"
  },
  {
    name: "Shakiyla Huggins - Meeting the Challenge",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "/story_placeholder2.jpg"
  },
  {
    name: "Deanna Clemmer - An Invaluable Lab",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "/story_placeholder3.jpg"
  },
  {
    name: "4",
    story: "Story 4",
    imgSrc: "/story_placeholder1.jpg"
  },
  {
    name: "5",
    story: "Story 5",
    imgSrc: "/story_placeholder2.jpg"
  },
  {
    name: "6",
    story: "Story 6",
    imgSrc: "/story_placeholder3.jpg"
  },
]

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
    <Carousel :value="stories" :numVisible="3" :numScroll="3" :show-indicators="false" :circular="true"
      :pt="{ previousButton: { id: 'prevButton', class: 'hidden' }, nextButton: { id: 'nextButton', class: 'hidden' } }">
      <template #item="slotProps">
        <StoryCard :img-src="slotProps.data.imgSrc">
          <template #name>{{ slotProps.data.name }}</template>
          <template #story>{{ slotProps.data.story }}</template>
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