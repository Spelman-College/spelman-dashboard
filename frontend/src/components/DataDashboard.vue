<script setup lang="ts">
 import  Demo from './data/Demo.vue'

 const props = defineProps(['dataset'])
</script>

<template>
    <div class="data-dashboard">
	<Demo v-if="props.dataset == 'demo'"/>
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
     font-size: 14px;
     font-style: normal;
     font-weight: 400;
     line-height: normal;
 }


</style>
