const steps = [
  { id: 1, name: "Step 1", label: "Your info" },
  { id: 2, name: "Step 2", label: "Select plan" },
  { id: 3, name: "Step 3", label: "Add-ons" },
  { id: 4, name: "Step 4", label: "Summary" },
];

const btn__nextStep = document.querySelector(".btn__nextStep");
let stepActive = document.querySelector(".tab-active");

btn__nextStep.addEventListener("click", () => changeStep(stepActive.id));

function changeStep(id) {
  let length = id.length - 1;
  let lastValue = Number(id[length]);
  lastValue++;
  id = id.slice(0, -1) + lastValue;

  document.querySelector(".tab-active").classList.toggle("tab-active");
  stepActive = document.querySelector(`#${id}`);
  stepActive.classList.toggle("tab-active");
}

//Cards render
let isYearly = true;
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

const container = document.getElementById("cards");
const toggle = document.getElementById("switch-timer");

function renderCards() {
  container.innerHTML = "";

  plans.forEach((plan) => {
    const label = document.createElement("label");
    label.innerHTML = `
    <input type="radio" name="plan" value=${plan.name} />
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

//Adds render
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

const containerAddOns = document.getElementById("addOns");

function renderAdds() {
  containerAddOns.innerHTML = "";

  addOns.forEach((add) => {
    const label = document.createElement("label");
    label.innerHTML = `
                <div class="card">
                  <div class="form-group">
                    <input type="checkbox" id="html" class="form-group__input"/>
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

toggle.addEventListener("change", () => {
  isYearly = toggle.checked;
  renderCards();
  renderAdds();
});

renderCards();
renderAdds();
// document.querySelectorAll('input[name="plan"]').forEach((radio) => {
//   radio.addEventListener("change", () => {
//     console.log("Seleccionado:", radio.value);
//   });
// });
