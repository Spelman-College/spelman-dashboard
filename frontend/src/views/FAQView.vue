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
  <div class="flex-container">
    <div class="view faq">
      <question_splash>Have a question?</question_splash>
      <faq_splash>Frequently Asked<br>Questions</faq_splash>
      <img src="/swiggly_line_red_FF6454.svg" alt="" id="swiggly-line-red" />
    </div>
    <Accordion :multiple="true"> 
      <AccordionTab v-for="panel in faqs" :key="panel.question" :header="panel.question">
        {{ panel.answer }}
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&family=Open+Sans&display=swap');

.flex-container{
  display: flex;
  flex-direction: column;
  overflow-x:auto;
  align-items:center;
}
.faq{
  display:flex;
  align-self:start;
  flex-direction:column;
  gap: 2rem;
  white-space: nowrap;
}

p {
  width: 36rem;
}
:deep(.p-accordion .p-accordion-content) { 
  color: #000;
  font-family: Open Sans;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  padding-left: 4.46rem;
  padding-top:0;
  padding-right: 9.89rem;
  padding-bottom: 3rem;
  background-color:#ACF0FF;
} 

:deep(.p-accordion .p-accordion-header-text) {
  color: #000;
  font-family: 'Noto Sans Mono', monospace;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 136.364% */
  letter-spacing: -1px;
  padding-left: 4.38rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
} 

:deep(.p-accordion .p-accordion-tab) {
  box-sizing: border-box;
  background: #ACF0FF;
  width: 54.25rem;
  margin: 20px;
  border-radius: 16px;

}

:deep(.p-accordion-toggle-icon) {
  display: flex;
  flex-shrink: 0;
  color: var(--gm-3-sys-light-on-surface-variant, #444746);
}

faq_splash {
  color: #ACF0FF;
  font-family: 'Noto Sans Mono', monospace;
  font-size: 3.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.75rem; /* 120% */
  letter-spacing: -0.0625rem;

}

question_splash {
  width: 16.70363rem;
  height: 3.95775rem;
  flex-shrink: 0;
  color: #ACF0FF;
  font-family: Open Sans;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.75rem; /* 200% */
}

/* Overriding the theme to make Accordion buttons rounded */
:deep(.p-accordion .p-accordion-tab .p-accordion-header .p-accordion-header-link),
:deep(.p-accordion .p-accordion-tab:first-child),
:deep(.p-accordion .p-accordion-tab .p-accordion-content),
:deep(.p-accordion .p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link),
:deep(.p-accordion .p-accordion-tab:last-child .p-accordion-content),
:deep(.p-accordion .p-accordion-tab:last-child .p-accordion-header:not(.p-highlight) .p-accordion-header-link),
:deep(.p-accordion .p-accordion-tab:last-child){
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
}

/* Overriding the theme to make Accordion blue*/
:deep(.p-accordion .p-accordion-header .p-accordion-header-link:hover ),
:deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link),
:deep(.p-accordion .p-accordion-header:not(.p-highlight):not(.p-disabled):hover .p-accordion-header-link),
:deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link),
:deep(.p-accordion .p-accordion-tab:not(.p-accordion-tab-active) .p-accordion-header-link:focus  ),
:deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link),
  :deep(.p-accordion .p-accordion-header-link:hover .p-accordion-header-action:hover){
  background-color:#ACF0FF;
}


:deep(.p-accordion .p-accordion-header .p-accordion-header-link ){
  background-color:#ACF0FF;
  padding-left:0;
}

</style>
