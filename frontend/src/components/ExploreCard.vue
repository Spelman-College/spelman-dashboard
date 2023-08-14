<script setup lang="ts">
const props = defineProps({
  imgSrc: String,
})
</script>
<template>
  <div id="explore-card">
    <div class="circle">
      <img :src="imgSrc" />
    </div>
    <h1>
      <slot name="header"></slot>
    </h1>
    <p>
      <slot name="text"></slot>
    </p>
    <a>
      <slot name="link"></slot> &rarr;
    </a>
  </div>
</template>

<style scoped>
#explore-card {
  border: 1px solid #5d6267;
  border-radius: 1.25rem;
  box-shadow: 0 4px 20px 0 #292929;
  padding: 2rem;
}

#explore-card .circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.3125rem;
  height: 7.3125rem;
  border-radius: 50%;
  background: #ffffff;
}

#explore-card h1 {
  font-size: 1.625rem;
  letter-spacing: revert;
}

#explore-card a {
  margin-top: auto;
  margin-bottom: 2rem;
}
</style>