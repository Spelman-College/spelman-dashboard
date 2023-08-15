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
        <p>Address goes here</p>
        <p>(222) 222-2222</p>
        <p>xyz@coe.org</p>
      </div>
      <div id="misc">
        <p>@ 2023-2-24</p>
        <p>Privacy --- Terms</p>
        <p><button @click="goToFAQ">FAQ</button></p>
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