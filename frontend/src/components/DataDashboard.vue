<script setup lang="ts">;
 import { ref, watchEffect } from 'vue';
 import { Parser } from '@json2csv/plainjs';
 import { setMaxIdleHTTPParsers } from 'http';
 import { ApiCache } from '../data/dc/cache';
 import { SeriesClient } from '../data/dc/client';
 import { Query_demo } from '../data/demo/query';
 import { Query } from '../data/queries/query';
 import { Female, Male } from '../data/queries/dimensions'

 const dcClient: SeriesClient = new SeriesClient('country/USA',
						 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
 const tableItems = ref(Array.from({ length: 5 }));
 const gender = ref(Male)

 const dataset = new Query_demo()
 const tableCols = [
  {
    field: "date",
    header: "Date"
  },
  {
    field: "value",
    header: "Population"
  }
]

const loading_download = ref(false);

const downloadCSV = (dcid: string) => {
  loading_download.value = true;
  try {
    const parser_opts = {};
    const parser = new Parser(parser_opts);
    const csv = parser.parse(tableItems.value);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${dcid}.csv`);
    a.click();
  } catch (err) {
    console.log(err);
  }
  loading_download.value = false;
}
 async function getData(dcid: string) {
     const values = await dcClient.getData(dcid)
     tableItems.value = values
  }

 const genderToDcid = (gender: string): string => {
     const genderQuery = new Query('gender', gender)
     const majorQuery = new Query('major', 'BachelorOfScienceAndEngineeringMajor')
     const response = dataset.query(genderQuery, majorQuery)
     if (response.error !== undefined) {
	 throw new Error(`Error querying dataset: ${response.error}`)
     }
     return response.results[0]
 }
 watchEffect(async () => {
     getData(genderToDcid(gender.value))
 })

 const dim2text = {
     Male: 'Men',
     Female: 'Women',
 }
</script>


<template>
  <div><Button label="Download CSV" @click=downloadCSV(genderToDcid(gender)) :loading="loading_download" /></div>
  <p>
      FIELD OF BACHELOR'S DEGREE FOR FIRST MAJOR American Community Survey; 2019: ACS 5-Year Estimates Bachelor's Degree in Science or Engineering for: {{ dim2text[gender] }}
  </p>

  <div class="p-field-radiobutton">
    <RadioButton id="gender" name="gender" value=Male v-model="gender" />
    <label for="gender">Males</label>
  </div>
  <div class="p-field-radiobutton">
    <RadioButton id="gender2" name="gender" value=Female v-model="gender" />
    <label for="gender2">Females</label>
  </div>

  <div class="card">
    <DataTable :value="tableItems" tableStyle="min-width: 50rem">
      <Column v-for="col of tableCols" :key="col.field" :field="col.field" :header="col.header"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
export default {
  name: "DataDashboard",
  data() {
    return {
      gender: null,
    };
  },
  methods: {},
};

</script>
