<script setup lang="ts">
import ExploreCard from '@/components/ExploreCard.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function switchPage(routeName: string | null) {
  if (routeName) {
    router.push({ name: routeName })
  }
}

const cards = [
  {
    imgSrc: '/spelman_google_illustrations_no_border_article_blue_bg.png',
    header: 'Articles',
    link: 'Read articles',
    routeName:null
  },
  {
    imgSrc: '/spelman_google_illustrations_no_border_data_dashboard_blue_bg.png',
    header: 'Data Dashboard',
    link: 'Explore data dashboard',
    routeName:'dataDashboard'
  },
  {
    imgSrc: '/spelman_google_illustrations_no_border_spelman_woman_news_blue_bg.png',
    header: 'News',
    link: 'Get the latest news',
    routeName: null
  }
]
</script>
<template>
  <h2>More to explore</h2>
  <p>
    Dive deeper into insights, metrics, news, and more about<br />
    Black women in STEM
  </p>
  <div class="explore-cards">
    <ExploreCard v-for="card in cards" :v-key="card.header" :imgSrc="card.imgSrc">
      <template #header>
        {{ card.header }}
      </template>
      <template #text>
        {{ card.text }}
      </template>
      <template #link>
        <a @click="switchPage(card.routeName)">
        {{ card.link }}
        <span class="material-symbols-rounded">arrow_right_alt</span>
        </a>
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
