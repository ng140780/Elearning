# CM1005 Complete Course Content - Weeks 3-20

This document contains the complete lesson content for all remaining weeks of the CM1005 course.

---

# WEEK 3: Variables and Data Types

## What are Variables?

Variables are containers that store data values. Think of them as labeled boxes where you can put information.

```javascript
let score = 0;
let playerName = "Space Explorer";
let isGameOver = false;
```

## Declaring Variables

Use `let` to declare variables:

```javascript
let x = 100;        // Number
let name = "Alice"; // String
let active = true;  // Boolean
```

## Data Types

### Numbers
```javascript
let age = 25;
let price = 19.99;
let temperature = -5;
```

### Strings
```javascript
let message = "Hello, World!";
let firstName = 'John';
```

### Booleans
```javascript
let isLoggedIn = true;
let hasWon = false;
```

## Variables in Action

```javascript
let spaceshipX = 400;
let spaceshipY = 300;

function draw() {
  background(0);
  ellipse(spaceshipX, spaceshipY, 50, 50);
}
```

## Updating Variables

```javascript
let score = 0;
score = score + 10;  // Now score is 10
score += 5;          // Now score is 15
```

## Week 3 Project: Moving Spaceship

```javascript
let spaceshipX = 400;
let spaceshipY = 300;
let speed = 2;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Move spaceship
  spaceshipX += speed;
  
  // Wrap around screen
  if (spaceshipX > width) {
    spaceshipX = 0;
  }
  
  // Draw spaceship
  fill(200, 200, 255);
  triangle(spaceshipX, spaceshipY - 20, 
           spaceshipX - 15, spaceshipY + 20, 
           spaceshipX + 15, spaceshipY + 20);
}
```

---

# WEEK 4: Interaction and Input

## Mouse Variables

p5.js provides built-in variables for mouse position:

```javascript
mouseX    // Current mouse X position
mouseY    // Current mouse Y position
pmouseX   // Previous frame mouse X
pmouseY   // Previous frame mouse Y
```

## Following the Mouse

```javascript
function draw() {
  background(0);
  ellipse(mouseX, mouseY, 50, 50);
}
```

## Keyboard Input

### Check if key is pressed
```javascript
if (keyIsDown(LEFT_ARROW)) {
  // Move left
}
```

### Key codes
```javascript
LEFT_ARROW  = 37
UP_ARROW    = 38
RIGHT_ARROW = 39
DOWN_ARROW  = 40
```

## Week 4 Project: Keyboard-Controlled Spaceship

```javascript
let spaceshipX = 400;
let spaceshipY = 300;
let speed = 5;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) {
    spaceshipX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spaceshipX += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    spaceshipY -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    spaceshipY += speed;
  }
  
  // Boundary checking
  spaceshipX = constrain(spaceshipX, 0, width);
  spaceshipY = constrain(spaceshipY, 0, height);
  
  // Draw spaceship
  fill(200, 200, 255);
  triangle(spaceshipX, spaceshipY - 20,
           spaceshipX - 15, spaceshipY + 20,
           spaceshipX + 15, spaceshipY + 20);
}
```

---

# WEEK 5: Objects and Properties

## What are Objects?

Objects group related data together:

```javascript
let spaceship = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255]
};
```

## Accessing Properties

```javascript
console.log(spaceship.x);      // 400
console.log(spaceship.color);  // [200, 200, 255]
```

## Updating Properties

```javascript
spaceship.x = 500;
spaceship.y += 10;
```

## Week 5 Project: Player Object

```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255]
};

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
  
  // Boundaries
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
  
  // Draw player
  fill(player.color[0], player.color[1], player.color[2]);
  triangle(player.x, player.y - player.size/2,
           player.x - player.size/3, player.y + player.size/2,
           player.x + player.size/3, player.y + player.size/2);
}
```

---

# WEEK 6: Conditional Statements

## If Statements

```javascript
if (condition) {
  // Code to run if condition is true
}
```

## If-Else

```javascript
if (score > 100) {
  console.log("You win!");
} else {
  console.log("Keep playing!");
}
```

## Comparison Operators

```javascript
==   // Equal to
===  // Strict equal (value and type)
!=   // Not equal
<    // Less than
>    // Greater than
<=   // Less than or equal
>=   // Greater than or equal
```

## Logical Operators

```javascript
&&   // AND
||   // OR
!    // NOT
```

## Week 6 Project: Collision Detection

