
const dropdownButton = document.querySelector(".dropdown__button") as HTMLButtonElement;
const dropdownList = document.querySelector(".dropdown__list");
const dropdownListItems = dropdownList.querySelectorAll(".dropdown__list--item");
const form: HTMLFormElement = document.querySelector('.js-form');
const submitButton = document.querySelector('.submit__button');
const modalSuccess = document.querySelector('.modal');
const errorMassage = document.querySelector('.error-message');
const error = document.createElement('span');
const label = document.querySelector('input__label');



const validationRules = {
  username: (value: string) => {
    const min = 4;
    const max = 20;
    (value.length < min || value.length > max) ? false : true;
  },

  password: (value: string) => {
    const min = 4;
    const max = 12;
    (value.length < min || value.length > max) ? false : true;
  },

  phoneNumber: (value: string) => {
    const minMax = 10;
    value.length !== minMax ? false : true;
  }
}

type inputNames = keyof (typeof validationRules);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isFormValid = true;
  const formData: any = new FormData(form);

  for (const pair of formData.entries()) {
    if (!isFormValid) {
      break;
    }

    const key = pair[0] as inputNames;
    const value = pair[1] as string;


    const validationFunction: any = validationRules[key];
    isFormValid = validationFunction(value);

    if (!isFormValid) {
      const label = form.querySelector(`input[name=${key}]`).parentElement;
      const input = form.querySelector(`input[name=${key}]`);
      error.classList.add("error__text");
      input.classList.add('error');
      error.innerText = `Error in ${key} field`;
      label.appendChild(error);
      label.classList.add('error-icon')
    } else {
      form.classList.add('.display-none');
      modalSuccess.classList.add('display-block')
    }

  }


})














const closeDropdownList = () => {
  dropdownList.classList.remove("js-visible");
  dropdownButton.classList.remove("js-active");
};

dropdownButton.addEventListener("click", () => {
  dropdownList.classList.toggle("js-visible");
  dropdownButton.classList.toggle("js-active");
  dropdownListItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      dropdownListItems.forEach((el) => {
        el.classList.remove("checked");
      });
      item.classList.add("checked");
      dropdownButton.innerText = this.innerText;
    });
  });
});

dropdownListItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownButton.focus();
    setTimeout(() => {
      closeDropdownList();
    }, 80);
  });
});

document.addEventListener("click", (e) => {
  if (e.target !== dropdownButton) {
    closeDropdownList();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Tab") {
    closeDropdownList();
  }
});

