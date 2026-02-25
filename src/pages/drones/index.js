import "./drones.scss";

import "@widgets/drones_page_hero/drones_page_hero.js";
import "@widgets/show_prices/show_prices.js";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".drones_slogan",
      start: "top bottom", // top елемента = низ екрану
      end: "top top", // top елемента = top екрану
      scrub: true, // плавна прив’язка до скролу
    },
  });

  // word 1
  tl.fromTo(".word_1", { left: "0" }, { left: "5vw", ease: "none" }, 0);

  // word 2
  tl.fromTo(".word_2", { left: "5vw" }, { left: "0", ease: "none" }, 0);

  // word 3
  tl.fromTo(".word_3", { right: "5vw" }, { right: "0", ease: "none" }, 0);

  // word 4
  tl.fromTo(".word_4", { right: "0" }, { right: "5vw", ease: "none" }, 0);

  const swiper = document.querySelector(".drones_gallery .swiper");
  const prevBtn = document.querySelector(".drones_gallery__nav--prev");
  const nextBtn = document.querySelector(".drones_gallery__nav--next");
  const swiperDronesGallery = new Swiper(swiper, {
    modules: [Navigation],
    slidesPerView: "auto",
    spaceBetween: 40,
    loop: false,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
  });

  if (document.querySelector(".drones_page_hero__scroll")) {
    document.querySelector(".drones_page_hero__scroll").addEventListener("click", function () {
      const nextSection = document.querySelector(".drones_benefits");
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }

  const video1 = document.querySelector(".drones_page_hero__bg-video");
  const btn1 = document.querySelector(".drones_page_hero__sound");

  btn1.addEventListener("click", () => {
    video1.muted = !video1.muted;
  });

  const video2 = document.querySelector(".drones_videos__left video");
  const btn2 = document.querySelector(".drones_videos__left .hero__sound");

  btn2.addEventListener("click", () => {
    video2.muted = !video2.muted;
  });

  const video3 = document.querySelector(".drones_videos__right video");
  const btn3 = document.querySelector(".drones_videos__right .hero__sound");

  btn3.addEventListener("click", () => {
    video3.muted = !video3.muted;
  });
});
