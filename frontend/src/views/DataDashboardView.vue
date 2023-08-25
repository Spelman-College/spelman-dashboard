<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView } from 'vue-router';

import Dropdown from '@/components/Dropdown.vue'

const exploreDataActive = ref(true)

const filters = ref(['Year', 'Sex', 'Race', 'Degree level', 'Residency status'])
</script>

<template>
  <div class="view">
    <div class="dd-header">
      <div class="toggle-and-dropdown">
        <div class="button-group">
          <button :class="exploreDataActive ? 'active' : ''" @click="exploreDataActive = true">
            <span v-if="exploreDataActive">&checkmark;</span>
            Explore data
          </button>
          <button :class="!exploreDataActive ? 'active' : ''" @click="exploreDataActive = false">
            <span v-if="!exploreDataActive">&checkmark;</span>
            Review charts
          </button>
        </div>
        <div>
          <Dropdown></Dropdown>
        </div>
      </div>
      <div class="filters">
        <span class="filter-text">Filters</span>
        <span class="filter-chip" v-for="filter in filters" :key="filter">{{ filter }}</span>
      </div>
    </div>
    <div class="router-view-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.toggle-and-dropdown {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: space-between;
}

.button-group>button {
  border: 1px solid #e8eaed;
  font-family: 'Noto Sans Mono';
  font-size: 1rem;
  font-weight: 700;
  background: #444c57;
  color: #ffffff;
}

.button-group>button.active {
  background: #4FDFFF;
  color: #000000;
}

.button-group>button:first-child {
  border-radius: 6.25rem 0rem 0rem 6.25rem;
}

.button-group>button:last-child {
  border-radius: 0rem 6.25rem 6.25rem 0rem;
}

.filters {
  margin: 2rem 0rem;
}

.filter-text {
  color: #ffffff;
  font-family: 'Noto Sans Mono';
  font-size: 0.875rem;
  font-weight: 700;
}

.filter-chip {
  margin: 0.5rem;
  padding: 0.375rem 0.8125rem;
  border-radius: 2.25rem;
  border: 1px solid #c4c7c5;
  background: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: 'Noto Sans Mono';
  color: #474747;
}

.router-view-container {
  display: flex;
  justify-content: center;
}
</style>