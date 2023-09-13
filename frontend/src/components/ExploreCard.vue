<script setup lang="ts">

const props = defineProps({
  imgSrc: String,
})
</script>
<template>
  <div id="explore-card">
      <div class="explore-card-top">
        <img :src="imgSrc" class="illustration"/>
      </div>
    <div class="explore-card-bottom">
      <h1>
        <slot name="header"></slot>
      </h1>
      <div class="body">
        <slot name="text"></slot>
      </div>
      <div class="link" id="link">
          <slot name="link"></slot>
      </div>
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
  padding: 0;
  margin:0;
  width: 26.75rem;
}

.explore-card-top {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.explore-card-bottom{
  padding: 2rem;
}
.illustration{
  width: 100%;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
#explore-card h1 {
  font-size: 1.625rem;
  letter-spacing: revert;
  margin:0;
}

#explore-card .link {
  margin-top: auto;
  margin-bottom: 2rem;
}

#explore-card .body {
  font-family: 'Noto Sans Mono';
  font-size: 1.3125rem;
}

#link a {
  color: #4fdfff;
}

#link .material-symbols-rounded {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  color: #4fdfff;
  margin-left: 0.81rem;
  vertical-align: middle;
}
</style>
