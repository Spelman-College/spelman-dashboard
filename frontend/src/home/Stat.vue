<template>
  <h2>Learn about the impact</h2>
  <div id="outer">
    <div id="percent">
      <span class="big-percent">2.9</span>
      <span class="big-percent">%</span>
      <div id="percent-blurb">In 2021, only 2.9% of the STEM<br> workforce in the
        United States<br> are Black women.</div>
      <div id="squiggle"><img src="/swiggly_line_ACF0FF.svg" /></div>
      <p id="footnote">
        Explore the commitment to increasing<br />
        representation, improving access to<br />
        resources and strengthening<br />
        community partnerships.</p>
    </div>
    <div id="bullet-points">
      <div class="bullet-point">
        <span class="material-icons circle">diversity_2</span>
        <p>Increasing representation and <br />
          visibility</p>
      </div>
      <div class="bullet-point">
        <span class="material-icons circle">published_with_changes</span>
        <p>Improving access to resources and <br />
          opportunities</p>
      </div>
      <div class="bullet-point">
        <span class="material-icons circle">rocket_launch</span>
        <p>Strengthening community<br />
          partnerships</p>
      </div>
      <div class="bullet-point">
        <span class="material-icons link">link</span>
        <p><a id="source" href="https://ncses.nsf.gov/pubs/nsf23315/report/science-and-engineering-degrees-earned">Source:
            NSF Science
            and Engineering Degrees Earned Report</a></p>
      </div>
    </div>
  </div>
  <a href="">Learn more &rarr;</a>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&family=Open+Sans&display=swap');

#outer {
  display: flex;
}

#percent-blurb {
  margin-bottom: 0;
  font-family: 'Noto Sans Mono';
  color: #FFF;
  text-align: center;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

#squiggle {
  margin: 4rem 0;
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
  margin-top: 0;
}

#bullet-points {
  margin: 0 4rem;
}

.bullet-point {
  display: flex;
  align-items: center;
  margin: 4rem 0;
}

.bullet-point p {
  margin: 0 0 0 2em;
  font-size: 1.6875rem;
}

.bullet-point span {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bullet-point span.circle {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #4fdfff;
  font-size: 2rem;
}

.bullet-point span.link {
  width: 4rem;
  height: 4rem;
  font-size: 3rem;
  color: #ffffff;
}

#source {
  font-size: 1rem;
  color: #ffffff;
}
</style>