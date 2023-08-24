<script setup lang="ts">
 import DataDashboard from '@/components/DataDashboard.vue'
 const props = defineProps(['dataset', 'dataView'])
</script>

<template>
    <DataDashboard :dataset="props.dataset" :data-view="props.dataView" />
</template>
