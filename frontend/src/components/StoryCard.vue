<template>
  <Card class="card">
    <template #header>
      <img alt="user header" src="/story_placeholder1.jpg" />
    </template>
    <template #title> Advanced Card </template>
    <template #subtitle> Card subtitle </template>
    <template #content>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
        deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
        neque
        quas!
      </p>
    </template>
    <template #footer>
      Hello world
      <!-- <Button icon="pi pi-check" label="Save" />
      <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" /> -->
    </template>
  </Card>
</template>

<style scoped>
.card {
  background-color: white;
  width: 25em;
}

img {
  width: 25em;
  height: 25em;
}
</style>