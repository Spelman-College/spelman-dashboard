<script setup lang="ts">
import DataDashboard from '@/home/DataDashboard.vue'
import '../../node_modules/primevue/resources/themes/md-light-indigo/theme.css'
import '../../node_modules/primeflex/primeflex.css'

import { useRoute } from 'vue-router';

const route = useRoute();

let dataset = route.params.dataset
</script>

<template>
  <div class="view">
    <router-link id="back-button" class="material-icons" :to="{ name: 'home' }">chevron_left</router-link>
  </div>
  <DataDashboard v-if="dataset=='demo'"></DataDashboard>
</template>

<style scoped>

#back-button {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
}
</style>
