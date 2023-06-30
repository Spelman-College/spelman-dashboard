<script setup lang="ts">
import { ref, onMounted } from 'vue';

const tableItems = ref(Array.from({ length: 5 }));
const tableCols = ref();

tableCols.value = [
  {
    field: "date",
    header: "Date"
  },
  {
    field: "value",
    header: ""
  }
]

async function getData() {
  // This uses DataCommons' public API key. DO NOT INCLUDE A PRIVATE API KEY HERE!
  const res = await fetch("https://api.datacommons.org/v1/observations/series/wikidataId/Q987/Mean_Rainfall?key=AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI");
  const finalRes = await res.json();
  tableItems.value = finalRes.observations;

  tableCols.value[1].header = "Rainfall (" + finalRes.facet.unit + ")";
}

onMounted(() => {
  getData();
});

</script>

<template>
  <div class="card">
    <DataTable :value="tableItems" tableStyle="min-width: 50rem">
      <Column v-for="col of tableCols" :key="col.field" :field="col.field" :header="col.header"></Column>
    </DataTable>
  </div>
</template>