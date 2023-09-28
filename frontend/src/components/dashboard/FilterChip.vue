<script setup lang="ts">
import { onMounted, ref, watch, nextTick, inject, computed } from 'vue'
import type { Ref } from 'vue'

import ClickawayDetection from '@/components/ClickawayDetection.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  options: {
    type: Array<string>,
    required: true
  },
  selected: {
    type: Array<string>,
    required: false
  },
  alias: {
    type: Object as () => { [key: string]: string },
    required: true
  },
  filterName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['updateFilter'])

const searchString = ref('')
const filteredOptions: Ref<Array<string>> = ref([])

const selected: Ref<Array<string>> = ref([...props.options])
const tempSelected: Ref<Array<string>> = ref([])

// Ensure at least one filter is selected.
// lastSelected is a single filter that's been selected.
const lastSelected = ref('')

// Are all items selected?
const allSelected = ref(true)

const dropdownShowing = inject<Ref<String>>('dropdownShowing')

const warningShowing = ref(false)

let warningTimerId: number

onMounted(() => (filteredOptions.value = [...props.options]))

function doSelectAll() {
  if (!allSelected.value) {
    selected.value = [...props.options]
    allSelected.value = true
  }
}

watch(selected, () => {
  if (selected.value.length == 0) {
    // Ensure at least 1 filter.
    selected.value = [lastSelected.value]
    nextTick(showWarning)
    return
  } else if (selected.value.length == 1) {
    lastSelected.value = selected.value[0]
    showWarning(false)
  } else {
    lastSelected.value = ''
    showWarning(false)
  }

  emit('updateFilter', props.id, selected.value)
  if (selected.value.length == props.options.length) {
    allSelected.value = true
  } else {
    allSelected.value = false
  }
})

function toggleDropdown() {
  dropdownShowing.value = props.id
}

function search() {
  filteredOptions.value = props.options.filter(searchFilter)
}

function searchFilter(op: string) {
  let alias = mapOption(op)
  alias = alias.toLowerCase()
  return searchString.value === '' || alias.includes(searchString.value.toLowerCase())
}
//Text for the filter-chip to display
const filterChipText = computed(() => {
  const numSelected = selected.value.length
  const totalOptions = props.options.length

  if (numSelected === totalOptions) {
    return 'All' // Display 'All' when all of the options are selected
  } else if (numSelected === 1) {
    return mapOption(selected.value[0]) // Display the selected item when only one is selected
  } else {
    return `${numSelected} of ${totalOptions} selected` // Display 'x of total selected' when multiple items are selected
  }
})
//takes option key and returns alias, ie "BachelorOfEducationMajor" => "Education"
function mapOption(op: string) {
  return props.alias[op]
}

function showWarning(show: boolean = true) {
  warningShowing.value = show
  // This timing must match the length of the animation in .chip-dropdowm-warning.
  if (show)
    warningTimerId = window.setTimeout(() => {
      warningShowing.value = false
    }, 3500)
  else if (warningTimerId) window.clearTimeout(warningTimerId)
}
</script>

<template>
  <div>
    <ClickawayDetection
      v-if="dropdownShowing === props.id"
      @click="dropdownShowing = ''"
    ></ClickawayDetection>
    <div class="filter-chip-dropdown-container">
      <div
        class="filter-chip"
        :class="{
          'filter-chip-has-selections': selected.length > 0,
          'dropdown-showing': dropdownShowing === props.id
        }"
        @click="toggleDropdown"
      >
        <slot></slot><span>: {{ filterChipText }}</span>
      </div>
      <div class="chip-dropdown" v-if="dropdownShowing === props.id">
        <div class="chip-dropdown-header">
          <div class="chip-dropdown-header-title">{{ props.filterName }}</div>
          <div class="chip-dropdown-header-close material-icons" @click="dropdownShowing = ''">
            close
          </div>
        </div>
        <div class="chip-dropdown-search-container">
          <input
            class="chip-dropdown-search-input"
            v-model="searchString"
            type="text"
            placeholder="Search"
            @keyup="search"
          />
          <div class="material-icons searchIcon">search</div>
        </div>
        <div class="chip-dropdown-checkbox-selectall">
          <label class="chip-dropdown-checkbox">
            <input
              :disabled="allSelected"
              type="checkbox"
              v-model="allSelected"
              @click="doSelectAll"
            />
            <span class="chip-dropdown-checkbox-check material-icons">checkmark</span>
            Select all
          </label>
        </div>
        <div v-for="option in filteredOptions">
          <label class="chip-dropdown-checkbox">
            <input type="checkbox" :id="option" :value="option" v-model="selected" />
            <span class="chip-dropdown-checkbox-check material-icons">checkmark</span>
            {{ mapOption(option) }}
          </label>
        </div>
        <div class="chip-dropdown-warning" v-if="warningShowing">
          At least one filter item must be selected.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-chip-dropdown-container {
  position: relative;
  z-index: 2;
}

