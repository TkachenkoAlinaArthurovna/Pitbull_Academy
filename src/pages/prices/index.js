import "./prices.scss";
import "@widgets/title/title.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".prices_page");
  if (!root) return;

  // // =========================
  // // 1) ЛІВІ ТАБИ
  // // =========================
  // const tabsList = root.querySelector(".prices_page__left ul");
  // const tabBtns = Array.from(root.querySelectorAll(".prices_page__left li[id]"));
  // const contents = Array.from(root.querySelectorAll(".prices_page__right .prices_page__content[data-id]"));

  // const setLeftActiveTab = (id) => {
  //   tabBtns.forEach((li) => li.classList.toggle("active", li.id === id));
  //   contents.forEach((block) => block.classList.toggle("active", block.dataset.id === id));
  // };

  // const startLeftId = tabBtns.find((li) => li.classList.contains("active"))?.id || tabBtns[0]?.id;

  // if (startLeftId) setLeftActiveTab(startLeftId);

  // tabsList?.addEventListener("click", (e) => {
  //   const li = e.target.closest("li[id]");
  //   if (!li) return;
  //   setLeftActiveTab(li.id);
  // });

  // =========================
  // 1) ЛІВІ ТАБИ
  // =========================
  const tabsList = root.querySelector(".prices_page__left ul");
  const tabBtns = Array.from(root.querySelectorAll(".prices_page__left li[id]"));
  const contents = Array.from(root.querySelectorAll(".prices_page__right .prices_page__content[data-id]"));

  const setLeftActiveTab = (id) => {
    tabBtns.forEach((li) => li.classList.toggle("active", li.id === id));
    contents.forEach((block) => block.classList.toggle("active", block.dataset.id === id));
  };

  // ✅ 1) читаємо tab з URL
  const params = new URLSearchParams(window.location.search);
  const tabFromUrl = params.get("tab");

  // старт: якщо в URL є валідний tab → він, інакше як було
  const startLeftId =
    (tabFromUrl && tabBtns.some((li) => li.id === tabFromUrl) && tabFromUrl) ||
    tabBtns.find((li) => li.classList.contains("active"))?.id ||
    tabBtns[0]?.id;

  if (startLeftId) setLeftActiveTab(startLeftId);

  tabsList?.addEventListener("click", (e) => {
    const li = e.target.closest("li[id]");
    if (!li) return;

    setLeftActiveTab(li.id);

    // ✅ 2) (опційно) оновлюємо URL без перезавантаження
    const url = new URL(window.location);
    url.searchParams.set("tab", li.id);
    window.history.replaceState({}, "", url);
  });

  // =========================
  // 2) ВНУТРІШНІ ТАБИ (adult/child/info) — для КОЖНОГО блоку окремо
  // =========================
  const sections = document.querySelectorAll(".prices_page__content");

  sections.forEach((section) => {
    const top = section.querySelector(".prices_page__content_top");
    const btns = Array.from(section.querySelectorAll(".prices_page__content_btn[data-id]"));
    const panes = Array.from(section.querySelectorAll(".prices_page__content_bottom [data-id]"));

    if (!top || btns.length === 0 || panes.length === 0) return;

    const setInnerTab = (key) => {
      btns.forEach((b) => b.classList.toggle("active", b.dataset.id === key));
      panes.forEach((p) => p.classList.toggle("active", p.dataset.id === key));
    };

    const startKey = btns.find((b) => b.classList.contains("active"))?.dataset.id || btns[0].dataset.id;

    setInnerTab(startKey);

    top.addEventListener("click", (e) => {
      const btn = e.target.closest(".prices_page__content_btn[data-id]");
      if (!btn) return;
      setInnerTab(btn.dataset.id);
    });
  });

  //-------------------Pop-up-asm---------------------//

  const asm = document.getElementById("pop-up-asm");
  const cls = document.getElementById("pop-up-cls");

  if (!asm || !cls) return;

  //ВІДКРИТИ
  document.addEventListener("click", (e) => {
    if (e.target.closest("#open-pop-up-asm")) {
      asm?.classList.add("active-pop-up");
      document.body.classList.add("no-scroll"); // опціонально
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("#open-pop-up-cls")) {
      cls?.classList.add("active-pop-up");
      document.body.classList.add("no-scroll"); // опціонально
    }
  });

  //закриття по wrapper
  const wrapperAsm = asm.querySelector(".pop-up-tccc__wrapper");
  const wrapperCls = cls.querySelector(".pop-up-tccc__wrapper");

  wrapperAsm?.addEventListener("click", () => {
    asm.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  wrapperCls?.addEventListener("click", () => {
    cls.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //стоп закриття при кліку всередині контенту
  const contentAsm = asm.querySelector(".pop-up-tccc__content");
  const contentCls = cls.querySelector(".pop-up-tccc__content");

  contentAsm?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  contentCls?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  //закриття
  const closeBtnAsm = asm.querySelector(".pop-up-tccc__close");
  const closeBtnCls = cls.querySelector(".pop-up-tccc__close");

  closeBtnAsm?.addEventListener("click", () => {
    console.log("test");
    asm.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  closeBtnCls?.addEventListener("click", () => {
    cls.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //Dropdowns

  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown?.querySelector(".dropdown__toggle");

    if (!dropdown || !toggle) return;

    toggle.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        dropdown.classList.remove("active");
      }
    });
  });

  const dropdownItems = document.querySelector(".dropdown_items");
  const toggleItems = dropdownItems?.querySelector(".dropdown_items__toggle");

  if (dropdownItems && toggleItems) {
    toggleItems.addEventListener("click", () => {
      dropdownItems.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown_items")) {
        dropdownItems.classList.remove("active");
      }
    });

    const items = document.querySelectorAll(".dropdown_items__menu li");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        dropdownItems.classList.remove("active");
        document.querySelector(".dropdown_items__selected").textContent =
          item.querySelector(".name").textContent;
      });
    });
  }
});
