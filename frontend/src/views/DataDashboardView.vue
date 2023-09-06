<script setup lang="ts">
import { ref, watchEffect, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PresetExploreSelector from '@/components/dashboard/PresetExploreSelector.vue'
import DDWelcomeView from '@/views/dataDashboardViews/DDWelcomeView.vue'

import DataDashboard from '@/components/dashboard/DataDashboard.vue'

const route = useRoute()
const router = useRouter()

const view = ref(route.params.view)
const dataset = ref(route.params.dataset)

const dropdownShowing = ref('')

provide('dropdownShowing', dropdownShowing)

const showWelcome = ref(false)

watchEffect(() => { showWelcome.value = (view.value === undefined && dataset.value === undefined) })

const changeDataset = (ds) => {
    dataset.value = ds
    router.push(`/data-dashboard/${view.value}/${ds}`)
}
const changeView = (v) => {
    view.value = v
    dataset.value = undefined
    router.push(`/data-dashboard/${view.value}/default`)
}

</script>

<template>
    <div class="view">
        <div class="dd-header">
            <PresetExploreSelector :dataset=dataset :view=view @change-view="changeView" @change-dataset="changeDataset"
                :key=view />
        </div>

    </div>
    <DataDashboard v-if="!showWelcome" :view=view :dataset=dataset />
    <DDWelcomeView v-if="showWelcome" />
</template>
