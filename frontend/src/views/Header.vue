<template>
  <div id="header">
    <span id="logo">Logo</span>
    <span class="header-links" id="about">About</span>
    <span class="header-links" id="resources">Resources</span>
    <span class="header-links" id="contact">Contact</span>
    <span class="header-links" id="data-dashboard">Data Dashboard</span>
  </div>
</template>

<style scoped>
#header {
  display: flex;
  padding: 2rem;
  color: #a7d7ed;
  background-color: #181818;
  justify-content: flex-end;
}

.header-links {
  margin: 0 2rem;
}

.header-links:last-child {
  margin: 0 0 0 2rem;
}

#logo {
  margin-right: auto;
  color: #4fdfff;
}
</style>