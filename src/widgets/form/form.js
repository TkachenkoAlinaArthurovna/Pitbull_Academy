import "./form.scss";

import gsap from "gsap";

import i18next from "i18next";
import * as yup from "yup";

import FormMonster, { i18nReady } from "./form_2.js";
import SexyInput from "./input.js";

const forms = ['[data-form="contact-form"]'];

forms.forEach((form) => {
  const $form = document.querySelector(form);

  if (!$form) return;
  i18nReady.then(() => {
    new FormMonster({
      elements: {
        $form,

        successAction: () => {
          document.querySelector(".form").classList.remove("active");
          document.querySelector(".form-success").classList.add("active");
          setTimeout(() => {
            document.querySelector(".form-success").classList.remove("active");
            document.body.classList.remove("no-scroll");
          }, 5000);
        },

        $btnSubmit: $form.querySelector("[data-btn-submit]"),

        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: "none",
              $field: $form.querySelector("[data-field-name]"),
            }),
            rule: yup.string().required(i18next.t("required")).trim(),
            defaultMessage: i18next.t("name"),
            valid: false,
            error: [],
          },

          email: {
            inputWrapper: new SexyInput({
              animation: "none",
              $field: $form.querySelector("[data-field-email]"),
            }),
            rule: yup.string().trim().email(i18next.t("email")).notRequired(),
            defaultMessage: i18next.t("email"),
            valid: true,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: "none",
              $field: $form.querySelector("[data-field-phone]"),
              typeInput: "phone",
            }),
            rule: yup
              .string()
              .required(i18next.t("required"))
              .min(17, i18next.t("field_too_short", { cnt: 12 })),
            defaultMessage: i18next.t("phone"),
            valid: false,
            error: [],
          },
        },
      },
    });
  });
});
