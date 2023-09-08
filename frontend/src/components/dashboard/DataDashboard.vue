<script setup lang="ts">
 import  Demo from './data/Demo.vue'

 import '../../../node_modules/primevue/resources/themes/md-light-indigo/theme.css'
 import '../../../node_modules/primeflex/primeflex.css'

 const props = defineProps(['dataset', 'view'])

</script>

<template>
    <div class="data-dashboard-view">
        <Demo v-if="(props.dataset == 'demo') && (props.view == 'explore')" />
        <div v-if="(props.dataset == 'demo-preset') && (props.view == 'preset')">
            <p class="temp-title">This is a preset demo view.</p>
        </div>
    </div>

</template>
