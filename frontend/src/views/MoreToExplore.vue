<script setup lang="ts">
import ExploreCard from '@/components/ExploreCard.vue'

const cards = [
  {
    imgSrc: "line_graph_feature_icon_2.svg",
    header: "Data Dashboard",
    text: "See the comprehensive and informative data dashboard, presenting data in a visually engaging and digestible format",
    link: "Explore data dashboard"
  },
  {
    imgSrc: "line_graph_feature_icon_2.svg",
    header: "Data Dashboard",
    text: "See the comprehensive and informative data dashboard, presenting data in a visually engaging and digestible format",
    link: "Explore data dashboard"
  },
  {
    imgSrc: "line_graph_feature_icon_2.svg",
    header: "Data Dashboard",
    text: "See the comprehensive and informative data dashboard, presenting data in a visually engaging and digestible format",
    link: "Explore data dashboard"
  }
]
</script>
<template>
  <h2>More to explore</h2>
  <p>Dive deeper into insights, metrics, news, and more about<br />
    Black women in STEM</p>
  <!--Put these in a CSS grid -->
  <ExploreCard v-for="card in cards" v-key="card.header" :imgSrc="card.imgSrc">
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
</template>