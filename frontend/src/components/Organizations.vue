<script setup lang="ts">
 import { ref, onMounted } from 'vue';
 import Organization from './Organization.vue'
 import Papa from 'papaparse';
 const OrgURI = 'https://gist.githubusercontent.com/isaac-looker/bc60ba5a2fe7eeea52be6265ba4b62a6/raw/8fd08e1ee8d1a0f42ddbbfdac09e0133829ad8a1/ex.csv'
 const orgs = ref([]);

 async function getData() {
     const res = Papa.parse(OrgURI, {
	 header: true,
	 download: true,
	 worker: true,
	 complete: function(results, file) {
	     // Whitespace at the end of the file will create new empty rows.
	     const filtered = results.data.filter((row) => row.name.trim() != '')
	     orgs.value = filtered
	 },
     });
 }

 onMounted(() => {
     getData();
 });
</script>

<template>
  <div v-for="(row, idx) in orgs">
      <Organization :org="row" :idx="idx.toString()"></Organization>
  </div>
</template>
