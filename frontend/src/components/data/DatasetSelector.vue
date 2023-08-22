<script setup lang="ts">
 import { useRoute, useRouter } from 'vue-router';
 import { ref, watchEffect } from 'vue'

 const emit = defineEmits(['changeDataset'])

 const route = useRoute();
 const router = useRouter();

 const paramDataset = route.params.dataset
 let ds = paramDataset
 if (paramDataset === undefined || paramDataset === 'undefined') {
     ds = ''
 }
 const selected = ref(ds)
 const placeholderText = ref('Select a dataset')

 const datasets = [
     {'name': 'Demo dataset for testing the dashboard and plotting logic', path: 'demo'},
     {'name': 'Example that does not exist yet', path: 'nope'},
     {'name': 'Another Example that does not exist yet', path: 'nope2'},
 ]

 // Select the target dataset if it exists in the available list.
 datasets.forEach((s) => {
     if (ds == s.path) {
	 selected.value = s.path
	 placeholderText.value = s.name
     }
 })

 watchEffect(() => {
     if (selected.value == '') {
	 return
     }
     emit('changeDataset', selected.value.path)
 })

</script>


<template>
    <Dropdown v-model=selected :options=datasets optionLabel=name :placeholder=placeholderText class="data-selector"></Dropdown>
</template>
<style scoped>
 .data-selector {
     width: 70%;
 }
</style>
