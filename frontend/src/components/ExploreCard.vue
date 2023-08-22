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
    <div class="body">
      <slot name="text"></slot>
    </div>
    <div class="link">
      <a>
        <slot name="link"></slot> &rarr;
      </a>
    </div>
  </div>
</template>

<style scoped>
#explore-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #5d6267;
  border-radius: 1.25rem;
  box-shadow: 0 4px 20px 0 #292929;
  padding: 2rem;
  width: 26.75rem;
  height: 40.6875rem;
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

#explore-card .link {
  margin-top: auto;
  margin-bottom: 2rem;
}

#explore-card .body {
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 1.3125rem;
  width: 22.5625rem;
}
</style>