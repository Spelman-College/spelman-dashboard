<script setup lang="ts">
import * as Plot from "@observablehq/plot"
import { defineProps } from "vue"

const props = defineProps({
     options: Object
 })

</script>

<template>
	<div v-html="Plot.plot(props.options).outerHTML" />
</template>
