<script setup lang="ts">
import AccordionPanel from '@/components/AccordionPanel.vue'

const orgs = [
  {
    imgSrc: "/org_logos/blackgirlsdostem_logo.png",
    name: "Example Org 1",
    url: "https://example1.com/",
    description: "1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    imgSrc: "/org_logos/abwp_logo.png",
    name: "Example Org 2",
    url: "https://example2.com/",
    description: "2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    imgSrc: "/org_logos/blackgirlsdostem_logo.png",
    name: "Example Org 3",
    url: "https://example3.com/",
    description: "3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    imgSrc: "/org_logos/abwp_logo.png",
    name: "Example Org 4",
    url: "https://example4.com/",
    description: "4 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    imgSrc: "/org_logos/blackgirlsdostem_logo.png",
    name: "Example Org 5",
    url: "https://example5.com/",
    description: "5 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
]
</script>

<template>
  <h2>Changemaking Organizations</h2>
  <p>Spotlighting organizations dedicated to the advancement of<br />
    Black women in STEM</p>
  <div id="outer">
    <img id="splash" src="/gettyimages-679531922-170667a.jpg" />
    <img id="dots" src="/dots.svg" />
    <div id="splash-text">
      <div id="splash-text-headnote">List of organizations</div>
      <div id="splash-text-header">Lifting Up Black Women in STEM: Organizations</div>
      <p>These organizations are at the forefront of championing diversity, equity, and inclusion, and they actively work
        to create opportunities, resources, and networks for Black women pursuing careers in STEM disciplines.<br /><br />

        By showcasing these organizations, the aim is to shed light on their impactful initiatives, inspire others to get
        involved, and foster a more inclusive and diverse future in STEM.</p>
    </div>
  </div>

  <AccordionPanel v-for="org in orgs" :key="org.name">
    <template #header>
      <div class="logo-container">
        <img class="logo" :src="org.imgSrc">
      </div>
      <div>
        <div class="name">{{ org.name }}</div>
        <a :href="org.url" class="url">{{ org.url }}</a>
      </div>
    </template>
    <template #body>
      <div class="description">{{ org.description }}</div>
    </template>
  </AccordionPanel>
</template>

<style scoped>
div#outer {
  height: 70rem;
}

img#splash {
  position: absolute;
  width: 75.5rem;
  border-radius: 2.5rem;
  margin-left: 7.875rem;
}

div#splash-text {
  position: absolute;
  background: #ffffff;
  border-radius: 2.5rem;
  box-shadow: 13px 11px 22px 0px #1f1f1f;
  backdrop-filter: blur(30px);
  width: 37.8125rem;
  height: 21.9375rem;
  margin-top: 32rem;
  padding: 5rem;
}

div#splash-text>p {
  color: #313b49;
  font-size: 1.125rem;
}

#splash-text-headnote {
  color: #ff6454;
  font-family: Noto Sans Display;
  font-size: 1.125rem;
  font-weight: 500;
}

#splash-text-header {
  color: #383838;
  font-family: 'Noto Sans';
  font-size: 3rem;
  font-weight: 500;
}

img#dots {
  position: absolute;
  margin-top: 50.5rem;
  margin-left: 41rem;
}

.name {
  color: #070707;
  font-family: 'Noto Sans';
  font-size: 1.8125rem;
  font-weight: normal;
  margin: 1rem;
}

.url {
  color: #313b49;
  font-family: 'Noto Sans Display';
  font-size: 1.3125rem;
  text-decoration-line: underline;
  margin: 1rem;
}

.description {
  color: #313b49;
  font-family: 'Noto Sans Display';
  font-size: 1.3125rem;
  margin-left: 13.625rem;
  margin-bottom: 2rem;
  width: 56rem;
}

.logo {
  max-width: 10.625rem;
  max-height: 9.9375rem;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10.625rem;
  height: 9.9375rem;
  margin: 1rem;
}
</style>