import "./relax_page_gallery.scss";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = document.querySelector(".relax_page_gallery .swiper");
  const prevBtn = document.querySelector(".relax_page_gallery__nav--prev");
  const nextBtn = document.querySelector(".relax_page_gallery__nav--next");
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
