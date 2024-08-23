const data = [
  "c",
  "o",
  "n",
  "s",
  "t",
  "&nbsp;",
  "n",
  "u",
  "m",
  "&nbsp;",
  "=",
  "&nbsp;",
  "2",
  "9",
  ";",
  "&nbsp;",
  "l",
  "e",
  "t",
  "&nbsp;",
  "i",
  "s",
  "P",
  "r",
  "i",
  "m",
  "e",
  "&nbsp;",
  "=",
  "&nbsp;",
  "t",
  "r",
  "u",
  "e",
  ";",
  "&nbsp;",
  "i",
  "f",
  "&nbsp;",
  "(",
  "n",
  "u",
  "m",
  "&nbsp;",
  "<",
  "&nbsp;",
  "2",
  ")",
  "&nbsp;",
  "{",
  "i",
  "s",
  "P",
  "r",
  "i",
  "m",
  "e",
  "&nbsp;",
  "=",
  "&nbsp;",
  "f",
  "a",
  "l",
  "s",
  "e",
  ";",
  "}",
  "&nbsp;",
  "f",
  "o",
  "r",
  "&nbsp;",
  "(",
  "l",
  "e",
  "t",
  "&nbsp;",
  "i",
  "&nbsp;",
  "=",
  "&nbsp;",
  "2",
  ";",
  "&nbsp;",
  "i",
  "&nbsp;",
  "<",
  "&nbsp;",
  "n",
  "u",
  "m",
  ";",
  "&nbsp;",
  "i",
  "++",
  ")",
  "&nbsp;",
  "{",
  "i",
  "f",
  "&nbsp;",
  "(",
  "n",
  "u",
  "m",
  "&nbsp;",
  "%",
  "&nbsp;",
  "i",
  "&nbsp;",
  "===",
  "&nbsp;",
  "0",
  ")",
  "&nbsp;",
  "{",
  "i",
  "s",
  "P",
  "r",
  "i",
  "m",
  "e",
  "&nbsp;",
  "=",
  "&nbsp;",
  "f",
  "a",
  "l",
  "s",
  "e",
  ";",
  "&nbsp;",
  "b",
  "r",
  "e",
  "a",
  "k",
  ";",
  "}",
  "}",
  "&nbsp;",
  "i",
  "f",
  "&nbsp;",
  "(",
  "i",
  "s",
  "P",
  "r",
  "i",
  "m",
  "e",
  ")",
  "&nbsp;",
  "{",
  "c",
  "o",
  "n",
  "s",
  "o",
  "l",
  "e",
  ".",
  "l",
  "o",
  "g",
  "(",
  "'",
  "P",
  "r",
  "i",
  "m",
  "e",
  "&nbsp;",
  "n",
  "u",
  "m",
  "b",
  "e",
  "r",
  "'",
  ")",
  ";",
  "}",
  "&nbsp;",
  "e",
  "l",
  "s",
  "e",
  "&nbsp;",
  "{",
  "c",
  "o",
  "n",
  "s",
  "o",
  "l",
  "e",
  ".",
  "l",
  "o",
  "g",
  "(",
  "'",
  "N",
  "o",
  "t",
  "&nbsp;",
  "a",
  "&nbsp;",
  "p",
  "r",
  "i",
  "m",
  "e",
  "&nbsp;",
  "n",
  "u",
  "m",
  "b",
  "e",
  "r",
  "'",
  ")",
  ";",
  "}",
];

const $main = document.querySelector("main");
const $word = document.getElementById("word");
const $time = document.getElementById("time");
const $result = document.querySelector(".result");
const $wpm = document.getElementById("wpm");
const $accuracy = document.getElementById("accuracy");
const scores = {
  time: 30,
  correct: 0,
  errors: 0,
};
let interval;
let run = false;
let $letters = null;
let count = 0;

function firstRender() {
  data.forEach((element) => {
    let $letter = `<letter>${element}</letter>`;
    $word.insertAdjacentHTML("beforeend", $letter);
  });
  $letters = document.querySelectorAll("letter");
  $letters[0].classList.add("active");
}
function initialGame() {
  interval = setInterval(() => {
    if (scores.time === 0) EndGame();
    scores.time--;
    $time.innerText = scores.time;
  }, 1000);
}
function write(e) {
  let key = e.key;
  if (key === "Delete") {
    // for (let i of data) {
    //   console.log(i);

    //   if (i !== "&nbsp;") {
    //     $letters[count].classList.remove("active");
    //     count--;
    //     $letters[count].classList = "";
    //     $letters[count].classList.add("active");
    //   } else {
    //     return;
    //   }
    // }
    return;
  }

  $letters[count].classList.remove("active");
  //letra correcta
  if (key === data[count]) {
    $letters[count].classList.add("success");
    scores.correct++;
  }
  //letra incorrecta
  else {
    if (e.code === "Space" && data[count] === "&nbsp;") {
      scores.correct++;
    } else {
      scores.errors++;
      $letters[count].classList.add("danger");
    }
  }
  //validar el fin del juego
  if (count === $letters.length - 1) {
    EndGame();
    return;
  }
  count++;
  $letters[count].classList.add("active");
}
function deleteLetter(e) {
  if (count === 0) return;

  if (e.key === "Backspace") {
    $letters[count].classList.remove("active");
    count--;

    $letters[count].classList[0] === "success"
      ? scores.correct--
      : scores.errors--;

    $letters[count].classList = "";
    $letters[count].classList.add("active");
    return;
  }
}
function EndGame() {
  clearInterval(interval);
  let wpm = scores.correct / 5 / ((30 - scores.time) / 60);
  let accuracy = ((scores.correct / data.length) * 100).toFixed(2);

  $wpm.innerText = wpm;
  $accuracy.innerText = accuracy;
  $main.classList.add("d-none");
  $result.classList.remove("d-none");
}

function resetGame() {
  count = 0;
  run = false;
  scores.time = 30;
  scores.correct = 0;
  scores.errors = 0;
  $word.innerHTML = "";
  $time.innerText = "30";
  firstRender();

  $main.classList.remove("d-none");
  $result.classList.add("d-none");
}

firstRender();
document.addEventListener("keypress", (e) => {
  write(e);
  if (run === false) {
    initialGame();
    run = true;
  }
});
document.addEventListener("keydown", deleteLetter);

document.addEventListener("click", (e) => {
  if (e.target.matches(".result__reset")) {
    resetGame();
  }
});
