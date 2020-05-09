//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
var w = ctx.canvas.width;
var h = ctx.canvas.height;

//Initial variables
var startGame = false;
var pauseGame = false;
var gameOver = false;
var powerUp = 1;
var killPlayer = false;
var k = false;

//Mouse
var mouse = { x: 0, y: 0 };
ctx.canvas.onmousemove = function (evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
}
//Keeps track of whether the mouse is pressed down or clicked
var mouseDown = false;
ctx.canvas.onmousedown = function () {
  mouseDown = true;
}
ctx.canvas.onmouseup = function () {
  mouseDown = false;
}

//Start page
if (!startGame) {
  ctx.save();
  ctx.fillRect(0, 0, w, h);
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = "50pt sans-serif";
  ctx.fillText("Aspera", w / 2, h / 2 + 120);
  ctx.font = "15pt sans-serif";
  ctx.fillText("Click to shoot", w / 2, h / 2 - 100);
  ctx.fillText("WASD to move", w / 2, h / 2 - 75);
  ctx.fillText("Avoid enemies", w / 2, h / 2 - 50);
  ctx.fillText("Press P to pause", w / 2, h / 2 - 25);
  ctx.fillText("and K to kill yourself", w / 2, h / 2);
  ctx.font = "25pt sans-serif";
  ctx.fillText("Click and press B to begin", w / 2, h / 2 + 50);
  ctx.restore();
}

//Restart game
function restart(playerHealth, playerSize, playerSpeed, bulletHealth, reloadSpeed, bulletBounce, bulletDmg, recoil) {
  gameOver = false;
  world.player.explode = false;
  world.player.health = playerHealth;
  world.player.reloadDelay = reloadSpeed;
  world.player.x = w / 2;
  world.player.y = h / 2;
  world.player.vx = 0;
  world.player.vy = 0;
  world.player.size = playerSize;
  world.player.score = 0;
  world.player.moveSpeed = playerSpeed;
  oBHealth = bulletHealth;
  bBounce = bulletBounce;
  bDmg = bulletDmg;
  pRecoil = recoil;
}

//Konami
//Initialisation for konami
function konami() {
  var gameMode = Math.random() * 3;
  //gameOver = false;
  if (gameMode <= 1) {
    alert("Gamemode: tiny");
    restart(5, w / 200, w / world.frames / 20, 1, 0.05 * world.frames, false, 0.2, false);
  } else if (gameMode <= 2) {
    alert("Gamemode: huge");
    restart(50, w / 30, w / world.frames / 25, 5, 0.5 * world.frames, true, 1, true)
  } else if (gameMode <= 3) {
    alert("Gamemode: handicapped")
    restart(30, w / 100, 0, 2, 0.1 * world.frames, true, 1, true);
  }
  k = true;
}

