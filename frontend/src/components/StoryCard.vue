<script setup lang="ts">
const props = defineProps({
  imgSrc: String,
})
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
        <slot name="story"></slot>
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
}

:deep(.p-card-body) {
  padding: 2em;
}

h1 {
  color: #000000;
  font-size: 26px;
  line-height: normal;
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