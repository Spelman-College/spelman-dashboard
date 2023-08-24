<script setup lang="ts">
 import { useRoute, useRouter } from 'vue-router';
 import { ref, watchEffect, watch } from 'vue'
 import { datasets, presets, views, selectDsView } from '../../data/queries/ui'

 import DatasetSelector from '@/components/data/DatasetSelector.vue'
 import PresetExploreToggle from '@/components/data/PresetExploreToggle.vue'

 const props = defineProps(['view', 'dataset'])
 const emit = defineEmits(['changeView', 'changeDataset'])
 const route = useRoute();
 const router = useRouter();
 const view = ref(props.view)
 const dataset = ref(props.dataset)

 //// BEGIN: The following functions propagate changes to the parent, above,
 // and the other children, below.
 const changeView = (v: string) => {
     emit('changeView', v)
     view.value = v
 }
  const changeDataset = (ds: string) => {
     emit('changeDataset', ds)
     dataset.value = ds
  }
 //// END

</script>


<template>
    <PresetExploreToggle @change-view="changeView" :view=view />
    <DatasetSelector @change-dataset="changeDataset" :view="view" :dataset="dataset" :key="view" />
</template>
