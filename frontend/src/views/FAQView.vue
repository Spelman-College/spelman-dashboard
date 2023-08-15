<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const faqs = [
  {
    question: "Question 1",
    answer: "Answer 1."
  },
  {
    question: "Question 2",
    answer: "Answer 2."

  },

]
</script>

<template>
  <div class="view">
    <h3>Stories</h3>
    <p>The Black Experience in Design spotlights teaching practices, research, stories, and conversations from a
      Black/African diasporic lens.</p>
    </div>
  
<Accordion>
    <AccordionTab v-for="panel in faqs" :key="panel.question" :header="panel.question" >
      {{ panel.answer }}
    </AccordionTab>
  </Accordion>


</template>

<style scoped>
p {
  width: 36rem;
}

div.story-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 12rem;
}
</style>