var pBounce = 5;
var pRecoil = true;
var oBHealth = 1;
var bHealth = oBHealth;
//Player
function Player() {
  //Position of player
  this.x = w / 2;
  this.y = h / 2;
  //Velocity of player
  this.vx = 0;
  this.vy = 0;
  this.moveSpeed = w / world.frames / 25;
  this.maxMove = w / world.frames;
  this.friction = 0.9;
  //Size
  this.size = w / 100;
  //Shooting
  this.bulletSpeed = w / world.frames * 1.1;
  this.reloadDelay = 0.25 * world.frames;
  this.reloadReset = 0;
  //Self-explanatory
  this.health = 10;
  this.score = 0;
  this.opacity = 1;
  this.draw = function () {
    //Opacity 
    if (this.health != 0) {
      this.opacity = 1;
    } else {
      this.opacity = 0;
    }
    //Player is just a circle with a rectangle sticking out
    ctx.save();
    ctx.translate(this.x, this.y);
    //Rotates the player
    ctx.rotate(-this.angle * Math.PI / 180);
    //Renders the outline invisble
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    //Draws the circle 
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "rgba(50, 150, 50, " + this.opacity;
    ctx.fill();
    //Draws the rectangle
    ctx.fillRect(this.size * -0.5, this.size * -0.5, this.size * 2.5, this.size);
    ctx.restore();
  }
  this.move = function () {
    //Rotation
    var diffX = mouse.x - this.x;
    var diffY = mouse.y - this.y;
    var a = -Math.atan2(diffY, diffX);
    this.angle = a / Math.PI * 180;
    //Movement
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;
    //Moving right
    if (this.right) {
      this.vx += this.moveSpeed;
      this.vx = Math.min(this.maxMove, this.vx);
    }
    //Moving left
    if (this.left) {
      this.vx -= this.moveSpeed;
      this.vx = Math.max(-this.maxMove, this.vx);
    }
    //Moving up
    if (this.up) {
      this.vy -= this.moveSpeed;
      this.vy = Math.max(-this.maxMove, this.vy);
    }
    //Moving down
    if (this.down) {
      this.vy += this.moveSpeed;
      this.vy = Math.min(this.maxMove, this.vy);
    }
    //Don't go further than the walls
    if (this.x > w - this.size) {
      this.x = w - this.size;
      this.vx -= pBounce;
    }
    if (this.x < this.size) {
      this.x = this.size;
      this.vx += pBounce;
    }
    if (this.y < this.size) {
      this.y = this.size;
      this.vy += pBounce;
    }
    if (this.y > h - this.size) {
      this.y = h - this.size;
      this.vy -= pBounce;
    }
    //Shooting
    if (mouseDown && !this.reload && this.health != 0) {
      //Direction of bullet
      a = this.angle / 180 * Math.PI;
      var x = this.x;
      var y = this.y;
      var vx = Math.cos(a) * this.bulletSpeed;
      var vy = -Math.sin(a) * this.bulletSpeed;
      bHealth = Math.floor(this.score / 50) + oBHealth;
      if (Math.ceil(this.score / 50) >= 5) {
        bHealth = 5 + oBHealth;
      }
      //Shoot the bullet
      var bullet = new Bullet(x, y, vx, vy);
      world.bullets.push(bullet);
      //Recoil
      if (pRecoil) {
        this.vx += -vx * bullet.size / this.size;
        this.vy += -vy * bullet.size / this.size;
      }
      //Start reload timer
      this.reload = this.reloadDelay;
    }
    if (this.reload) {
      this.reload--;
    }
  }
}

var bBounce = false;
var bDmg = 1;
//Bullet
function Bullet(x, y, vx, vy) {
  //Position
  this.x = x;
  this.y = y;
  //Velocity
  this.vx = vx;
  this.vy = vy;
  //Size of bullet
  this.size = world.player.size / 2;
  //Dmg of bullet
  this.dmg = bDmg;
  //Health of bullet
  this.health = bHealth;
  this.draw = function () {
    //Bullet is a grey circle
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.restore();
  }
  this.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x - 1 <= this.size) {
      this.vx = -this.vx;
      this.health -= 1;
    }
    if (this.x + this.size + 1 >= w) {
      this.vx = -this.vx;
      this.health -= 1;
    }
    if (this.y - 1 <= this.size) {
      this.vy = -this.vy;
      this.health -= 1;
    }
    if (this.y + this.size + 1 >= h) {
      this.vy = -this.vy;
      this.health -= 1;
    }
    if (this.health <= 0) {
      this.dead = true;
    }
  }
}

