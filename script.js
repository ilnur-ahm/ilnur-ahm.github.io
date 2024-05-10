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

let angle = -90; // начальный угол
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

// Функция, которая будет вызываться каждые 0.1 секунды
const rotateBox = () => {
  box.style.transform = `rotate(${angle}deg)`; // устанавливаем угол в CSS
  angle += 1; // увеличиваем угол на 1 градус
  if (angle > 270) {
    angle = -90; // сбрасываем угол на начальное значение после достижения 180 градусов
  }
};

input.addEventListener("input", function () {
  inputValueHandler(input.value);
});

rotateCheckbox.addEventListener("change", () => {
  if (rotateCheckbox.checked) {
    intervalId = setInterval(rotateBox, 0.05); // вызываем функцию rotateBox каждые 0.1 секунды
  } else {
    clearInterval(intervalId); // останавливаем интервал при выключении чекбокса
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
  intervalId = setInterval(rotateBox, 0.05);
  animateCheckbox.disabled = true;
}

if (Number(animationModeFromQuery)) {
  intervalId = setInterval(rotateBox, 0.05);
  animateCheckbox.disabled = true;
}
