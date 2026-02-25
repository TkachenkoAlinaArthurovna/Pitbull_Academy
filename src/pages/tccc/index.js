import "./tccc.scss";

import "@widgets/title/title.js";
import "@/widgets/tccc-hero/tccc.js";
import "@widgets/show_prices/show_prices.js";

//-------------------Pop-up-asm---------------------//

const asm = document.getElementById("pop-up-asm");
const cls = document.getElementById("pop-up-cls");

console.log(cls);

if (asm && cls) {
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
}
