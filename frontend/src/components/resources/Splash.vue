<template>
  <div id="outer">
    <img id="dots" src="/dots.svg" />
    <img id="stripes" src="/stripes.svg" />
    <img id="splash-image" src="/AdobeStock_498725277.jpeg" />
    <div id="splash-text">
      <div id="splash-text-headnote">Black Women in STEM</div>
      <div id="splash-text-header">Empowering Black Women in STEM: Your Resource Hub</div>
      <div id="splash-text-body">
        Welcome to our Resource Page of [Name]!<br /><br />

        We are thrilled to present this collection of resources dedicated to empowering and
        celebrating the achievements of Black women in the fields of Science, Technology,
        Engineering, and Mathematics (STEM).<br /><br />

        Our mission is to provide a platform that showcases the remarkable contributions, stories,
        and accomplishments of Black women in STEM.
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  position: absolute;
}

div#outer {
  height: 40rem;
}

div#splash-text {
  position: absolute;
  background: #ffffff;
  border-radius: 2.5rem;
  box-shadow: 13px 11px 22px 0px #1f1f1f;
  backdrop-filter: blur(30px);
  width: 47.8125rem;
  height: 31.9375rem;
  margin-top: 10.625rem;
  margin-left: 35.5625rem;
  padding: 4rem;
}

#splash-text-body {
  color: #313b49;
  font-family: 'Noto Sans';
  font-size: 1.125rem;
  width: 37rem;
  margin-top: 1rem;
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

img#splash-image {
  width: 47.4375rem;
  border-radius: 2.5rem;
  margin-left: 0.5rem;
  margin-top: 2rem;
}

img#dots {
  margin-left: 43rem;
}

img#stripes {
  margin-top: 26rem;
  margin-left: 28.75rem;
}
</style>
