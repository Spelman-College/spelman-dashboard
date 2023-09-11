<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watch, nextTick, inject, computed } from 'vue'

const emit = defineEmits(['changeCompare'])
const props = defineProps({
  options: {
    type: Array<{ [key: String]: String }>,
    required: true
  },
  filterText: {
    type: String,
    required: false,
    default: 'Compare'
  }
})

// Select the first option.
const compare = ref(props.options[0].id)
watch(compare, () => {
  emit('changeCompare', compare.value)
})
</script>

<template>
  <div class="">
    <div v-if="true" class="flex flex-wrap gap-3 filter-text">
      <span class="filter-text">Compare</span>

      <div class="flex align-items-center" v-for="option in props.options">
        <RadioButton
          v-model="compare"
          :inputId="`${option.id}Radio`"
          :name="option.id"
          :value="option.id"
        />
        <label for="`${option}Radio`" class="ml-2">{{ option.name }}</label>
      </div>
    </div>
  </div>
</template>
