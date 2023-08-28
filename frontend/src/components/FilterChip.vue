<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const props = defineProps({
  options: {
    type: Array<string>,
    required: true
  }
})

const selected: Ref<Array<string>> = ref([])
const tempSelected: Ref<Array<string>> = ref([])
const selectAll = ref(false)
const dropdownShowing = ref(false)

function doSelectAll() {
  if (!selectAll.value) tempSelected.value = [...props.options]
  if (selectAll.value) tempSelected.value = []
}

function setOption(option: string) {
  setTimeout(() => {
    if (tempSelected.value.includes(option)) tempSelected.value = tempSelected.value.filter((op: string) => op !== option)
    else tempSelected.value = props.options.filter((op: string) => tempSelected.value.includes(op) || op === option)

    if (tempSelected.value.length === props.options.length) selectAll.value = true
    else selectAll.value = false
  })
}

function apply() {
  dropdownShowing.value = false;
  selected.value = [...tempSelected.value]
  tempSelected.value = []
}

function showDropdown() {
  if (dropdownShowing.value) {
    dropdownShowing.value = false;
    tempSelected.value = []
  }
  else {
    tempSelected.value = [...selected.value]
    dropdownShowing.value = true;
  }
}
</script>

<template>
  <div class="filter-chip-dropdown-container">
    <div class="filter-chip"
      :class="{ 'filter-chip-has-selections': selected.length > 0, 'dropdown-showing': dropdownShowing }"
      @click="showDropdown">
      <slot></slot><span v-if="selected.length > 0">: {{ selected.join(', ') }}</span>
    </div>
    <div class="chip-dropdown" v-if="dropdownShowing">
      <div class="chip-dropdown-header">
        <div class="chip-dropdown-header-title">Main</div>
        <div class="chip-dropdown-header-close material-icons" @click="dropdownShowing = false">close</div>
      </div>
      <div class="chip-dropdown-search-container">
        <input class="chip-dropdown-search-input" type="text" placeholder="Search" />
        <div class="material-icons">search</div>
      </div>
      <div class="chip-dropdown-checkbox-selectall">
        <label class="chip-dropdown-checkbox">
          <input type="checkbox" v-model="selectAll" @click="doSelectAll" /><span
            class="chip-dropdown-checkbox-check material-icons">checkmark</span>Select all
        </label>
      </div>
      <div v-for=" option  in  props.options " :key="option">
        <label class="chip-dropdown-checkbox">
          <input type="checkbox" :checked="tempSelected.includes(option)" :value="option"
            @click.prevent="setOption(option)" /><span
            class="chip-dropdown-checkbox-check material-icons">checkmark</span>{{ option }}
        </label>
      </div>
      <div class="chip-dropdown-apply">
        <button @click="apply">APPLY</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-chip-dropdown-container {
  position: relative;
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
  top: 2.5rem;
  left: 0.5rem;
  width: 22.5rem;
  background-color: #ffffff;
  border: 1px solid #dadcdf;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
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
  padding: 0.5rem 1.5rem;
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

.chip-dropdown-checkbox>input[type="checkbox"] {
  appearance: none;
  background-color: #ffffff;
  margin-right: 1rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 0.125rem;
  border: 2px solid #444746;
  cursor: pointer;
}

.chip-dropdown-checkbox>input[type="checkbox"]:checked {
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

.chip-dropdown-checkbox>input[type="checkbox"]:checked~.chip-dropdown-checkbox-check {
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

.chip-dropdown-apply>button {
  border: 0;
  background-color: #ffffff;
  color: #1a73e8;
  font-family: 'Roboto';
  font-size: 0.875rem;
  font-weight: 700;
}
</style>