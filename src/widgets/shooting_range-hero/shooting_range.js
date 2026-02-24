import "./shooting_range.scss";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const tlShooting = gsap.timeline({
    scrollTrigger: {
      trigger: ".shooting",
      start: "top center", // коли top секції в центрі
      end: "top top", // коли top секції на top екрана
      scrub: true, // плавна прив'язка до скролу
    },
  });

  // shot one
  tlShooting.to(
    ".shooting__shot--one",
    {
      rotate: 4,
      x: 0,
      ease: "none",
    },
    0,
  );

  // shot two
  tlShooting.to(
    ".shooting__shot--two",
    {
      rotate: -4,
      ease: "none",
    },
    0,
  );

  // shot three
  tlShooting.to(
    ".shooting__shot--three",
    {
      rotate: 4,
      x: 0,
      ease: "none",
    },
    0,
  );
});
