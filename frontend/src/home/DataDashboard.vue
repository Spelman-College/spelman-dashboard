<script setup lang="ts">
 import DataDashboard from '@/components/DataDashboard.vue'
 const props = defineProps(['dataset'])
</script>

<template>
    <DataDashboard :dataset="props.dataset" />
</template>
