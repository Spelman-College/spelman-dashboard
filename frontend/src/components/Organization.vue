<script setup lang="ts">
 const props = defineProps({org: Object, idx: String})
 const nodes = [{
     key: props.idx,
     label: props.org.name,
     children: [
	 { key: props.idx + '-0', label: props.org.website},
	 { key: props.idx + '-1', label: 'Founded: ' + props.org.founded},
	 { key: props.idx + '-2', label: 'Founder: ' + props.org.founder},
	 { key: props.idx + '-3', label: 'STEM Focus: ' + props.org.focus}
     ]
 }]
</script>

<template>
    <p>
	<Tree :value="nodes"></Tree>
    </p>
</template>
