<script setup lang="ts">
 const props = defineProps({row: Object, idx: String})
 const nodes = [{
     key: props.idx,
     label: props.row.name,
     children: [
	 { key: props.idx + '-0', label: props.row.name},
	 { key: props.idx + '-1', label: 'STEM Focus: ' + props.row.focus}
     ]
 }]
</script>

<template>
    <p>
	<Tree :value="nodes"></Tree>
    </p>
</template>
