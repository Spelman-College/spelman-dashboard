<script setup lang="ts">
 import { ref, watchEffect, watch } from 'vue'
 import { useRoute, useRouter } from 'vue-router';

 const router = useRouter()
 
 const emit = defineEmits(['changeView'])
 const props = defineProps(['view'])
 if (!['preset', 'explore'].includes(props.view)) {
     // This is intended to cause a redirect.
     router.push('/data')
 }
 let exploreSelected = false
 if (props.view == 'explore') {
     exploreSelected = true
 }
 const checkedExplore = ref(exploreSelected)
 const checkedPreset = ref(!exploreSelected)

 const exploreText = 'Open Explore'
 const presetText = 'Review Charts'

 watch(checkedPreset, () => {
     if (checkedPreset.value) {
	 emit('changeView', 'preset')
	 checkedExplore.value = false
     }
     
 })

 watch(checkedExplore, () => {
     if (checkedExplore.value) {
	 emit('changeView', 'explore')
	 checkedPreset.value = false
     }
 })
 
</script>

<template>
    <div class="flex justify-content-center" v-if="checkedExplore">
	<ToggleButton disabled v-model="checkedExplore" :onLabel=exploreText :offLabel=exploreText />
	<ToggleButton v-model="checkedPreset" :onLabel=presetText :offLabel=presetText :pt="{ root: { class: ['w-8rem', { 'bg-blue': checkedPreset }] }}" />
    </div>
    
    <div class="flex justify-content-center" v-if="checkedPreset">
	<ToggleButton v-model="checkedExplore" :onLabel=exploreText :offLabel=exploreText :pt="{ root: { class: ['w-8rem', { 'bg-blue': checkedExplore }] }}" />
	
	<ToggleButton disabled v-model="checkedPreset" :onLabel=presetText :offLabel=presetText />
    </div>
</template>


<style scoped>
 .bg-blue {
     background-color: blue;
 }
</style>

