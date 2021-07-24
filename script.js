
// Variable has been assing to different classes from HTML

const score = document.querySelector(".score");
const message = document.querySelector(".message");
const road = document.querySelector(".road");
const previousScore = document.querySelector(".previousScore");

// On clicking the text game will start
message.addEventListener("click", gameStart);

// Which Key has been pressed
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Object to initialise the speed of game and score
let player = {
  speed: 5,
  score: 0,
};

// Initially all the key status are assigned as false
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

// When a key is pressed it makes the status of that key as true
function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
}

// When the key is released it makes the statusof the key as false
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

// This function gives the instruction when your car overlap other car.
function collide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left ||
    aRect.bottom < bRect.top
  );
}

// Animation for moving the lines at the center of the road
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

// Animation to move and apper the normal car's on the road 
function moveEnemyCar(car) {
  let enemy = document.querySelectorAll(".enemy");

  enemy.forEach(function (item) {
    if (collide(car, item)) {
      console.log("Hit Hit Hit");
      endGame();
    }

    if (item.y >= 800) {
      item.y -= 1000;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

// Instruction for the User (Main) car to move using arrow keys
function gamePlay() {
  let car = document.querySelector(".car");
  let position = road.getBoundingClientRect();
  if (player.start) {
    moveLines();
    moveEnemyCar(car);

    if (keys.ArrowUp && player.y > position.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < position.bottom - 85) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < position.width - 60) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    // Repeate the animation
    window.requestAnimationFrame(gamePlay);

    // To display the score
    finalScore = player.score++;
    
    // To store the display the previous score
    localStorage.setItem("previousScore", finalScore);

    score.innerText = "Current Score : " + finalScore;
  }
}

let pScore = localStorage.getItem("previousScore");
previousScore.innerText = "Previous Score : " + pScore;

// Speed of the game increase in every 5sec
function speedIncrease() {
  currentSpeed = setInterval(function () {
    console.log("Current Speed : " + player.speed);
    player.speed++;
  }, 5000);
}

function randomColor() {
  function c(){
    let hex = Math.floor(Math.random()* 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
} 

// function enemyCarImage() {
//   let arr = [
//     "images/car1.png",
//     "images/car2.png",
//     "images/car3.png",
//     "images/car4.png",
//     "images/car5.png",
//     "images/car6.png",
//   ];
//   let randomCar = Math.floor(Math.random() * arr.length);
//   let rc = arr[randomCar];
//   return "'(url(" + rc + "))'";
//   // return console.log (rc);
// }

// Display and Change name 
function cName() {
  var nameAlert = prompt("Enter Your Name");
  localStorage.setItem("name", nameAlert);
  var storedName = localStorage.getItem("name");
  document.querySelector(".name").innerHTML = storedName;
}

// Displays the name stored , when page reloads
function showName() {
  document.querySelector(".name").innerHTML = localStorage.getItem("name");
}

showName();

// Changes the message form start to game over when car hit's
function endGame() {
  player.start = false;
  message.classList.remove("hide");
  message.innerHTML =
    "Game Over <br> Your final Score is " +
    (finalScore + 1) +
    " Press here to restart the Game.";
}

// Make sure is the player DOMRectReadOnly and start's all the animations and hides the start message . 
function gameStart() {
  message.classList.add("hide");
  road.innerHTML = "";
  player.start = true;
  window.requestAnimationFrame(gamePlay);
  player.score = 0;
  player.speed = 5;

  let pScore = localStorage.getItem("previousScore");
  previousScore.innerText = "Previous Score : " + pScore;

  speedIncrease();

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

  // Giving positions to the enemy car and the animation
  for (let i = 0; i < 3; i++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (i + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomColor();
    // enemyCar.style.backgroundImage = "url(images/car.png)";
    // enemyCar.style.background=enemyCarImage();
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    road.appendChild(enemyCar);
  }
}
