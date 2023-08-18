<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'

const articles = [
  {
    imgSrc: "/gettyimages-1405307215-1024x1024.jpg",
    name: "Article: Lorem ipsum",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non."
  },
  {
    imgSrc: "/gettyimages-679531922-170667a.jpg",
    name: "News: Lorem ipsum",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra quam sed purus dignissim accumsan. Phasellus tristique dignissim lacus, ut dapibus libero luctus a. Sed tempor placerat nulla. Vestibulum tincidunt, massa quis vehicula eleifend, quam felis consectetur libero, vitae volutpat arcu felis eget metus. Nullam laoreet hendrerit mauris vitae ultricies. Vivamus hendrerit erat eget felis hendrerit pulvinar. Integer ut lorem consectetur, auctor nibh a, aliquam sem. Nam erat purus, congue vitae tellus ullamcorper, porttitor pellentesque lectus. Proin sed posuere eros. Phasellus at suscipit nunc, vel maximus tellus. Vestibulum lorem nisi, dapibus malesuada metus id, lacinia ultricies magna. Aenean iaculis ante est, ac euismod dolor vehicula non."
  }
]
</script>

<template>
  <h2>Articles and News</h2>
  <p>Here, you'll find a collection of informative and educational articles covering a wide range of topics in Black Women
    in STEM. Our team of experts has curated these articles to provide you with valuable insights, practical tips, and
    thought-provoking ideas. Browse through our articles to expand your knowledge and stay up to date with the latest
    trends and developments in the industry.</p>
  <div id="news">
    <StoryCard v-for="article in articles" :img-src="article.imgSrc" width="40">
      <template #name>{{ article.name }}</template>
      <template #story>{{ article.story }}</template>
      <template #linkText>Learn more</template>
    </StoryCard>
  </div>
</template>

<style scoped>
div#news {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>