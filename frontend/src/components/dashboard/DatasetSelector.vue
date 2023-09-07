<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { inject, ref, watchEffect, watch } from 'vue'

import type { Ref } from 'vue'

import { getVarsString } from '../../data/queries/ui'

import ClickawayDetection from '../ClickawayDetection.vue'

// The event we emit when we change the dataset
const emit = defineEmits(['changeDataset'])

// `view` is either 'preset' or 'explore'
// `dataset` is a dataset path, selected from
// 'presets' if `dataset` is 'preset' or
// 'datasets' if `datasets` is 'explore'
const props = defineProps(['view', 'dataset', 'availableDatasets'])

const options = props.availableDatasets
const view = ref(props.view)
const dataset = ref(props.dataset)
const selectorHeader = ref(props.dataset)

const dropdownShowingId = 'datasetDropdown'
const dropdownShowing = inject<Ref<String>>('dropdownShowing')
const placeholderText = ref('')
const selected = ref({})

let initialDataset = options.findIndex(option => option.path === dataset.value)
const selectedIndex = ref(initialDataset)

// Select the target dataset if it exists in the available list.
watchEffect(() => {
    let container = ''
    let datasetObject = {}
    if (view.value == 'explore') {
        selectorHeader.value = 'dataset'
        container = 'dataset to explore'
    } else if (view.value == 'preset') {
        container = 'chart to view'
        selectorHeader.value = 'charts'
    }

    options.forEach((s) => {
        if (dataset.value == s.path) {
            datasetObject = s
            placeholderText.value = s.name
        }
    })
    if (Object.keys(datasetObject).length == 0) {
        placeholderText.value = `Select a ${container}`
    } else {
        placeholderText.value = undefined
    }
    selected.value = datasetObject
})

watch(selected, () => {
    emit('changeDataset', selected.value.path)
})


function handleClick(name: String | null) {
    if (name === null)
        dropdownShowing.value = dropdownShowing.value !== 'datasetDropdown' ? dropdownShowingId : '';
    else {
        const idx = options.findIndex(option => option.name === name)
        selectedIndex.value = idx
        selected.value = options[idx]
        emit('changeDataset', options[idx].path)
    }
}
</script>

<template>
    <ClickawayDetection v-if="dropdownShowing === dropdownShowingId" @click="dropdownShowing = ''"></ClickawayDetection>
    <div class="dropdown" @click="handleClick(null)">
        <div class="dropdown-header">{{ selectorHeader }}</div>
        <div v-if="selectedIndex >= 0" class="dropdown-text">{{ options[selectedIndex].name }} &nbsp;({{
            options[selectedIndex].year }})</div>
        <div v-if="selectedIndex < 0" class="dropdown-text">{{ placeholderText }}</div>
        <div class="dropdown-arrow material-icons">arrow_drop_down</div>
        <div class="dropdown-options-container" v-if="dropdownShowing === dropdownShowingId">
            <div class="dropdown-option" v-for="option in options" :key="option.name" @click="handleClick(option.name)">
                <div class="name-source-vars-container">
                    <div class="name-source">{{ option.name }} | Source: {{ option.source }}</div>
                    <div class="vars">Variables: {{ getVarsString(option.variables) }}</div>
                </div>
                <div class="year">{{ option.year }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem;
    color: #ffffff;
    font-family: 'Noto Sans Mono';
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.0125rem;
    width: 61.75rem;
    height: 3rem;
    border-radius: 0.25rem;
    border: 1px solid #c4c7c5;
    cursor: pointer;
    z-index: 3;
    user-select: none;
}

.dropdown-header {
    position: absolute;
    padding: 0 0.5rem;
    margin: 0 0 0 -0.5rem;
    top: -0.6rem;
    font-size: 0.75rem;
    background: #22262b;
}

.dropdown-arrow {
    position: absolute;
    right: 0;
    margin: 0 0.5rem;
}

.dropdown-options-container {
    position: absolute;
    left: 0;
    top: 3rem;
    width: 61.75rem;
    background-color: #ffffff;
    border-radius: 0.25rem;
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
}

.dropdown-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 0.0125rem;
    padding: 1rem;
}

.dropdown-option:first-child {
    border-radius: 0.25rem 0.25rem 0 0;
}

.dropdown-option:last-child {
    border-radius: 0 0 0.25rem 0.25rem;
}

.dropdown-option:hover {
    background-color: #d6e2fb;
}

.name-source-vars-container {
    font-family: 'Noto Sans Display';
    color: #3c4043;
}

.name-source {
    font-size: 0.875rem;
    font-weight: 500;
}

.vars {
    font-size: 0.75rem;
    font-weight: 400;
}

.year {
    font-family: 'Roboto';
    font-size: 0.875rem;
    color: #80868b;
    font-weight: 400;
}
</style>
