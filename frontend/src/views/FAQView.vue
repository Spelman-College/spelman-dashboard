<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const faqs = [
  {
    question: "What is the purpose of this dashboard?",
    answer: "The primary goal of the dashboard is to provide data-driven insights that highlight the achievements and contributions of Black women in STEM fields. Our hope is that this information and these empowering stories will foster diversity and inclusion in the STEM community."
  },
  {
    question: "How do filters work?",
    answer: "Filters allow users to refine data visualizations based on specific criteria or parameters. " +
    "\n\n You can apply filters to focus on particular STEM domains in both open explore and data stories, such as year, race, gender, age, or other relevant data attributes. By selecting these filter options, you can customize the displayed data to gain more targeted insights and explore data from different perspectives. \n\n" +
    " In data explore, filter option can be added and removed. In data stories, you can only add filters."
  },
  {
    question: "Where does the data come from, and how reliable is it?",
    answer: "The data presented on the dashboard is sourced from datacommons.org and verified databases, research publications, and contributions from the community."
  },
  {
    question: "Can I download or export the data visualizations?",
    answer: "Yes, you have the option to download or export data visualizations for personal or educational use. In Data Dashboard, select Explore data or Data stories to view and customize the data. Then select Download data to download. " +
    "\nThere is no export option in MVP version."
  },
  {
    question: "How frequently is the dashboard updated?",
    answer: "The dashboard data is pulled from Data Commons which has regular updates reflected here."
  },
  {
    question: "Is the dashboard accessible to everyone?",
    answer: "The dashboard was created to be used by a wide audience. The UX design meets accessibility standards to ensure a user-friendly experience for everyone and can be used by students, academic researchers and anyone interested in learning more about Black women in STEM."
  },
  {
    question: "Can I contribute to the platform?",
    answer: "Currently, we are not accepting contributions. However, we may consider contributions in the future as we continue to develop and expand the platform. Thank you for your interest, and we appreciate your willingness to contribute!"
  },
  {
    question: "How can I get in touch with the team?",
    answer: "You can contact the team for inquiries, feedback, or collaboration opportunities by using the contact information at the bottom of this page."
  },
  {
    question: "What’s the difference between explore and stories?",
    answer: "Data explore allows you to start from a blank canvas where you have the freedom to create your data visualizations and apply any filters you’d like. " + 
    "\nData Stories are linked to preset data and users have limited customization options."
  },
]
</script>

<template>
  <div class="view">
    <h3>Have a question?</h3>
    <p>Frequently Asked Questions</p>
    </div>
  
<Accordion>
    <AccordionTab v-for="panel in faqs" :key="panel.question" :header="panel.question">
      {{ panel.answer }}
    </AccordionTab>
  </Accordion>


</template>

<style scoped>
p {
  width: 36rem;
}

</style>