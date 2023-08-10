<script setup lang="ts">
 import { ref, watchEffect, defineProps } from 'vue'
 import * as Plot from "@observablehq/plot"

 import PlotFigure from "./PlotFigure.vue"

 import { formatPlot } from '../../data/demo/plot'
 import { Query_demo } from '../../data/demo/query'

 import { SeriesClient } from '../../data/dc/client'
 import { downloadCSV } from '../../data/dc/download'

 import { Query } from '../../data/queries/query'
 import { Female, Male } from '../../data/queries/dimensions'

 const dcClient: SeriesClient = new SeriesClient('country/USA',
						 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
 const tableItems = ref([]);
 const gender = ref(Male);

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

 async function getData(dcid: string) {
     const values = await dcClient.getData(dcid)
     tableItems.value = values
 }

 const genderToDcid = (gender: Ref<string>): string => {
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

 async function download(gender: string) {
     loading_download.value = true
     await downloadCSV(tableItems, genderToDcid(gender))
     loading_download.value = false
 }

</script>

<template>
    <div>
	<Button label="Download CSV" @click=download(gender) :loading="loading_download" />
    </div>
    <p>
	FIELD OF BACHELOR'S DEGREE FOR FIRST MAJOR American Community Survey; 2019: ACS 5-Year Estimates Bachelor's Degree in Science or Engineering by gender.
    </p>

    <div class="p-field-radiobutton">
	<RadioButton id="gender" name="gender" value=Male v-model="gender" />
	<label for="gender">Men</label>
    </div>
    <div class="p-field-radiobutton">
	<RadioButton id="gender2" name="gender" value=Female v-model="gender" />
	<label for="gender2">Women</label>
    </div>

    <div v-if="tableItems.length > 0">
	<PlotFigure
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
		    Plot.barY(formatPlot(tableItems, 'key', gender), {
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

</template>
