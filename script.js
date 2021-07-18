const score = document.querySelector(".score");
const message = document.querySelector(".message");
const road = document.querySelector(".road");

console.log(road);

message.addEventListener("click", gameStart);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let player = {};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

console.log(keys);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  console.log(keys);
}

function gamePlay() {
  console.log("hey i am clicked");
  if (player.start) {
    window.requestAnimationFrame(gamePlay);
  }
}

function gameStart() {
  road.classList.remove("hide");
  message.classList.add("hide");
  player.start = true;
  window.requestAnimationFrame(gamePlay);

  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  road.appendChild(car);
}
