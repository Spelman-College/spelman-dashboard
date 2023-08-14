<script setup lang="ts">
 import { defineProps } from "vue"
 import * as Plot from "@observablehq/plot"
 import PlotFigure from "./PlotFigure.vue"
 import { formatPlot } from '../../data/demo/plot'

 const props = defineProps([
     'data',
     'title',
 ])

</script>

<template>
    <div v-if="data.length > 0">
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
		    Plot.barY(formatPlot(props.data, 'key', props.title), {
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