//Enemy
function Enemy(x, y, dx, dy) {
  //Position of enemy
  this.x = x;
  this.y = y;
  //Velocity
  this.dx = dx;
  this.dy = dy;
  //Health
  this.health = 1;
  var health = this.health;
  //Size and colour change
  this.size = (Math.random() + 1) * (w / 100) + 5;
  //this.size += 5;
  var colour = "red";
  this.colour = colour;
  var colourTime = 1 * world.frames;
  colourTime *= Math.random() * 3 + 1;
  this.draw = function () {
    if (this.health != health) {
      this.size *= this.health;
      this.size += this.health * 5;
      health = this.health;
    }
    //Enemy starts as a red circle
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.restore();
  }
  this.move = function () {
    //Movement
    this.x += this.dx;
    this.y += this.dy;
    //Changing of colour
    if (colourTime <= 0) {
      colour = Math.random();
      if (colour <= 0.5) {
        colourTime = 1 * world.frames;
        colourTime *= Math.random() * 10 + 1;
        colour = "red";
        this.colour = colour;
      } else if (colour <= 0.9) {
        colourTime = 1 * world.frames;
        colourTime *= Math.random() * 10 + 1;
        colour = "rgba(131, 123, 6, 1)";
        this.colour = colour;
      } else {
        colourTime = 1 * world.frames;
        colourTime *= Math.random() * 10 + 1;
        colour = "rgba(67, 0, 96, 1)";
        this.colour = colour;
      }
    } else {
      colourTime--;
    }
    //Bounce off the walls
    if (this.x <= this.size) {
      this.dx = -this.dx;
      this.x = this.size;
    }
    if (this.x + this.size >= w) {
      this.dx = -this.dx;
      this.x = w - this.size;
    }
    if (this.y <= this.size) {
      this.dy = -this.dy;
      this.y = this.size;
    }
    if (this.y + this.size >= h) {
      this.dy = -this.dy;
      this.y = h - this.size;
    }
  }
  this.isOverlap = function (o2) {
    var o1 = this;
    var dx = o1.x - o2.x;
    var dy = o1.y - o2.y;
    var s = (o1.size + o2.size);
    var d = Math.sqrt(dx * dx + dy * dy);
    return (d <= s);
  }
}

//Particles
function Particle(x, y, colour) {
  //Position
  this.x = x;
  this.y = y;
  //Direction
  this.dx = Math.random() * 5 - Math.random() * 5;
  this.dy = Math.random() * 5 - Math.random() * 5;
  //Size
  this.size = 2;
  //Colour
  this.colour = colour;
  //Lifespan
  this.life = 1 * world.frames;
  this.life *= Math.random();
  this.draw = function () {
    //A particle is a dot with the object's colour
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.colour;
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.restore();
  }
  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.size >= w || this.x - this.size <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.size >= h || this.y - this.size <= 0) {
      this.dy = -this.dy;
    }
    if (this.life > 0) {
      this.life--;
    } else {
      this.dead = true;
    }
  }
}


