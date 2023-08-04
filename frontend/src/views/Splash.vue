<template>
  <div id="splash">
    <h1>
      Breaking Boundaries<br />
      and Transforming<br />
      Futures
    </h1>
    <h2>
      Amplifying the stories and impact of Black women in STEM<br />
      through data, insights, and advocacy
    </h2>
    <button>Visit the Data Dashboard</button>
    <div id="splash-graphics">
      <img src="public/splash.png" alt="" id="splash-image" />
      <img src="public/swiggly_red_FF6454.svg" alt="" id="swiggly-red" />
      <div id="plusses">
        <img src="public/plus_icon_1.svg" alt="" class="plus-icon" id="plus-icon-1" />
        <img src="public/plus_icon_2.svg" alt="" class="plus-icon" id="plus-icon-2" />
        <img src="public/plus_icon_3.svg" alt="" class="plus-icon" id="plus-icon-3" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#splash {
  background-color: #22262B;
  padding: 2rem 3rem;
}

#splash-graphics {
  position: absolute;
  top: 20rem;
  left: 70%;
}

#splash-image {
  position: absolute;
  width: 24rem;
}

#swiggly-red {
  position: absolute;
  top: 5rem;
  left: -7rem;
  width: 14rem;
}

#plusses {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.plus-icon {
  position: absolute;
  width: 1.5rem;
}

#plus-icon-2 {
  left: 19rem;
}

#plus-icon-3 {
  top: 19rem;
}

h1 {
  color: #acf0ff;
  font-family: 'Noto Sans Mono';
  font-size: 80px;
  font-weight: 500;
  line-height: 88px;
  /* 110% */
  letter-spacing: -1px;
  margin-top: 0;
}

h2 {
  color: #FFFFFF;
  font-family: 'DM Sans';
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 4rem;
}

button {
  background: #4fdfff;
  border: 0.5px solid #3a3a3a;
  border-radius: 5px;
  color: #000000;
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
}
</style>