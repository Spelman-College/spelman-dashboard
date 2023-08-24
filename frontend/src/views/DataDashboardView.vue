<script setup lang="ts">
 import { ref, watch, watchEffect } from 'vue'

 import DataDashboard from '@/components/DataDashboard.vue'
 import PresetExploreSelector from '@/components/data/PresetExploreSelector.vue'

 import { datasets, presets, selectDsView } from '../data/queries/ui'

 import '../../node_modules/primevue/resources/themes/md-light-indigo/theme.css'
 import '../../node_modules/primeflex/primeflex.css'

 import { useRouter, useRoute } from 'vue-router';

 const router = useRouter();
 const route = useRoute()

 const view = ref(route.params.view)
 const dataset = ref(route.params.dataset)

 const changeView = (v: string) => {
     // We change to the "default" dataset when we change between
     // views.
     view.value = v
     dataset.value = 'default'
     const path = `/data/${v}/default`

     router.push(path)
   }

 const changeDataset = (ds: string) => {
     const path = `/data/${view.value}/${ds}`

     // Update child components
     dataset.value = ds
     router.push(path)
 }

</script>

<template>
    <div>
	<PresetExploreSelector @change-view=changeView @change-dataset=changeDataset :dataset=dataset :view=view />
    </div>
    <DataDashboard :dataset=dataset :view=view :key=dataset />
</template>

<style scoped>
</style>
