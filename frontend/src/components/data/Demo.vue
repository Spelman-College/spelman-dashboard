<script setup lang="ts">
 import { ref, watchEffect } from 'vue'
 import * as Plot from "@observablehq/plot"

 import PlotFigure from "./PlotFigure.vue"

  import { SeriesClient } from '../../data/dc/client'
 import { downloadCSV } from '../../data/dc/download'

 import { genderOptions, ageOptions, majorOptions, datasetTitle } from '../../data/demo/ui'
 import { Query_demo } from '../../data/demo/query'

 import { Query, QueryCompare, expandCompares } from '../../data/queries/query'
 import { reduceIntersection } from '../../data/queries/plotting'
 import {
     applyCompareQuery,
     getCompareData,
     getSingleDimension,
     asDownload
 } from '../../data/queries/ui'

 import * as dims from '../../data/queries/dimensions'

 const dcClient: SeriesClient = new SeriesClient('country/USA',
						 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
 const dataset = new Query_demo()
 const loading_download = ref(false);
 const genderQuery = ref([])
 const ageQuery = ref([])
 const majorQuery = ref([])
 const compare = ref('gender')
 const tableItems = ref([]);

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
     if (compare.value == 'gender') {
	 // Select on change
	 genderQuery.value = [dims.Male, dims.Female]
	 ageQuery.value = []
	 majorQuery.value = []
	 return
     }
     if (compare.value == 'age') {
	 // Select on change
	 ageQuery.value = [
	     dims.age_25To39Years,
	     dims.age_40To64Years,
	     dims.age_65OrMoreYears
	 ]
	 genderQuery.value = []
	 majorQuery.value = []
	 return
     }
     if (compare.value == 'major') {
	 majorQuery.value = [
	     dims.BachelorOfEducationMajor,
	     dims.BachelorOfScienceAndEngineeringMajor,
	     dims.BachelorOfScienceAndEngineeringRelatedMajor,
	     dims.BachelorOfArtsHumanitiesAndOtherMajor,
	     dims.BachelorOfBusinessMajor,
	 ]
	 genderQuery.value = []
	 ageQuery.value = []
	 return
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
	     throw new Error(compare.value == 'gender')
	     console.log(`got ${compare.value}, expected age or gender`)
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
            <MultiSelect v-model=genderQuery :options=genderOptions filter optionLabel="label" optionValue="value" placeholder="Gender" class="w-full md:w-20rem" />

	    <MultiSelect v-model=ageQuery :options=ageOptions filter optionLabel="label" optionValue="value" placeholder="Age Group" class="w-full md:w-20rem" />

	    <MultiSelect v-model=majorQuery :options=majorOptions filter optionLabel="label" optionValue="value" placeholder="College Major" class="w-full md:w-20rem" />

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
