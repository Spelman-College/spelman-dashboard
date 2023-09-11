<script setup lang="ts">
import ExploreCard from '@/components/ExploreCard.vue'

const cards = [
  {
    imgSrc: "/spelman_google_illustrations_articles_mobile_blue_bg.png",
    header: "Articles",
    link: "Read articles"
  },
  {
    imgSrc: "/spelman_google_illustrations_data_dashboard_blue_bg.png",
    header: "Data Dashboard",
    link: "Explore data dashboard"
  },
  {
    imgSrc: "/spelman_google_illustrations_spelman_woman_news_blue_bg.png",
    header: "News",
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
          <img :src="card.imgSrc" />
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