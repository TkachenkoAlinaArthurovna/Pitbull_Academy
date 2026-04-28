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
});
