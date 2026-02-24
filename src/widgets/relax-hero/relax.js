import "./relax.scss";

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".relax__right video");
  const btn = document.querySelector(".relax__sound");

  btn.addEventListener("click", () => {
    video.muted = !video.muted;
  });
});
