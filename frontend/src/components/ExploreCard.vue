<script setup lang="ts">
const props = defineProps({
  imgSrc: String,
})
</script>
<template>
  <div id="explore-card">

  
      <slot name="header"></slot>
 
    <div class="body">
      <slot name="text"></slot>
    </div>
    <div class="link" id="link">
      <a>
        <slot name="link"></slot><span class="material-symbols-rounded">arrow_right_alt</span> 
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

#link a {
  color: #4fdfff;
}

#link .material-symbols-rounded {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  color: #4fdfff;
  margin-left: 0.81rem;
  vertical-align:middle;
}
</style>