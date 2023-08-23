<script setup lang="ts">
defineProps({
  vars: Array<String>
})
</script>

<template>
  <div class="card">
    <div class="headnote">
      <slot name="dataSource"></slot>
    </div>
    <div class="header">
      <slot name="name"></slot>
    </div>
    <div class="year">
      (<slot name="year"></slot>)
    </div>
    <div class="story">
      <slot name="story"></slot>
    </div>
    <div class="vars-header">Variables</div>
    <div class="vars-chip-container">
      <span v-for="v in vars" class="vars-chip">{{ v }}</span>
    </div>
    <div class="buttons">
      <button class="button-download">&darr; Download</button>
      <button>View dataset</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 38.375rem;
  background: #FFF;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.40);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.headnote {
  color: #006eff;
  font-family: 'Noto Sans';
  font-size: 0.75rem;
  font-weight: 700;
}

.header {
  color: #000000;
  font-family: 'Noto Sans';
  font-size: 1.375rem;
  font-weight: 500;
  margin: 0.5rem 0;
}

.year {
  color: #000000;
  font-family: 'Noto Sans Display';
  font-size: 0.9375rem;
  margin: 1rem 0;
}

.vars-header {
  color: #000000;
  font-family: 'Roboto';
  font-size: 1rem;
  font-weight: 700;
  margin: 1rem 0;
}

.vars-chip-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin: 1rem 0;
}

.vars-chip {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 6.25rem;
  border: 1px solid #CCDDF4;
  background: #E5ECF5;
  color: #000000;
  font-family: 'Noto Sans';
  font-size: 1rem;
  font-weight: 500;
}

.story {
  color: #000000;
  font-family: 'Roboto';
  font-size: 1rem;
  line-height: 1.25rem;
}

.buttons {
  display: flex;
  justify-content: end;
}

.buttons>button {
  margin-left: 1rem;
  border: 0;
}

.button-download {
  background: #e5ecf5;
}
</style>