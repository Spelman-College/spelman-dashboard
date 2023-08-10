<template>
  <div class="background">
    <h2>Learn about the impact</h2>
    <div id="outer">
      <div id="percent">
        <span class="big-percent">2.9</span>
        <span class="big-percent">%</span>
        <p>Explore the commitment to increasing<br />
          representation, improving access to<br />
          resources and strengthening<br />
          community partnerships.</p>
        <p id="footnote">In 2021, only 2.9% of the STEM workforce in the<br />
          US are Black women.</p>
      </div>
      <div id="bullet-points">
        <p>Increasing representation and <br />
          visibility</p>
        <p>Improving access to resources and <br />
          opportunities</p>
        <p>Strengthening community<br />
          partnerships</p>
      </div>
    </div>
  </div>
</template>

<style>
#outer {
  display: flex;
}

.big-percent {
  color: rgba(0, 0, 0, 0);
  font-family: 'Noto Sans Mono';
  font-size: 14.25rem;
  font-weight: 400;
  letter-spacing: -1.2825rem;
  -webkit-text-stroke: #4fdfff;
  -webkit-text-stroke-width: 4px;
  margin-right: 4rem;
}

#percent p {
  font-size: 1.875rem;
}

#percent #footnote {
  font-size: 1.3175rem;
}

#bullet-points p {
  font-size: 1.6875rem;
}
</style>