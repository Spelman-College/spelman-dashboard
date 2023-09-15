<script setup lang="ts">
import { ref } from 'vue'

function nextPage() {
  document.getElementById('nextButton')?.click()
}
function prevPage() {
  document.getElementById('prevButton')?.click()
}

const books = [
  {
    imgSrc: '/books/book_01.png'
  },
  {
    imgSrc: '/books/book_02.png'
  },
  {
    imgSrc: '/books/book_03.png'
  },
  {
    imgSrc: '/books/book_04.png'
  },
  {
    imgSrc: '/books/book_05.png'
  },
  {
    imgSrc: '/books/book_06.jpg'
  }
]
</script>

<template>
  <h2>Recommended Reads</h2>
  <p>
    Check out these amazing stories of resilience, brilliance, and groundbreaking achievements!
    We're celebrating the unsung heroes of STEM - Science, Technology, Engineering, and Mathematics.
  </p>
  <div class="reads-carousel-container">
    <div class="carousel-nav">
      <button class="carousel-nav-buttons" @click="prevPage">
        <span class="material-symbols-rounded">arrow_left_alt</span>
      </button>
      <button class="carousel-nav-buttons" @click="nextPage">
        <span class="material-symbols-rounded">arrow_right_alt</span>
      </button>
    </div>
    <div>
      <Carousel
        :value="books"
        :numVisible="5"
        :numScroll="5"
        :show-indicators="false"
        :circular="true"
        :pt="{
          previousButton: { id: 'prevButton', class: 'hidden' },
          nextButton: { id: 'nextButton', class: 'hidden' }
        }"
      >
        <template #item="slotProps">
          <router-link :to="{ path: '/resources/' + slotProps.index }"
            ><img class="book-card" :src="slotProps.data.imgSrc"
          /></router-link>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style>
.book-card {
  width: 13rem;
}
.reads-carousel-container {
  /* Temp workaround - adjust when there are carousel designs at different breakpoints */
  min-width: 90rem;
}

p {
  width: 35rem;
}

.reads-carousel-container .carousel-nav {
  display: flex;
  justify-content: flex-end;
  margin-right: 5em;
  margin-bottom: 4em;
  padding-right: 9rem;
}

.carousel-nav button {
  text-align: center;
  width: 4em;
  height: 4em;
  margin-left: 2em;
}

.hidden {
  visibility: hidden;
}
</style>
