<script setup lang="ts">
 const props = defineProps({row: Object, idx: String})
</script>

<template>
	<Card style="width: 20em; margin-top: 1em; ">
	    <template #header>
                    <img alt="{{props.row.name}}" :src="props.row.image" style="width: 20em;"/>
		</template>
		<template #title>{{props.row.name}}</template>
		<template #subtitle>{{props.row.focus}}</template>
		<template #content>
                    <div v-for="text in props.row.text.split(/\r?\n/)">
			<p>
			    {{text}}
			</p>
                    </div>
		</template>
	    </Card>
</template>
