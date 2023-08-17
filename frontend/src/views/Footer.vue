<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToFAQ() {
  router.push({ name: 'FAQ' })
}
</script>

<template>
  <div id="footer">
    <div class="title">
      <div id="logo">Logo</div>
      <div>Breaking Boundaries and<br />Transforming Futures</div>
    </div>
    <div class="info">
      <div id="contact">
        <div>Address goes here</div>
        <div>(222) 222-2222</div>
        <div>xyz@coe.org</div>
      </div>
      <div id="misc">
        <div>@ 2023-2-24</div>
        <div>Privacy &mdash; Terms</div>
        <div class = "faq" @click="goToFAQ">FAQ</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#footer {
  background-color: #000000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2rem 6rem;
  font-family: 'Noto Sans', sans-serif;
  margin-top: 4rem;
}

#logo {
  margin: 0 2rem 0 0;
}

.title {
  display: flex;
  color: #4fdfff;
  align-items: center;
}

.info {
  display: flex;
  color: #dcdcdc;
  align-items: center;
  justify-content: space-between;
}

#contact {
  font-size: 12px;
}

#misc {
  font-size: 14px;
}
</style>