import Cleave from "cleave.js";
import intlTelInput from "intl-tel-input";

export default class SexyInput {
  constructor(setting) {
    this.selected = false;
    this.$field = setting.$field;
    this.$input = setting.$input || setting.$field.querySelector("input");
    this.typeInput = setting.typeInput || "text";
    this.animation = setting.animation || "none";
    this.$message = setting.$message || setting.$field.querySelector("[data-input-message]");

    this.$body = document.querySelector("body");

    this.init();
  }

  get input() {
    return this.$input;
  }

  selectIn(self) {
    return () => {
      if (this.getStatusField() !== "field--error") {
        self.showSelectedStyle();
        self.addSelectedStyle();
      }
    };
  }

  selectOut(self) {
    return ({ target }) => {
      if (this.getStatusField() === "field--error" || target.value !== "") return;

      self.showDefaultStyle();
      self.removeSelectedStyle();
    };
  }

  getStatusField() {
    return this.$field.getAttribute("data-status");
  }

  showSuccessStyle() {
    this.changeStatus(this.$field, "success");
  }

  showDefaultStyle() {
    this.changeStatus(this.$field, "default");
  }

  showErrorStyle() {
    this.changeStatus(this.$field, "error");
  }

  showSelectedStyle() {
    this.changeStatus(this.$field, "selected");
  }

  showLoadingStyle() {
    this.changeStatus(this.$field, "loading");
  }

  addSelectedStyle() {
    if (this.animation === "focus") {
      this.$field.classList.add("selected");
    }
  }

  removeSelectedStyle() {
    this.$field.classList.remove("selected");
  }

  writeMessage(text) {
    if (this.$message) {
      this.$message.innerHTML = text;
    }
  }

  changeStatus(fieldBlock, status) {
    switch (status) {
      case "default":
        fieldBlock.classList.remove("selected");
        fieldBlock.setAttribute("data-status", "field--inactive");
        break;

      case "success":
        fieldBlock.setAttribute("data-status", "field--success");
        break;

      case "error":
        fieldBlock.setAttribute("data-status", "field--error");
        break;

      case "selected":
        fieldBlock.classList.add("selected");
        fieldBlock.setAttribute("data-status", "field--active");
        break;

      case "loading":
        fieldBlock.classList.add("selected");
        fieldBlock.setAttribute("data-status", "field--loading");
        break;

      default:
        throw new Error(`Unknown change status ${status}`);
    }
  }

  getMaskPart(iso2) {
    switch (iso2) {
      case "ua":
      case "kz":
        return 2;

      case "tr":
      case "th":
      case "de":
        return 3;

      case "ae":
        return 4;

      default:
        return 3;
    }
  }

  listeners(input) {
    const self = this;

    if (this.typeInput === "phone") {
      input.setAttribute("inputmode", "tel");

      input.intTelInput = intlTelInput(input, {
        preferredCountries: ["ua", "pl"],
        autoPlaceholder: "off",
        initialCountry: "auto",
        showSearchBox: false,
        geoIpLookup: (success) => {
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => {
              const countryCode = (data?.country_code || "ua").toLowerCase();
              success(countryCode);
            })
            .catch(() => {
              success("ua");
            });
        },
      });

      let cleave = null;

      const createMask = () => {
        const currentCountry = input.intTelInput.getSelectedCountryData();

        if (!currentCountry || !currentCountry.dialCode) {
          return null;
        }

        const { dialCode, iso2 } = currentCountry;
        const maskPart = this.getMaskPart(iso2);

        return new Cleave(input, {
          numericOnly: true,
          prefix: `+${dialCode}`,
          blocks: [dialCode.toString().length + 1, maskPart, 3, 2, 2],
          delimiters: [" ", " ", " ", ""],
        });
      };

      const rebuildMask = () => {
        if (cleave) {
          cleave.destroy();
        }

        input.value = "";
        cleave = createMask();
      };

      setTimeout(() => {
        rebuildMask();
      }, 500);

      input.addEventListener("countrychange", rebuildMask);
    }

    if (this.animation === "focus") {
      input.addEventListener("focus", self.selectIn(self));
      input.addEventListener("blur", self.selectOut(self));
    }
  }

  prepareMarkup() {
    if (this.animation === "focus") {
      this.$field.setAttribute("data-animation", "focus");
    }

    if (this.animation === "none") {
      this.$field.setAttribute("data-animation", "none");
    }
  }

  init() {
    this.listeners(this.$input);
    this.prepareMarkup();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const phoneInputs = document.querySelectorAll('.form_item input[type="tel"]');

  phoneInputs.forEach((input) => {
    const formItem = input.closest(".form_item");

    if (!formItem) return;

    function updateState() {
      const isFocused = document.activeElement === input;
      const hasValue = input.value.trim() !== "";

      if (isFocused || hasValue) {
        formItem.classList.add("active");
      } else {
        formItem.classList.remove("active");
      }
    }

    input.addEventListener("focus", updateState);
    input.addEventListener("blur", updateState);
    input.addEventListener("input", updateState);

    updateState();
  });
});
