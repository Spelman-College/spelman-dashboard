<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function goToData() {
  router.push({ name: 'dataDashboard' })
}
const featuredWomen = [
  {
    imgSrc: '/homepage_carousel/dr_corbett.png',
    text: 'Dr. Kizzmekia Corbett, Assistant Professor of Immunology'
  },
  {
    imgSrc: '/homepage_carousel/janina_jeff.jpeg',
    text: 'Dr. Janina Jeff, Geneticist and Senior Scientist at Illumina'
  },
  {
    imgSrc: '/homepage_carousel/stacey_dixon.png',
    text: 'Dr. Stacey Dixon, Principal Deputy Director of US National Intelligence'
  }
]

const currentIndex = ref(0)

function changeActiveImage(index) {
  currentIndex.value = index
}
function nextImage() {
  currentIndex.value += 1
  // Reset to zero at end of featuredWomen array
  if (currentIndex.value >= featuredWomen.length) {
    currentIndex.value = 0
  }
}
</script>

<template>
  <div class="flex-container">
    <div class="title-and-link">
      <h1>
        Breaking Boundaries<br />
        and Transforming<br />
        Futures
      </h1>
      <p>
        Amplifying the stories and impact of Black women in STEM through data, insights, and
        advocacy
      </p>
      <button @click="goToData">Visit the Data Dashboard</button>
    </div>
    <div id="splash-graphics">
      <div class="image">
        <img :src="featuredWomen[currentIndex].imgSrc" alt="" id="splash-image" />
        <button class="hero-image-text">{{ featuredWomen[currentIndex].text }}</button>
        <img src="/swiggly_red_FF6454.svg" alt="" id="swiggly-red" />
        <div id="plusses">
          <img src="/plus_icon_1.svg" alt="" class="plus-icon" id="plus-icon-1" />
          <img src="/plus_icon_2.svg" alt="" class="plus-icon" id="plus-icon-2" />
          <img src="/plus_icon_3.svg" alt="" class="plus-icon" id="plus-icon-3" />
        </div>
        <div class="carousel-buttons">
          <div
            v-for="(button, index) in featuredWomen"
            :key="index"
            @click="changeActiveImage(index)"
            :class="{ 'carousel-button': true, active: index === currentIndex }"
          ></div>
        </div>
      </div>
      <div class="next-hero" @click="nextImage">
        <span class="next-hero-arrow material-symbols-rounded">arrow_forward_ios</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '/homepage.css';

.flex-container {
  display: flex;
  justify-content: space-between;
}
.title-and-link button {
  width: 227px;
  height: 48px;
}
.title-and-link p {
  font-size: 1.5rem;
}
#splash-graphics {
  position: relative;
  display: flex;
  top: 10rem;
  /* Temporary fix to prevent swiggly red from going over title text
   - update margin-left once mobile view is designed */
  margin-left: 6rem;
  margin-right: 1rem;
}

#splash-image {
  width: 31.5rem;
  flex-shrink: 0;
  border-radius: 100%;
}
.next-hero {
  display: flex;
  align-items: center;
  height: 31.5rem;
}
.next-hero-arrow {
  color: white;
  font-size: 3rem;
  margin-left: 1rem;
}
.hero-image-text {
  display: flex;
  width: 489px;
  height: 48px;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 100px;
  background: #fffcea;
  border: none;
  position: relative;
  bottom: 1.75rem;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%; /* 24px */
}
.carousel-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.carousel-button {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  border-radius: 10.5px;
  background: black;
}
.carousel-button.active {
  background: #fffcea;
}

#swiggly-red {
  position: absolute;
  top: 5rem;
  left: -7rem;
  width: 17rem;
}

#plusses {
  position: absolute;
  top: 1rem;
}

.plus-icon {
  position: absolute;
  width: 1.8rem;
  fill: #ffe89b;
}

#plus-icon-2 {
  left: 25rem;
}

#plus-icon-3 {
  top: 23rem;
}
</style>
