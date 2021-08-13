

const ship = document.getElementById("ship");
const stone = document.getElementById("stone");
const scoreSpan = document.getElementById("score");
const bump = document.getElementById("bump");
const timer = document.getElementById("timer");
const gaming = document.getElementById("gaming");
const gameOver = document.getElementById("gameOver");

var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    width = win.innerWidth || docElem.clientWidth || body.clientWidth,
    height = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

const shipSize = 100;

let shipX = 0;
let shipY = (height - shipSize) / 2
let stoneX = 0;
let stoneY = 0;
let shipDirection = 0;
let stoneDirection = [true, true];
let speed = 10;
let stoneSpeed = 30;

let score = 0;
let time = 60;

const moving = (s) => {
  return setInterval(() => {
    ship.style.top = `${shipY}px`;
    ship.style.left = `${shipX}px`;
    if (shipDirection === 0) {
      shipX = shipX + s;
    } else {
      shipX = shipX - s;
    }
    if (shipX > width - shipSize) {
      shipDirection = 1;
    }
    if (shipX < 0) {
      shipDirection = 0;
    }
    if (bump.innerHTML !== "BUMP!!!") {
      if (stoneY > shipY - 50 && stoneY < shipY + 50) {
        // console.log('middle')
        if (Math.abs(stoneX - shipX) < 100) {
          // console.log('bump');
          bump.innerHTML = "BUMP!!!";
          score = score - 50;
          setInterval(() => {
            bump.innerHTML = "";
          }, 1000);
        }
      }
    }
  }, 50);
};

let slowInstance = moving(speed);

ship.addEventListener("click", () => {
  //   speed = 50;
  clearInterval(slowInstance);
  const fast = moving(80);
  setTimeout(() => {
    clearInterval(fast);
    slowInstance = moving(speed);
  }, 250);
});

setInterval(() => {
  if (time > 0) {
    stone.style.left = `${stoneX}px`;
    stone.style.top = `${stoneY}px`;

    const stoneDirectionX = stoneDirection[0] ? 1 : -1;
    const stoneDirectionY = stoneDirection[1] ? 1 : -1;

    stoneX = stoneX + stoneDirectionX * stoneSpeed;
    stoneY = stoneY + stoneDirectionY * stoneSpeed;

    if (stoneY > height - shipSize) {
      stoneDirection = [stoneDirection[0], !stoneDirection[1]];
    }
    if (stoneX > width - shipSize) {
      stoneDirection = [!stoneDirection[0], stoneDirection[1]];
    }
    if (stoneY < 0) {
      stoneDirection = [stoneDirection[0], !stoneDirection[1]];
    }
    if (stoneX < 0) {
      stoneDirection = [!stoneDirection[0], stoneDirection[1]];
    }
  }
}, 50);

setInterval(() => {
  if (time > 0) {
    score = score + 1;
    scoreSpan.innerHTML = `${score}`;
  }
}, 100);

setInterval(() => {
  if (time > 0) {
    timer.innerHTML = time;
    time = time - 1;
    if (timer === 0) {
    }
  } else {
    gaming.style.display = "none";
    gameOver.style.display = "block";
  }
}, 1000);
``;
