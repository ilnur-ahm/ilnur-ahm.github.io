const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

const input = document.querySelector(".percent");
const animateCheckbox = document.getElementById("rotateCheckbox");
const valueInput = document.getElementById("valueInput");

const inputValueHandler = (value) => {
  if (input.value >= 0 && input.value <= 100) {
    setProgress(input.value);
    valueInput.style.borderColor = "black";
    return;
  }
  valueInput.style.borderColor = "red";
};

input.addEventListener("input", function () {
  inputValueHandler(input.value);
});

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function hide(id) {
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
}

const rotateCheckbox = document.getElementById("rotateCheckbox");
const box = document.querySelector(".progress-ring__circle");

let angle = -90; // начальный угол
let intervalId;

// Функция, которая будет вызываться каждые 0.1 секунды
function rotateBox() {
  box.style.transform = `rotate(${angle}deg)`; // устанавливаем угол в CSS
  angle += 1; // увеличиваем угол на 1 градус
  if (angle > 270) {
    angle = -90; // сбрасываем угол на начальное значение после достижения 180 градусов
  }
}

rotateCheckbox.addEventListener("change", () => {
  if (rotateCheckbox.checked) {
    intervalId = setInterval(rotateBox, 0.05); // вызываем функцию rotateBox каждые 0.1 секунды
  } else {
    clearInterval(intervalId); // останавливаем интервал при выключении чекбокса
    box.style.transform = "rotate(-90deg)";
    inputValueHandler(input.value);
  }
});
