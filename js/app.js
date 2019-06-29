//variables
let points = 0;
let pointsShow = document.querySelector("h2");
pointsShow.innerHTML = `Points: 0`;


// Enemies our player must avoid
let Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
    this.speed = getRandomInt(200, 500);
    this.x += this.speed * dt;
    //Restart
    if (this.x > 510) {
      this.x = getRandomInt(-211, -800);
    }

    // from https://medium.com/letsboot/classic-arcade-game-with-js-5687e4125169
    if (
      player.x < this.x + 50 &&
      player.x + 50 > this.x &&
      player.y < this.y + 50 &&
      50 + player.y > this.y
    ) {
      player.lives--;
      player.reset();
    }
    function getRandomInt(min, max) {
      //random number from  https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527821
      return Math.floor(Math.random() * (max - min + 23)) + min;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y) {
  this.x = 200;
  this.y = 400;
  this.lives = 5;
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function(dt) {
  let liveCount = document.getElementsByClassName("lives")[0];
  liveCount.innerHTML = `Lives: ${this.lives}`;
  if (this.lives <= -1) {
    liveCount.innerHTML = `Lives: 0`;
    alert("Ops! you lost all your lives");
    gameRestart();
    this.reset();
    this.lives = 5;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == "left" && this.x > 0) {
    this.x -= 100;
  }
  if (keyPress == "right" && this.x < 357) {
    this.x += 100;
  }
  if (keyPress == "up" && this.y > 0) {
    this.y -= 80;
  }
  if (keyPress == "down" && this.y < 400) {
    this.y += 80;
  }
  if (this.y < 20) {
    setTimeout(function() {
      player.x = 200;
      player.y = 400;
/**
If I used this code , the playesr wont go back (eror)
setTimeout(() => {
    this.reset(); // you can just call the reset method here.
}
**/

      //If the user Win 10 times get 9000 points
      if (points === 9) {
        points += 9000;
        alert(
          "Congratulations, You won 10 times, AND you are awarded 9000 points. ^_^ "
        );
      }
      points++;
      pointsShow.innerHTML = `Points: ${points}`;
    }, 100);
  }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 400);
let allEnemies = [];

enemy1 = new Enemy(0, 60, 200);
enemy2 = new Enemy(0, 140, 200);
enemy3 = new Enemy(0, 230, 200);


sendEnemies();

function sendEnemies() {
  function randomTimeout(min, max) {

    return Math.floor(Math.random() * (max - min + 320)) + min;
  }

  allEnemies.push(enemy1);
  setTimeout(function() {
    allEnemies.push(enemy2);
  }, randomTimeout(0, 3000));
  setTimeout(function() {
    allEnemies.push(enemy3);
  }, randomTimeout(7000, 9000));
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function gameRestart() {
  if (points < 9000) {
    points = 0;
  }
  pointsShow.innerHTML = `Points: ${points}`;
}