```javascript
let player = { x: 400, y: 300, size: 30 };
let star = { x: 200, y: 200, size: 20 };
let score = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;
  
  // Collision detection
  let distance = dist(player.x, player.y, star.x, star.y);
  if (distance < player.size/2 + star.size/2) {
    // Collision! Respawn star
    star.x = random(width);
    star.y = random(height);
    score += 10;
  }
  
  // Draw star
  fill(255, 255, 0);
  ellipse(star.x, star.y, star.size, star.size);
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
  
  // Draw score
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
```

---

# WEEK 7: Arrays Basics

## What are Arrays?

Arrays store multiple values in a single variable:

```javascript
let scores = [100, 85, 92, 78, 95];
let names = ["Alice", "Bob", "Charlie"];
```

## Accessing Elements

```javascript
console.log(scores[0]);  // 100 (first element)
console.log(scores[2]);  // 92 (third element)
```

**Note:** Arrays are 0-indexed (first element is at index 0)

## Array Length

```javascript
let length = scores.length;  // 5
```

## Adding and Removing Elements

```javascript
scores.push(88);     // Add to end
scores.pop();        // Remove from end
scores.unshift(90);  // Add to beginning
scores.shift();      // Remove from beginning
```

## Week 7 Project: Multiple Stars

```javascript
let player = { x: 400, y: 300, size: 30 };
let stars = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  
  // Create 5 stars
  for (let i = 0; i < 5; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: 20
    });
  }
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;
  
  // Check collisions with each star
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let distance = dist(player.x, player.y, star.x, star.y);
    
    if (distance < player.size/2 + star.size/2) {
      // Respawn star
      star.x = random(width);
      star.y = random(height);
      score += 10;
    }
    
    // Draw star
    fill(255, 255, 0);
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
  
  // Draw score
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
```

---

# WEEK 8: For Loops

## For Loop Syntax

```javascript
for (initialization; condition; increment) {
  // Code to repeat
}
```

## Example

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // Prints: 0, 1, 2, 3, 4
}
```

## Drawing with Loops

```javascript
function draw() {
  background(255);
  
  // Draw 10 circles in a row
  for (let i = 0; i < 10; i++) {
    let x = i * 50 + 25;
    ellipse(x, 200, 40, 40);
  }
}
```

## Week 8 Project: Star Field with Loop

```javascript
let player = { x: 400, y: 300, size: 30 };
let stars = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  
  // Create stars using loop
  for (let i = 0; i < 20; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(10, 25)
    });
  }
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;
  
  // Draw and check all stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let distance = dist(player.x, player.y, star.x, star.y);
    
    if (distance < player.size/2 + star.size/2) {
      star.x = random(width);
      star.y = random(height);
      score += 10;
    }
    
    fill(255, 255, 0);
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
  
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
```

---

# WEEK 9-10: Array Traversal and Nested Loops

## Traversing Arrays

```javascript
let numbers = [10, 20, 30, 40, 50];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

## Nested Loops

```javascript
// Draw a grid
for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 5; col++) {
    let x = col * 50 + 25;
    let y = row * 50 + 25;
    ellipse(x, y, 40, 40);
  }
}
```

## Week 9-10 Project: Animated Star Field

```javascript
let player = { x: 400, y: 300, size: 30 };
let stars = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  
  for (let i = 0; i < 30; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(10, 25),
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;
  
  // Update and draw stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    
    // Move star
    star.x += star.speedX;
    star.y += star.speedY;
    
    // Wrap around edges
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;
    
    // Check collision
    let distance = dist(player.x, player.y, star.x, star.y);
    if (distance < player.size/2 + star.size/2) {
      star.x = random(width);
      star.y = random(height);
      score += 10;
    }
    
    fill(255, 255, 0);
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
  
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
```

---

# WEEK 11-12: Functions

## What are Functions?

Functions are reusable blocks of code:

```javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alice");  // Hello, Alice!
greet("Bob");    // Hello, Bob!
```

## Return Values

```javascript
function add(a, b) {
  return a + b;
}

let result = add(5, 3);  // result is 8
```

## Week 11-12 Project: Refactored Game

