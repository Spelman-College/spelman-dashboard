<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goToAbout() {
  router.push({ name: 'about' })
}
function goToContact() {
  router.push({ name: 'contact' })
}
function goToResources() {
  router.push({ name: 'resources' })
}
function goToData() {
  router.push({ name: 'dataDashboard' })
}
function goToHome() {
  router.push({ name: 'home' })
}

function showDataDashboardAsButton(): boolean {
  return router?.currentRoute.value.name ? !['home', 'dataDashboard', 'dataDashboardView'].includes(router.currentRoute.value.name.toString()) : true
}
</script>

<template>
  <div id="header">
    <span id="logo" @click="goToHome">Home</span>
    <span class="header-links" id="about" @click="goToAbout">About</span>
    <span class="header-links" id="resources" @click="goToResources">Resources</span>
    <span class="header-links" id="contact" @click="goToContact">Contact</span>
    <span class="header-links" id="data-dashboard" @click="goToData" v-if="!showDataDashboardAsButton()">Data
      Dashboard</span>
    <button id="data-dashboard" class="header-links" @click="goToData" v-if="showDataDashboardAsButton()">Data
      Dashboard</button>
  </div>
</template>

<style scoped>
#header {
  display: flex;
  height: 2.5rem;
  padding: 2rem 3.5rem;
  color: #a7d7ed;
  background-color: #181818;
  justify-content: space-between;
  align-items: center;
}

.header-links {
  margin: 0 2rem;
  font-family: 'Noto Sans Mono';
  cursor: pointer;
}

#logo {
  margin-right: auto;
  color: #4fdfff;
  font-family: 'Noto Sans Mono';
  cursor: pointer;
}
</style>