//World
function World() {
  //Number of frames per second
  this.timeStep = 20;
  this.frames = 2000 / this.timeStep;
  this.spawnChance = 0.6 / this.frames;
  this.init = function () {
    this.player = new Player();
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
  }
  this.update = function () {
    this.spawn();
    this.draw();
    this.move();
    this.kill();
  }
  this.spawn = function () {
    //Chance of enemy spawning
    var chance = this.spawnChance;
    //Difficulty of game
    var difficulty = world.player.score / 2000;
    chance /= this.enemies.length;
    //Determines spawn location
    var c = Math.random();
    var exey = Math.random();
    if (c < 0.5) {
      if (Math.random() * 3 < chance + difficulty && this.player.health != 0 || this.enemies.length <= 3 && this.player.health != 0) {
        var x = Math.round(exey) * w;
        var y = Math.round(Math.random() * h)
        var dx = (difficulty + 10) * (Math.random() - 0.5) * (w / this.frames / 7);
        var dy = (difficulty + 10) * (Math.random() - 0.5) * (w / this.frames / 7);
        if (Math.abs(y - world.player.y) > 20) {
          this.enemies.push(new Enemy(x, y, dx, dy));
        }
      }
    } else if (c >= 0.5) {
      if (Math.random() < chance + difficulty && this.player.health != 0 || this.enemies.length < difficulty * 100 && this.player.health != 0) {
        var x = Math.floor(Math.random() * w);
        var y = Math.round(exey) * h;
        var dx = (difficulty + 10) * (Math.random() - 0.5) * (w / this.frames / 7);
        var dy = (difficulty + 10) * (Math.random() - 0.5) * (w / this.frames / 7);
        if (Math.abs(x - world.player.x) > 20) {
          this.enemies.push(new Enemy(x, y, dx, dy));
        }
      }
    }
  }
  this.draw = function () {
    //Clear the canvas
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
    //Displays score and health
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = '10pt Monaco';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Score = " + this.player.score, w * (9 / 10), h / 16);
    ctx.fillText("Health = " + this.player.health, w * (9 / 10), h / 16 + 20)
    ctx.restore();
    //Draw particles
    var pl = this.particles.length;
    for (let i = 0; i < pl; i++) {
      var p = this.particles[i];
      p.draw();
    }
    //Draw bullets
    var bl = this.bullets.length;
    for (let i = 0; i < bl; i++) {
      var b = this.bullets[i];
      b.draw();
    }
    //Draw enemies
    var el = this.enemies.length;
    for (let i = 0; i < el; i++) {
      var e = this.enemies[i];
      e.draw();
    }
    //Draw player
    this.player.draw();
  }
  this.move = function () {
    //Move player
    this.player.move();
    var bl = this.bullets.length;
    //Move bullet
    for (let i = 0; i < bl; i++) {
      var b = this.bullets[i];
      b.move();
    }
    var el = this.enemies.length;
    //Move enemy
    for (let i = 0; i < el; i++) {
      var e = this.enemies[i];
      e.move();
    }
    //Move particles
    var pl = this.particles.length;
    for (let i = 0; i < pl; i++) {
      var p = this.particles[i];
      p.move();
    }
  }
  this.kill = function () {
    l = this.enemies.length;
    //Checks for bullet-enemy collision
    for (let i = 0; i < l; i++) {
      var e = this.enemies[i];
      var bl = this.bullets.length;
      for (let j = 0; j < bl; j++) {
        var b = this.bullets[j];
        if (e.isOverlap(b)) {
          b.health -= 1;
          if (b.health == 0) {
            b.dead = true;
          }
          e.health -= b.dmg;
        }
        if (e.health <= 0) {
          e.dead = true;
        }
      }
      //Checks for player-enemy collision
      if (e.isOverlap(this.player)) {
        //Bounce off the enemy
        this.player.vx = e.dx;
        this.player.vy = e.dy;
        //Kill enemy when it hits player
        e.dead = true;
        //Decrease health by one
        this.player.health -= 1;
        //Release some particles
        var pn = Math.random() * 3 + 1;
        var x = this.player.x;
        var y = this.player.y;
        for (let i = 0; i < pn; i++) {
          this.particles.push(new Particle(x, y, "green"));
        }
      }
    }
    //If health is less than 0, set it to 0, useful when more than one enemy hits player on death
    if (this.player.health < 0) {
      this.player.health = 0;
    }
    //Make player explode
    if (this.player.explode && this.player.opacity != 0) {
      var pn = Math.random() * 40 + 10;
      var x = this.player.x;
      var y = this.player.y;
      for (let i = 0; i < pn; i++) {
        this.particles.push(new Particle(x, y, "green"));
      }
      this.player.explode = false;
      this.player.opacity = 0;
    }
    if (killPlayer) {
      this.player.health = 0;
      pauseGame = true;
    }
    //Kill player and end game 
    if (this.player.health == 0) {
      //Make all objects explode
      var l = this.enemies.length;
      for (let i = 0; i < l; i++) {
        e.dead = true;
      }
      l = this.bullets.length;
      for (let i = 0; i < l; i++) {
        var b = this.bullets[i];
        b.dead = true;
      }
      //End the game
      this.player.explode = true;
      gameOver = true;
      //Save highscore
      if (this.player.score > window.localStorage.getItem('highscore') && !k) {
        window.localStorage.setItem('highscore', this.player.score);
      }
      if (this.player.restart && this.enemies.length == 0) {
        this.player.restart = false;
        if (!k) {
          restart(10, w / 100, w / world.frames, 1, 0.3 * this.frames, false, 1, true);
        } else {
          konami();
        }
      }
      killPlayer = false;
    }
    //Kill enemy
    var l = this.enemies.length;
    for (let i = l - 1; i >= 0; i--) {
      var e = this.enemies[i];
      if (e.dead) {
        if (e.colour == "red") {
          world.player.score += 1;
        } else if (e.colour == "rgba(131, 123, 6, 1)") {
          world.player.score += 5;
        } else if (e.colour == "rgba(67, 0, 96, 1)") {
          world.player.score += 10;
        }
        //Make enemy explode
        var pn = Math.random() * 40 + 10;
        var x = e.x;
        var y = e.y;
        for (let j = 0; j < pn; j++) {
          this.particles.push(new Particle(x, y, e.colour));
        }
        //Remove enemy from array
        this.enemies.splice(i, 1);
      }
    }
    l = this.bullets.length;
    for (let i = l - 1; i >= 0; i--) {
      var b = this.bullets[i];
      //Kill bullet
      if (b.dead) {
        //Make bullet explode
        var x = b.x;
        var y = b.y;
        for (let j = 0; j < 4; j++) {
          this.particles.push(new Particle(x, y, "grey"));
        }
        //Remove bullet from array
        this.bullets.splice(i, 1);
      }
    }
    //Kill particle
    l = this.particles.length;
    for (let i = l - 1; i >= 0; i--) {
      var p = this.particles[i];
      if (p.dead) {
        //Remove particle from array
        this.particles.splice(i, 1);
      }
    }
  }
}

