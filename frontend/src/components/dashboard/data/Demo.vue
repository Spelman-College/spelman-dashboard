<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import * as Plot from '@observablehq/plot'
import PlotFigure from './PlotFigure.vue'
import CompareRadio from '../CompareRadio.vue'
import FilterChip from '../FilterChip.vue'

import { SeriesClient, BulkClient } from '../../../data/dc/client'
import { downloadCSV } from '../../../data/dc/download'

import {
  genderDomain,
  ageDomain,
  majorDomain,
  datasetMeta,
  dashboardFilters,
  download as demoDownload,
  datasetDownloadFilename
} from '../../../data/demo/ui'

import { Query_demo } from '../../../data/demo/query'

import { Query, QueryCompare, expandCompares } from '../../../data/queries/query'
import { reduceIntersection } from '../../../data/queries/plotting'
import {
  applyCompareQuery,
  getCompareData,
  getSingleDimension,
  asDownload,
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

const plotType = ref('bar')

async function download(items: Array<Map>) {
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
  catMap: Map<string, Array<string>>
) => {
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
    gender: genderQuery.value,
    age: ageQuery.value,
    major: majorQuery.value
  }

  switch (compare.value) {
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
const updatePlotType = (newPlotType: string) => {
  plotType.value = newPlotType
}
</script>

<template>
  <CompareRadio
    :options="[
      { id: 'gender', name: 'Gender' },
      { id: 'age', name: 'Age Group' },
      { id: 'major', name: 'College Major' }
    ]"
    @change-compare="changeCompare"
  />
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
    <!-- TODO: Update to pull in source alias instead -->
    <div class="title-container">
      <div class="title source">Source: U.S. Census Bureau, American Community Survey 2019</div>
    </div>
    <div class="data-type-and-download-container">
      <div class="plot-text choose-data-type">
        <div class="data-type-text">Data type</div>
        <div
          @click="updatePlotType('bar')"
          class="plot-button choose-bar"
          :class="{ active: plotType === 'bar' }"
        >
          <span class="material-icons">bar_chart</span>
        </div>
        <div
          @click="updatePlotType('line')"
          class="plot-button choose-line"
          :class="{ active: plotType === 'line' }"
        >
          <span class="material-icons">timeline</span>
        </div>
        <div
          class="plot-button unavailable choose-pie"
          :class="{ active: plotType === 'pie' }"
        >
          <span class="material-icons">pie_chart_outline</span>
        </div>
      </div>
      <div class="csv-download-container">
        <div class="plot-text">Download data</div>
        <div
          class="csv"
          v-if="tableItems.length > 0"
          label="Download CSV"
          @click="download(tableItems)"
          :loading="loading_download"
        >
          CSV
        </div>
      </div>
    </div>
<!-- <div>{{ datasetMeta.name }}</div> -->
    <div v-if="true" class="plot">
      <PlotFigure
        v-if="tableItems.length > 0"
        :plotType="plotType"
        :datasetMetaName="datasetMeta.name"
        :tableItems="tableItems"
        :colorDomain="colorDomain"
      >
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
.data-dashboard-plot {
  color: black;
  border-radius: 8px;
  /* TODO: update page layout for narrower window widths */
  min-width: 1040px;
}

:deep(.title) {
  color: #4285f4;
  font-family: 'Noto Sans Mono';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.title-container,
.plot,
.data-type-and-download-container {
  border: 1px solid #bdc1c6;
  background: #fff;
  padding: 32px;
}
.data-type-and-download-container {
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.csv {
  color: #1a73e8;
  font-family: Noto Sans Mono;
  font-size: 12px;
}
.csv-download-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.choose-data-type {
  display: flex;
  gap: 10px;
  align-items: center;
}
.title-container {
  border-radius: 8px 8px 0px 0px;
}
.plot-button {
  display: flex;
  padding: 8px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #bdc1c6;
}

.plot-button.active {
  background: #ececec;
}
.plot-button.unavailable{
  color: #bdc1c6;
  border: 1px solid #ececec;
}
.plot-text {
  font-family: 'Noto Sans Mono';
  font-size: 12px;
}
.material-icon {
  background-color: #444746;
}
.plot {
  border-top: none;
  border-radius: 0px 0px 8px 8px;
}
</style>
