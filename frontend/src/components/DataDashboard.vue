<script setup lang="ts">
import { ref, onMounted } from 'vue';

const tableItems = ref(Array.from({ length: 5 }));
const gender = ref("Males");

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

let apiCache = new ApiCache();

async function getData(dcid : string) {

  // This uses DataCommons' public API key. DO NOT INCLUDE A PRIVATE API KEY HERE!
  let request = "https://api.datacommons.org/v1/observations/series/country/USA/" + dcid + "?key=AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI";

  if (this.apiCache.recordExists(request)) {
    tableItems.value = this.apiCache.get(request).observations;
    console.log("Cache accessed");
  }

  else {
    const res = await fetch(request);
    const finalRes = await res.json();
    tableItems.value = finalRes.observations;
    this.apiCache.set(request, finalRes);
    console.log("Cache set");
  }
}

function genderToDcid(gender: string): string {
  let dcidMap = new Map<string, string>([
    ["Males", "Count_Person_25OrMoreYears_EducationalAttainmentBachelorsDegree_Male"],
    ["Females", "Count_Person_25OrMoreYears_EducationalAttainmentBachelorsDegree_Female"]
  ]);

  let dcid = dcidMap.get(gender);
  return dcid == undefined ? "" : dcid;
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
  -->
  {{ getData(genderToDcid(gender)) }}

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

type CacheResult = any;
 
export class ApiCache {
    private static instance: ApiCache;
    private cache: Map<string, any> = new Map();
 
    public set = (url: string, result: any): void => {
        if (!this.recordExists(url)) {
          this.cache.set(url, result);
        }
    }
 
    public get = (url: string): CacheResult | null => {
        return this.cache.get(url);

    }
    
    public recordExists = (url: string): boolean => {
        return !!this.cache.has(url);
    }
}
</script>
