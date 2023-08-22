<script setup lang="ts">
 const props = defineProps({org: Object, idx: String})
 const nodes = [{
     key: props.idx,
     label: props.org.name,
     children: [
	 { key: props.idx + '-0', label: props.org.website},
	 { key: props.idx + '-1', label: props.org.info}
     ]
 }]
</script>

<template>
    <p>
	<Tree :value="nodes"></Tree>
    </p>
    <!-- TODO: Integrate image in nodes var -->
    <Card style="width: 20em; margin-top: 1em; ">
    <template #header>
        <img alt="{{props.org.name}}" :src="props.org.image" style="width: 20em;"/>
	</template>
    </Card>
</template>
