<template>
  <div id="outer">
    <img id="dots" src="/dots.svg" />
    <img id="stripes" src="/stripes.svg" />
    <img id="splash-image" src="/gettyimages-1405307215-1024x1024.jpg" />
    <div id="splash-text">
      <div id="splash-text-headnote">Black Women in STEM</div>
      <div id="splash-text-header">Changemaking organizations</div>
      <p>Spotlighting organizations dedicated to the advancement of Black women in STEM. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Cras at volutpat dolor, et euismod dolor. Vivamus quis iaculis neque. Interdum et
        malesuada fames ac ante ipsum primis in faucibus.<br /><br />

        Pellentesque ligula dui, mattis sit amet suscipit vitae, viverra quis eros. Proin elementum diam in dolor
        ullamcorper auctor.</p>
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
  width: 37.8125rem;
  height: 21.9375rem;
  margin-top: 10.625rem;
  margin-left: 35.5625rem;
  padding: 5rem;
}

div#splash-text>p {
  color: #313b49;
  font-size: 1.125rem;
}

#splash-text-headnote {
  color: #FF6454;
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