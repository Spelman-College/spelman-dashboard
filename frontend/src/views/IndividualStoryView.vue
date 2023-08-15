<script setup lang="ts">
import Stories from '@/home/Stories.vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const stories = [
  {
    name: "Dr. Helene D. Gayle, President of Spelman College",
    quote: "Aspire to inspire before we expire 1.",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "/story_placeholder1.jpg"
  },
  {
    name: "Shakiyla Huggins - Meeting the Challenge",
    quote: "Aspire to inspire before we expire 2.",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "/story_placeholder2.jpg"
  },
  {
    name: "Deanna Clemmer - An Invaluable Lab",
    quote: "Aspire to inspire before we expire 3.",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "/story_placeholder3.jpg"
  },
  {
    name: "4",
    quote: "Aspire to inspire before we expire 4.",
    story: "Story 4",
    imgSrc: "/story_placeholder1.jpg"
  },
  {
    name: "5",
    quote: "Aspire to inspire before we expire 5.",
    story: "Story 5",
    imgSrc: "/story_placeholder2.jpg"
  },
  {
    name: "6",
    quote: "Aspire to inspire before we expire 6.",
    story: "Story 6",
    imgSrc: "/story_placeholder3.jpg"
  },
]

let thisStory = stories[route.params.id];
</script>

<template>
  <div class="view">
    <router-link id="back-button" class="material-icons" :to="{ name: 'stories' }">chevron_left</router-link>
    <div class="side-by-side">
      <div>
        <img class="profile-img" :src="thisStory.imgSrc" />
        <div class="quote">
          "{{ thisStory.quote }}"
        </div>
        <div class="social-media-icons">
          <img src="/social_media_icons/icons8-twitter.svg" /><img src="/social_media_icons/icons8-instagram.svg" /><img
            src="/social_media_icons/icons8-linkedin.svg" />
        </div>
      </div>
      <div>
        <h3>{{ thisStory.name }}</h3>
        <p>{{ thisStory.story }}</p>
      </div>
    </div>
  </div>
  <Stories></Stories>
</template>

<style scoped>
#back-button {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.side-by-side {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.quote {
  width: 25rem;
  color: #acf0ff;
  font-family: 'Noto Sans';
  font-size: 2.5rem;
  font-weight: 500;
  margin: 1rem 0;
}

img.profile-img {
  width: 25rem;
  height: 25rem;
  border-radius: 1rem 1rem 0 0;
}

.social-media-icons img {
  margin: 1rem;
}
</style>
