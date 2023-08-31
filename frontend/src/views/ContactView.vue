<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="grid-container">
    <div id="backdrop"></div>
    <div id="curtain">
      <div class="ornament">
         <img src="/dots.svg" alt="dots-ornament" id="dots"/>
      </div>
        Questions or Comments?
        Email us at <div class="email">email@spelman.edu</div>
        <br><br>
        <span class="contact-text">
          <span class="material-symbols-rounded">pin_drop</span>
          <br>
          Lorem ipsum dolor sit
          amet, consectuer
          adipiscing elit, sed do
          eiusmod
          <br><br>
          <span class="material-icons" >call</span>
          <br>
          (222) 222-2222
     </span>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');

.white-background {
  background: #FFF;
  width: 44.98269rem;
  height: 55.98488rem;
  flex-shrink: 0;
  margin-left: 45rem;
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
 }

.ornament {
  position: absolute;
  top: 10.5rem;
  left: 44.0rem;

  width: 15.15381rem;
  height: 15.15381rem;
  flex-shrink: 0;
 }

.contact-text {
  color: #000;
  font-family: IBM Plex Mono, monospace;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 125% */
}
.contact-text .material-symbols-rounded{
  margin-left:0
}
</style>
