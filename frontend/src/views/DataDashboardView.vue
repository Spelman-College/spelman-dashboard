<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView } from 'vue-router';

import Dropdown from '@/components/Dropdown.vue'
import FilterChip from '@/components/FilterChip.vue'

const exploreDataActive = ref(true)

// const filters = ref(['Year', 'Sex', 'Race', 'Degree level', 'Residency status'])
const filters = [
  {
    name: 'Year',
    options: ['2019', '2020', '2021']
  },
  {
    name: 'Gender',
    options: ['Male', 'Female']
  }
]
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
        <div class="filter-text">Filters</div>
        <FilterChip :options="filter.options" v-for="filter in filters">{{ filter.name }}</FilterChip>
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

.button-group>button:hover {
  background: #6f7987;
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
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.filter-text {
  color: #ffffff;
  font-family: 'Noto Sans Mono';
  font-size: 0.875rem;
  font-weight: 700;
}

.router-view-container {
  display: flex;
  justify-content: center;
}
</style>