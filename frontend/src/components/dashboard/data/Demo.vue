<script setup lang="ts">
 import { ref, watchEffect } from 'vue'
 import * as Plot from "@observablehq/plot"
 import PlotFigure from "./PlotFigure.vue"

 import FilterChip from "../FilterChip.vue"

 import { SeriesClient, BulkClient } from '../../../data/dc/client'
 import { downloadCSV } from '../../../data/dc/download'

 import {
     genderDomain,
     ageDomain,
     majorDomain,
     datasetMeta,
     dashboardFilters,
     download as demoDownload
 } from '../../../data/demo/ui'

 import { Query_demo } from '../../../data/demo/query'

 import { Query, QueryCompare, expandCompares } from '../../../data/queries/query'
 import { reduceIntersection } from '../../../data/queries/plotting'
 import {
     applyCompareQuery,
     getCompareData,
     getSingleDimension,
     asDownload,
     plotColors,
 } from '../../../data/queries/ui'

 import * as dims from '../../../data/queries/dimensions'

 const dcClient: SeriesClient = new SeriesClient('country/USA',
						 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
 const bulkClient = new BulkClient('country/USA',
						 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
 const dataset = new Query_demo()
 const loading_download = ref(false);

 const genderQuery = ref([])
 const ageQuery = ref([])
 const majorQuery = ref([])

 const filters = dashboardFilters

 const compare = ref('gender')
 const tableItems = ref([])
 const colorDomain = ref([])

 async function download(fileName: string, items: Array<Map>) {
     loading_download.value = true

     const err = await demoDownload(bulkClient, fileName)
     if (err != '') {
	 throw new Error(`error downloading csv data: ${err}`)
     }
     loading_download.value = false
 }

 watchEffect(() => {
     genderQuery.value = [...genderDomain]
     ageQuery.value = [...ageDomain]
     majorQuery.value = [...majorDomain]

     if (compare.value == 'gender') {
	 colorDomain.value = [...genderDomain]
     }
     if (compare.value == 'age') {
	 colorDomain.value = [...ageDomain]
     }
     if (compare.value == 'major') {
	 colorDomain.value = [...majorDomain]
     }
 })

 const renderCategory = (
     category: string,
     dimensions: string[],
     catMap: Map<string, Array<string>>) => {

     if (dimensions.length > 1) {
	 const dcids = applyCompareQuery(dataset, category, catMap)
	 const pout = getCompareData(dcClient, dcids)
	 pout.then((tmpOut) => {
	     const reduced = reduceIntersection(tmpOut, 'value', 'key', 'date')
	     tableItems.value = reduced
	 })
	 return
     }
     const out = getSingleDimension(dataset, dcClient, catMap, dimensions[0])
     out.then((data) => {
	 tableItems.value = data
     })
 }

 watchEffect(() => {
     if (genderQuery.value.length == 0 && ageQuery.value.length == 0 && majorQuery.value.length == 0) {
	 tableItems.value = []
	 return
     }
     const catMap = {
	 'gender': genderQuery.value,
	 'age': ageQuery.value,
	 'major': majorQuery.value
     }

     switch(compare.value) {
	 case 'gender': {
	     renderCategory(compare.value, genderQuery.value, catMap)
	     break
	 }
	 case 'age': {
	     renderCategory(compare.value, ageQuery.value, catMap)
	     break
	 }
	 case 'major': {
	     renderCategory(compare.value, majorQuery.value, catMap)
	     break
	 }
	 default: {
	     throw new Error(`got ${compare.value}, expected gender, age, or major`)
	     break
	 }
     }
 })

 const updateFilter = (filterId: string, activeFilters: Array<string>) => {
     switch(filterId) {
	 case 'gender': {
	     genderQuery.value = [...activeFilters]
	     break
	 }
	 case 'age': {
	     ageQuery.value = [...activeFilters]
	     break
	 }
	 case 'major': {
	      majorQuery.value = [...activeFilters]
	     break
	 }
	 default: {
	     throw new Error(`got ${filterId}, expected gender, age, or major`)
	     break
	 }
     }

 }


</script>

<template>
    <div class="">
	<div v-if=true class="flex flex-wrap gap-3 filter-text">
	    <span class='filter-text'>Compare</span>
	    <div class="flex align-items-center">
		<RadioButton v-model="compare" inputId="genderRadio" name="gender" value="gender" />
		<label for="genderRadio" class="ml-2">Gender</label>
	    </div>
	    <div class="flex align-items-center">
		<RadioButton v-model="compare" inputId="ageRadio" name="age" value="age" />
		<label for="ageRadio" class="ml-2">Age Group</label>
	    </div>
	    <div class="flex align-items-center">
		<RadioButton v-model="compare" inputId="majorRadio" name="major" value="major" />
		<label for="majorRadio" class="ml-2">College Major</label>
	    </div>
	</div>
    </div>
    <div class="filters" :key="compare">
	<div class="filter-text">Filters</div>
	<FilterChip @update-filter=updateFilter :id="filter.id" :options="filter.options" v-for="filter in filters">{{ filter.name }}</FilterChip>
    </div>
    <div>
	<Button v-if="tableItems.length > 0" label="Download CSV" @click="download('results', tableItems)" :loading="loading_download" />
    </div>
    <div class="data-dashboard">
	<div class="title">
	    {{ datasetMeta.name }}
	</div>


	<div v-if=true class="plot">
	    <PlotFigure v-if="tableItems.length > 0"
			      :options="{
				  x: {
				      axis: null,
				      tickFormat: '',
				      type: 'band',
				  },
				  y: {
				      tickFormat: 's',
				      grid: true
				  },
				  fx: {
				      label: null
				  },
				  color: {
				      domain: colorDomain,
				      legend: true
				  },
				  marks: [
				      Plot.barY(tableItems, {
					  x: 'key',
					  y: 'value',
					  fx: 'date',
					  fill: 'key',
					  sort: {
					      x: null,
					  }
				      }),
				      Plot.ruleY([0])
				  ],

			      }">
	    </PlotFigure>
	</div>
    </div>
</template>

<style scoped>
 .plot {
     z-index: -1;
 }
 .filters {
     display: flex;
     align-items: center;
     margin: 1rem 0;
 }

 .filter-text {
     color: #ffffff;
     font-family: 'Noto Sans Mono';
     font-size: 0.875rem;
     font-weight: 700;
 }

</style>
