<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'


const stories = [
  {
    name: "Dr. Helene D. Gayle, President of Spelman College",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "story_placeholder1.jpg"
  },
  {
    name: "Shakiyla Huggins - Meeting the Challenge",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "story_placeholder2.jpg"
  },
  {
    name: "Deanna Clemmer - An Invaluable Lab",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non.",
    imgSrc: "story_placeholder3.jpg"
  },
  {
    name: "4",
    story: "Story 4",
    imgSrc: "story_placeholder1.jpg"
  },
  {
    name: "5",
    story: "Story 5",
    imgSrc: "story_placeholder2.jpg"
  },
  {
    name: "6",
    story: "Story 6",
    imgSrc: "story_placeholder3.jpg"
  },
]
</script>

<template>
  <div class="view">
    <h3>Stories</h3>
    <p>The Black Experience in Design spotlights teaching practices, research, stories, and conversations from a
      Black/African diasporic lens.</p>
  </div>

  <div class="story-card-grid">
    <StoryCard v-for="story in stories" :v-key="story.name" :imgSrc="story.imgSrc">
      <template #name>{{ story.name }}</template>
      <template #story>{{ story.story }}</template>
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