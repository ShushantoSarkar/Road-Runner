const score = document.querySelector(".score");
const message = document.querySelector(".message");
const road = document.querySelector(".road");

message.addEventListener("click", gameStart);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let player = {
  speed: 5,
  score: 0,
};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  console.log(e.key);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function collide(a,b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left ||
    aRect.bottom < bRect.top
  );
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");

  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function moveEnemyCar(car) {
  let enemy = document.querySelectorAll(".enemy");

  enemy.forEach(function (item) {
    if (collide(car, item)) {
      console.log("hit Hit HIt");
    }

    if (item.y >= 800) {
      item.y -= 1000;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function gamePlay() {
  let car = document.querySelector(".car");
  let position = road.getBoundingClientRect();
  if (player.start) {
    moveLines();
    moveEnemyCar(car);

    if (keys.ArrowUp && player.y > position.top + 70) {
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
    // console.log(player.score++);

    // player.score++;
    // score.innerText = "Score : " + player.score;
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
    roadLine.y = i * 150;
    roadLine.style.top = roadLine.y + "px";
    road.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  road.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (let i = 0; i < 3; i++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (i + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    road.appendChild(enemyCar);
  }
}
