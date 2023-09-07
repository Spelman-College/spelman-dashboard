<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/views/Header.vue'
import Footer from '@/views/Footer.vue'
</script>

<template>
  <div id="container">
    <Header></Header>
    <RouterView />
    <Footer></Footer>
  </div>
</template>

<style>
body {
  margin: 0;
  display: flex;
  justify-content: center;
  background-color: #22262b;
}

div#container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow-x: auto;
}
</style>

<script lang="ts">
export default {
  name: 'Home',

  methods: {
    track() {
      this.$gtag.screenview({
        app_name: 'App',
        screen_name: 'Main screen',
      })
    }
  }
}
</script>
