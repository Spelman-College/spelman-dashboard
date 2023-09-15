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
  raceDomain,
  citizenDomain,
  datasetMeta,
  dashboardFilters,
  download as Download,
  datasetDownloadFilename,
  compareOptions
} from '../../../data/nsf23300_1_10/ui'
import { Query_nsf23300_1_10 } from '../../../data/nsf23300_1_10/query'

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
const dataset = new Query_nsf23300_1_10()
const loading_download = ref(false)

const genderQuery = ref([])
const raceQuery = ref([])
const citizenQuery = ref([])

  genderQuery.value = [...genderDomain]
  raceQuery.value = [...raceDomain]
  citizenQuery.value = [...citizenDomain]

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
  if (
    genderQuery.value.length == 0 &&
    raceQuery.value.length == 0 &&
    citizenQuery.value.length == 0
  ) {
    tableItems.value = []
    return
  }

  const catMap = {
    gender: genderQuery.value,
    ethnicity: raceQuery.value,
    citizenship: citizenQuery.value
  }

  switch (compare.value) {
    case 'gender': {
      colorDomain.value = [...genderDomain]
      renderCategory(dcClient, dataset, tableItems, compare.value, genderQuery.value, catMap)
      break
    }
    case 'race': {
      colorDomain.value = [...raceDomain]
      renderCategory(dcClient, dataset, tableItems, 'ethnicity', raceQuery.value, catMap)
      break
    }
    case 'citizenship': {
      colorDomain.value = [...citizenDomain]
      renderCategory(dcClient, dataset, tableItems, compare.value, citizenQuery.value, catMap)
      break
    }
    default: {
      throw new Error(`got ${compare.value}, expected gender, race, or citizenship`)
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
    case 'race': {
      raceQuery.value = [...activeFilters]
      break
    }
    case 'citizenship': {
      citizenQuery.value = [...activeFilters]
      break
    }
    default: {
      throw new Error(`got ${filterId}, expected gender, race, or citizenship`)
      break
    }
  }
}

const changeCompare = (val: string) => {
  genderQuery.value = [...genderDomain]
  raceQuery.value = [...raceDomain]
  citizenQuery.value = [...citizenDomain]
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
            Plot.ruleY([0]),
            Plot.axisY({
              anchor: 'left',
              label: datasetMeta.axisLabel,
              labelAnchor: 'center',
              labelOffset: 70,
              tickFormat: 's',
              marginLeft: 80
            })
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
