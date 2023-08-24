<script setup lang="ts">
import { computed, h, useSlots } from 'vue';

const props = defineProps({
  imgSrc: String,
  width: String,
  alt: String
})

const remWidth = computed(() => {
  return `${props.width}rem`;
})
const pWidth = computed(() => {
  if (props.width !== undefined)
    return `${+props.width - 4}rem`;
})

// const professionStringLength = computed(() => {
//   let professionString = slots.profession?.()[0].children;
//   if (professionString !== undefined) {
//     return professionString.length;
//   }
//   else return 0;
// })

// const storyStringLength = computed(() => {
//   let storyString = slots.story?.()[0].children;
//   if (storyString !== undefined) {
//     return storyString.length;
//   }
//   else return 0;
// })


const slots = useSlots()
const storyString = slots.story?.()[0].children
const professionString = slots.profession?.()[0].children
let professionStringLength = professionString?.length;
let storyStringLength = storyString?.length;
const nameString = slots.name?.()[0].children
const maxStoryLength = 100
const maxProfessionLength = 44
const profession = () => h('p', {}, professionStringLength > maxProfessionLength ? `${professionString?.slice(0, maxProfessionLength)}...` : professionString)
//const profession = () => h('p', {}, `${professionString?.slice(0, maxProfessionLength)}...`)

const story = () => h('p', {}, storyStringLength > maxStoryLength ? `${storyString?.slice(0, maxStoryLength)}...` : storyString)
//const story = () => h('p', {}, `${storyString?.slice(0, maxStoryLength)}...`)
</script>
<template>
  <Card>
    <template #header>
      <img :alt="alt" :src="imgSrc" />
    </template>
    <template #title>
      <h1>
        <slot name="name"></slot><br>
        <profession style="color: #101115; font-size: 26px; font-family: 'Noto Sans Mono';"/>
      </h1>
    </template>
    <template #content>
      <p>
        <story style="position:absolute; margin-bottom: 5.31;"/>
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

:deep(.p-card-title) {
  width: 22.5625rem;
  height: 8.375rem;
  flex-shrink: 0;
}

:deep(.p-card-content) {
  width: 22.5625rem;
  height: 8.875rem;
  flex-shrink: 0;
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
  color: red;
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
