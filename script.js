const score = document.querySelector('.score');
const message = document.querySelector('.message');
const road = document.querySelector('.road');

document.addEventListener('keydown', keyDown);
document.addEventListener("keyup", keyUp);

// console.log(road);

let keys = { ArrowUp : false, ArrowDown: false, ArrowLeft: false, ArrowRight: false};

console.log(keys);

function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    console.log(e.key);
    console.log(keys);
}


function keyUp(e) {
  e.preventDefault();
  keys[e.key]=false;
  console.log(e.key);
  console.log(keys);
}

