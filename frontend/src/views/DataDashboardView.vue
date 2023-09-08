<script setup lang="ts">
import { ref, watchEffect, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PresetExploreSelector from '@/components/dashboard/PresetExploreSelector.vue'
import DDWelcomeView from '@/views/dataDashboardViews/DDWelcomeView.vue'

import DataDashboard from '@/components/dashboard/DataDashboard.vue'

const route = useRoute()
const router = useRouter()

const dropdownShowing = ref('')

provide('dropdownShowing', dropdownShowing)

const showWelcome = ref(false)

watchEffect(() => {
  showWelcome.value = route.params.dataset === 'default'
})

const changeDataset = (ds) => {
  router.push(`/data-dashboard/${route.params.view}/${ds}`)
}
const changeView = (v) => {
  router.push(`/data-dashboard/${v}/default`)
}
</script>

<template>
  <div class="view">
    <div class="dd-header">
      <PresetExploreSelector
        :dataset="route.params.dataset"
        :view="route.params.view"
        @change-view="changeView"
        @change-dataset="changeDataset"
        :key="route.params.view"
      />
    </div>
  </div>
  <DataDashboard v-if="!showWelcome" :view="route.params.view" :dataset="route.params.dataset" />
  <DDWelcomeView v-if="showWelcome" />
</template>
