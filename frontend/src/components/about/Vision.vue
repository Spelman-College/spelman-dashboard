<template>
  <div id="outer">
    <img id="stripes" src="/stripes.svg" />
    <img id="splash-image" src="/AdobeStock_571805352.jpeg" style="object-position: left top" />
    <div id="splash-text">
      <div id="splash-text-header">Our Vision</div>
      <div id="splash-text-body">An international [platform] [showcasing] Black Women in STEM</div>
      <div id="swiggle-vision-card"><img src="/swiggly_line_ACF0FF.svg" /></div>
    </div>
  </div>
</template>

<style scoped>
img {
  position: absolute;
}

div#outer {
  display: flex;
}

div#splash-text {
  background: linear-gradient(180deg, #28d6ff 0%, #0094ff 100%);
  border-radius: 2.5rem 0rem 0rem 2.5rem;
  box-shadow: 13px 11px 22px 0px #1f1f1f;
  backdrop-filter: blur(30px);
  width: 41.4375rem;
  height: 41.4375rem;
  margin-top: 9.44rem;
  margin-left: 0.55rem;

  padding: 4rem;
}

/* TODO */
div#image-grid {
  margin-top: 3rem;
  margin-bottom: 26rem;
}

#splash-text-body {
  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  font-family: Noto Sans;
  font-size: 3.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

#splash-text-header {
  color: #22262b;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  font-family: Noto Sans;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.75rem; /* 200% */
  margin-top: 4.75rem;
  margin-bottom: 2.12rem;
}

img#splash-image {
  width: 41.4375rem;
  height: 41.4375rem;
  object-fit: cover;
  border-radius: 0rem 2.5rem 2.5rem 0rem;
  box-shadow: 13px 11px 22px 0px rgba(31, 31, 31, 0.5);
  margin-left: 41.94rem;
  margin-top: 9.44rem;
}

img#stripes {
  margin-top: 7.81rem;
  margin-left: 75.26rem;
}

#swiggle-vision-card {
  margin-left: 7.23rem;
}

#building-vision-header {
  color: #fff;
  text-align: center;
  font-family: Google Sans;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.75rem; /* 200% */
  margin-top: 17.31rem;
}

#square-photo-card {
  width: 26.375rem;
  height: 26.375rem;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  object-fit: cover;
}
</style>
