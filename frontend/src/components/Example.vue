<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'

function sayHello() {
  alert('Hello!')
}
</script>

<template>
  <Button label="Hello world!" @click="sayHello" />
</template>
