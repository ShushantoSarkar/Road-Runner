const score = document.querySelector(".score");
const message = document.querySelector(".message");
const road = document.querySelector(".road");

message.addEventListener("click", gameStart);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let player = { speed: 5 };

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function gamePlay() {
  let car = document.querySelector(".car");
  let position = road.getBoundingClientRect();
  console.log(position);
  if (player.start) {
    if (keys.ArrowUp && player.y > position.top + 100) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < position.bottom - 70) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < position.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
  }
}

function gameStart() {
  road.classList.remove("hide");
  message.classList.add("hide");
  player.start = true;
  window.requestAnimationFrame(gamePlay);

  for (let i = 0; i < 5; i++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.style.top = (i*150) +"px";
    road.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  road.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  console.log("top " + car.offsetTop);
  console.log("left " + car.offsetLeft);
}