```javascript
let player;
let stars = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  player = createPlayer(400, 300);
  
  for (let i = 0; i < 30; i++) {
    stars.push(createStar());
  }
}

function draw() {
  background(0);
  handleInput();
  updateStars();
  checkCollisions();
  drawStars();
  drawPlayer();
  drawScore();
}

function createPlayer(x, y) {
  return {
    x: x,
    y: y,
    size: 30,
    speed: 5
  };
}

function createStar() {
  return {
    x: random(width),
    y: random(height),
    size: random(10, 25),
    speedX: random(-2, 2),
    speedY: random(-2, 2)
  };
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
  
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

function updateStars() {
  for (let star of stars) {
    star.x += star.speedX;
    star.y += star.speedY;
    
    if (star.x < 0 || star.x > width) star.speedX *= -1;
    if (star.y < 0 || star.y > height) star.speedY *= -1;
  }
}

function checkCollisions() {
  for (let star of stars) {
    let distance = dist(player.x, player.y, star.x, star.y);
    if (distance < player.size/2 + star.size/2) {
      star.x = random(width);
      star.y = random(height);
      score += 10;
    }
  }
}

function drawStars() {
  fill(255, 255, 0);
  for (let star of stars) {
    ellipse(star.x, star.y, star.size, star.size);
  }
}

function drawPlayer() {
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
}

function drawScore() {
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
```

---

# WEEK 13-14: 2D Arrays and Advanced Methods

## 2D Arrays

```javascript
let grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(grid[1][2]);  // 6 (row 1, column 2)
```

## Advanced Array Methods

```javascript
let numbers = [1, 2, 3, 4, 5];

// map - transform each element
let doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// filter - keep elements that pass a test
let evens = numbers.filter(n => n % 2 === 0);  // [2, 4]

// find - find first element that passes test
let found = numbers.find(n => n > 3);  // 4
```

## Week 13-14 Project: Grid-Based Level

```javascript
let player = { x: 0, y: 0, size: 30 };
let level = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1],
  [0, 1, 0, 0, 1],
  [0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0]
];

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  
  let cellSize = width / level.length;
  
  // Draw grid
  for (let row = 0; row < level.length; row++) {
    for (let col = 0; col < level[row].length; col++) {
      if (level[row][col] === 1) {
        fill(100, 100, 150);
      } else {
        fill(50, 50, 80);
      }
      rect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.x * cellSize + cellSize/2,
          player.y * cellSize + cellSize/2,
          player.size, player.size);
}

function keyPressed() {
  if (keyCode === UP_ARROW && player.y > 0) {
    if (level[player.y - 1][player.x] === 0) {
      player.y--;
    }
  }
  if (keyCode === DOWN_ARROW && player.y < level.length - 1) {
    if (level[player.y + 1][player.x] === 0) {
      player.y++;
    }
  }
  if (keyCode === LEFT_ARROW && player.x > 0) {
    if (level[player.y][player.x - 1] === 0) {
      player.x--;
    }
  }
  if (keyCode === RIGHT_ARROW && player.x < level[0].length - 1) {
    if (level[player.y][player.x + 1] === 0) {
      player.x++;
    }
  }
}
```

---

# WEEK 15-16: Object Methods and p5.Vector

## Object Methods

```javascript
let player = {
  x: 400,
  y: 300,
  size: 30,
  
  move: function(dx, dy) {
    this.x += dx;
    this.y += dy;
  },
  
  draw: function() {
    fill(200, 200, 255);
    ellipse(this.x, this.y, this.size, this.size);
  }
};

player.move(5, 0);
player.draw();
```

## p5.Vector

Vectors represent position, velocity, or direction:

```javascript
let position = createVector(100, 200);
let velocity = createVector(2, 3);

function draw() {
  position.add(velocity);
  ellipse(position.x, position.y, 50, 50);
}
```

## Week 15-16 Project: Vector-Based Movement

```javascript
let player = {
  position: createVector(400, 300),
  velocity: createVector(0, 0),
  size: 30,
  speed: 0.5,
  friction: 0.95
};

let stars = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  
  for (let i = 0; i < 30; i++) {
    stars.push({
      position: createVector(random(width), random(height)),
      size: random(10, 25)
    });
  }
}

function draw() {
  background(0);
  
  // Apply acceleration based on input
  if (keyIsDown(LEFT_ARROW)) player.velocity.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.velocity.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.velocity.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.velocity.y += player.speed;
  
  // Apply friction
  player.velocity.mult(player.friction);
  
  // Update position
  player.position.add(player.velocity);
  
  // Boundary checking
  player.position.x = constrain(player.position.x, 0, width);
  player.position.y = constrain(player.position.y, 0, height);
  
  // Check collisions
  for (let star of stars) {
    let distance = p5.Vector.dist(player.position, star.position);
    if (distance < player.size/2 + star.size/2) {
      star.position.set(random(width), random(height));
      score += 10;
    }
  }
  
  // Draw stars
  fill(255, 255, 0);
  for (let star of stars) {
    ellipse(star.position.x, star.position.y, star.size, star.size);
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.position.x, player.position.y, player.size, player.size);
  
  // Draw score
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
```

