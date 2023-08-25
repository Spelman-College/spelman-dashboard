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
    imgSrc: "/books/book_01.png",
    link: "/book_01",
  },
  {
    imgSrc: "/books/book_02.png",
    link: "https://www.amazon.com/Genius-Women-Overlooked-Changing-World/dp/1524744212"
  },
  {
    imgSrc: "/books/book_03.png",
    link: "https://www.amazon.com/Atomic-Women-Stories-Scientists-Nuclear/dp/031648959X"
  },
  {
    imgSrc: "/books/book_04.png",
    link: "https://www.amazon.com/Portrait-Scientist-Young-Woman/dp/0063086905",
  },
  {
    imgSrc: "/books/book_05.png",
    link: "https://www.amazon.com/Black-Fortunes-African-Americans-Millionaires/dp/0062437593/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1692987967&sr=8-1",
  },
  {
    imgSrc: "/books/book_06.jpg",
    link: "https://a.co/d/7oWkoyL",
  },
]
</script>

<template>
  <h2>Recommended Reads</h2>
  <p>Check out these amazing stories of resilience, brilliance, and groundbreaking achievements! We're celebrating the
    unsung heroes of STEM - Science, Technology, Engineering, and Mathematics.</p>
  <div class="carousel-nav">
    <button class="carousel-nav-buttons" @click="prevPage">&larr;</button> <button class="carousel-nav-buttons"
      @click="nextPage">&rarr;</button>
  </div>
  <div>
    <Carousel :value="books" :numVisible="5" :numScroll="5" :show-indicators="false" :circular="true"
      :pt="{ previousButton: { id: 'prevButton', class: 'hidden' }, nextButton: { id: 'nextButton', class: 'hidden' } }">
      <template #item="slotProps">
        <a :href="slotProps.data.link"><img class="book-card" :src="slotProps.data.imgSrc" /></a>
      </template>
    </Carousel>
  </div>
</template>

<style>
.book-card {
  width: 13rem;
}

p {
  width: 35rem;
}

.carousel-nav {
  display: flex;
  justify-content: flex-end;
  margin-right: 5em;
  margin-bottom: 4em;
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