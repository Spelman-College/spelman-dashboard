<script setup lang="ts">
import StoryCard from '@/components/StoryCard.vue'
import { getData } from '@/sheets/client'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const sid = import.meta.env.VITE_WOMEN_CONTENT_SHEET_ID

const StoriesURI = `https://docs.google.com/spreadsheets/d/${sid}/export?format=csv`
const rows = ref([])

onMounted(() => {
  const pout = getData(StoriesURI)
  pout.then((data) => {
    rows.value = data
  })
})
</script>

<template>
  <div class="view">
    <h3>Stories</h3>
    <p>Celebrating Black women in STEM and inspiring others to make their mark on the world</p>
  </div>

  <div class="story-card-grid">
    <!-- If image does not appear, confirm that hosted_image_link is populated in the spreadsheet. This col automatically transofrms the contents of the google_drive_link col into a parseable link. -->
    <StoryCard
      v-for="(story, index) in rows"
      :v-key="story.name"
      :imgSrc="story.hosted_image_link"
      :alt="story.name"
      width="25"
    >
      <template #name>{{ story.name }}</template>
      <template #profession>{{ story.profession }}</template>
      <template #story>{{ story.how_did_you_choose_this_path }}</template>
      <template #linkText
        ><router-link :to="{ path: '/stories/' + index }"
          >Read her story<span class="material-symbols-rounded">arrow_right_alt</span></router-link
        ></template
      >
    </StoryCard>
  </div>
</template>

<style scoped>
p {
  width: 36rem;
}

div.story-card-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 12rem;
  margin-left: 3rem;
}

/* 'Read Her Story' link' */
a {
  position: absolute;
  margin-bottom: 2.81rem;
  box-sizing: content-box;

  color: #313b49;
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.875rem; /* 142.857% */

  width: 11.3125rem;
  height: 2rem;
  flex-shrink: 0;

  white-space: nowrap;
}

.material-symbols-rounded {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  color: #313b49;
  margin-left: 0.81rem;
  vertical-align: middle;
}
</style>
