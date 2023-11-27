const nameInput = document.querySelector(".input-name");
const numberInput = document.querySelector(".input-number");
const monthInput = document.querySelector(".input-month");
const yearInput = document.querySelector(".input-year");
const cvcInput = document.querySelector(".input-cvc");
const allInputs = document.querySelectorAll(".input");

const nameSpan = document.querySelector(".span-name");
const numberSpan = document.querySelector(".span-number");
const dateSpan = document.querySelector(".span-date");
const cvcSpan = document.querySelector(".span-cvc");

const numberDisplay = document.querySelector(".card-code-number");
const nameDisplay = document.querySelector(".name");
const monthDisplay = document.querySelector(".month");
const yearDisplay = document.querySelector(".year");
const cvcDisplay = document.querySelector(".cvc");

const form = document.querySelector(".form");
const completeContainer = document.querySelector(".complete");
const formBtn = document.querySelector(".form-btn");

let validationState = 0;

const displayEmptyInfo = (span) => {
  span.textContent = "Can't be blank";
};

const showError = (span, input) => {
  span.classList.add("active");
  input.classList.add("error");
};

const removeError = (span, input) => {
  span.classList.remove("active");
  input.classList.remove("error");
};

const checkName = () => {
  removeError(nameSpan, nameInput);
  const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const name = nameInput.value;

  if (!name) {
    showError(nameSpan, nameInput);
    displayEmptyInfo(nameSpan);
  } else if (!nameRegex.test(name)) {
    showError(nameSpan, nameInput);
    nameSpan.textContent = "Required full name (first and last name)";
  } else {
    validationState++;
  }
};

const checkCodeNum = () => {
  removeError(numberSpan, numberInput);
  const numRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  const num = numberInput.value;

  if (!num) {
    showError(numberSpan, numberInput);
    displayEmptyInfo(numberSpan);
  } else if (num.length < 19) {
    showError(numberSpan, numberInput);
    numberSpan.textContent = "Entered code is too short";
  } else if (!numRegex.test(num)) {
    showError(numberSpan, numberInput);
    numberSpan.textContent = "Wrong format, numbers only";
  } else {
    validationState++;
  }
};

const checkMonthAndYear = () => {
  removeError(dateSpan, monthInput);
  removeError(dateSpan, yearInput);

  const month = monthInput.value;
  const year = yearInput.value;

  if (!month) {
    showError(dateSpan, monthInput);
    displayEmptyInfo(dateSpan);
  }

  if (!year) {
    showError(dateSpan, yearInput);
    displayEmptyInfo(dateSpan);
  }

  if (month && year) {
    validationState++;
  }
};

const checkCvc = () => {
  removeError(cvcSpan, cvcInput);

  const cvc = cvcInput.value;

  if (!cvc) {
    showError(cvcSpan, cvcInput);
    displayEmptyInfo(cvcSpan);
  } else {
    validationState++;
  }
};

const showComplete = () => {
  form.classList.remove("active");
  completeContainer.classList.add("active");
};

const forceTwoDigits = (e) => {
  if (e.target.value.length === 1) {
    e.target.value = e.target.value.padStart(2, "0");
  }
};

const forceThreeDigits = (e) => {
  if (e.target.value.length < 3) {
    e.target.value = e.target.value.padStart(3, "0");
  }
};

const forceProperValue = (e) => {
  if (+e.target.value > e.target.max) {
    e.target.value = e.target.max;
  } else if (+e.target.value < e.target.min) {
    e.target.value = e.target.min;
  }
};

const checkForm = (e) => {
  e.preventDefault();
  checkName();
  checkCodeNum();
  checkMonthAndYear();
  checkCvc();
  validationState === 4 ? showComplete() : (validationState = 0);
};

const displayInfo = (input, displayEl, defaultValue) => {
  displayEl.textContent = input.value;
  if (input.value === "") {
    displayEl.textContent = defaultValue;
  }
};

nameInput.addEventListener("input", () => {
  displayInfo(nameInput, nameDisplay);
});

numberInput.addEventListener("input", () => {
  numberInput.value = numberInput.value
    .replace(/\s/g, "")
    .replace(/(.{4})(?!$)/g, "$1 ");

  displayInfo(numberInput, numberDisplay, "0000 0000 0000 0000");
});

monthInput.addEventListener("change", forceTwoDigits);
monthInput.addEventListener("change", forceProperValue);
monthInput.addEventListener("change", () => {
  displayInfo(monthInput, monthDisplay, "00");
});

yearInput.addEventListener("change", forceTwoDigits);
yearInput.addEventListener("change", forceProperValue);
yearInput.addEventListener("change", () => {
  displayInfo(yearInput, yearDisplay, "00");
});

cvcInput.addEventListener("change", forceThreeDigits);
cvcInput.addEventListener("change", forceProperValue);
cvcInput.addEventListener("change", () => {
  displayInfo(cvcInput, cvcDisplay, "000");
});

formBtn.addEventListener("click", checkForm);
