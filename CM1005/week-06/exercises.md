# Week 6: Exercises

## Exercise 6.1: Basic if Statement

**Objective:** Practice basic conditional statements

**Instructions:**
1. Create a variable `temperature` set to 25
2. Write an if statement that prints "Warm weather!" if temperature > 20
3. Test with different temperature values (15, 25, 35)

**Expected Result:**
```
Warm weather!  (for 25)
Warm weather!  (for 35)
(no output for 15)
```

**Solution:**
```javascript
let temperature = 25;

if (temperature > 20) {
  console.log("Warm weather!");
}

// Test with different values
temperature = 15;
if (temperature > 20) {
  console.log("Warm weather!");
}

temperature = 35;
if (temperature > 20) {
  console.log("Warm weather!");
}
```

---

## Exercise 6.2: if...else Statement

**Objective:** Use if...else for two outcomes

**Instructions:**
1. Create a variable `age` set to 16
2. Write an if...else that prints "Can vote" if age >= 18, else "Cannot vote"
3. Test with age = 20 and age = 16

**Expected Result:**
```
Cannot vote  (for age 16)
Can vote     (for age 20)
```

**Solution:**
```javascript
let age = 16;

if (age >= 18) {
  console.log("Can vote");
} else {
  console.log("Cannot vote");
}

// Test with different ages
age = 20;
if (age >= 18) {
  console.log("Can vote");
} else {
  console.log("Cannot vote");
}
```

---

## Exercise 6.3: Multiple Conditions

**Objective:** Use if...else if...else for multiple outcomes

**Instructions:**
1. Create a variable `score` set to 75
2. Write conditionals to assign a letter grade:
   - 90-100: "A"
   - 80-89: "B"
   - 70-79: "C"
   - 60-69: "D"
   - Below 60: "F"
3. Print the grade

**Expected Result:**
```
Grade: C
```

**Solution:**
```javascript
let score = 75;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log("Grade: " + grade);

// Test with different scores
score = 95;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log("Grade: " + grade);  // A
```

---

## Exercise 6.4: Logical Operators

**Objective:** Combine conditions with && and ||

**Instructions:**
1. Create variables `age` and `hasLicense`
2. Check if person can drive (age >= 16 AND hasLicense)
3. Check if person is teenager (age >= 13 AND age <= 19)
4. Test different combinations

**Expected Result:**
```
Can drive: true
Is teenager: true
Can drive: false  (for age 25, no license)
```

**Solution:**
```javascript
let age = 17;
let hasLicense = true;

// Can drive?
let canDrive = age >= 16 && hasLicense;
console.log("Can drive: " + canDrive);

// Is teenager?
let isTeenager = age >= 13 && age <= 19;
console.log("Is teenager: " + isTeenager);

// Test different values
age = 25;
hasLicense = false;
canDrive = age >= 16 && hasLicense;
console.log("Can drive: " + canDrive);  // false
```

---

## Exercise 6.5: Collision Detection

**Objective:** Detect when two circles collide

**Instructions:**
1. Create two objects with x, y, and size properties
2. Calculate distance between them using dist()
3. Check if distance < sum of radii
4. Print "Collision!" if they overlap

**Expected Result:**
```
Distance: 28.28
Collision!
```

**Solution:**
```javascript
let player = { x: 100, y: 100, size: 50 };
let enemy = { x: 120, y: 120, size: 40 };

// Calculate distance
let distance = dist(player.x, player.y, enemy.x, enemy.y);
console.log("Distance: " + distance.toFixed(2));

// Check collision
let radiiSum = (player.size / 2) + (enemy.size / 2);

if (distance < radiiSum) {
  console.log("Collision!");
} else {
  console.log("No collision");
}

// Test with objects far apart
enemy.x = 500;
distance = dist(player.x, player.y, enemy.x, enemy.y);
radiiSum = (player.size / 2) + (enemy.size / 2);

if (distance < radiiSum) {
  console.log("Collision!");
} else {
  console.log("No collision");
}
```

---

## Exercise 6.6: Boundary Checking

**Objective:** Keep an object within canvas boundaries

**Instructions:**
1. Create a ball object with x, y, and size
2. Move the ball with arrow keys
3. Use conditionals to keep it within canvas
4. Test by moving to edges

**Solution:**
```javascript
let ball = {
  x: 400,
  y: 300,
  size: 30,
  speed: 5
};

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Move ball
  if (keyIsDown(LEFT_ARROW)) ball.x -= ball.speed;
  if (keyIsDown(RIGHT_ARROW)) ball.x += ball.speed;
  if (keyIsDown(UP_ARROW)) ball.y -= ball.speed;
  if (keyIsDown(DOWN_ARROW)) ball.y += ball.speed;
  
  // Boundary checking with conditionals
  if (ball.x < ball.size/2) {
    ball.x = ball.size/2;
  }
  if (ball.x > width - ball.size/2) {
    ball.x = width - ball.size/2;
  }
  if (ball.y < ball.size/2) {
    ball.y = ball.size/2;
  }
  if (ball.y > height - ball.size/2) {
    ball.y = height - ball.size/2;
  }
  
  // Draw ball
  fill(255);
  ellipse(ball.x, ball.y, ball.size, ball.size);
}
```

---

## Exercise 6.7: Game State Management

**Objective:** Implement different game states

**Instructions:**
1. Create a gameState variable ("start", "playing", "gameover")
2. Show different screens for each state
3. Press SPACE to change states
4. Implement all three screens

