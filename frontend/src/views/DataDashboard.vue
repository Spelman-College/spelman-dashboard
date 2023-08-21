<script setup lang="ts">
 import { ref, watchEffect } from 'vue'

 import DataDashboard from '@/home/DataDashboard.vue'
 import DatasetSelector from '@/components/data/DatasetSelector.vue'

 import '../../node_modules/primevue/resources/themes/md-light-indigo/theme.css'
 import '../../node_modules/primeflex/primeflex.css'

 import { useRouter } from 'vue-router';

 const router = useRouter();

 const dataset = ref('')

 const changeDashboardDataset = (name:string) => {
     dataset.value = name
     router.push(`/data/${dataset.value}`)
 }
</script>

<template>
    <DatasetSelector @change-dataset="changeDashboardDataset" />
    <DataDashboard :dataset=dataset />
</template>

<style scoped>
</style>
