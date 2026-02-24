import "./event.scss";

import "@widgets/title/title.js";
import "@widgets/event-hero/event.js";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = document.querySelector(".event_page__slider .swiper");
  const prevBtn = document.querySelector(".event_page__nav--prev");
  const nextBtn = document.querySelector(".event_page__nav--next");
  const swiperEvent = new Swiper(swiper, {
    modules: [Navigation],
    slidesPerView: "auto",
    spaceBetween: 40,
    loop: false,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
  });
});
