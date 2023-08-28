<script setup lang="ts">
 import { ref, watchEffect } from 'vue'
 import * as Plot from "@observablehq/plot"

 import PlotFigure from "./PlotFigure.vue"

  import { SeriesClient } from '../../data/dc/client'
 import { downloadCSV } from '../../data/dc/download'

 import {
     genderOptions,
     ageOptions,
     majorOptions,
     datasetTitle,
     genderDomain,
     ageDomain,
     majorDomain
 } from '../../data/demo/ui'

 import { Query_demo } from '../../data/demo/query'

 import { Query, QueryCompare, expandCompares } from '../../data/queries/query'
 import { reduceIntersection } from '../../data/queries/plotting'
 import {
     applyCompareQuery,
     getCompareData,
     getSingleDimension,
     asDownload,
     minSelectString
 } from '../../data/queries/ui'

 import * as dims from '../../data/queries/dimensions'

 const dcClient: SeriesClient = new SeriesClient('country/USA',
						 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
 const dataset = new Query_demo()
 const loading_download = ref(false);

 const genderQuery = ref([])
 const ageQuery = ref([])
 const majorQuery = ref([])

 // Used to ensure at least 1 value is selected
 const lastGenderValue = ref([...genderDomain])
 const updateGender = minSelectString(genderQuery, lastGenderValue, 1)
 const lastAgeValue = ref([...ageDomain])
 const updateAge = minSelectString(ageQuery, lastAgeValue, 1)
 const lastMajorValue = ref([...majorDomain])
 const updateMajor = minSelectString(majorQuery, lastMajorValue, 1)


 const compare = ref('gender')
 const tableItems = ref([])
 const colorDomain = ref([])


 async function download(fileName: string, items: Array<Map>) {
     loading_download.value = true
     const catMap = {
	 'gender': genderQuery.value,
	 'age': ageQuery.value,
	 'major': majorQuery.value
     }
     const dimensions = []
     if (compare.value == 'gender') {
	 dimensions.push(...genderQuery.value)
     }
     if (compare.value == 'age') {
	 dimensions.push(...ageQuery.value)
     }
     if (compare.value == 'major') {
	 dimensions.push(...majorQuery.value)
     }

     const data = await asDownload(dataset, dcClient, compare.value, dimensions, catMap)
     console.log('date', data)
     await downloadCSV(data, fileName)
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


</script>

<template>
    <div class="data-dashboard">
	<div class="title">
	    {{datasetTitle}}
	</div>
	<div class="flex flex-wrap gap-3">
	    <p>Compare category dimensions:</p>
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
	<div class="card flex justify-content-center">
            <MultiSelect v-model=genderQuery :options=genderOptions filter optionLabel="label" optionValue="value" placeholder="Gender" class="w-full md:w-20rem" @update:modelValue=updateGender />

	    <MultiSelect v-model=ageQuery :options=ageOptions filter optionLabel="label" optionValue="value" placeholder="Age Group" class="w-full md:w-20rem" @update:modelValue=updateAge />

	    <MultiSelect v-model=majorQuery :options=majorOptions filter optionLabel="label" optionValue="value" placeholder="College Major" class="w-full md:w-20rem" @update:modelValue=updateMajor />

	</div>
	<div>
	    <Button v-if="tableItems.length > 0" label="Download CSV" @click="download('results', tableItems)" :loading="loading_download" />
	</div>
	<div>

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
				scheme: 'spectral',
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
