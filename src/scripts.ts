const dropdownButton = document.querySelector(".dropdown__button") as HTMLButtonElement;
const dropdownLabel = document.querySelector(".dropdown__label");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownListItems = dropdownList.querySelectorAll(".dropdown__list--item");
const form: HTMLFormElement = document.querySelector(".js-form");
const modalSuccess = document.querySelector(".modal");
const errorMessage = document.createElement("span");

const validationRules = {
  username: (value: string) => {
    const min = 4;
    const max = 20;
    return value.length < min || value.length > max ? false : true;
  },

  password: (value: string) => {
    const min = 4;
    const max = 12;
    return value.length < min || value.length > max ? false : true;
  },

  phone: (value: string) => {
    return value.replace(/\D/g, "").length >= 8 ? true : false;
  },

  checkbox: (value: string) => {
    return value !== "disabled" ? true : false;
  },

  radiobutton: (value: string) => {
    return value !== "disabled" ? true : false;
  },

  dropdown: (value: string) => {
    return dropdownButton.value !== value ? true : false;
  }
};

type inputNames = keyof typeof validationRules;

form.addEventListener("submit", (e) => {
  
  e.preventDefault();

  let isFormValid = true; 
  const formData = new FormData(form);

  if (!formData.get("checkbox")) {
    formData.append("checkbox", "disabled");
  }

  form.querySelector(".checkbox").addEventListener("click", () => {
    formData.append("checkbox", "enabled");
  });

  if (!formData.get("radiobutton")) {
    formData.append("radiobutton", "disabled");
  }

  form.querySelector(".radio").addEventListener("click", () => {
    formData.append("radiobutton", "enabled");
  });

  if (!formData.get("dropdown")) {
    formData.append("dropdown", "Select one");
  }

  for (const pair of formData.entries()) {
    if (!isFormValid) {
      break;
    }

    const key = pair[0] as inputNames;
    const value = pair[1] as string;

    const validationFunction = validationRules[key];
    isFormValid = validationFunction(value);   

    const input = form.querySelector(`input[name=${key}]`);
    const label = form.querySelector(`input[name=${key}]`).parentElement;
   
    const removeError = () => {
      input.classList.remove("error");
      errorMessage.classList.remove("invalid");
      errorMessage.remove();
    };

    removeError();

    if (!isFormValid ) {
      input.classList.add("error");
      errorMessage.classList.add("invalid");
      errorMessage.innerText = `Error in ${key} field`;
      label.appendChild(errorMessage);
    } 
    
    else if (isFormValid && key === 'dropdown'){
      modalSuccess.classList.add('display-block');
      form.classList.add('display-none');
    }
  }
}); 
 
const closeDropdownList = () => {
  dropdownList.classList.remove("js-visible");
  dropdownLabel.classList.remove("js-active");
};

dropdownButton.addEventListener("click", () => {
  dropdownList.classList.toggle("js-visible");
  dropdownLabel.classList.toggle("js-active");

  dropdownListItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      dropdownButton.value = this.value;
      closeDropdownList();
      e.stopPropagation();
      dropdownButton.focus(); 
      dropdownButton.classList.remove('error');
      errorMessage.remove();   
    });
  });
});

form.addEventListener("click", (e) => {
  if (e.target !== dropdownButton) {
    closeDropdownList();
  }
});

form.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Tab") {
    closeDropdownList();
  }
});
