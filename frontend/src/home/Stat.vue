<template>
  <h2>Learn about the impact</h2>
  <div id="outer-stat">
    <div id="percent">
      <span class="big-percent">2.9</span>
      <span class="big-percent">%</span>
      <div id="percent-blurb">
        In 2021, only 2.9% of the STEM workforce in the United States are Black women.
      </div>
      <div id="squiggle"><img src="/swiggly_line_ACF0FF.svg" /></div>
      <p id="footnote">
        Explore the commitment to increasing representation, improving access to resources and
        strengthening community partnerships.
      </p>
    </div>
    <div id="bullet-points">
      <div class="bullet-point">
        <span class="material-icons circle">diversity_2</span>
        <p>
          Increasing representation and <br />
          visibility
        </p>
      </div>
      <div class="bullet-point">
        <span class="material-icons circle">published_with_changes</span>
        <p>
          Improving access to resources and <br />
          opportunities
        </p>
      </div>
      <div class="bullet-point">
        <span class="material-icons circle">rocket_launch</span>
        <p>
          Strengthening community<br />
          partnerships
        </p>
      </div>
      <div class="bullet-point">
        <span class="material-icons link">link</span>
        <p>
          <a
            id="source"
            href="https://ncses.nsf.gov/pubs/nsf23315/report/science-and-engineering-degrees-earned"
            >Source: NSF Science and Engineering Degrees Earned Report</a
          >
        </p>
      </div>
    </div>
  </div>
  <div id="link">
    <a href="">Learn more <span class="material-symbols-rounded">arrow_right_alt</span></a>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&family=Open+Sans&display=swap');

#link a {
  color: #4fdfff;
}

#outer-stat {
  display: flex;
  /* Adjust here depending on final layout */
  justify-content: space-between;
  gap: 2rem;
}

#percent-blurb {
  margin-bottom: 0;
  font-family: 'Noto Sans Mono';
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  max-width: 750px;
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
  margin-right: 4rem;
}

.bullet-point {
  display: flex;
  align-items: center;
  margin: 4rem 0;
}

.bullet-point p {
  margin: 0 0 0 2em;
  font-size: 1.6875rem;
  width: auto;
}

.bullet-point span {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bullet-point span.circle {
  display: flex;
  flex-shrink: 0;
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

#link .material-symbols-rounded {
  width: 1.5rem;
  height: 1.5rem;
  /* flex-shrink: 0; */
  color: #4fdfff;
  margin-left: 0.81rem;
  vertical-align: middle;
}

#source {
  font-size: 1rem;
  text-decoration: underline;
  color: #ffffff;
  display: flex;
  max-width: 400px;
}
</style>
