import i18next from "i18next";
import axios from "axios";
import initView from "./form_3.js";
import * as yup from "yup";

const sendForm = async (data) => {
  // const response = await axios.post("/wp-admin/admin-ajax.php", data);
  const response = await axios.post("/application.php", data);
  return response.data;
};

const lang = document.documentElement.lang || "uk";

export const i18nReady = i18next.init({
  lng: lang,
  fallbackLng: "uk",
  debug: false,
  resources: {
    uk: {
      translation: {
        name: "Ім’я:*",
        phone: "Телефон:*",
        email: "Email:*",
        send: "Надіслати",
        sending: "Надсилання...",
        field_too_short: "Телефон має містити принаймні {{cnt}} символів",
        only_number: "Тут лише цифри",
        required: "Це поле є обов’язковим",
        sendingSuccessTitle: "Повідомлення надіслано",
        sendingSuccessText: "Чекайте відповіді наших менеджерів",
        sendingErrorTitle: "Сталася помилка",
      },
    },

    ru: {
      translation: {
        name: "Имя:*",
        phone: "Телефон:*",
        email: "Email:*",
        send: "Отправить",
        sending: "Отправка...",
        field_too_short: "Телефон должен содержать не менее {{cnt}} символов",
        only_number: "Здесь только цифры",
        required: "Это поле обязательно",
        sendingSuccessTitle: "Сообщение отправлено",
        sendingSuccessText: "Ожидайте ответа наших менеджеров",
        sendingErrorTitle: "Произошла ошибка",
      },
    },

    en: {
      translation: {
        name: "Name:*",
        phone: "Phone:*",
        email: "Email:*",
        send: "Send",
        sending: "Sending...",
        field_too_short: "Phone must be at least {{cnt}} characters",
        only_number: "Only digits allowed",
        required: "This field is required",
        sendingSuccessTitle: "Message sent",
        sendingSuccessText: "Please wait for our managers to contact you",
        sendingErrorTitle: "An error occurred",
      },
    },

    ro: {
      translation: {
        name: "Nume:*",
        phone: "Telefon:*",
        email: "Email:*",
        send: "Trimite",
        sending: "Se trimite...",
        field_too_short: "Telefonul trebuie să conțină cel puțin {{cnt}} caractere",
        only_number: "Doar cifre",
        required: "Acest câmp este obligatoriu",
        sendingSuccessTitle: "Mesaj trimis",
        sendingSuccessText: "Așteptați răspunsul managerilor noștri",
        sendingErrorTitle: "A apărut o eroare",
      },
    },
  },
});

export default class FormMonster {
  constructor(setting) {
    this.isSubmitted = false;
    this.elements = setting.elements;
    this.$body = document.querySelector("body");

    this.showSuccessMessage = setting.showSuccessMessage ?? true;

    this.state = {
      serverError: null,
      error: true,
      form: setting.elements.fields,
      status: "filling",
    };

    this.fieldsKey = Object.keys(this.elements.fields);
    this.watchedState = initView(this.state, this.elements);

    this.init();
  }

  validate(formData) {
    const formDataObj = this.fieldsKey.reduce((acc, key) => {
      acc[key] = formData.get(key);
      return acc;
    }, {});

    const shapeObject = this.fieldsKey.reduce((acc, key) => {
      acc[key] = this.elements.fields[key].rule;
      return acc;
    }, {});

    const schema = yup.object().shape(shapeObject);

    try {
      schema.validateSync(formDataObj, { abortEarly: false });
      return null;
    } catch (err) {
      return err.inner;
    }
  }

  changeInput() {
    return (e) => {
      e.preventDefault();

      this.watchedState.status = "filling";

      const formData = new FormData(this.elements.$form);
      const error = this.validate(formData);

      this.fieldsKey.forEach((key) => {
        const field = this.elements.fields[key];
        field.valid = true;
        field.error = [];
      });

      if (error) {
        error.forEach(({ path, message }) => {
          this.watchedState.form[path].valid = false;
          this.watchedState.form[path].error.push(message);
        });

        this.watchedState.error = true;
        this.watchedState.status = "renderErrorValidation";
        return;
      }

      this.watchedState.error = false;
      this.watchedState.status = "renderSuccessValidation";
    };
  }

  submitForm() {
    return async (e) => {
      e.preventDefault();

      this.isSubmitted = true;

      this.changeInput()(e);

      if (!this.watchedState.error) {
        try {
          this.watchedState.status = "loading";

          const formData = new FormData(this.elements.$form);
          formData.append("action", "app");

          const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

          UTM_KEYS.forEach((key) => {
            const value = sessionStorage.getItem(key);
            if (value) formData.set(key, value);
          });

          const { error, code_error } = await sendForm(formData);

          if (error === 0) {
            this.watchedState.status = "successSend";
            return;
          }

          this.watchedState.serverError = code_error;
          this.watchedState.status = "failed";
        } catch (err) {
          this.watchedState.error = err.message;
          this.watchedState.serverError = "front_error";
          this.watchedState.status = "failed";
        }
      }
    };
  }

  listers() {
    this.elements.$form.addEventListener("submit", this.submitForm());

    this.fieldsKey.forEach((key) => {
      const { input } = this.elements.fields[key].inputWrapper;

      input.addEventListener("input", (e) => {
        if (this.isSubmitted) {
          this.changeInput()(e);
        }
      });
    });
  }

  init() {
    this.listers();
  }
}
