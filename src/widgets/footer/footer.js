import "./footer.scss";
import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    repeat: -1,
    repeatDelay: 0, // можна поставити 0.2 якщо треба пауза
  });

  // старт: на початку видимий (або зробимо fade in нижче)
  gsap.set("#carMove", { x: 0, y: 0 });
  gsap.set("#car", { rotate: 0, transformOrigin: "center center" });
  gsap.set(["#carMove", "#car"], { autoAlpha: 0 }); // спочатку схований

  tl
    // плавно з’явився
    .to(["#carMove", "#car"], { autoAlpha: 1, duration: 0.4, ease: "power1.out" })

    // твій рух
    .to("#carMove", { x: -650, y: 75, duration: 4 })
    .to("#car", { rotate: -120, duration: 0.5 })
    .to("#carMove", { x: -640, y: 100, duration: 0.5 })
    .to("#car", { rotate: -90, duration: 0.5 })
    .to("#carMove", { x: -640, y: 150, duration: 0.5 })
    .to("#car", { rotate: -160, duration: 0.5 })
    .to("#carMove", { x: -620, y: 160, duration: 0.5 })

    // плавно зник в кінці
    .to(["#carMove", "#car"], { autoAlpha: 0, duration: 0.35, ease: "power1.in" })

    // миттєво повернувся на старт (невидимий) — щоб не було “стрибка”
    .set("#carMove", { x: 0, y: 0 })
    .set("#car", { rotate: 0, transformOrigin: "center center" });

  const goUpButton = document.querySelector(".footer__button_up");

  if (goUpButton) {
    goUpButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
