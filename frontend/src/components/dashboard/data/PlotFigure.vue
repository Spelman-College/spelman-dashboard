<script setup lang="ts">
import * as Plot from '@observablehq/plot'

const props = defineProps({
  options: Object
})
</script>

<template>
  <div
    v-html="
      Plot.plot({
        ...props.options,
        width: 1200,
        style: { fontSize: 11, fontFamily: 'Noto Sans Mono', color: '#444746' }
      }).outerHTML
    "
  />
</template>
