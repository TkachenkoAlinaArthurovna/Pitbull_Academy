import "./shop.scss";
import "@widgets/title/title.js";
import "@widgets/form/form.js";
import axios from "axios";

let allProducts = [];

export async function getData() {
  const formData = new FormData();
  formData.append("action", "shop");

  try {
    const { data } = await axios.post("/wp-admin/admin-ajax.php", formData);
    console.log(data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Помилка при завантаженні:", error);
    return [];
  }
}

function renderProducts(products = []) {
  const productsList = document.getElementById("products-list");
  if (!productsList) return;
  if (!Array.isArray(products)) {
    console.log("products is not array:", products);
    productsList.innerHTML = "";
    return;
  }

  productsList.innerHTML = products
    .map((item) => {
      const title = item?.post?.title || "";
      const price = item?.acf?.price || "";
      const image =
        item?.post?.thumbnail ||
        item?.acf?.general?.image ||
        "/wp-content/themes/3d/assets/images/product.jpg";

      return `
        <div class="product_card" data-id="${item?.post?.id || ""}">
          <div class="product_card__img">
            <img src="${image}" alt="${title}">
          </div>

          <div class="product_card__title">${title}</div>

          <div class="product_card__bottom">
            <div class="product_card__price">
              <span class="name">Ціна продажу</span>
              <span class="price">${price}</span>
            </div>

            <div class="product_card__info" id="open-pop-up-product" data-open-info="${item?.post?.id || ""}">
              <svg>
                <use href="/wp-content/themes/3d/assets/icons.svg#Info"></use>
              </svg>
              <span>Характеристики</span>
            </div>
          </div>

          <div class="product_card__wrapper_button">
            <div class="product_card__button btn_black_without_icon" data-open-product-form data-product="${title} | ${price}">Замовити</div>
          </div>
        </div>
      `;
    })
    .join("");
}

function filterProducts(tabId) {
  console.log("TEST");
  if (tabId === "all") {
    renderProducts(allProducts);
    return;
  }

  const typeMap = {
    pistols: "Pistols",
    carabiners: "Carabiners",
    knives: "Knives",
  };

  const filteredProducts = allProducts.filter((item) => item?.acf?.type === typeMap[tabId]);

  renderProducts(filteredProducts);
}

function renderPopupRows(rows = []) {
  if (!Array.isArray(rows) || !rows.length) return "";

  return rows
    .map((row) => {
      const name = row?.row_1 || "";
      const value = row?.row_2 || "";

      if (!name && !value) return "";

      return `
        <div class="pop-up-info-product__item">
          <div class="pop-up-info-product__item_name">${name}</div>
          <div class="pop-up-info-product__item_value">${value}</div>
        </div>
      `;
    })
    .join("");
}

function renderPopupSection(title, rows) {
  if (!rows || rows === false) return "";
  if (!Array.isArray(rows) || !rows.length) return "";

  const rowsHtml = renderPopupRows(rows);

  if (!rowsHtml.trim()) return "";

  return `
    <div class="pop-up-info-product__content_item">
      <div class="pop-up-info-product__subtitle">${title}</div>
      ${rowsHtml}
    </div>
  `;
}

function fillProductPopup(productId) {
  const popupProduct = document.getElementById("pop-up-info-product");
  if (!popupProduct) return;

  const contentWrapper = popupProduct.querySelector(".pop-up-info-product__content_wrapper");
  if (!contentWrapper) return;

  const currentProduct = allProducts.find((item) => String(item?.post?.id) === String(productId));

  if (!currentProduct) {
    contentWrapper.innerHTML = "";
    return;
  }

  const general = currentProduct?.acf?.general;
  const characteristics = currentProduct?.acf?.characteristics;
  const specifications = currentProduct?.acf?.specifications;

  contentWrapper.innerHTML = `
    ${renderPopupSection("Загальна інформація про товар:", general)}
    ${renderPopupSection("Характеристики товару:", characteristics)}
    ${renderPopupSection("Специфікація упаковки:", specifications)}
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  allProducts = await getData();
  renderProducts(allProducts);

  //-------------------Pop-up info---------------------//

  const popup = document.getElementById("pop-up-info");

  if (!popup) return;

  document.addEventListener("click", (e) => {
    if (e.target.closest("#open-pop-up-info")) {
      popup.classList.add("active-pop-up");
      document.body.classList.add("no-scroll");
    }
  });

  const wrapper = popup.querySelector(".pop-up-info__wrapper");

  wrapper?.addEventListener("click", () => {
    popup.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  const content = popup.querySelector(".pop-up-info__content");

  content?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const closeBtn = popup.querySelector(".pop-up-info__close");

  closeBtn?.addEventListener("click", () => {
    popup.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  const closeBtn2 = popup.querySelector(".pop-up-info__button");

  closeBtn2?.addEventListener("click", () => {
    popup.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //-------------------Pop-up video---------------------//

  const popupVideo = document.getElementById("pop-up-video");

  if (!popupVideo) return;

  document.addEventListener("click", (e) => {
    if (e.target.closest("#open-pop-up-video")) {
      popupVideo.classList.add("active-pop-up");
      document.body.classList.add("no-scroll");
    }
  });

  const wrapperPopUpVideo = popupVideo.querySelector(".pop-up-video__wrapper");

  wrapperPopUpVideo?.addEventListener("click", () => {
    popupVideo.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  const contentVideo = popupVideo.querySelector(".pop-up-video__content");

  contentVideo?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const closeBtnVideo = popupVideo.querySelector(".pop-up-video__close");

  closeBtnVideo?.addEventListener("click", () => {
    popupVideo.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //-------------------Pop-up product---------------------//

  const popupProduct = document.getElementById("pop-up-info-product");

  if (!popupProduct) return;

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("#open-pop-up-product");

    if (openBtn) {
      const productId = openBtn.dataset.openInfo;

      fillProductPopup(productId);

      popupProduct.classList.add("active-pop-up");
      document.body.classList.add("no-scroll");
    }
  });

  const wrapperPopUpProduct = popupProduct.querySelector(".pop-up-info-product__wrapper");

  wrapperPopUpProduct?.addEventListener("click", () => {
    popupProduct.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  const contenProduct = popupProduct.querySelector(".pop-up-info-product__content");

  contenProduct?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const closeBtnProduct = popupProduct.querySelector(".pop-up-info-product__close");

  closeBtnProduct?.addEventListener("click", () => {
    popupProduct.classList.remove("active-pop-up");
    document.body.classList.remove("no-scroll");
  });

  //-------------------Tabs---------------------//

  const tabs = document.querySelectorAll(".tabs__item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      filterProducts(tab.id);
    });
  });

  //----------//

  const productForm = document.querySelector("[product-form]");
  const productFormSuccess = document.querySelector(".form-success");

  if (productForm && productFormSuccess) {
    const openProductFormBtns = document.querySelectorAll("[data-open-product-form]");
    const closeProductFormBtns = document.querySelectorAll("[data-close-form]");
    const closeProductFormSuccessBtns = document.querySelectorAll("[data-close-form-success]");
    const formWrapper = productForm.querySelector(".form__wrapper");
    const formSuccessWrapper = productForm.querySelector(".form-success__wrapper");
    const productInput = productForm.querySelector("#product");

    openProductFormBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productValue = btn.dataset.product;

        if (productInput) {
          productInput.value = productValue;
        }

        productForm.classList.add("active");
        document.body.classList.add("no-scroll");
      });
    });

    closeProductFormBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        productForm.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });

    closeProductFormSuccessBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        productFormSuccess.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });

    formWrapper?.addEventListener("click", (event) => {
      if (event.target === formWrapper) {
        productForm.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });

    formSuccessWrapper?.addEventListener("click", (event) => {
      if (event.target === formSuccessWrapper) {
        productFormSuccess.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  }
});
