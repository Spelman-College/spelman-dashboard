<script setup lang="ts">
import Demo from './data/Demo.vue'
import Ipeds_318_45 from './data/Ipeds_318_45.vue'

import '../../../node_modules/primevue/resources/themes/md-light-indigo/theme.css'
import '../../../node_modules/primeflex/primeflex.css'

const props = defineProps(['dataset', 'view'])
</script>

<template>
  <div class="data-dashboard">
    <Demo v-if="props.dataset == 'demo' && props.view == 'explore'" />
    <Ipeds_318_45 v-if="props.dataset == 'ipeds-318-45' && props.view == 'explore'" />
    <div v-if="props.dataset == 'demo-preset' && props.view == 'preset'">
      <p class="title">This is a preset demo view.</p>
    </div>
  </div>
</template>
