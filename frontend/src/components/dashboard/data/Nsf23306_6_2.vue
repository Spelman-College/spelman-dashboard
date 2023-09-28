<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import * as Plot from '@observablehq/plot'
import PlotFigure from './PlotFigure.vue'
import PlotHeader from '../PlotHeader.vue'
import FilterChip from '../FilterChip.vue'
import CompareRadio from '../CompareRadio.vue'

import { SeriesClient, BulkClient } from '../../../data/dc/client'

import {
  genderDomain,
  ethnicityDomain,
  occupationDomain,
  datasetMeta,
  dashboardFilters,
  download as Download,
  datasetDownloadFilename,
  compareOptions
} from '../../../data/nsf23306_6_2/ui'
import { Query_nsf23306_6_2 } from '../../../data/nsf23306_6_2/query'

import { Query, QueryCompare, expandCompares } from '../../../data/queries/query'
import { reduceIntersection } from '../../../data/queries/plotting'
import {
  renderCategory,
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
const dataset = new Query_nsf23306_6_2()
const loading_download = ref(false)

const genderQuery = ref([])
const ethnicityQuery = ref([])
const occupationQuery = ref([])

const filters = dashboardFilters

const compare = ref('gender')
const tableItems = ref([])
const colorDomain = ref([])

async function download() {
  loading_download.value = true

  const err = await Download(bulkClient, datasetDownloadFilename)
  if (err != '') {
    throw new Error(`error downloading csv data: ${err}`)
  }
  loading_download.value = false
}

watchEffect(() => {
  genderQuery.value = [...genderDomain]
  ethnicityQuery.value = [...ethnicityDomain]
  occupationQuery.value = [...occupationDomain]
})

watchEffect(() => {
  if (
    genderQuery.value.length == 0 &&
    ethnicityQuery.value.length == 0 &&
    occupationQuery.value.length == 0
  ) {
    tableItems.value = []
    return
  }

  const catMap = {
    gender: genderQuery.value,
    ethnicity: ethnicityQuery.value,
    occupation: occupationQuery.value
  }

  switch (compare.value) {
    case 'gender': {
      colorDomain.value = [...genderDomain]
      renderCategory(dcClient, dataset, tableItems, 'gender', genderQuery.value, catMap)
      break
    }
    case 'ethnicity': {
      colorDomain.value = [...ethnicityDomain]
      renderCategory(dcClient, dataset, tableItems, 'ethnicity', ethnicityQuery.value, catMap)
      break
    }
    case 'occupation': {
      colorDomain.value = [...occupationDomain]
      renderCategory(dcClient, dataset, tableItems, compare.value, occupationQuery.value, catMap)
      break
    }
    default: {
      throw new Error(`got ${compare.value}, expected gender, ethnicity, or major occupation`)
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
    case 'ethnicity': {
      ethnicityQuery.value = [...activeFilters]
      break
    }
    case 'occupation': {
      occupationQuery.value = [...activeFilters]
      break
    }
    default: {
      throw new Error(`got ${filterId}, expected gender, ethnicity, or major occupation`)
      break
    }
  }
}

const changeCompare = (val: string) => {
  genderQuery.value = [...genderDomain]
  ethnicityQuery.value = [...ethnicityDomain]
  occupationQuery.value = [...occupationDomain]
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

  <PlotHeader
    v-if="tableItems.length > 0"
    :downloadFunc="download"
    :loading="loading_download"
    :title="datasetMeta.source"
  />

  <div class="data-dashboard">
    <div v-if="true" class="plot">
      <PlotFigure
        v-if="tableItems.length > 0"
        :options="{
          x: {
            axis: null,
            tickFormat: '',
            type: 'band'
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
            range: plotColors
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
            Plot.ruleY([0])
          ]
        }"
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
</style>
