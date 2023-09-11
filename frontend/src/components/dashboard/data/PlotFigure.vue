<script setup lang="ts">
import * as Plot from '@observablehq/plot'
import {ref, watch, toRefs} from 'vue'

const props = defineProps({
  tableItems: Object,
  colorDomain: Array<string>,
  plotType: String,
  datasetMetaName: String
})

const { tableItems, colorDomain, plotType, datasetMetaName } = toRefs(props);
const plotWidth = ref(1000)
const data = props.tableItems;
// let plotType = ref(props.plotType);
function getPlotOptions(plotType, data) {
  const oPlotTypeOptions = {
    bar:{
        x: {
          axis: null,
          tickFormat: '',
          type: 'band',
          scale: "point",

        },
        y: {
          tickFormat: 's',
          grid: true
        },
        fx: {
          label: null
        },
        color: {
          domain: props.colorDomain,
          legend: true
        },
        marks: [
          Plot.barY(data, {
            x: 'key',
            y: 'value',
            fx: 'date',
            fill: 'key',
            sort: {
              x: null
            }
          }),
          Plot.ruleY([0])
        ],
      },
    // line: {
    //     x: {
    //       label: null,
    //       scale: "point",
    //     },
    //     y: {
    //       grid: true,
    //       label:null,
    //     },
    //     facet: {
    //       data,
    //       groupby: "key",
    //     },
    //     marks: [
    //       Plot.ruleY([0]),
    //       Plot.line(data, {
    //         x: "date",
    //         y: "value",
    //         stroke: "key",
    //         curve: "linear",
    //       }),
    //     ],
    //   },
  };
  return oPlotTypeOptions[plotType] || oPlotTypeOptions.bar;
}

const oDefaultConfig = getPlotOptions(plotType, data);
const plotHTML = ref(Plot.plot({...oDefaultConfig, width: 1000}).outerHTML);

 // get plot options for the current plot type
 watch(plotType, (newPlotType) => {
      const oConfig = getPlotOptions(newPlotType, data);
      plotHTML.value = Plot.plot({...oConfig, width: 1000}).outerHTML;

    });

</script>

<template>
  <div v-html="plotHTML" />
</template>

