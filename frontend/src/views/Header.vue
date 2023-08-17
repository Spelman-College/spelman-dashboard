<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goToAbout() {
  router.push({ name: 'about' })
}
function goToContact() {
  router.push({ name: 'contact' })
}
function goToData() {
  router.push({ name: 'data' })
}

</script>

<template>
  <div id="header">
    <span id="logo">Logo</span>
    <span class="header-links" id="about" @click="goToAbout">About</span>
    <span class="header-links" id="resources">Resources</span>
    <span class="header-links" id="contact" @click="goToContact">Contact</span>
    <span class="header-links" id="data-dashboard" @click="goToData" v-if="$router.currentRoute.value.name === 'home'">Data Dashboard</span>
    <button id="data-dashboard" class="header-links" @click="goToData" v-if="$router.currentRoute.value.name !== 'home'">Data Dashboard</button>
  </div>
</template>

<style scoped>
#header {
  display: flex;
  height: 2.5rem;
  padding: 2rem;
  color: #a7d7ed;
  background-color: #181818;
  justify-content: flex-end;
  align-items: center;
}

.header-links {
  margin: 0 2rem;
  font-family: 'Noto Sans Mono';
}

#logo {
  margin-right: auto;
  color: #4fdfff;
}
</style>