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

const stepsCircles = document.querySelectorAll("#stepper .step__circle");
const tabs = document.querySelectorAll("#multi-step-form .tab");
const btn__nextStep = document.querySelector(".btn__nextStep");
const btn__back = document.querySelector(".btn__back");
let stepActive = document.querySelector(".tab-active");

btn__nextStep.addEventListener("click", () => nextStep());
btn__back.addEventListener("click", () => prevStep());

function setStep(index) {
  stepsCircles.forEach((step) => step.classList.remove("step__circle-active"));
  tabs.forEach((tab) => tab.classList.remove("tab-active"));

  if (stepsCircles[index] && tabs[index]) {
    stepsCircles[index].classList.add("step__circle-active");
    tabs[index].classList.add("tab-active");
    currentStep = index;
  }
  if (currentStep === 3) {
    getAllValues();
  }
  if (currentStep === 4) {
    document.getElementById("mobile__footer").classList.add("remove");
  }
}

function nextStep() {
  if (currentStep < stepsCircles.length - 1) {
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
    <input type="radio" name="plan" value=${plan.id} />
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

// document.querySelectorAll('input[name="plan"]').forEach((radio) => {
//   radio.addEventListener("change", () => {
//     // console.log("Seleccionado:", radio.value);
//     state.plan = radio.value;
//   });
// });

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
