<script setup lang="ts">
import Reads from '@/components/resources/Reads.vue'
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute();

watch(route, () => { 
  thisBook = books[parseInt(route.params.id)]
})

const books = [
  {
    title: "The Disordered Cosmos: A Journey into Dark Matter, Spacetime, & Dreams Deferred",
    description: "From a star theoretical physicist, a journey into the world of particle physics and the cosmos—and a call for a more liberatory practice of science."
    + "<br><br> Winner of the 2021 Los Angeles Times Book Prize in Science & Technology; Winner of the 2022 Phi Beta Kappa Book Award in Science; Winner of the 2022 PEN Oakland Josephine Miles Award; A Finalist for the 2022 PEN/E.O. Wilson Literary Science Writing Award; A Smithsonian Magazine Best Science Book of 2021; A Symmetry Magazine Top 10 Physics Book of 2021; An Entropy Magazine Best Nonfiction Book of 2020-2021; A Publishers Weekly Best Nonfiction Book of the Year; A Kirkus Reviews Best Nonfiction Book of 2021; A Booklist Top 10 Sci-Tech Book of the Year"
    + "<br><br> In The Disordered Cosmos, Dr. Chanda Prescod-Weinstein shares her love for physics, from the Standard Model of Particle Physics and what lies beyond it, to the physics of melanin in skin, to the latest theories of dark matter—along with a perspective informed by history, politics, and the wisdom of Star Trek."
    + "<br><br> One of the leading physicists of her generation, Dr. Chanda Prescod-Weinstein is also one of fewer than one hundred Black American women to earn a PhD from a department of physics. Her vision of the cosmos is vibrant, buoyantly nontraditional, and grounded in Black and queer feminist lineages."
    + "<br><br> Dr. Prescod-Weinstein urges us to recognize how science, like most fields, is rife with racism, misogyny, and other forms of oppression. She lays out a bold new approach to science and society, beginning with the belief that we all have a fundamental right to know and love the night sky. The Disordered Cosmos dreams into existence a world that allows everyone to experience and understand the wonders of the universe.",
    imgSrc: "/books/book_01.png",
    link: "https://a.co/d/evnDzRs"
  },
  { 
    title: "The Genius of Women: From Overlooked to Changing the World",   
    description: "We tell girls that they can be anything, so why do 90 percent of Americans believe that geniuses are almost always men? "
    + "<br><br> New York Times bestselling journalist and creator and host of the podcast The Gratitude Diaries Janice Kaplan explores the powerful forces that have rigged the system—and celebrates the women geniuses, past and present, who have triumphed anyway."
    + "<br><br> Even in this time of rethinking women’s roles, we define genius almost exclusively through male achievement. When asked to name a genius, people mention Albert Einstein, Leonardo da Vinci, and Steve Jobs. As for great women? In one survey, the only female genius anyone listed was Marie Curie. Janice Kaplan, the New York Times bestselling author of The Gratitude Diaries, set out to determine why the extraordinary work of so many women has been brushed aside."
    + "<br><br> Using her unique mix of memoir, narrative, and inspiration, she makes surprising discoveries about women geniuses now and throughout history, in fields from music to robotics. Through interviews with neuroscientists, psychologists, and dozens of women geniuses at work in the world today—including Nobel Prize winner Frances Arnold and AI expert Fei-Fei Li—she proves that genius isn't just about talent."
    + "<br><br> It's about having that talent recognized, nurtured, and celebrated. Across the generations, even when they face less-than-perfect circumstances, women geniuses have created brilliant and original work. In The Genius of Women, you’ll learn how they ignored obstacles and broke down seemingly unshakable barriers."
    + "<br><br> The geniuses in this moving, powerful, and very entertaining book provide more than inspiration—they offer a clear blueprint to everyone who wants to find her own path and move forward with passion.",
    imgSrc: "/books/book_02.png",
    link: "https://a.co/d/2J3KXZw"
  },
  {
    title: "Atomic Women: The Untold Stories of the Scientists Who Helped Create the Nuclear Bomb",   
    description: "Bomb meets Code Girls in this nonfiction narrative about the little-known female scientists who were critical to the invention of the atomic bomb during World War II."
    + "<br><br> They were leaning over the edge of the unknown and afraid of what they would discover there—meet the World War II female scientists who worked in the secret sites of the Manhattan Project. Recruited not only from labs and universities from across the United States but also from countries abroad, these scientists helped in—and often initiated—the development of the atomic bomb, taking starring roles in the Manhattan Project. In fact, their involvement was critical to its success, though many of them were not fully aware of the consequences. The atomic women include:"
    + "<br><ul>  Lise Meitner and Irène Joliot-Curie (daughter of Marie Curie), who laid the groundwork for the Manhattan Project from Europe</ul><ul>Elizabeth Rona, the foremost expert in plutonium, who gave rise to the \"Fat Man\" and \"Little Boy,\" the bombs dropped over Japan</ul><ul>Leona Woods, Elizabeth Graves, and Joan Hinton, who were inspired by European scientific ideals but carved their own paths.</ul>"
    + "<br><br> This book explores not just the critical steps toward the creation of a successful nuclear bomb, but also the moral implications of such an invention.",
    imgSrc: "/books/book_03.png",
    link: "https://a.co/d/cA7noAv"
  },
  {
    title: "A Portrait of the Scientist as a Young Woman: A Memoir",   
    description: "From one of the world’s leading planetary scientists, a luminous memoir of exploration on Earth, in space, and within oneself—equal parts ode to the beauty of science, meditation on loss, and roadmap for personal resilience."
    + "<br><ul>\"Fierce, absorbing, and ultimately inspiring.\" —ELIZABETH KOLBERT</ul><ul>\"[A] riveting book, beautifully written.\" —Washington Post</ul> <ul>Named a Best Book of the Year by Christian Science Monitor and Science News.</ul>"
    + "<br><br> Deep in the asteroid belt between Mars and Jupiter, three times farther from the sun than the Earth is, orbits a massive asteroid called (16) Psyche. It is one of the largest objects in the belt, potentially containing the equivalent of the world’s total economy in metals, though they cannot be brought back to Earth."
    + "<br><br>  But (16) Psyche has the potential to unlock something even more valuable: the story of how planets form, and how our planet formed. Soon we will find out, thanks to the extraordinary work of Lindy Elkins-Tanton, the Principal Investigator of NASA’s $800 million Psyche mission, and the second woman ever to be awarded a major NASA space exploration contract. The journey that brought her to this place is extraordinary. Amid a childhood of terrible trauma, Elkins-Tanton fell in love with science as a means of healing and consolation."
    + "<br><br> But still she wondered, was forced to wonder: as a woman, was science “for her”? In answering that question, she takes us from the wilds of the Siberian tundra to the furthest reaches of outer space, from the Mayo Clinic, where Elkins-Tanton battled ovarian cancer while writing the Psyche proposal, to NASA’s Jet Propulsion Laboratory, where her team brought that proposal to life. A Portrait of the Scientist as a Young Woman is a beautifully-constructed memoir that explores how a philosophy of life can be built from the tools of scientific inquiry. It teaches us how to approach difficult problems by asking the right questions and truly listening to the answers—and how we may find meaning through exploring the wonders of the universe around us.",
    imgSrc: "/books/book_04.png",
    link: "https://a.co/d/2jzPlnp"
  },
  {
    title: "Black Fortunes: The Story of the First Six African Americans Who Escaped Slavery and Became Millionaires",   
    description: "One of Ebony Magazine's True Read picks of 2018. “By telling the little-known stories of six pioneering African American entrepreneurs, Black Fortunes makes a worthy contribution to black history, to business history, and to American history.”—Margot Lee Shetterly, Author of the New York Times Bestseller Hidden Figures"
    + "<br><br> The astonishing untold history of America’s first black millionaires—former slaves who endured incredible challenges to amass and maintain their wealth for a century, from the Jacksonian period to the Roaring Twenties—self-made entrepreneurs whose unknown success mirrored that of American business heroes such as Henry Ford, John D. Rockefeller, and Thomas Edison."
    + "<br><br> While Oprah Winfrey, Jay-Z, Beyoncé, Michael Jordan, and Will Smith are among the estimated 35,000 black millionaires in the nation today, these famous celebrities were not the first blacks to reach the storied one percent. Between the years of 1830 and 1927, as the last generation of blacks born into slavery was reaching maturity, a small group of smart, tenacious, and daring men and women broke new ground to attain the highest levels of financial success."
    + "<br><br> Black Fortunes is an intriguing look at these remarkable individuals, including Napoleon Bonaparte Drew—author Shomari Wills’ great-great-great-grandfather—the first black man in Powhatan County (contemporary Richmond) to own property in post-Civil War Virginia. His achievements were matched by five other unknown black entrepreneurs including:"
    + "<br><ul> Mary Ellen Pleasant, who used her Gold Rush wealth to further the cause of abolitionist John Brown</ul><ul>Robert Reed Church, who became the largest landowner in Tennessee</ul><ul>Hannah Elias, the mistress of a New York City millionaire, who used the land her lover gave her to build an empire in Harlem</ul><ul>Orphan and self-taught chemist Annie Turnbo-Malone, who developed the first national brand of hair care products</ul><ul>Madam C. J Walker, Turnbo-Malone’s employee who would earn the nickname America’s \"first female black millionaire\"</ul><ul>Mississippi school teacher O. W. Gurley, who developed a piece of Tulsa, Oklahoma, into a \"town\" for wealthy black professionals and craftsmen\" that would become known as \"the Black Wall Street.\"</ul>"
    + "<br><br>  A fresh, little-known chapter in the nation’s story—A blend of Hidden Figures, Titan, and The Tycoons—Black Fortunes illuminates the birth of the black business titan and the emergence of the black marketplace in America as never before.",
    imgSrc: "/books/book_05.png",
    link: "https://a.co/d/9BFQnOE"
  },
  {
    title: "The Black Experience in Design: Identity, Expression & Reflection",
    description: "The Black Experience in Design spotlights teaching practices, research, stories, and conversations from a Black/African diasporic lens." +
     " <br><br> Excluded from traditional design history and educational canons that heavily favor European modernist influences, the work and experiences of Black designers have been systematically overlooked in the profession for decades. However, given the national focus on diversity, equity, and inclusion in the aftermath of the nationwide Black Lives Matter protests in the United States, educators, practitioners, and students now have the opportunity—as well as the social and political momentum—to make long-term, systemic changes in design education, research, and practice, reclaiming the contributions of Black designers in the process." +
     " <br><br> The Black Experience in Design, an anthology centering a range of perspectives, spotlights teaching practices, research, stories, and conversations from a Black/African diasporic lens." +
     " <br><br> Through the voices represented, this text exemplifies the inherently collaborative and multidisciplinary nature of design, providing access to ideas and topics for a variety of audiences, meeting people as they are and wherever they are in their knowledge about design." +
     " <br><br> Ultimately, The Black Experience in Design serves as both inspiration and a catalyst for the next generation of creative minds tasked with imagining, shaping, and designing our future.", 
    imgSrc: "/books/book_06.jpg",
    link: "https://a.co/d/6Nda2Ty"
  },
]

