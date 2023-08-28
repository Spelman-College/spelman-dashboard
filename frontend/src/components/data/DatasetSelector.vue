<script setup lang="ts">
 import { useRoute, useRouter } from 'vue-router';
 import { ref, watchEffect, watch } from 'vue'
 import { datasets, presets } from '../../data/queries/ui'

 // The event we emit when we change the dataset
 const emit = defineEmits(['changeDataset'])

 // `view` is either 'preset' or 'explore'
 // `dataset` is a dataset path, selected from
 // 'presets' if `dataset` is 'preset' or
 // 'datasets' if `datasets` is 'explore'
 const props = defineProps(['view', 'dataset'])

 const view = ref(props.view)
 const dataset = ref(props.dataset)

 const placeholderText = ref('')
 const selected = ref({})

 // Select the target dataset if it exists in the available list.
 watchEffect(() => {
     let container = ''
     let datasetObject = {}
     if (view.value == 'explore') {
	 container = 'dataset to explore'
	 datasets.forEach((s) => {
	     if (dataset.value == s.path) {
		 datasetObject = s
		 placeholderText.value = s.name
	     }
	 })
     } else if (view.value == 'preset') {
	 container = 'chart to view'
	 presets.forEach((s) => {
	     if (dataset.value == s.path) {
		 datasetObject = s
		 placeholderText.value = s.name
	     }
	 })
     }
     if (Object.keys(datasetObject).length == 0) {
	 placeholderText.value = `Select a ${container}`
     } else {
	 placeholderText.value = undefined
     }
     selected.value = datasetObject
     console.log(dataset)
 })


 watch(selected, () => {
     emit('changeDataset', selected.value.path)
 })

</script>


<template>
    <Dropdown v-if="view == 'explore'" v-model=selected :options=datasets optionLabel=name :placeholder=placeholderText class="data-selector"></Dropdown>
    <Dropdown v-if="view == 'preset'" v-model=selected :options=presets optionLabel=name :placeholder=placeholderText class="data-selector"></Dropdown>


</template>
<style scoped>
 .data-selector {
     width: 70%;
 }
</style>