---

# WEEK 17-18: Multiple Objects and Game Mechanics

## Arrays of Objects

```javascript
let enemies = [];

function setup() {
  for (let i = 0; i < 5; i++) {
    enemies.push({
      position: createVector(random(width), random(height)),
      velocity: createVector(random(-2, 2), random(-2, 2)),
      size: 30
    });
  }
}
```

## Game Mechanics

```javascript
let lives = 3;
let gameOver = false;

function checkEnemyCollisions() {
  for (let enemy of enemies) {
    let distance = p5.Vector.dist(player.position, enemy.position);
    if (distance < player.size/2 + enemy.size/2) {
      lives--;
      if (lives <= 0) {
        gameOver = true;
      }
    }
  }
}
```

## Week 17-18 Project: Complete Game Mechanics

```javascript
let player;
let stars = [];
let enemies = [];
let score = 0;
let lives = 3;
let gameState = 'playing'; // 'playing', 'gameover'

function setup() {
  createCanvas(800, 600);
  
  player = {
    position: createVector(400, 300),
    velocity: createVector(0, 0),
    size: 30,
    speed: 0.5,
    friction: 0.95
  };
  
  for (let i = 0; i < 20; i++) {
    stars.push({
      position: createVector(random(width), random(height)),
      size: random(10, 25)
    });
  }
  
  for (let i = 0; i < 5; i++) {
    enemies.push({
      position: createVector(random(width), random(height)),
      velocity: createVector(random(-2, 2), random(-2, 2)),
      size: 30
    });
  }
}

function draw() {
  background(0);
  
  if (gameState === 'playing') {
    updateGame();
    drawGame();
  } else if (gameState === 'gameover') {
    drawGameOver();
  }
}

function updateGame() {
  // Player movement
  if (keyIsDown(LEFT_ARROW)) player.velocity.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.velocity.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.velocity.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.velocity.y += player.speed;
  
  player.velocity.mult(player.friction);
  player.position.add(player.velocity);
  player.position.x = constrain(player.position.x, 0, width);
  player.position.y = constrain(player.position.y, 0, height);
  
  // Update enemies
  for (let enemy of enemies) {
    enemy.position.add(enemy.velocity);
    
    if (enemy.position.x < 0 || enemy.position.x > width) {
      enemy.velocity.x *= -1;
    }
    if (enemy.position.y < 0 || enemy.position.y > height) {
      enemy.velocity.y *= -1;
    }
  }
  
  // Check star collisions
  for (let star of stars) {
    let distance = p5.Vector.dist(player.position, star.position);
    if (distance < player.size/2 + star.size/2) {
      star.position.set(random(width), random(height));
      score += 10;
    }
  }
  
  // Check enemy collisions
  for (let enemy of enemies) {
    let distance = p5.Vector.dist(player.position, enemy.position);
    if (distance < player.size/2 + enemy.size/2) {
      lives--;
      enemy.position.set(random(width), random(height));
      if (lives <= 0) {
        gameState = 'gameover';
      }
    }
  }
}

function drawGame() {
  // Draw stars
  fill(255, 255, 0);
  for (let star of stars) {
    ellipse(star.position.x, star.position.y, star.size, star.size);
  }
  
  // Draw enemies
  fill(255, 0, 0);
  for (let enemy of enemies) {
    ellipse(enemy.position.x, enemy.position.y, enemy.size, enemy.size);
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.position.x, player.position.y, player.size, player.size);
  
  // Draw HUD
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
  text("Lives: " + lives, 10, 60);
}

function drawGameOver() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width/2, height/2 - 50);
  textSize(24);
  text("Final Score: " + score, width/2, height/2);
  text("Press SPACE to restart", width/2, height/2 + 50);
}

function keyPressed() {
  if (key === ' ' && gameState === 'gameover') {
    resetGame();
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  player.position.set(400, 300);
  player.velocity.set(0, 0);
  
  for (let star of stars) {
    star.position.set(random(width), random(height));
  }
  
  for (let enemy of enemies) {
    enemy.position.set(random(width), random(height));
  }
  
  gameState = 'playing';
}
```

