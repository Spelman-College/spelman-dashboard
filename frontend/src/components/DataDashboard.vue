<script setup lang="ts">
import { ref, onMounted } from 'vue';

const tableItems = ref(Array.from({ length: 5 }));
const tableCols = ref();
const gender = ref();

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

let apiCache = new ApiCache();

async function getData(request : string) {
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

type CacheResult = any;
 
export class ApiCache {
    private static instance: ApiCache;
    private cache: { url: string; result: CacheResult }[] = [];
 
    constructor() {
        if (!!ApiCache.instance) {
          return ApiCache.instance;
        }
        ApiCache.instance = this;
        return this;
    }
 
    public set = (url: string, result: any): void => {
        if (!this.recordExists(url)) {
          this.cache.push({
            url,
            result
          });
        }
    }
 
    public get = (url: string): CacheResult | null => {
        const cacheRecord = this.cache.find(_ => { 
          return _.url === url;
        });
 
        
        if (cacheRecord) {
          return cacheRecord.result;
        }
 
        return null;
    }
    
    public recordExists = (url: string): boolean => {
        return !!this.get(url);
    }
}
</script>