let thisBook = books[route.params.id];

</script>

<template>
  <div class="view">
    <router-link id="back-button" class="material-symbols-rounded" :to="{ name: 'resources' }">chevron_left</router-link>
    <div class="side-by-side">
      <div>
        <img class="profile-img" :src="thisBook.imgSrc" />
        <div class="quote">
          {{ thisBook.title }}
        </div>
        <a :href="thisBook.link"><button>Purchase on Amazon</button></a>
      </div>
      <div>
        <h3>About the book</h3>
        <p><span v-html="thisBook.description"></span></p>
      </div>
    </div>
  </div>
  <Reads></Reads>
</template>

<style scoped>
#back-button {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 3rem;
}

.side-by-side {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.quote {
  width: 25rem;
  color: #acf0ff;
  font-family: 'Noto Sans';
  font-size: 2.5rem;
  font-weight: 500;
  margin: 1rem 0;
}

.question-header {
  width: 25rem;
  color: #acf0ff;
  font-family: 'Noto Sans Mono';
  font-size: 1.5rem;
  font-weight: 500;
  margin: 1rem 0;
}

img.profile-img {
  width: 20.00731rem;
  height: 27.58925rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: url(<path-to-image>), lightgray -1.923px 1.21px / 98.159% 99.792% no-repeat;
}

.social-media-icons img {
  margin: 1rem;
  cursor: pointer;
}
</style>
