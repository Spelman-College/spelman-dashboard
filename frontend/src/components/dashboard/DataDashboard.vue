<script setup lang="ts">
import Demo from './data/Demo.vue'
import Ipeds_318_45 from './data/Ipeds_318_45.vue'

import Nsf23300_1_10 from './data/Nsf23300_1_10.vue'
 import { datasetMeta as nsf23300_1_10Meta } from '../../data/nsf23300_1_10/ui'

 import Nsf313_30 from './data/Nsf313_30.vue'
import { datasetMeta as nsf313_30 } from '../../data/nsf313_30/ui'

import '../../../node_modules/primevue/resources/themes/md-light-indigo/theme.css'
import '../../../node_modules/primeflex/primeflex.css'

const props = defineProps(['dataset', 'view'])
</script>

<template>
  <div class="data-dashboard">
    <Demo v-if="props.dataset == 'demo' && props.view == 'explore'" />
    <Ipeds_318_45 v-if="props.dataset == 'ipeds-318-45' && props.view == 'explore'" />
    <Nsf23300_1_10 v-if="props.dataset == nsf23300_1_10Meta.path && props.view == 'explore'" />
    <Nsf313_30 v-if="props.dataset == nsf313_30.path && props.view == 'explore'" />
    <div v-if="props.dataset == 'demo-preset' && props.view == 'preset'">
      <p class="title">This is a preset demo view.</p>
    </div>
  </div>
</template>

<style scoped>
:deep(.filter-text) {
  color: #ffffff;
  font-family: 'Noto Sans Mono';
  font-size: 0.875rem;
  font-weight: 700;
}
:deep(.plot) {
  z-index: -1;
}
:deep(.filters) {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

:deep(.data-dashboard-plot) {
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
:deep(.title-container) {
  border: 1px solid #bdc1c6;
  background: #fff;
  padding: 32px;
}
:deep(.plot) {
  border: 1px solid #bdc1c6;
  background: #fff;
  padding: 32px;
}
:deep(.data-type-and-download-container) {
  border: 1px solid #bdc1c6;
  background: #fff;
  padding: 32px;
}

:deep(.data-type-and-download-container) {
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.csv) {
  color: #1a73e8;
  font-family: Noto Sans Mono;
  font-size: 12px;
}
:deep(.csv-download-container) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
:deep(.choose-data-type) {
  display: flex;
  gap: 10px;
  align-items: center;
}
:deep(.title-container) {
  border-radius: 8px 8px 0px 0px;
}
:deep(.plot-button) {
  display: flex;
  padding: 8px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #bdc1c6;
  background: #ececec;
}
:deep(.plot-button.unavailable) {
  background: white;
  color: #bdc1c6;
  border: 1px solid #ececec;
}

:deep(.plot-text) {
  font-family: 'Noto Sans Mono';
  font-size: 12px;
}
:deep(.material-icon) {
  background-color: #444746;
}
:deep(.plot) {
  border-top: none;
  border-radius: 0px 0px 8px 8px;
}
</style>
