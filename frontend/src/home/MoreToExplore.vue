<script setup lang="ts">
import ExploreCard from '@/components/ExploreCard.vue'

const cards = [
  {
    imgSrc: "data_dashboard_icon.svg",
    header: "Data Dashboard",
    text: "See the comprehensive and informative data dashboard, presenting data in a visually engaging and digestible format",
    link: "Explore data dashboard"
  },
  {
    imgSrc: "articles_icon.svg",
    header: "Articles",
    text: "See the comprehensive and informative data dashboard, presenting data in a visually engaging and digestible format",
    link: "Read articles"
  },
  {
    imgSrc: "news_icon.svg",
    header: "News",
    text: "See the comprehensive and informative data dashboard, presenting data in a visually engaging and digestible format",
    link: "Get the latest news"
  }
]
</script>
<template>
  <h2>More to explore</h2>
  <p>Dive deeper into insights, metrics, news, and more about<br />
    Black women in STEM</p>
  <div class="explore-cards">
    <ExploreCard v-for="card in cards" :v-key="card.header" :imgSrc="card.imgSrc">
      <template #header>
        {{ card.header }}
      </template>
      <template #text>
        {{ card.text }}
      </template>
      <template #link>
        {{ card.link }}
      </template>
    </ExploreCard>
  </div>
</template>

<style scoped>
.explore-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
}
</style>