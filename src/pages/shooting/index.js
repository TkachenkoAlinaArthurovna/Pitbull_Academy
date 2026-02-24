import "./shooting.scss";

import "@widgets/title/title.js";
import "@widgets/show_prices/show_prices.js";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = document.querySelector(".shooting_gallery .swiper");
  const prevBtn = document.querySelector(".shooting_gallery__nav--prev");
  const nextBtn = document.querySelector(".shooting_gallery__nav--next");
  const swiperRelaxGallery = new Swiper(swiper, {
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
