<script setup lang="ts">
const props = defineProps(['downloadFunc', 'loading', 'title'])
</script>

<template>
  <div class="title-container">
    <div class="title source">{{ props.title }}</div>
  </div>

  <div class="data-type-and-download-container">
    <div class="plot-text choose-data-type">
      <div class="data-type-text">Data type</div>
      <div class="plot-button"><span class="material-icons">bar_chart</span></div>
      <div class="plot-button unavailable"><span class="material-icons">timeline</span></div>
      <div class="plot-button unavailable">
        <span class="material-icons">pie_chart_outline</span>
      </div>
    </div>
    <div class="csv-download-container">
      <div class="plot-text">Download data</div>
      <div class="csv" label="Download CSV" @click="props.downloadFunc" :loading="props.loading">
        CSV
      </div>
    </div>
  </div>
</template>
