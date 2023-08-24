<script setup lang="ts">
 import  Demo from './data/Demo.vue'

 const props = defineProps(['dataset', 'view'])
</script>

<template>
    <div class="data-dashboard">
	<Demo v-if="(props.dataset == 'demo') && (props.view == 'explore')" />
	<div v-if="(props.dataset == 'demo-preset') && (props.view == 'preset')">
	    <p class="title">This is a preset demo view.</p>
	</div>
    </div>

</template>

<style scoped>
 :deep(.data-dashboard) {
     color: black;
     background-color: white;
 }
 :deep(.title) {
     color: #4285F4;
     font-family: Google Sans Mono;
     font-size: 2rem;
     font-style: normal;
     font-weight: 400;
     line-height: normal;
 }


</style>