.filter-chip {
  margin: 0.5rem;
  padding: 0.375rem 0.8125rem;
  border-radius: 2.25rem;
  border: 1px solid #c4c7c5;
  background: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: 'Noto Sans Mono';
  color: #474747;
  cursor: pointer;
  user-select: none;
  z-index: 1;
}

.filter-chip:hover {
  background: #d3e3fd;
}

.dropdown-showing {
  background: #d3e3fd;
}

.filter-chip-has-selections {
  background: #e8f0fe;
  color: #1967d2;
}

.filter-chip-has-selections:hover {
  background: #a8c7fa;
}

.filter-chip-has-selections.dropdown-showing {
  background: #a8c7fa;
}

.chip-dropdown {
  position: absolute;
  top: 100%;
  left: 0.5rem;
  width: 22.5rem;
  background-color: #ffffff;
  border: 1px solid #dadcdf;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  z-index: 3;
}

.chip-dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a73e8;
  color: #ffffff;
  font-family: 'Noto Sans Mono';
  font-size: 1rem;
  font-weight: 700;
}

.chip-dropdown-header-title {
  padding: 1rem;
}

.chip-dropdown-header-close {
  cursor: pointer;
  padding: 1rem;
}

.chip-dropdown-search-container {
  display: flex;
  gap: 0.625rem;
  padding: 0.5rem 1.3rem;
  color: #3c4043;
}

.chip-dropdown-search-input {
  width: 17.375rem;
  border: 0;
  font-family: 'Noto Sans Mono';
  font-size: 0.8125rem;
  font-weight: 500;
}

.chip-dropdown-checkbox {
  position: relative;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  font-family: 'Noto Sans Display';
  font-size: 0.75rem;
  font-weight: 500;
}

.chip-dropdown-checkbox > input[type='checkbox'] {
  appearance: none;
  background-color: #ffffff;
  margin-right: 1rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 0.125rem;
  border: 2px solid #444746;
  cursor: pointer;
}

.chip-dropdown-checkbox > input[type='checkbox']:checked {
  background-color: #1a73e8;
}

.chip-dropdown-checkbox-check {
  position: absolute;
  font-size: 1rem;
  top: 0.74rem;
  left: 1.3125rem;
  font-weight: 900;
  color: #ffffff;
  display: none;
  user-select: none;
  cursor: pointer;
}

.chip-dropdown-checkbox > input[type='checkbox']:checked ~ .chip-dropdown-checkbox-check {
  display: initial;
}

.chip-dropdown-checkbox-selectall {
  border: solid #dadcdf;
  border-width: 1px 0 1px 0;
}

.chip-dropdown-apply {
  display: flex;
  justify-content: end;
  border: solid #dadcdf;
  border-width: 1px 0 0 0;
  padding: 0.5rem;
}

.chip-dropdown-apply > button {
  border: 0;
  background-color: #ffffff;
  color: #1a73e8;
  font-family: 'Roboto';
  font-size: 0.875rem;
  font-weight: 700;
}

.chip-dropdown-warning {
  margin: 0.5rem 1.3175rem 1rem 1.3175rem;
  font-family: 'Roboto';
  font-weight: 700;
  color: #ff0000;
  animation: 0.5s fadeout 3s;
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
