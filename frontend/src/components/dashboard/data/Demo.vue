<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import * as Plot from '@observablehq/plot'
import PlotFigure from './PlotFigure.vue'
import CompareRadio from '../CompareRadio.vue'
import FilterChip from '../FilterChip.vue'
import PlotHeader from '../PlotHeader.vue'

import { SeriesClient, BulkClient } from '../../../data/dc/client'

import {
  genderDomain,
  ageDomain,
  majorDomain,
  datasetMeta,
  dashboardFilters,
  download as demoDownload,
  datasetDownloadFilename,
  compareOptions
} from '../../../data/demo/ui'

import { Query_demo } from '../../../data/demo/query'

import { Query, QueryCompare, expandCompares } from '../../../data/queries/query'

import {
  renderCategory,
  applyCompareQuery,
  getCompareData,
  getSingleDimension,
  plotColors
} from '../../../data/queries/ui'

import * as dims from '../../../data/queries/dimensions'

const dcClient: SeriesClient = new SeriesClient(
  'country/USA',
  'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI'
)
const bulkClient = new BulkClient('country/USA', 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
const dataset = new Query_demo()
const loading_download = ref(false)

const genderQuery = ref([])
const ageQuery = ref([])
const majorQuery = ref([])

const filters = dashboardFilters

const compare = ref('gender')
const tableItems = ref([])
const colorDomain = ref([])

async function download() {
  loading_download.value = true

  const err = await demoDownload(bulkClient, datasetDownloadFilename)
  if (err != '') {
    throw new Error(`error downloading csv data: ${err}`)
  }
  loading_download.value = false
}

watchEffect(() => {
  genderQuery.value = [...genderDomain]
  ageQuery.value = [...ageDomain]
  majorQuery.value = [...majorDomain]
})

watchEffect(() => {
  if (genderQuery.value.length == 0 && ageQuery.value.length == 0 && majorQuery.value.length == 0) {
    tableItems.value = []
    return
  }
  const catMap = {
    gender: genderQuery.value,
    age: ageQuery.value,
    major: majorQuery.value
  }

  switch (compare.value) {
    case 'gender': {
      colorDomain.value = [...genderDomain]
      renderCategory(dcClient, dataset, tableItems, compare.value, genderQuery.value, catMap)
      break
    }
    case 'age': {
      colorDomain.value = [...ageDomain]
      renderCategory(dcClient, dataset, tableItems, compare.value, ageQuery.value, catMap)
      break
    }
    case 'major': {
      colorDomain.value = [...majorDomain]
      renderCategory(dcClient, dataset, tableItems, compare.value, majorQuery.value, catMap)
      break
    }
    default: {
      throw new Error(`got ${compare.value}, expected gender, age, or major`)
      break
    }
  }
})

const updateFilter = (filterId: string, activeFilters: Array<string>) => {
  switch (filterId) {
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

const changeCompare = (val: string) => {
  compare.value = val
}
</script>

<template>
  <CompareRadio :options="compareOptions" @change-compare="changeCompare" />
  <div class="filters" :key="compare">
    <div class="filter-text">Filters</div>
    <FilterChip
      @update-filter="updateFilter"
      :id="filter.id"
      :options="filter.options"
      :alias="filter.alias"
      :filterName="filter.name"
      v-for="filter in filters"
      >{{ filter.name }}</FilterChip
    >
  </div>

  <div class="data-dashboard-plot">
    <PlotHeader
      v-if="tableItems.length > 0"
      :downloadFunc="download"
      :loading="loading_download"
      :title="datasetMeta.source"
    />
    <div v-if="true" class="plot">
      <PlotFigure
        v-if="tableItems.length > 0"
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
            legend: true,
            range: plotColors,
          },
          marks: [
            Plot.barY(tableItems, {
              x: 'key',
              y: 'value',
              fx: 'date',
              fill: 'key',
              sort: {
                x: null
              }
            }),
            Plot.ruleY([0]),
            Plot.axisY({
              anchor: 'left',
              label: datasetMeta.name,
              labelAnchor: 'center',
              labelOffset:70,
              tickFormat: 's',
              marginLeft: 80
            }),
            Plot.ruleY([0])
          ]
        }"
      >
      </PlotFigure>
    </div>
  </div>
</template>
