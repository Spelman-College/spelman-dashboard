<script setup lang="ts">
import { h, useSlots } from 'vue';

const props = defineProps({
  imgSrc: String,
  alt: String,
})

const slots = useSlots()
const storyString = slots.story?.()[0].children
const maxLength = 100
const story = () => h('p', {}, storyString.length > maxLength ? `${storyString?.slice(0, maxLength)}...` : storyString)
</script>
<template>
  <Card>
    <template #header>
      <img :alt="alt" :src="imgSrc"/>
    </template>
    <template #title>
      <h1>
        <slot name="name"></slot>
      </h1>
    </template>
    <template #content>
      <p>
        <story />
      </p>
    </template>
    <template #footer>
      <h2>Read her story &rarr;</h2>
    </template>
  </Card>
</template>

<style scoped>
.p-card {
  background-color: white;
  border-radius: 16px;
  width: 25em;
  height: 50em;
}

:deep(.p-card-body) {
  padding: 2em;
}

h1 {
  color: #101115;
  font-size: 26px;
  line-height: normal;
  letter-spacing: normal;
}

h2 {
  color: #313b49;
  font-family: 'Noto Sans Mono';
  font-size: 21px;
  font-weight: 700;
}

p {
  color: #565656;
  font-family: Roboto;
  font-size: 21px;
  line-height: 140%;
}

img {
  width: 25em;
  height: 25em;
  border-radius: 16px 16px 0px 0px;
}
</style>