**Solution:**
```javascript
let gameState = "start";
let score = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "playing") {
    showPlayingScreen();
  } else if (gameState === "gameover") {
    showGameOverScreen();
  }
}

function showStartScreen() {
  background(50);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("SPACE GAME", width/2, height/2 - 50);
  textSize(24);
  text("Press SPACE to start", width/2, height/2 + 30);
}

function showPlayingScreen() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Playing! Press G for game over", width/2, height/2);
  
  // Increment score
  score++;
}

function showGameOverScreen() {
  background(100, 0, 0);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width/2, height/2 - 50);
  textSize(24);
  text("Final Score: " + score, width/2, height/2 + 20);
  text("Press R to restart", width/2, height/2 + 60);
}

function keyPressed() {
  if (key === ' ' && gameState === "start") {
    gameState = "playing";
    score = 0;
  } else if (key === 'g' || key === 'G') {
    gameState = "gameover";
  } else if ((key === 'r' || key === 'R') && gameState === "gameover") {
    gameState = "start";
  }
}
```

---

## Exercise 6.8: Multiple Collectibles

**Objective:** Detect collision with multiple objects

**Instructions:**
1. Create a player and 3 stars
2. Check collision with each star
3. When collision detected, move star to new position
4. Increase score on each collision

**Solution:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 40,
  speed: 5
};

let stars = [
  { x: 100, y: 100, size: 30 },
  { x: 300, y: 200, size: 30 },
  { x: 600, y: 400, size: 30 }
];

let score = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Move player
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
  
  // Boundary checking
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
  
  // Check collision with each star
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let distance = dist(player.x, player.y, star.x, star.y);
    let collisionDistance = (player.size / 2) + (star.size / 2);
    
    if (distance < collisionDistance) {
      score += 10;
      // Move star to new random position
      star.x = random(50, width - 50);
      star.y = random(50, height - 50);
    }
    
    // Draw star
    fill(255, 255, 0);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // Draw player
  fill(100, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
  
  // Draw score
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
}
```

---

## Challenge Exercise: Complete Game Logic

**Objective:** Create a complete game with multiple mechanics

**Instructions:**
1. Player controlled by arrow keys
2. 5 collectible stars
3. 2 enemies that move around
4. Collision with stars increases score
5. Collision with enemies decreases lives
6. Game over when lives = 0
7. Restart option

**Solution:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 40,
  speed: 5
};

let stars = [];
let enemies = [];
let score = 0;
let lives = 3;
let gameState = "playing";

function setup() {
  createCanvas(800, 600);
  
  // Create stars
  for (let i = 0; i < 5; i++) {
    stars.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 30
    });
  }
  
  // Create enemies
  for (let i = 0; i < 2; i++) {
    enemies.push({
      x: random(100, width - 100),
      y: random(100, height - 100),
      size: 35,
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
}

function draw() {
  background(0);
  
  if (gameState === "playing") {
    // Move player
    if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
    if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
    if (keyIsDown(UP_ARROW)) player.y -= player.speed;
    if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
    
    // Boundary checking
    player.x = constrain(player.x, 0, width);
    player.y = constrain(player.y, 0, height);
    
    // Move enemies
    for (let enemy of enemies) {
      enemy.x += enemy.speedX;
      enemy.y += enemy.speedY;
      
      // Bounce off walls
      if (enemy.x < 0 || enemy.x > width) enemy.speedX *= -1;
      if (enemy.y < 0 || enemy.y > height) enemy.speedY *= -1;
    }
    
    // Check star collisions
    for (let star of stars) {
      let distance = dist(player.x, player.y, star.x, star.y);
      if (distance < (player.size / 2) + (star.size / 2)) {
        score += 10;
        star.x = random(50, width - 50);
        star.y = random(50, height - 50);
      }
    }
    
    // Check enemy collisions
    for (let enemy of enemies) {
      let distance = dist(player.x, player.y, enemy.x, enemy.y);
      if (distance < (player.size / 2) + (enemy.size / 2)) {
        lives--;
        // Reset player position
        player.x = 400;
        player.y = 300;
        
        if (lives <= 0) {
          gameState = "gameover";
        }
      }
    }
    
    // Draw stars
    fill(255, 255, 0);
    noStroke();
    for (let star of stars) {
      ellipse(star.x, star.y, star.size, star.size);
    }
    
    // Draw enemies
    fill(255, 0, 0);
    for (let enemy of enemies) {
      ellipse(enemy.x, enemy.y, enemy.size, enemy.size);
    }
    
    // Draw player
    fill(100, 200, 255);
    ellipse(player.x, player.y, player.size, player.size);
    
    // Draw HUD
    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Score: " + score, 20, 20);
    text("Lives: " + lives, 20, 50);
    
  } else if (gameState === "gameover") {
    // Game over screen
    fill(255, 0, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2 - 50);
    
    fill(255);
    textSize(32);
    text("Final Score: " + score, width/2, height/2 + 20);
    
    textSize(24);
    text("Press R to restart", width/2, height/2 + 70);
  }
}

function keyPressed() {
  if ((key === 'r' || key === 'R') && gameState === "gameover") {
    // Reset game
    score = 0;
    lives = 3;
    player.x = 400;
    player.y = 300;
    
    // Reset stars
    for (let star of stars) {
      star.x = random(50, width - 50);
      star.y = random(50, height - 50);
    }
    
    // Reset enemies
    for (let enemy of enemies) {
      enemy.x = random(100, width - 100);
      enemy.y = random(100, height - 100);
    }
    
    gameState = "playing";
  }
}
```

---

## Submission Guidelines

For each exercise:
1. Write the complete code
2. Test it to ensure it works correctly
3. Add comments explaining your conditional logic
4. Take a screenshot of the output
5. Write a brief explanation of what you learned

---

*End of Week 6 Exercises*
