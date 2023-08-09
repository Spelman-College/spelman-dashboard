<script setup lang="ts">
import * as Plot from "@observablehq/plot"
import { h, withDirectives, defineProps } from "vue"

const props = defineProps({
     options: Object
 })

</script>

<template>
	<svg v-html="Plot.plot(props.options).outerHTML" />
</template>
