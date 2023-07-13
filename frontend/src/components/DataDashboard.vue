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

  // Replace Mean_Rainfall with the dcid from the dcidMap below that corresponds to the selected radio button. 
  // How can we use the {{gender}} var from the template below here?
  // e.g. 
  // let dcid  = dcidMap.get({{gender}});
  // let request = "https://api.datacommons.org/v1/observations/series/country/USA/" + {{dcid}} + "?key=AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI";

  let request = ""
  const res = await fetch(request);
  const finalRes = await res.json();
  tableItems.value = finalRes.observations;

  tableCols.value[1].header = "Rainfall (" + finalRes.facet.unit + ")";
}

onMounted(() => {
  getData();
});

let dcidMap = new Map<string, string>([
    ["Males", "Count_Person_25OrMoreYears_EducationalAttainmentBachelorsDegree_Male"],
    ["Females", "Count_Person_25OrMoreYears_EducationalAttainmentBachelorsDegree_Female"]
    ]);


</script>


<template>

  <span>Show US Population with a Bachelor's Degree for: {{gender}}</span>

    <div class="p-field-radiobutton">
      <RadioButton id="gender" name="gender" value="Males" v-model="gender" />
      <label for="gender">Males</label>
    </div>
    <div class="p-field-radiobutton">
      <RadioButton id="gender2" name="gender" value="Females" v-model="gender" />
      <label for="gender2">Females</label>
    </div>

    <!-- Want to pull the variable from the dcidMap above based on {{gender}} -->
    <span>dcid to query: {{dcid}}</span>

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
