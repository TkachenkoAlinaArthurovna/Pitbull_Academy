import "./tccc.scss";

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".tccc-media video");
  const btn = document.querySelector(".tccc__sound");

  btn.addEventListener("click", () => {
    video.muted = !video.muted;
  });
});
