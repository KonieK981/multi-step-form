const steps = [
  { id: 1, name: "Step 1", label: "Your info" },
  { id: 2, name: "Step 2", label: "Select plan" },
  { id: 3, name: "Step 3", label: "Add-ons" },
  { id: 4, name: "Step 4", label: "Summary" },
];

const btn__nextStep = document.querySelector("#btn__nextStep");
let stepActive = document.querySelector(".visible");

btn__nextStep.addEventListener("click", () => changeStep(stepActive.id));

function changeStep(id) {
  let length = id.length - 1;
  let lastValue = Number(id[length]);
  lastValue++;
  id = id.slice(0, -1) + lastValue;

  document.querySelector(".visible").classList.toggle("visible");
  stepActive = document.querySelector(`#${id}`);
  stepActive.classList.toggle("visible");
}
