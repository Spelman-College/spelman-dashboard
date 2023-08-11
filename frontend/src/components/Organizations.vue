<script setup lang="ts">
 import { ref, onMounted } from 'vue';
 import Organization from './Organization.vue'
 import Papa from 'papaparse';
 const sid = import.meta.env.VITE_ORGANIZATIONS_CONTENT_SHEET_ID
 const OrgURI = `https://docs.google.com/spreadsheets/d/${sid}/export?format=csv`
 const orgs = ref([]);
 const downloadOrgs = () => {
     window.open(OrgURI);
 }
 async function getData() {
     const res = await Papa.parse(OrgURI, {
	 header: true,
	 download: true,
	 worker: true,
	 complete: function(results, file) {
	     orgs.value = results.data;
	 },
     });
 }

 onMounted(() => {
     getData();
 });

</script>

<template>
    <div><Button label="Download CSV" @click=downloadOrgs /></div>
    <div v-for="(row, idx) in orgs">
	<Organization :org="row" :idx="idx.toString()"></Organization>
    </div>
</template>

<script lang="ts">
export default {
    name: 'App',
  
    methods : {
    buttonClicked() {
      this.$gtag.event('download-click', {
        'event_category': 'downloads',
        'event_label': 'Download Button Clicked',
        'value': 1
      })
    }
  },
  }
</script>
