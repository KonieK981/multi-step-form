const steps = [
  { id: 1, name: "Step 1", label: "Your info" },
  { id: 2, name: "Step 2", label: "Select plan" },
  { id: 3, name: "Step 3", label: "Add-ons" },
  { id: 4, name: "Step 4", label: "Summary" },
];

const plans = [
  {
    id: 1,
    name: "arcade",
    monthly: 9,
    yearly: 90,
    img: "assets/images/icon-arcade.svg",
  },
  {
    id: 2,
    name: "advanced",
    monthly: 12,
    yearly: 120,
    img: "assets/images/icon-advanced.svg",
  },
  {
    id: 3,
    name: "pro",
    monthly: 15,
    yearly: 150,
    img: "assets/images/icon-pro.svg",
  },
];

const addOns = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    monthly: 1,
    yearly: 10,
  },
  {
    id: 2,
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthly: 2,
    yearly: 20,
  },
  {
    id: 3,
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthly: 2,
    yearly: 20,
  },
];

let isYearly = false;
let currentStep = 0;
const totalSteps = 4;

const stepsCircles = document.querySelectorAll(".stepper .step__circle");
const stepper__sidebar = document.querySelectorAll(
  "#stepper__sidebar .step__circle"
);
const tabs = document.querySelectorAll("#multi-step-form .tab");
const btn__nextStep = document.querySelectorAll(".btn__nextStep");
const btn__back = document.querySelectorAll(".btn__back");
let stepActive = document.querySelector(".tab-active");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

btn__nextStep.forEach((el) => el.addEventListener("click", () => nextStep()));
btn__back.forEach((el) => el.addEventListener("click", () => prevStep()));

function setStep(index) {
  //check form inputs
  if (isErrorFirstStepValidation()) return;

  //update status of step indicator and tabs
  if (index < 4) stepperUpdater(index);

  tabs.forEach((tab) => tab.classList.remove("tab-active"));

  if (index > 0 && index <= 4) {
    btn__back.forEach((el) => el.classList.remove("hidden"));
  } else {
    btn__back.forEach((el) => el.classList.add("hidden"));
  }

  if (tabs[index]) {
    tabs[index].classList.add("tab-active");
  }

  getAllValues();

  if (index === 4) {
    document.getElementById("mobile__footer").classList.add("remove");
    document.querySelector(".form__btns").classList.add("remove");
  }
  currentStep = index;
}

function nextStep() {
  if (currentStep < totalSteps) {
    setStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 0) {
    setStep(currentStep - 1);
  }
}

//step 2

const container = document.getElementById("cards");
const toggle = document.getElementById("switch-timer");

function renderCards() {
  container.innerHTML = "";

  plans.forEach((plan) => {
    const label = document.createElement("label");
    label.innerHTML = `
    <input type="radio" name="plan" value=${plan.id} ${
      plan.id === 1 ? "checked" : ""
    }/>
                <div class="card">
                  <img src=${plan.img} alt="icon" />
                  <div class="card__info">
                    <h3>${plan.name}</h3>
                    <p>$${
                      isYearly ? plan.yearly + "/yr" : plan.monthly + "/mo"
                    }</p>
                    ${isYearly ? "<p>2 months free</p>" : ""}
                  </div>
                </div>`;
    container.appendChild(label);
  });
}

//step 3

const containerAddOns = document.getElementById("addOns");

function renderAdds() {
  containerAddOns.innerHTML = "";

  addOns.forEach((add) => {
    const label = document.createElement("label");
    label.innerHTML = `
                <div class="card">
                  <div class="form-group">
                    <input type="checkbox" name="adds" value=${
                      add.id
                    } class="form-group__input"/>
                    <label class="checkbox form-group__label" for="html"></label>
                  </div>
                  <div class="card__info">
                    <div>
                      <h3>${add.name}</h3>
                      <p>${add.description}</p>
                    </div>
                    <p>+$${
                      isYearly ? add.yearly + "/yr" : add.monthly + "/mo"
                    }</p>
                  </div>
                </div>`;
    containerAddOns.appendChild(label);
  });
}

const containerConfirmation = document.getElementById("confirmation");

function renderConfirmation(values) {
  let total = 0;
  const list = values.adds
    .map((el) => {
      const obj = addOns.find((add) => add.id == el);
      total += isYearly ? obj.yearly : obj.monthly;
      return ` <li>
                    <p>${obj.name}</p>
                    <span>+$${isYearly ? obj.yearly : obj.monthly}/${
        isYearly ? "yr" : "mo"
      }</span>
                  </li>
    `;
    })
    .join("");

  containerConfirmation.innerHTML = "";
  const plan = plans.find((el) => el.id == values.plan);
  total += isYearly ? plan.yearly : plan.monthly;

  const divEl = document.createElement("div");
  divEl.innerHTML = `
              <div class="confirmation">
                <div class="confirmation_header">
                  <div>
                    <p>${plan.name} (Monthly)</p>
                    <a href="">Change</a>
                  </div>
                  <span>$${isYearly ? plan.yearly : plan.monthly}/mo</span>
                </div>
                <ul class="confirmation_info">
                 ${list}      
                </ul>
              </div>
              <div class="confirmation__total">
                <p>Total(${isYearly ? "per year" : "per month"})</p>
                <span>+$${total}/${isYearly ? "yr" : "mo"}</span>
              </div>`;
  containerConfirmation.appendChild(divEl);
}

toggle.addEventListener("change", () => {
  isYearly = toggle.checked;
  renderCards();
  renderAdds();
});

renderCards();
renderAdds();
//step4
function getAllValues() {
  const inputs = document.querySelectorAll("input, select");
  const values = {};
  inputs.forEach((input) => {
    if (input.type === "radio") {
      if (input.checked) values[input.name] = input.value;
    } else if (input.type === "checkbox") {
      if (!values[input.name]) values[input.name] = [];
      if (input.checked) values[input.name].push(input.value);
    } else {
      values[input.name] = input.value;
    }
  });
  renderConfirmation(values);
}

function isErrorFirstStepValidation() {
  if (
    nameInput.validity.valueMissing ||
    emailInput.validity.valueMissing ||
    phoneInput.validity.valueMissing
  ) {
    if (nameInput.validity.valueMissing)
      document.getElementById("nameError").classList.add("visible");
    if (emailInput.validity.valueMissing)
      document.getElementById("emailError").classList.add("visible");
    if (phoneInput.validity.valueMissing)
      document.getElementById("phoneError").classList.add("visible");
    return true;
  }
  document
    .querySelectorAll(".error__text")
    .forEach((el) => el.classList.remove("visible"));

  return false;
}

function stepperUpdater(index) {
  if (index < totalSteps) {
    stepsCircles.forEach((step) =>
      step.classList.remove("step__circle-active")
    );
    tabs.forEach((tab) => tab.classList.remove("tab-active"));
  }

  if (stepsCircles[index]) {
    stepsCircles[index].classList.add("step__circle-active");
    stepper__sidebar[index].classList.add("step__circle-active");
  }
}
