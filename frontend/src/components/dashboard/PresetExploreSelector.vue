<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, watchEffect, watch } from 'vue'
import { datasets, presets, views } from '../../data/queries/ui'

import DatasetSelector from '@/components/dashboard/DatasetSelector.vue'
import PresetExploreToggle from '@/components/dashboard/PresetExploreToggle.vue'

const props = defineProps(['view', 'dataset'])
const emit = defineEmits(['changeView', 'changeDataset'])
const route = useRoute()
const router = useRouter()
const view = ref(props.view)
const dataset = ref(props.dataset)
const selectorValues = ref([])
if (view.value == 'explore') {
  selectorValues.value = datasets
} else if (view.value == 'preset') {
  selectorValues.value = presets
}

//// BEGIN: The following functions propagate changes to the parent, above,
// and the other children, below.
const changeView = (v: string) => {
  emit('changeView', v)
  //// We re-render this component from the parent
  view.value = v

  // We reset to the default view.
  dataset.value = 'default'
}

const changeDataset = (ds: string) => {
  emit('changeDataset', ds)
  dataset.value = ds
}
//// END
</script>
<template>
  <div class="toggle-and-dropdown">
    <PresetExploreToggle @change-view="changeView" :view="view" />
    <DatasetSelector
      @change-dataset="changeDataset"
      :view="view"
      :dataset="dataset"
      :availableDatasets="datasets"
      :key="view"
    />
  </div>
</template>

<style scoped>
.toggle-and-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<!--
     <template>
     <PresetExploreToggle @change-view="changeView" :view=view />
     <DatasetSelector @change-dataset="changeDataset" :view="view" :dataset="dataset" :key="view" />
     </template> -->
