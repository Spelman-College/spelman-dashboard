<script setup lang="ts">

</script>

<template>
  <div class="card-and-arrow-container">
    <div class="arrow-left">
      <img src="/arrow_left.svg" />
    </div>
    <div class="card">
      <img src="/data_dashboard_welcome_icon.svg" />
      <div class="header">Welcome to the data dashboard</div>
      <div class="paragraph">Select a dataset in the drop-down menu above.</div>
      <div class="paragraph">Use the toggle on the top left of the page to switch between Explore Data mode and Preset
        Chart
        mode.</div>
      <div class="paragraph">Toggle to Explore Data to tailor datasets using filters and create custom charts.</div>
      <div class="paragraph">Or, toggle to Preset Charts to see charts with key statistics highlighted.</div>
      <div class="footer">Need more help? Check out the comprehensive <a href="/faq">FAQ page</a>.</div>
    </div>
    <div class="arrow-right">
      <img src="/arrow_right.svg" />
    </div>
  </div>
</template>

<style scoped>
.card-and-arrow-container {
  display: flex;
  justify-content: center;
}

.card {
  margin: 6rem 1rem 0 1rem;
  width: 47.75rem;
  height: 29.3125rem;
  background-color: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
}

.card>img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.card>.header {
  margin: 2rem 0;
  color: #202124;
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 1.375rem;
}

.card>.paragraph {
  margin: 1rem 0;
  color: #3c4043;
  font-family: 'Roboto';
  font-size: 1rem;
  letter-spacing: 0.00625rem;
}

.card>.footer {
  margin: 1rem 0;
  color: #3c4043;
  font-family: 'Roboto';
  font-size: 0.75rem;
  letter-spacing: 0.00625rem;
}

.card>.footer>a {
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  color: #0b57d0;
}

.arrow-left {
  margin-top: -1rem;
}

.arrow-right {
  margin-top: -2rem;
}
</style>
