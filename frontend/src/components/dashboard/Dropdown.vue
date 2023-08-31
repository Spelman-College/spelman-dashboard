<script setup lang="ts">
 import { debugPort } from 'process';
 import { ref } from 'vue'
 import ClickawayDetection from '../ClickawayDetection.vue';

  import { datasets } from '../../data/queries/ui'

 const selected = ref('default')

 const dropdownVisible = ref(false)

 const options = [
     demoMeta,
     {
	 name: "National survey of college graduates salaries",
	 source: "National Center for Science and Engineering Statistics",
	 variables: ["Year", "Sex", "Race", "Age range", "Residency status", "Citizenship status", "Occupation", "Employment status", "Field of status", "Job satisfaction", "Salary", "Some variable"],
	 year: "2001 - 2021"
     },
     {
	 name: "Research Doctorate recipients",
	 source: "National Center for Science and Engineering Statistics",
	 variables: ["Year", "Sex", "Race", "Degree Level", "Residency status", "Citizenship status", "Education-related debt", "Field of study", "Salary", "Institution", "Countries", "Another", "Variable"],
	 year: "2001 - 2021"
     },
 ]

 function getVarsString(vars: Array<String>): String {
     var joinedString = vars.join(', ')

     // If the string is too long, remove variables until it is not and keep track of how many.
     var lastIndex;
     var countRemoved = 0;
     while ((lastIndex = joinedString.lastIndexOf(',')) > 132) {
	 joinedString = joinedString.substring(0, lastIndex)
	 countRemoved++;
     }

     if (countRemoved !== 0)
	 joinedString += `, +${countRemoved} more`

     return joinedString;
 }

 function handleClick(name: String | null) {
     if (name === null)
	 dropdownVisible.value = !dropdownVisible.value
     else {
	 currentDataset.value = options.findIndex(option => option.name === name)
     }
 }
</script>

<template>
    <ClickawayDetection v-if="dropdownVisible" @click="dropdownVisible = false"></ClickawayDetection>
    <div class="dropdown" @click="handleClick(null)">
	<div class="dropdown-header">Dataset</div>
	<div class="dropdown-text">{{ options[currentDataset].name }} &nbsp;({{ options[currentDataset].year }})</div>
	<div class="dropdown-arrow material-icons">arrow_drop_down</div>
	<div class="dropdown-options-container" v-if="dropdownVisible">
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
