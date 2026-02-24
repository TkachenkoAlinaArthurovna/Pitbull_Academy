import "./hero.scss";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".hero__scroll")) {
    document.querySelector(".hero__scroll").addEventListener("click", function () {
      const paSection = document.querySelector(".pa");
      if (paSection) {
        paSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }

  const video = document.querySelector(".hero__bg-video");
  const btn = document.querySelector(".hero__sound_first");

  btn.addEventListener("click", () => {
    video.muted = !video.muted;
  });

  function openBinotel() {
    const btnWrapper = document.querySelector("#bwcrm-widget-action");
    const button = btnWrapper.querySelector("button");
    if (button) {
      button.click();
      return;
    }

    // якщо віджет ще не встиг вставити кнопку в DOM
    setTimeout(openBinotel, 300);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-btn="binotel-open"]');
    if (!btn) return;

    openBinotel();
  });
});
