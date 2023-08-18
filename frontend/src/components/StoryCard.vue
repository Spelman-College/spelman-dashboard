<script setup lang="ts">
import { computed, h, useSlots } from 'vue';

const props = defineProps({
  imgSrc: String,
  width: String
})

const remWidth = computed(() => {
  return `${props.width}rem`;
})
const pWidth = computed(() => {
  if (props.width !== undefined)
    return `${+props.width - 4}rem`;
})

const slots = useSlots()
const storyString = slots.story?.()[0].children
const maxLength = 100
const story = () => h('p', {}, storyString.length > maxLength ? `${storyString?.slice(0, maxLength)}...` : storyString)
</script>
<template>
  <Card>
    <template #header>
      <img alt="user header" :src="imgSrc" />
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
      <h2>
        <slot name="linkText"></slot> &rarr;
      </h2>
    </template>
  </Card>
</template>

<style scoped>
.p-card {
  background-color: white;
  border-radius: 16px;
  width: v-bind('remWidth');
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
  letter-spacing: normal;
}

p {
  color: #565656;
  font-family: Roboto;
  font-size: 21px;
  line-height: 140%;
  width: v-bind('pWidth');
}

img {
  width: v-bind('remWidth');
  height: 25em;
  border-radius: 16px 16px 0px 0px;
}
</style>