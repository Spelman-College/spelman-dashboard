<script setup lang="ts">
import Stories from '@/about/TeamStories.vue'
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import bios from '@/about/bios'

const route = useRoute();
const thisStory = ref([]);


onMounted(() => {
  thisStory.value = bios[parseInt(route.params.id)]; 
});

watch(route, () => { 
  thisStory.value = bios[parseInt(route.params.id)]; 
  console.log(thisStory.value)
})

</script>

<template>
  <div class="view">
    <router-link id="back-button" class="material-symbols-rounded" :to="{ name: 'bios' }">chevron_left</router-link>
    <div class="side-by-side">
      <div>
        <img class="profile-img" :src="thisStory.imgSrc" />
        <div class="quote">
          {{ thisStory.name }}
        </div>
      </div>
      <div>
        <h3>{{ thisStory.name }}</h3>
        <p><span v-html="thisStory.story"></span></p>
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
  width: 19.68rem;
  height: 25rem;
  border-radius: 1rem 1rem 1rem 1rem;
}

.social-media-icons img {
  margin: 1rem;
  cursor: pointer;
}
</style>
