<template>
  <div class="background">
    <h1>
      Breaking Boundaries<br />
      and Transforming<br />
      Futures
    </h1>
    <p>
      Amplifying the stories and impact of Black women in STEM<br />
      through data, insights, and advocacy
    </p>
    <button>Visit the Data Dashboard</button>
    <div id="splash-graphics">
      <img src="/splash.png" alt="" id="splash-image" />
      <img src="/swiggly_red_FF6454.svg" alt="" id="swiggly-red" />
      <div id="plusses">
        <img src="/plus_icon_1.svg" alt="" class="plus-icon" id="plus-icon-1" />
        <img src="/plus_icon_2.svg" alt="" class="plus-icon" id="plus-icon-2" />
        <img src="/plus_icon_3.svg" alt="" class="plus-icon" id="plus-icon-3" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/homepage.css";

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
</style>