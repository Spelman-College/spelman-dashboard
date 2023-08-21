<script setup lang="ts">
import { ref } from 'vue'

const iconIsExpand = ref(true)

function onClick(event) {
  const expandIcon = event.currentTarget.querySelector('.icon')
  const panel = event.currentTarget.nextElementSibling
  if (!panel.style.maxHeight) {
    panel.style.maxHeight = `${panel.scrollHeight}px`
    iconIsExpand.value = false
  }
  else {
    panel.style.maxHeight = null
    iconIsExpand.value = true
  }
}
</script>

<template>
  <div class="panel">
    <div class="header" @click="onClick">
      <slot name="header"></slot>
      <div class="material-icons icon">{{ iconIsExpand ? 'expand_more' : 'expand_less' }}</div>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style scoped>
.panel {
  background-color: #ffffff;
  width: 80rem;
  border-radius: 1rem;
  margin: 1rem auto 1rem auto;
}

.body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.header {
  display: flex;
  align-items: center;
  height: 9.9375rem;
}

.icon {
  color: #444746;
  font-size: 2.5rem;
  margin-left: auto;
  margin-right: 3rem;
}
</style>