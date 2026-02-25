import "./header.scss";

import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const menuBtn = document.getElementById("menuBtn");
  const menu = document.querySelector(".menu");
  const headerContainer = document.querySelector(".header__container");
  const body = document.body;

  let isMenuOpen = false;

  function openMenu() {
    if (isMenuOpen) return;
    isMenuOpen = true;

    menuBtn.classList.add("active");
    menu.classList.add("active");
    headerContainer.classList.add("active");
    body.classList.add("menu-lock");
  }

  function closeMenu() {
    if (!isMenuOpen) return;
    isMenuOpen = false;

    menuBtn.classList.remove("active");
    menu.classList.remove("active");
    headerContainer.classList.remove("active");
    body.classList.remove("menu-lock");
  }

  menuBtn.addEventListener("click", () => {
    isMenuOpen ? closeMenu() : openMenu();
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  const header = document.querySelector(".header");

  const smoothScrollTo = (id) => {
    const section = document.querySelector(id);
    if (!section) return;

    const offset =
      section.getBoundingClientRect().top + window.pageYOffset - (header?.offsetHeight || 0) - 200;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  const handleSmartAnchor = (selector, id) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.addEventListener("click", (e) => {
        const isHome = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

        if (isHome) {
          e.preventDefault();
          smoothScrollTo(id);
          closeMenu();
        }
        // якщо не home → просто перехід на /#id
      });
    });
  };

  // 🔥 підключаємо
  handleSmartAnchor('a[href="/#pavlo"]', "#pavlo");
  handleSmartAnchor('a[href="/#partners"]', "#partners");
  handleSmartAnchor('a[href="#contacts"]', "#contacts"); // якщо контакти на всіх сторінках

  // document.querySelectorAll(".menu-card").forEach((card) => {
  //   const icon = card.querySelector(".menu-card__icon");
  //   const rotate = card.dataset.rotate || getComputedStyle(card).getPropertyValue("--rotate");

  //   gsap.set(icon, { transformOrigin: "50% 50%" });

  //   card.addEventListener("mouseenter", () => {
  //     gsap.killTweensOf(card);
  //     gsap.to(card, {
  //       y: -20,
  //       rotate: rotate,
  //       duration: 0.8,
  //       ease: "elastic.out(1, 0.35)",
  //     });
  //     gsap.to(icon, {
  //       scale: 1.1,
  //       duration: 0.2,
  //       ease: "power3.out",
  //       overwrite: "auto",
  //     });
  //   });

  //   card.addEventListener("mouseleave", () => {
  //     gsap.killTweensOf(card);
  //     gsap.to(card, {
  //       y: 0,
  //       rotate: rotate,
  //       duration: 0.6,
  //       ease: "elastic.out(1, 0.35)",
  //     });
  //     gsap.to(icon, {
  //       scale: 1,
  //       duration: 0.15,
  //       ease: "power3.out",
  //       overwrite: "auto",
  //     });
  //   });
  // });
  document.querySelectorAll(".menu-card").forEach((card) => {
    const icon = card.querySelector(".menu-card__icon");
    const svg = card.querySelector(".menu-card__icon svg");
    const use = card.querySelector(".menu-card__icon use");
    const rotate = (
      card.dataset.rotate ||
      getComputedStyle(card).getPropertyValue("--rotate") ||
      "0deg"
    ).trim();

    // корисно для SVG/іконок
    gsap.set(icon, { transformOrigin: "50% 50%" });

    card.addEventListener("mouseenter", () => {
      gsap.killTweensOf([card, icon, svg, use]); // ✅ вбили і картку, і іконку

      gsap.to(card, {
        y: -20,
        rotate,
        duration: 0.8,
        ease: "elastic.out(1, 0.35)",
        overwrite: "auto",
      });

      gsap.to(icon, {
        scale: 1.1,
        duration: 0.2,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(svg, { color: "#000", duration: 0.2, ease: "power3.out", overwrite: "auto" });
    });

    card.addEventListener("mouseleave", () => {
      gsap.killTweensOf([card, icon, svg, use]);

      gsap.to(card, {
        y: 0,
        rotate,
        duration: 0.6,
        ease: "elastic.out(1, 0.35)",
        overwrite: "auto",
      });

      gsap.to(icon, {
        scale: 1,
        duration: 0.15,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(svg, { color: "#A89968", duration: 0.2, ease: "power3.out", overwrite: "auto" });
    });
  });
});
