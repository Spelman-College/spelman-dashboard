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
    header: "Population"
  }
]

const gender = ref();

async function getData(request : string) {
  const res = await fetch(request);
  const finalRes = await res.json();
  tableItems.value = finalRes.observations;
}

function genderToDcid(gender: string): string {
  let dcidMap = new Map<string, string>([
    ["Males", "Count_Person_25OrMoreYears_EducationalAttainmentBachelorsDegree_Male"],
    ["Females", "Count_Person_25OrMoreYears_EducationalAttainmentBachelorsDegree_Female"]
  ]);

  let dcid = dcidMap.get(gender);
  return dcid == undefined ? "" : dcid;
}

function buildRequest(dcid: string): string {
  // This uses DataCommons' public API key. DO NOT INCLUDE A PRIVATE API KEY HERE!
  return "https://api.datacommons.org/v1/observations/series/country/USA/" + dcid + "?key=AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI";
}

</script>


<template>
  <span>Show US Population with a Bachelor's Degree for: {{ gender }}</span>

  <div class="p-field-radiobutton">
    <RadioButton id="gender" name="gender" value="Males" v-model="gender" />
    <label for="gender">Males</label>
  </div>
  <div class="p-field-radiobutton">
    <RadioButton id="gender2" name="gender" value="Females" v-model="gender" />
    <label for="gender2">Females</label>
  </div>

  <!-- Debugging info 
  <span> dcid to query: {{ genderToDcid(gender) }}</span>
  <span> request: {{  buildRequest(genderToDcid(gender)) }} </span>
  -->
  {{ getData(buildRequest(genderToDcid(gender))) }}

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
