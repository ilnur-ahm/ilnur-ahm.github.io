const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const input = document.querySelector(".percent");
const animateCheckbox = document.getElementById("rotateCheckbox");
const valueInput = document.getElementById("valueInput");
const urlParams = new URLSearchParams(window.location.search);
const valueFromQuery = urlParams.get("value");
const animationModeFromQuery = urlParams.get("animation");
const hideModeFromQuery = urlParams.get("hide");
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;
const rotateCheckbox = document.getElementById("rotateCheckbox");
const box = document.querySelector(".progress-ring__circle");

let angle = -90;
let intervalId;

const setProgress = (percent) => {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
};

const inputValueHandler = (value) => {
  if (value >= 0 && value <= 100) {
    setProgress(value);
    valueInput.style.borderColor = "black";
    return;
  }
  valueInput.style.borderColor = "red";
};

const hide = (id) => {
  const elem = document.getElementById(id);

  state = elem.style.visibility;
  if (state == "hidden") {
    elem.style.visibility = "initial";
    animateCheckbox.disabled = false;
    valueInput.disabled = false;
  } else {
    elem.style.visibility = "hidden";
    animateCheckbox.disabled = true;
    valueInput.disabled = true;
  }
};


const rotateBox = () => {
  box.style.transform = `rotate(${angle}deg)`; 
  angle += 1; 
  if (angle > 270) {
    angle = -90; 
  }
};

input.addEventListener("input", function () {
  inputValueHandler(input.value);
});

rotateCheckbox.addEventListener("change", () => {
  if (rotateCheckbox.checked) {
    intervalId = setInterval(rotateBox, 0.05);
  } else {
    clearInterval(intervalId);
    box.style.transform = "rotate(-90deg)";
    inputValueHandler(input.value);
  }
});

if (valueFromQuery) {
  inputValueHandler(valueFromQuery);
  input.value = valueFromQuery;
  valueInput.disabled = true;
}

if (Number(animationModeFromQuery)) {
  animationValue = setProgress(20);
  intervalId = setInterval(rotateBox, 0.05);
  animateCheckbox.disabled = true;
}


