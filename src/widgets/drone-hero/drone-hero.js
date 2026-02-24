import "./drone-hero.scss";

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".drone-hero__video");
  const btn = document.querySelector(".drone-hero__sound");

  btn.addEventListener("click", () => {
    video.muted = !video.muted;
  });
});
