import "./relax_page_hero.scss";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".relax_page_hero__scroll")) {
    document.querySelector(".relax_page_hero__scroll").addEventListener("click", function () {
      const paSection = document.querySelector(".relax_page_gallery");
      if (paSection) {
        paSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }
});
