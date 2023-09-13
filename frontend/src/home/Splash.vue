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
    personName: 'Dr. Kizzmekia Corbett',
    shortDescription: 'Dr. Kizzmekia Corbett, Assistant Professor of Immunology',
    longDescription: "Assistant Professor of Immunology and Infectious Diseases at Harvard T.H. Chan School of Public Health.",
  },
  {
    imgSrc: '/homepage_carousel/janina_jeff.jpeg',
    personName: 'Dr. Janina Jeff',
    shortDescription: 'Dr. Janina Jeff, Geneticist and Senior Scientist at Illumina',
    longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

  },
  {
    imgSrc: '/homepage_carousel/stacey_dixon.png',
    personName: 'Dr. Stacey Dixon',
    shortDescription: 'Dr. Stacey Dixon, Principal Deputy Director of US National Intelligence',
    longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

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
      <h1 class="responsive-title">
        Breaking Boundaries<br />
        and Transforming<br />
        Futures
      </h1>
      <p class="description-text">
        Amplifying the stories and impact of Black women in STEM through data, insights, and
        advocacy
      </p>
      <div class="trailblazer-text">Spelman College honors STEM Trailblazer this month, <span class="font-bold">{{ featuredWomen[currentIndex].personName }}</span>, {{featuredWomen[currentIndex].longDescription}} <a class="featured-link-text" @click="">Learn more about her</a>.</div>
      <button @click="goToData">Visit the Data Dashboard</button>
    </div>
    <div id="splash-graphics">
      <div class="image">
        <img :src="featuredWomen[currentIndex].imgSrc" alt="" id="splash-image" />
        <button class="hero-image-text">{{ featuredWomen[currentIndex].shortDescription }}</button>
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

.responsive-title {
  white-space: nowrap;
}
@media (max-width: 1000px) {
  .responsive-title {
    white-space: normal;
  }
}

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
.description-text{
  font-size: 24px;
}
.trailblazer-text {
  width: 428px;
  color: #FFF;
font-family: 'Noto Sans', sans-serif;
font-size: 16px;
font-style: italic;
line-height: 24px; /* 150% */
letter-spacing: 0.25px;
margin-bottom:40px;
}
.font-bold{
  font:bold;
}
.featured-link-text{
  color: #ACF0FF;
font-size: 16px;
font-style: italic;
font-weight: 400;
line-height: 24px;
letter-spacing: 0.25px;
text-decoration-line: underline;
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
  top: 6rem;
  left: -7rem;
  width: 17rem;
}

#plusses {
  position: absolute;
  top: 2rem;
}

.plus-icon {
  position: absolute;
  width: 1.8rem;
}

#plus-icon-2 {
  left: 28rem;
}

#plus-icon-3 {
  top: 24rem;
}
</style>
