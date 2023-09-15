<script setup lang="ts">
import Stories from '@/home/Stories.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { getData } from '@/sheets/client'

const route = useRoute()
const router = useRouter()

const sid = import.meta.env.VITE_WOMEN_CONTENT_SHEET_ID

const StoriesURI = `https://docs.google.com/spreadsheets/d/${sid}/export?format=csv`
const thisStory = ref([])

onMounted(() => {
  const pout = getData(StoriesURI)
  pout.then((data) => {
    thisStory.value = data[parseInt(route.params.id)]
  })
})

// TODO: Look into alternate function to speed this up
watch(route, () => {
  const pout = getData(StoriesURI)
  pout.then((data) => {
    thisStory.value = data[parseInt(route.params.id)]
  })
})
</script>

<template>
  <div class="view">
    <router-link id="back-button" class="material-symbols-rounded" :to="{ name: 'stories' }"
      >chevron_left</router-link
    >
    <div class="side-by-side">
      <div>
        <img class="profile-img" :src="thisStory.hosted_image_link" />
        <div class="quote">
          {{ thisStory.undergraduate_degree }}
          {{ thisStory.graduate_degree }}
        </div>
        <div class="social-media-icons">
          <a :href="thisStory.twitter"
            ><img
              v-if="thisStory.twitter"
              src="/social_media_icons/icons8-twitter.svg"
              alt="Twitter"
              id="twitter"
          /></a>
          <a :href="thisStory.instagram"
            ><img
              v-if="thisStory.instagram"
              src="/social_media_icons/icons8-instagram.svg"
              alt="Instagram"
          /></a>
          <a :href="thisStory.linkedin"
            ><img
              v-if="thisStory.linkedin"
              src="/social_media_icons/icons8-linkedin.svg"
              alt="LinkedIn"
          /></a>
          <a :href="thisStory.website"
            ><img
              v-if="thisStory.website"
              src="/social_media_icons/icons8-website.svg"
              alt="Website"
          /></a>
        </div>
      </div>
      <div>
        <h3>{{ thisStory.name }} - {{ thisStory.profession }}</h3>
        <div class="question-header">How did you choose this path?</div>
        <p>{{ thisStory.how_did_you_choose_this_path }}</p>
        <div class="question-header">What's a challenge that you had to overcome?</div>
        <p>{{ thisStory.challenge_you_had_to_overcome }}</p>
        <div class="question-header">
          What advice would you give to someone who would like to follow in your footsteps or pursue
          a career in STEM?
        </div>
        <p>{{ thisStory.advice }}</p>
        <div class="question-header">Being a Black woman in STEM...</div>
        <p>{{ thisStory.being_a_black_woman_in_stem }}</p>
      </div>
    </div>
  </div>
  <Stories></Stories>
</template>

<style scoped>
#back-button {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 3rem;
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

.question-header {
  width: 25rem;
  color: #acf0ff;
  font-family: 'Noto Sans Mono';
  font-size: 1.5rem;
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
  cursor: pointer;
}
</style>
