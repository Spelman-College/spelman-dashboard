<template>
  <div class="grid-container">
    <div id="backdrop"></div>
    <div id="curtain">
      Questions or Comments?
      Email us at <div class="email">email@spelman.edu</div>
    </div>
  </div>

<!-- 
  <div class="white-background"></div>
  <div class="splash">
    Questions or Comments?
    Email us at <div class="email">email@spelman.edu</div>
  </div> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&family=Open+Sans&display=swap');

.white-background {
  background: #FFF;
  width: 44.98269rem;
  height: 55.98488rem;
  flex-shrink: 0;
  margin-left: 45rem;
}

.splash {
  width: 24.74294rem;

  color: #000;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Noto Sans Mono', monospace;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.5rem; /* 166.667% */

  margin-right: 6.47rem;
}

.email {
  text-decoration-line: underline;
}

.grid-container { display: grid; }
/* 'curtain' grid item is placed over the 'backdrop' grid item */
#backdrop, #curtain { grid-area: 1/1; }

#backdrop { 
  background: #FFF;
  width: 44.98269rem;
  height: 55.98488rem;
  flex-shrink: 0;
  margin-left: 45rem;
}
 
#curtain { 
  width: 24.74294rem;

  color: #000;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Noto Sans Mono', monospace;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.5rem; /* 166.667% */

  margin-left: 58.77rem;
  margin-top: 6.56rem;
  margin-right: 6.47rem;
  margin-bottom: 44.43rem;
 }

</style>