import "./event.scss";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

let swiperInstance = null;
const BP = 1360;

function updateEventSlider() {
  const root = document.querySelector(".event");
  const swiperEl = document.querySelector(".event__right");
  const prevBtn = document.querySelector(".event__nav--prev");
  const nextBtn = document.querySelector(".event__nav--next");
  if (!root || !swiperEl) return;

  const isMobile = window.innerWidth < BP;

  if (isMobile) {
    root.classList.add("event--slider");

    if (!swiperInstance) {
      swiperInstance = new Swiper(swiperEl, {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: false,
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn,
        },
      });
    }
  } else {
    root.classList.remove("event--slider");

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    // На всякий випадок прибираємо inline стилі, які Swiper міг лишити
    swiperEl.removeAttribute("style");
    const wrapper = swiperEl.querySelector(".swiper-wrapper");
    if (wrapper) wrapper.removeAttribute("style");
    swiperEl.querySelectorAll(".swiper-slide").forEach((s) => s.removeAttribute("style"));
  }
}

document.addEventListener("DOMContentLoaded", updateEventSlider);

let t;
window.addEventListener("resize", () => {
  clearTimeout(t);
  t = setTimeout(updateEventSlider, 150);
});
