<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goToData() {
  router.push({ name: 'data' })
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
        Amplifying the stories and impact of Black women in STEM<br />
        through data, insights, and advocacy
      </p>
      <button @click="goToData">Visit the Data Dashboard</button>
    </div>
    <div id="splash-graphics">
      <img src="/splash.png" alt="" id="splash-image" />
      <img src="/swiggly_red_FF6454.svg" alt="" id="swiggly-red" />
      <div id="plusses">
        <img src="/plus_icon_1.svg" alt="" class="plus-icon" id="plus-icon-1" />
        <img src="/plus_icon_2.svg" alt="" class="plus-icon" id="plus-icon-2" />
        <img src="/plus_icon_3.svg" alt="" class="plus-icon" id="plus-icon-3" />
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
  top: 10rem;
  /* Temporary fix to prevent swiggly red from going over title text
   - update margin-left once mobile view is designed */
  margin-left: 6rem;
}

#splash-image {
  width: 30rem;
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
}

#plus-icon-2 {
  left: 25rem;
}

#plus-icon-3 {
  top: 23rem;
}
</style>