---

# WEEK 19-20: Constructor Functions and Final Project

## Constructor Functions

```javascript
function Player(x, y) {
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.size = 30;
  this.speed = 0.5;
  
  this.update = function() {
    if (keyIsDown(LEFT_ARROW)) this.velocity.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.velocity.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.velocity.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.velocity.y += this.speed;
    
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
  };
  
  this.draw = function() {
    fill(200, 200, 255);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };
}

let player = new Player(400, 300);
```

## Week 19-20: Final Space Explorer Game

```javascript
// Constructor functions
function Player(x, y) {
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.size = 30;
  this.speed = 0.5;
  
  this.update = function() {
    if (keyIsDown(LEFT_ARROW)) this.velocity.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.velocity.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.velocity.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.velocity.y += this.speed;
    
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  };
  
  this.draw = function() {
    fill(200, 200, 255);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };
}

function Star() {
  this.position = createVector(random(width), random(height));
  this.size = random(10, 25);
  
  this.draw = function() {
    fill(255, 255, 0);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };
}

function Enemy() {
  this.position = createVector(random(width), random(height));
  this.velocity = createVector(random(-2, 2), random(-2, 2));
  this.size = 30;
  
  this.update = function() {
    this.position.add(this.velocity);
    
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  };
  
  this.draw = function() {
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };
}

// Game variables
let player;
let stars = [];
let enemies = [];
let score = 0;
let lives = 3;
let gameState = 'start'; // 'start', 'playing', 'gameover'

function setup() {
  createCanvas(800, 600);
  resetGame();
}

function draw() {
  background(0);
  
  if (gameState === 'start') {
    drawStartScreen();
  } else if (gameState === 'playing') {
    updateGame();
    drawGame();
  } else if (gameState === 'gameover') {
    drawGameOver();
  }
}

function updateGame() {
  player.update();
  
  for (let enemy of enemies) {
    enemy.update();
  }
  
  // Check star collisions
  for (let i = stars.length - 1; i >= 0; i--) {
    let distance = p5.Vector.dist(player.position, stars[i].position);
    if (distance < player.size/2 + stars[i].size/2) {
      stars.splice(i, 1);
      stars.push(new Star());
      score += 10;
    }
  }
  
  // Check enemy collisions
  for (let enemy of enemies) {
    let distance = p5.Vector.dist(player.position, enemy.position);
    if (distance < player.size/2 + enemy.size/2) {
      lives--;
      enemy.position.set(random(width), random(height));
      if (lives <= 0) {
        gameState = 'gameover';
      }
    }
  }
}

function drawGame() {
  for (let star of stars) {
    star.draw();
  }
  
  for (let enemy of enemies) {
    enemy.draw();
  }
  
  player.draw();
  
  // HUD
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
  text("Lives: " + lives, 10, 40);
}

function drawStartScreen() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("SPACE EXPLORER", width/2, height/2 - 80);
  
  textSize(24);
  text("Collect stars, avoid enemies!", width/2, height/2 - 20);
  text("Use arrow keys to move", width/2, height/2 + 20);
  
  textSize(20);
  text("Press SPACE to start", width/2, height/2 + 80);
}

function drawGameOver() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width/2, height/2 - 50);
  
  textSize(24);
  text("Final Score: " + score, width/2, height/2);
  text("Press SPACE to restart", width/2, height/2 + 50);
}

function keyPressed() {
  if (key === ' ') {
    if (gameState === 'start' || gameState === 'gameover') {
      resetGame();
      gameState = 'playing';
    }
  }
}

function resetGame() {
  player = new Player(400, 300);
  
  stars = [];
  for (let i = 0; i < 20; i++) {
    stars.push(new Star());
  }
  
  enemies = [];
  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
  }
  
  score = 0;
  lives = 3;
}
```

---

## Congratulations!

You've completed CM1005: Introduction to Programming I!

You now have a complete, working Space Explorer game that demonstrates:
- Variables and data types
- Conditional logic
- Arrays and loops
- Functions
- Objects and constructors
- p5.Vector for smooth movement
- Game state management
- Collision detection

**Next Steps:**
- Continue to CM1010: Introduction to Programming II
- Explore more advanced topics
- Build your own projects!

---

*End of Complete Course Content*
