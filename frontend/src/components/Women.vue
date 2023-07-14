<script setup lang="ts">
 import { ref, onMounted } from 'vue';
 import Woman from './Woman.vue'
 import Papa from 'papaparse';
 const sid = import.meta.env.VITE_WOMEN_CONTENT_SHEET_ID
 const csvURI = `https://docs.google.com/spreadsheets/d/${sid}/export?format=csv`
 const rows = ref([]);
 const downloadCSV = () => {
     window.open(csvURI);
 }
 async function getData() {
     const res = await Papa.parse(csvURI, {
	 header: true,
	 download: true,
	 worker: true,
	 complete: function(results, file) {
	     rows.value = results.data;
	 },
     });
 }

 onMounted(() => {
     getData();
 });

</script>

<template>
    <div><Button label="Download CSV" @click=downloadCSV /></div>
    <div v-for="(row, idx) in rows">
	<Woman :row="row" :idx="idx.toString()"></Woman>
    </div>
</template>
