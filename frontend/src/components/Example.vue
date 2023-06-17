<script setup lang="ts">
import { ref } from 'vue'
import SpeedDial from 'primevue/speeddial'

const items = ref([
  {
    label: 'h',
    icon: 'search',
    command: () => {
      alert("h")
    }
  },
  {
    label: 'e',
    icon: 'search',
    command: () => {
      alert("e")
    }
  },
  {
    label: 'l',
    icon: 'search',
    command: () => {
      alert("l")
    }
  },
  {
    label: 'l',
    icon: 'search',
    command: () => {
      alert("l")
    }
  },
  {
    label: 'o',
    icon: 'search',
    command: () => {
      alert("o")
    }
  },
])
</script>

<template>
  <SpeedDial :model="items" type="quarter-circle" direction="down-right"></SpeedDial>
</template>