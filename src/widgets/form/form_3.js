import onChange from "on-change";

const renderForm = (form, elements) => {
  const fieldsKey = Object.keys(elements.fields);

  switch (form.status) {
    case "renderErrorValidation":
      elements.$btnSubmit.setAttribute("disabled", true);

      fieldsKey.forEach((key) => {
        const field = elements.fields[key];

        if (field.valid) {
          field.inputWrapper.showSuccessStyle();
          field.inputWrapper.writeMessage("");

          if (elements.showSuccessMessage) {
            field.inputWrapper.writeMessage(field.defaultMessage);
          }
        } else {
          field.inputWrapper.showErrorStyle();
          field.inputWrapper.addSelectedStyle();
          field.inputWrapper.writeMessage(field.error[0]);
        }
      });
      break;

    case "renderSuccessValidation":
      elements.$btnSubmit.removeAttribute("disabled");

      fieldsKey.forEach((key) => {
        const field = elements.fields[key];
        field.inputWrapper.showSuccessStyle();
        field.inputWrapper.writeMessage("");
      });
      break;

    case "loading":
      fieldsKey.forEach((key) => {
        const field = elements.fields[key];
        field.inputWrapper.showLoadingStyle();
      });

      elements.$btnSubmit.setAttribute("disabled", true);
      break;

    case "successSend":
      fieldsKey.forEach((key) => {
        const field = elements.fields[key];
        field.inputWrapper.showDefaultStyle();
        field.inputWrapper.removeSelectedStyle();
      });

      elements.$form.reset();
      elements.$btnSubmit.removeAttribute("disabled");

      window.dispatchEvent(new Event("succesFormSend"));

      if (typeof elements.successAction === "function") {
        elements.successAction();
      }
      break;

    case "filling":
      break;

    case "failed":
      elements.$btnSubmit.removeAttribute("disabled");
      break;

    default:
      throw new Error(`Unknown form status: ${form.status}`);
  }
};

const initView = (state, elements) => {
  const mapping = {
    status: () => renderForm(state, elements),
  };

  return onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });
};

export default initView;
