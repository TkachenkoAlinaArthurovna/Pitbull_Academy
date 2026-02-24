import "./events.scss";

import "@widgets/title/title.js";
import "@widgets/event-hero/event.js";

document.addEventListener("DOMContentLoaded", () => {
  //-------------------Tabs---------------------//

  const tabs = document.querySelectorAll(".tabs__item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});
