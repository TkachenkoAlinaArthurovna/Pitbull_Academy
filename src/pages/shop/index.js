import "./shop.scss";

import "@widgets/title/title.js";

document.addEventListener("DOMContentLoaded", () => {
  //-------------------Pop-up info---------------------//

  const popup = document.getElementById("pop-up-info");

  if (!popup) return;

  //ВІДКРИТИ
  document.addEventListener("click", (e) => {
    if (e.target.closest("#open-pop-up-info")) {
      popup?.classList.add("active-pop-up");
      document.body.classList.add("no-scroll"); // опціонально
    }
  });

  //закриття по wrapper
  const wrapper = popup.querySelector(".pop-up-info__wrapper");

  wrapper?.addEventListener("click", () => {
    popup.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //стоп закриття при кліку всередині контенту
  const content = popup.querySelector(".pop-up-info__content");

  content?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  //закриття
  const closeBtn = popup.querySelector(".pop-up-info__close");

  closeBtn?.addEventListener("click", () => {
    popup.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //закриття
  const closeBtn2 = popup.querySelector(".pop-up-info__button");

  closeBtn2?.addEventListener("click", () => {
    popup.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //-------------------Pop-up video---------------------//

  const popupVideo = document.getElementById("pop-up-video");

  if (!popupVideo) return;

  //ВІДКРИТИ
  document.addEventListener("click", (e) => {
    if (e.target.closest("#open-pop-up-video")) {
      popupVideo?.classList.add("active-pop-up");
      document.body.classList.add("no-scroll"); // опціонально
    }
  });

  //закриття по wrapper
  const wrapperPopUpVideo = popupVideo.querySelector(".pop-up-video__wrapper");

  wrapperPopUpVideo?.addEventListener("click", () => {
    popupVideo.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //стоп закриття при кліку всередині контенту
  const contentVideo = popupVideo.querySelector(".pop-up-video__content");

  contentVideo?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  //закриття
  const closeBtnVideo = popupVideo.querySelector(".pop-up-video__close");

  closeBtnVideo?.addEventListener("click", () => {
    popupVideo.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //-------------------Pop-up product---------------------//

  const popupProduct = document.getElementById("pop-up-info-product");

  if (!popupProduct) return;

  //ВІДКРИТИ
  document.addEventListener("click", (e) => {
    if (e.target.closest("#open-pop-up-product")) {
      popupProduct?.classList.add("active-pop-up");
      document.body.classList.add("no-scroll"); // опціонально
    }
  });

  //закриття по wrapper
  const wrapperPopUpProduct = popupProduct.querySelector(".pop-up-info-product__wrapper");

  wrapperPopUpProduct?.addEventListener("click", () => {
    popupProduct.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //стоп закриття при кліку всередині контенту
  const contenProduct = popupProduct.querySelector(".pop-up-info-product__content");

  contenProduct?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  //закриття
  const closeBtnProduct = popupProduct.querySelector(".pop-up-info-product__close");

  closeBtnProduct?.addEventListener("click", () => {
    popupProduct.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //-------------------Tabs---------------------//

  const tabs = document.querySelectorAll(".tabs__item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});
