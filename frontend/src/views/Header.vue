<template>
  <div id="header">
    <span id="logo">Logo</span>
    <span class="header-links" id="about">About</span>
    <span class="header-links" id="resources">Resources</span>
    <span class="header-links" id="contact">Contact</span>
    <span class="header-links" id="data-dashboard" v-if="$router.currentRoute.value.name === 'home'">Data Dashboard</span>
    <button id="data-dashboard" class="header-links" v-if="$router.currentRoute.value.name !== 'home'">Data
      Dashboard</button>
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