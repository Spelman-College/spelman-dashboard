<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

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
        <div>The virtual hub was developed in partnership between
          <br>Spelman's Center of Excellence for Minority Women in
          <br>STEM and Google.org. To contact us, email at:</div>
        <br>
        <div class="email">
          <span class="material-symbols-rounded">
            mail
          </span>coe-mws@spelman.edu
        </div>
      </div>
      <div id="misc">
        <div>© 2023-2024</div>
        <div>Terms of Use and <br> Privacy Policy</div>
        <br>
        <div class="footer-links" @click="goToFAQ">FAQ</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#footer {
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  padding: 2rem 3rem;
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
  gap: 4rem;
}

.email {
  text-decoration: underline;
}

.material-symbols-rounded {
  color: white;
  margin-left: 0rem;
  margin-right: 1.19rem;
}

#contact {
  font-size: 12px;
}

#misc {
  font-size: 12px;
}

.footer-links {
  cursor: pointer;
  color: #4fdfff;
  font-weight: 700;
}
</style>
