import "./shop-hero.scss";

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".shop-hero__media video");
  const btn = document.querySelector(".shop-hero__sound");

  btn.addEventListener("click", () => {
    video.muted = !video.muted;
  });
});
