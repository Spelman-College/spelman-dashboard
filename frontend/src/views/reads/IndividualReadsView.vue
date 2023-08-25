<script setup lang="ts">
import Reads from '@/components/resources/Reads.vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

function goToData() {
  router.push({ name: 'data' })
}

const books = [
  {
    title: "The Disordered Cosmos: A Journey into Dark Matter, Spacetime, & Dreams Deferred",
    description: "description 1 test paragraphs though",
    imgSrc: "/books/book_01.png"
  },
  {
    imgSrc: "/books/book_02.png",
  },
  {
    imgSrc: "/books/book_03.png",
  },
  {
    imgSrc: "/books/book_04.png",
  },
  {
    imgSrc: "/books/book_05.png",
  },
  {
    title: "The Black Experience in Design: Identity, Expression & Reflection",
    p1: "The Black Experience in Design spotlights teaching practices, research, stories, and conversations from a Black/African diasporic lens.",
    p2: "Excluded from traditional design history and educational canons that heavily favor European modernist influences, the work and experiences of Black designers have been systematically overlooked in the profession for decades. However, given the national focus on diversity, equity, and inclusion in the aftermath of the nationwide Black Lives Matter protests in the United States, educators, practitioners, and students now have the opportunity—as well as the social and political momentum—to make long-term, systemic changes in design education, research, and practice, reclaiming the contributions of Black designers in the process.",
    p3: "The Black Experience in Design, an anthology centering a range of perspectives, spotlights teaching practices, research, stories, and conversations from a Black/African diasporic lens.",
    p4: "Through the voices represented, this text exemplifies the inherently collaborative and multidisciplinary nature of design, providing access to ideas and topics for a variety of audiences, meeting people as they are and wherever they are in their knowledge about design.",
    p5: "Ultimately, The Black Experience in Design serves as both inspiration and a catalyst for the next generation of creative minds tasked with imagining, shaping, and designing our future.",
    imgSrc: "/books/book_06.jpg",
  },
]

let thisBook = books[route.params.id];

</script>

<template>
  <div class="view">
    <router-link id="back-button" class="material-icons" :to="{ name: 'resources' }">chevron_left</router-link>
    <div class="side-by-side">
      <div>
        <img class="profile-img" :src="thisBook.imgSrc" />
        <div class="quote">
          {{ thisBook.title }}
        </div>
        <button @click="goToData">Visit the Data Dashboard</button>
      </div>
      <div>
        <h3>About the book</h3>
        <p>{{ thisBook.p1 }}</p>
        <p>{{ thisBook.p2 }}</p>
        <p>{{ thisBook.p3 }}</p>
        <p>{{ thisBook.p4 }}</p>
        <p>{{ thisBook.p5 }}</p>
      </div>
    </div>
  </div>
  <Reads></Reads>
</template>

<style scoped>
#back-button {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
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
  width: 20.00731rem;
  height: 27.58925rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: url(<path-to-image>), lightgray -1.923px 1.21px / 98.159% 99.792% no-repeat;
}

.social-media-icons img {
  margin: 1rem;
  cursor: pointer;
}
</style>
