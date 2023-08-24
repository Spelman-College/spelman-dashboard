<script setup lang="ts">
import { ref } from 'vue'

import DataDashboardExploreCard from '@/components/DataDashboardExploreCard.vue'

const showStories = ref(false)

const cards = [
  {
    dataSource: "IPEDS",
    name: "Number and percentage of STEM degrees",
    year: "2021",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies nec urna a eleifend. In lorem ex, ultricies in tortor non, euismod congue nunc. Morbi dapibus id ipsum eu pellentesque. Phasellus euismod turpis et est convallis, sit amet cursus risus gravida. Morbi nec neque cursus, lacinia dolor in, sollicitudin felis. Aenean accumsan leo non ligula sagittis dictum. Aenean hendrerit metus a venenatis iaculis.",
    vars: ["Year", "Gender", "Race", "Degree Level", "Disability Status"]
  },
  {
    dataSource: "National Center for Science and Engineering Statistics",
    name: "African American women who earned a Bachelor's degree, and works in Science, tech, engineering and math, that are earning more than $85K (2014 to 2020)",
    year: "2021",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies nec urna a eleifend. In lorem ex, ultricies in tortor non, euismod congue nunc. Morbi dapibus id ipsum eu pellentesque. Phasellus euismod turpis et est convallis, sit amet cursus risus gravida. Morbi nec neque cursus, lacinia dolor in, sollicitudin felis. Aenean accumsan leo non ligula sagittis dictum. Aenean hendrerit metus a venenatis iaculis.",
    vars: ["Year", "Gender", "Race", "Degree Level", "Disability Status", "Citizenship Status", "Occupation", "Labor status"]
  },
  {
    dataSource: "National Center for Science and Engineering Statistics",
    name: "Trends in research doctorate recipient characteristics",
    year: "2021",
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies nec urna a eleifend. In lorem ex, ultricies in tortor non, euismod congue nunc. Morbi dapibus id ipsum eu pellentesque. Phasellus euismod turpis et est convallis, sit amet cursus risus gravida. Morbi nec neque cursus, lacinia dolor in, sollicitudin felis. Aenean accumsan leo non ligula sagittis dictum. Aenean hendrerit metus a venenatis iaculis.",
    vars: ["Year", "Gender", "Race", "Degree Level", "Disability Status", "Citizenship Status", "Occupation", "Labor status"]
  },
]
</script>

<template>
  <div class="outer">
    <div>
      <div class="header">Explore data<br />
        your way</div>
      <div class="paragraph">Whether you want to free explore different datasets with our “Open explore” section or select
        start from our
        guided
        preset of “Data stories” group, there's plenty to discover.</div>
      <div class="buttons">
        <button :class="showStories ? '' : 'inactive'" @click="showStories = false">Open explore</button>
        <button :class="showStories ? 'inactive' : ''" @click="showStories = true">Data stories</button>
      </div>
    </div>
    <div>
      <DataDashboardExploreCard v-for="card in cards" :key="card.name" :vars="card.vars">
        <template #dataSource>{{ card.dataSource }}</template>
        <template #name>{{ card.name }}</template>
        <template #story v-if="showStories">{{ card.story }}</template>
        <template #year>{{ card.year }}</template>
      </DataDashboardExploreCard>
    </div>
    <div class="filter-container">
      <div class="material-icons filter">filter_list</div>
      <div class="filter-text">Filter</div>
    </div>
  </div>
</template>

<style scoped>
div.outer {
  display: grid;
  grid-template-columns: 9fr 9fr 2fr;
}

div.outer>* {
  margin: 4rem 2rem;
}

div.header {
  color: #FFF;
  font-family: 'Noto Sans Display';
  font-size: 4rem;
  font-weight: 500;
  line-height: 100%;
}

div.paragraph {
  color: #FFF;
  width: 28.44263rem;
  font-family: 'Roboto';
  font-size: 1.3125rem;
  line-height: 1.875rem;
  margin: 3rem 0;
}

div.buttons>button {
  display: block;
  width: 9.625rem;
  margin: 1rem 0;
}

div.buttons>button.inactive {
  background: #313b49;
  color: #ffffff;
}

.filter-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 2.25rem;
}

.filter-text {
  color: #ffffff;
  font-family: 'Noto Sans';
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>