var cursor = 0;
//Keeps track of which key is pressed down
ctx.canvas.contentEditable = true;
ctx.canvas.onkeydown = function (evt) {
  if (evt.keyCode == 39 || evt.keyCode == 68) {
    world.player.right = true;
    evt.preventDefault();
  }
  if (evt.keyCode == 37 || evt.keyCode == 65) {
    world.player.left = true;
    evt.preventDefault();
  }
  if (evt.keyCode == 38 || evt.keyCode == 87) {
    world.player.up = true;
    evt.preventDefault();
  }
  if (evt.keyCode == 40 || evt.keyCode == 83) {
    world.player.down = true;
    evt.preventDefault();
  }
  if (evt.keyCode == 82) {
    world.player.restart = true;
    evt.preventDefault();
  }
  if (evt.keyCode == 66) {
    startGame = true;
    evt.preventDefault();
  }
  if (evt.keyCode == 75) {
    if (startGame && !gameOver) {
      killPlayer = window.confirm("Are you sure you want to kill your player?");
    }
  }
}
//Keeps track of which key has been released
ctx.canvas.onkeyup = function (evt) {
  if (evt.keyCode == 39 || evt.keyCode == 68) {
    world.player.right = false;
  }
  if (evt.keyCode == 37 || evt.keyCode == 65) {
    world.player.left = false;
  }
  if (evt.keyCode == 38 || evt.keyCode == 87) {
    world.player.up = false;
  }
  if (evt.keyCode == 40 || evt.keyCode == 83) {
    world.player.down = false;
  }
  if (evt.keyCode == 82) {
    world.player.restart = false;
  }
  if (evt.keyCode == 80) {
    if (pauseGame) {
      pauseGame = false;
    } else {
      pauseGame = true;
    }
  }
  if (gameOver) {
    const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    cursor = (evt.keyCode == KONAMI_CODE[cursor]) ? cursor + 1 : 0;
    if (cursor == KONAMI_CODE.length) {
      if (world.enemies.length == 0) {
        if (!k) {
          konami();
          k = true;
        } else {
          alert("Gamemode: normal");
          restart(5, w / 100, w / world.frames / 25, 1, 0.3 * world.frames, false, 1, true);
          k = false;
        }
      }
      cursor = 0;
    }
  }
}

//Initialisation
var world = new World();
world.init();
/*if (!pauseGame && startGame || gameOver) {
  world.update();
}*/


// Animation loop
var cmTID;
function updateAll() {
  if (!pauseGame && startGame || gameOver) {
    world.update();
  }
  cmTID = setTimeout(updateAll, world.timeStep);
  if (gameOver) {
    ctx.save();
    ctx.font = '48pt sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', w / 2, h / 2);
    ctx.font = '15pt sans-serif';
    ctx.fillText('Highscore: ' + localStorage.getItem("highscore"), w / 2, h / 2 + 45);
    ctx.font = "12pt sans-serif";
    if (!k) {
      ctx.fillText("Died February 25, 2020. Google that.", w / 2, h / 2 + 70);
    } else {
      ctx.fillText("RIP Kazuhisa Hashimoto, 1958-2020.", w / 2, h / 2 + 70);
    }
    ctx.font = '24pt sans-serif';
    ctx.fillText('Press R to restart', w / 2, h / 2 + 100);
    ctx.restore();
  }
}
updateAll();