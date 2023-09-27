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
  majorDomain,
  yearDomain,
  datasetMeta,
  dashboardFilters,
  download as Download,
  datasetDownloadFilename,
  compareOptions
} from '../../../data/nces322_50/ui'
import { Query_nces322_50 } from '../../../data/nces322_50/query'
import {Dimension2Text} from '../../../data/queries/dimensions'

import { renderCategory, plotColors } from '../../../data/queries/ui'

const dcClient: SeriesClient = new SeriesClient(
  'country/USA',
  'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI'
)
const bulkClient = new BulkClient('country/USA', 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI')
const dataset = new Query_nces322_50()
const loading_download = ref(false)

const genderQuery = ref([])
const raceQuery = ref([])
const majorQuery = ref([])
const yearQuery = ref([])

const filters = dashboardFilters

const compare = ref('gender')
const tableItems = ref([])
const colorDomain = ref([])

//takes array of DCIDs and returns plain text aliases, ie ["BachelorOfEducationMajor"] => ["Education"]
function mapAlias(arr: string[]) {
  const aliases = arr.map((val) => Dimension2Text[val])
  return aliases
}
const genderAliases = mapAlias(genderDomain)
const raceAliases = mapAlias(raceDomain)
const majorAliases = mapAlias(majorDomain)

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
  raceQuery.value = [...raceDomain]
  majorQuery.value = [...majorDomain]
  yearQuery.value = [...yearDomain]
})

watchEffect(() => {
  if (
    genderQuery.value.length == 0 &&
    raceQuery.value.length == 0 &&
    yearQuery.value.length == 0 &&
    majorQuery.value.length == 0
  ) {
    tableItems.value = []
    return
  }

  const catMap = {
    gender: genderQuery.value,
    race: raceQuery.value,
    bachelorsDegreeMajor: majorQuery.value
  }

  switch (compare.value) {
    case 'gender': {
      colorDomain.value = [...genderAliases]
      renderCategory(dcClient, dataset, tableItems, 'gender', genderQuery.value, catMap,yearQuery.value,true)
      break
    }
    case 'race': {
      colorDomain.value = [...raceAliases]
      renderCategory(dcClient, dataset, tableItems, 'race', raceQuery.value, catMap,yearQuery.value,true)
      break
    }
    case 'bachelorsDegreeMajor': {
      colorDomain.value = [...majorAliases]
      renderCategory(dcClient, dataset, tableItems, compare.value, majorQuery.value, catMap,yearQuery.value,true)
      break
    }
    default: {
      throw new Error(`got ${compare.value}, expected gender or race`)
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
    case 'bachelorsDegreeMajor': {
      majorQuery.value = [...activeFilters]
      break
    }
    case 'year': {
      yearQuery.value = [...activeFilters]
      break
    }
    default: {
      throw new Error(`got ${filterId}, expected gender, race, or major`)
      break
    }
  }
}

const changeCompare = (val: string) => {
  genderQuery.value = [...genderDomain]
  raceQuery.value = [...raceDomain]
  majorQuery.value = [...majorDomain]
  yearQuery.value = [...yearDomain]
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
            }),
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
