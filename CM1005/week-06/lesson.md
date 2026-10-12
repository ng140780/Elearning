# Week 6: Conditional Statements

## A. Weekly Overview

- **Week:** 6 of 20
- **Topic:** Conditionals and variable types
- **Lesson Title:** Making Decisions in Your Code
- **Estimated Study Hours:** 3-4 hours
- **Learning Objectives:**
  - Use if, else if, and else statements to control program flow
  - Apply comparison operators (==, ===, !=, <, >, <=, >=)
  - Combine conditions with logical operators (&&, ||, !)
  - Implement collision detection between objects
  - Create game logic based on conditions
  - Debug conditional logic effectively
- **Why This Matters:** Conditional statements allow your programs to make decisions and respond to different situations. Without them, your code would execute the same way every time. Conditionals are the foundation of game logic, user interaction, and dynamic behavior. They enable your Space Explorer game to detect collisions, check boundaries, and respond to player actions.
- **Prerequisites:** Week 3 (variables), Week 4 (interaction), Week 5 (objects)

---

## B. Lesson Content

### What are Conditional Statements?

Conditional statements let your code make decisions based on whether a condition is true or false.

**Real-world example:**
```
IF it's raining
    THEN bring an umbrella
ELSE
    THEN wear sunglasses
```

**In JavaScript:**
```javascript
if (isRaining) {
  bringUmbrella();
} else {
  wearSunglasses();
}
```

### The if Statement

The most basic conditional statement:

```javascript
if (condition) {
  // Code to run if condition is true
}
```

**Example:**
```javascript
let score = 100;

if (score > 50) {
  console.log("You passed!");
}
```

**How it works:**
1. The condition `score > 50` is evaluated
2. If true (100 > 50 is true), the code inside runs
3. If false, the code is skipped

### Comparison Operators

Operators that compare two values and return true or false:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | Equal to (loose) | `5 == "5"` | true |
| `===` | Strict equal | `5 === "5"` | false |
| `!=` | Not equal | `5 != 6` | true |
| `!==` | Strict not equal | `5 !== "5"` | true |
| `>` | Greater than | `10 > 5` | true |
| `<` | Less than | `3 < 7` | true |
| `>=` | Greater or equal | `5 >= 5` | true |
| `<=` | Less or equal | `4 <= 5` | true |

**Important: == vs ===**

```javascript
// == (loose equality) - converts types
5 == "5"      // true (converts string to number)
0 == false    // true (converts false to 0)
null == undefined  // true

// === (strict equality) - no type conversion
5 === "5"     // false (different types)
0 === false   // false (different types)
null === undefined  // false
```

**Best practice:** Always use `===` and `!==` to avoid unexpected behavior.

### The if...else Statement

Execute different code based on whether a condition is true or false:

```javascript
if (condition) {
  // Code if true
} else {
  // Code if false
}
```

**Example:**
```javascript
let lives = 3;

if (lives > 0) {
  console.log("Game continues");
} else {
  console.log("Game over");
}
```

### The if...else if...else Statement

Check multiple conditions in sequence:

```javascript
if (condition1) {
  // Code if condition1 is true
} else if (condition2) {
  // Code if condition2 is true
} else if (condition3) {
  // Code if condition3 is true
} else {
  // Code if all conditions are false
}
```

**Example:**
```javascript
let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
// Output: "Grade: C"
```

**How it works:**
1. Checks condition1 first
2. If false, checks condition2
3. If false, checks condition3
4. If all false, runs the else block
5. Only ONE block executes

### Logical Operators

Combine multiple conditions:

| Operator | Name | Meaning | Example |
|----------|------|---------|---------|
| `&&` | AND | Both must be true | `x > 0 && x < 10` |
| `\|\|` | OR | At least one true | `x < 0 \|\| x > 100` |
| `!` | NOT | Inverts the value | `!isGameOver` |

**AND (&&) - Both conditions must be true:**
```javascript
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("You can drive");
}
```

**OR (||) - At least one condition must be true:**
```javascript
let day = "Saturday";

if (day === "Saturday" || day === "Sunday") {
  console.log("It's the weekend!");
}
```

**NOT (!) - Inverts the boolean value:**
```javascript
let isGameOver = false;

if (!isGameOver) {
  console.log("Keep playing!");
}
```

### Complex Conditions

Combine multiple operators:

```javascript
let x = 50;
let y = 75;

// Complex condition
if ((x > 0 && x < 100) || (y > 50 && y < 100)) {
  console.log("Position is valid");
}
```

**Use parentheses to clarify logic:**
```javascript
// Clear and readable
if ((age >= 18 && hasLicense) || isEmergency) {
  canDrive = true;
}
```

### Collision Detection

One of the most important uses of conditionals in games:

**Circle collision:**
```javascript
let player = { x: 400, y: 300, size: 50 };
let enemy = { x: 420, y: 310, size: 40 };

// Calculate distance between centers
let dx = player.x - enemy.x;
let dy = player.y - enemy.y;
let distance = sqrt(dx * dx + dy * dy);

// Check if circles overlap
if (distance < (player.size/2 + enemy.size/2)) {
  console.log("Collision detected!");
}
```

**Using p5.js dist() function:**
```javascript
let distance = dist(player.x, player.y, enemy.x, enemy.y);

if (distance < (player.size/2 + enemy.size/2)) {
  console.log("Collision!");
}
```

**Rectangle collision:**
```javascript
let rect1 = { x: 100, y: 100, width: 50, height: 50 };
let rect2 = { x: 120, y: 120, width: 50, height: 50 };

// Check if rectangles overlap
if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
  console.log("Rectangles collide!");
}
```

### Boundary Checking

Keep objects within the canvas:

```javascript
let player = { x: 400, y: 300, size: 50 };

// Keep player within canvas
if (player.x < 0) {
  player.x = 0;
}
if (player.x > width) {
  player.x = width;
}
if (player.y < 0) {
  player.y = 0;
}
if (player.y > height) {
  player.y = height;
}

// Or use constrain() function
player.x = constrain(player.x, 0, width);
player.y = constrain(player.y, 0, height);
```

### Game State Management

Use conditionals to manage game states:

```javascript
let gameState = "playing"; // "start", "playing", "gameover"

function draw() {
  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "playing") {
    updateGame();
    drawGame();
  } else if (gameState === "gameover") {
    showGameOverScreen();
  }
}

function showStartScreen() {
  background(0);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("SPACE EXPLORER", width/2, height/2);
  textSize(24);
  text("Press SPACE to start", width/2, height/2 + 50);
}

function updateGame() {
  // Game logic here
}

function showGameOverScreen() {
  background(0);
  fill(255, 0, 0);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width/2, height/2);
}
```

### Truthy and Falsy Values

In JavaScript, some values are "truthy" and some are "falsy":

**Falsy values (evaluate to false):**
- `false`
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Truthy values (evaluate to true):**
- Everything else (including all objects, arrays, non-zero numbers, non-empty strings)

```javascript
let score = 0;

if (score) {
  console.log("This won't run"); // 0 is falsy
}

let name = "Player";

if (name) {
  console.log("This will run"); // non-empty string is truthy
}
```

### Ternary Operator

A shorthand for simple if...else:

```javascript
// Long form
let message;
if (score > 100) {
  message = "High score!";
} else {
  message = "Keep trying!";
}

// Ternary operator (short form)
let message = score > 100 ? "High score!" : "Keep trying!";
```

**Syntax:** `condition ? valueIfTrue : valueIfFalse`

**Example:**
```javascript
let status = lives > 0 ? "Playing" : "Game Over";
```

### Common Mistakes

**1. Using = instead of == or ===:**
```javascript
// Wrong: This assigns 5 to x, always true
if (x = 5) {
  console.log("This always runs!");
}

// Right: This compares x to 5
if (x === 5) {
  console.log("x is 5");
}
```

**2. Forgetting else clause:**
```javascript
// Might not handle all cases
if (score > 100) {
  grade = "A";
}

// Better: Handle all cases
if (score > 100) {
  grade = "A";
} else {
  grade = "F";
}
```

**3. Incorrect logical operators:**
```javascript
// Wrong: This is always true (x can't be both < 5 AND > 10)
if (x < 5 && x > 10) {
  console.log("This never runs");
}

// Right: Use OR for this logic
if (x < 5 || x > 10) {
  console.log("x is outside range");
}
```

**4. Comparing with wrong type:**
```javascript
// Might cause bugs
if (score == "100") {  // Loose comparison
  console.log("Score is 100");
}

// Better: Strict comparison
if (score === 100) {
  console.log("Score is 100");
}
```

### Debugging Conditionals

**Use console.log to check conditions:**
```javascript
let x = 50;
let y = 75;

console.log("x:", x);
console.log("y:", y);
console.log("x > 0:", x > 0);
console.log("y < 100:", y < 100);
console.log("Both true:", x > 0 && y < 100);

if (x > 0 && y < 100) {
  console.log("Condition met!");
}
```

**Check which branch executes:**
```javascript
if (score >= 90) {
  console.log("Branch 1: A grade");
} else if (score >= 80) {
  console.log("Branch 2: B grade");
} else {
  console.log("Branch 3: Other grade");
}
```

---

## C. Guided Coding Practice

### Exercise 6.1: Basic if Statement

**Objective:** Practice basic conditional statements

**Instructions:**
1. Create a variable `temperature` set to 25
2. Write an if statement that prints "Warm weather!" if temperature > 20
3. Test with different temperature values

**Expected Result:**
```
Warm weather!
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
// No output (15 is not > 20)
```

---

### Exercise 6.2: if...else Statement

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

### Exercise 6.3: Multiple Conditions

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
```

---

### Exercise 6.4: Logical Operators

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

### Exercise 6.5: Collision Detection

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
```

---

### Exercise 6.6: Boundary Checking

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

### Exercise 6.7: Game State Management

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

## D. Weekly Project Milestone

### Project: Collision Detection for Space Explorer

**New Feature:** Add collision detection between player and collectible stars

**Concepts Used:**
- if statements for collision checking
- Comparison operators
- Distance calculation
- Object properties
- Game logic

**Step-by-Step Implementation:**

1. **Create player and star objects:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5
};

let star = {
  x: 200,
  y: 200,
  size: 30
};

let score = 0;
```

2. **Add collision detection in draw():**
```javascript
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
  
  // Collision detection
  let distance = dist(player.x, player.y, star.x, star.y);
  let collisionDistance = (player.size / 2) + (star.size / 2);
  
  if (distance < collisionDistance) {
    // Collision detected!
    score += 10;
    
    // Move star to new random position
    star.x = random(50, width - 50);
    star.y = random(50, height - 50);
  }
  
  // Draw star
  fill(255, 255, 0);
  noStroke();
  ellipse(star.x, star.y, star.size, star.size);
  
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

3. **Add visual feedback for collision:**
```javascript
let flashTimer = 0;

function draw() {
  background(0);
  
  // ... movement and collision code ...
  
  if (distance < collisionDistance) {
    score += 10;
    star.x = random(50, width - 50);
    star.y = random(50, height - 50);
    flashTimer = 10;  // Flash for 10 frames
  }
  
  // Visual feedback
  if (flashTimer > 0) {
    fill(255, 255, 0, 100);
    rect(0, 0, width, height);
    flashTimer--;
  }
  
  // ... rest of drawing code ...
}
```

**Complete Code:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5
};

let star = {
  x: 200,
  y: 200,
  size: 30
};

let score = 0;
let flashTimer = 0;

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
  player.x = constrain(player.x, player.size/2, width - player.size/2);
  player.y = constrain(player.y, player.size/2, height - player.size/2);
  
  // Collision detection
  let distance = dist(player.x, player.y, star.x, star.y);
  let collisionDistance = (player.size / 2) + (star.size / 2);
  
  if (distance < collisionDistance) {
    score += 10;
    star.x = random(50, width - 50);
    star.y = random(50, height - 50);
    flashTimer = 10;
  }
  
  // Visual feedback
  if (flashTimer > 0) {
    fill(255, 255, 0, 50);
    noStroke();
    rect(0, 0, width, height);
    flashTimer--;
  }
  
  // Draw star
  fill(255, 255, 0);
  noStroke();
  ellipse(star.x, star.y, star.size, star.size);
  
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

**Acceptance Criteria:**
- ✅ Player moves with arrow keys
- ✅ Star appears on screen
- ✅ Collision is detected when player touches star
- ✅ Score increases by 10 on collision
- ✅ Star moves to new random position after collision
- ✅ Visual feedback (flash) on collision
- ✅ Player stays within boundaries

**Testing Checklist:**
- [ ] Player moves smoothly with arrow keys
- [ ] Star is visible and yellow
- [ ] Move player to star - collision detected
- [ ] Score increases by 10
- [ ] Star appears at new location
- [ ] Yellow flash appears briefly
- [ ] Player cannot move off-screen
- [ ] No console errors

**Extension Challenges:**
1. Add multiple stars (use an array)
2. Add enemies that decrease score on collision
3. Add a timer that counts down
4. Add different types of collectibles with different point values
5. Add sound effects on collision

---

## E. Weekly Assessment

### Quiz: Conditional Statements (50 marks)

**Question 1 (5 marks)**
What will this code output?
```javascript
let x = 10;
if (x > 5) {
  console.log("A");
} else {
  console.log("B");
}
```

A) A
B) B
C) AB
D) Nothing

**Answer:** A

---

**Question 2 (5 marks)**
Which operator checks for strict equality (value AND type)?

A) `=`
B) `==`
C) `===`
D) `!=`

**Answer:** C

---

**Question 3 (5 marks)**
What does `&&` mean in a conditional?

A) OR - at least one must be true
B) AND - both must be true
C) NOT - inverts the value
D) EQUAL - checks equality

**Answer:** B

---

**Question 4 (5 marks)**
What will this code output?
```javascript
let age = 17;
let hasLicense = true;

if (age >= 16 && hasLicense) {
  console.log("Can drive");
} else {
  console.log("Cannot drive");
}
```

A) Can drive
B) Cannot drive
C) Error
D) Nothing

**Answer:** A

---

**Question 5 (10 marks)**
Write a conditional that assigns a letter grade based on score:
- 90-100: "A"
- 80-89: "B"
- 70-79: "C"
- 60-69: "D"
- Below 60: "F"

**Answer:**
```javascript
let score = 85;
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
```

**Marking:** 2 marks for each correct condition

---

**Question 6 (10 marks)**
Write code to detect collision between two circles:
- Circle 1: x=100, y=100, size=50
- Circle 2: x=130, y=100, size=40
- Print "Collision!" if they overlap

**Answer:**
```javascript
let circle1 = { x: 100, y: 100, size: 50 };
let circle2 = { x: 130, y: 100, size: 40 };

let distance = dist(circle1.x, circle1.y, circle2.x, circle2.y);
let sumOfRadii = (circle1.size / 2) + (circle2.size / 2);

if (distance < sumOfRadii) {
  console.log("Collision!");
} else {
  console.log("No collision");
}
```

**Marking:**
- Distance calculation (3 marks)
- Radii sum calculation (3 marks)
- Correct comparison (2 marks)
- Output statement (2 marks)

---

**Question 7 (10 marks)**
What's wrong with this code? Fix it.
```javascript
let score = 75;

if (score = 100) {
  console.log("Perfect score!");
} else if (score > 90) {
  console.log("Great job!");
}
```

**Answer:**
The problem is using `=` (assignment) instead of `===` (comparison) in the first if statement.

**Fixed code:**
```javascript
let score = 75;

if (score === 100) {
  console.log("Perfect score!");
} else if (score > 90) {
  console.log("Great job!");
}
```

**Marking:**
- Identifies the error (5 marks)
- Provides correct solution (5 marks)

---

### Practical Task (50 marks)

Create a simple game with the following features:

**Requirements:**
1. Player object that moves with arrow keys (10 marks)
2. At least 2 collectible stars (10 marks)
3. Collision detection for all stars (10 marks)
4. Score tracking and display (5 marks)
5. Visual feedback on collision (5 marks)
6. Boundary checking (5 marks)
7. Clean, organized code with comments (5 marks)

**Deliverables:**
- Complete p5.js sketch
- Screenshot of working game
- Brief explanation of collision detection logic

**Marking Rubric:**

| Criteria | Points |
|----------|--------|
| Player movement works | 10 |
| Multiple stars present | 10 |
| Collision detection correct | 10 |
| Score tracking works | 5 |
| Visual feedback present | 5 |
| Boundary checking works | 5 |
| Code quality and comments | 5 |
| **Total** | **50** |

---

## F. Review and Consolidation

### Summary of Concepts Learned

This week, you learned:
- How to use if, else if, and else statements
- Comparison operators (==, ===, !=, <, >, <=, >=)
- Logical operators (&&, ||, !)
- How to detect collisions between objects
- How to implement boundary checking
- Game state management with conditionals
- Debugging conditional logic

### Glossary of New Terms

| Term | Definition |
|------|-----------|
| **Conditional Statement** | Code that executes only if a condition is true |
| **Comparison Operator** | Operator that compares two values (==, ===, <, >, etc.) |
| **Logical Operator** | Operator that combines conditions (&&, \|\|, !) |
| **Boolean Expression** | Expression that evaluates to true or false |
| **Collision Detection** | Checking if two objects overlap or touch |
| **Boundary Checking** | Keeping objects within defined limits |
| **Game State** | Current condition of the game (start, playing, gameover) |
| **Truthy/Falsy** | Values that evaluate to true or false in conditions |

### JavaScript Features Introduced

- `if`, `else if`, `else` statements
- Comparison operators: `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
- Logical operators: `&&` (AND), `||` (OR), `!` (NOT)
- Ternary operator: `condition ? valueIfTrue : valueIfFalse`
- Truthy and falsy values
- `dist()` function for distance calculation

### p5.js Functions Introduced

- `dist(x1, y1, x2, y2)` - Calculate distance between two points
- `constrain(value, min, max)` - Limit a value to a range
- `random(min, max)` - Generate random numbers
- `keyIsDown(code)` - Check if a key is pressed (review from Week 4)

### Five Review Questions

1. **What's the difference between `==` and `===`?**
   <details>
   <summary>Answer</summary>
   `==` is loose equality and converts types before comparing (5 == "5" is true). `===` is strict equality and checks both value and type (5 === "5" is false). Always use `===` to avoid bugs.
   </details>

2. **How do you check if two circles are colliding?**
   <details>
   <summary>Answer</summary>
   Calculate the distance between their centers using `dist()`, then check if that distance is less than the sum of their radii: `if (dist(x1, y1, x2, y2) < (size1/2 + size2/2))`
   </details>

3. **What does the `&&` operator do?**
   <details>
   <summary>Answer</summary>
   `&&` is the AND operator. It returns true only if BOTH conditions are true. Example: `age >= 18 && hasLicense` is true only if both conditions are met.
   </details>

4. **How would you keep a player within the canvas boundaries?**
   <details>
   <summary>Answer</summary>
   Use conditionals or the `constrain()` function:
   ```javascript
   player.x = constrain(player.x, 0, width);
   player.y = constrain(player.y, 0, height);
   ```
   Or with conditionals:
   ```javascript
   if (player.x < 0) player.x = 0;
   if (player.x > width) player.x = width;
   ```
   </details>

5. **What's a common mistake when writing conditionals?**
   <details>
   <summary>Answer</summary>
   Using `=` (assignment) instead of `===` (comparison). Example: `if (x = 5)` assigns 5 to x and always evaluates to true. Should be `if (x === 5)` to compare x to 5.
   </details>

### Preview of Next Week

In Week 7, you'll learn about:
- **Arrays**: Storing multiple values in a single variable
- **Array indexing**: Accessing array elements
- **Array methods**: push(), pop(), length
- **Creating multiple game objects**: Stars, enemies, collectibles
- **Looping through arrays**: Introduction to for loops

Your Space Explorer game will have multiple stars to collect instead of just one!

---

## Additional Practice

If you want more practice before moving to Week 7:

1. **Create a quiz game** with multiple choice questions
2. **Build a simple platformer** with gravity and jumping
3. **Make a guessing game** where player guesses a number
4. **Create a traffic light** that changes colors based on conditions
5. **Build a simple RPG** with health, attack, and defense

---

## Resources for Review

- **MDN if...else**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
- **JavaScript.info Conditional Operators**: https://javascript.info/ifelse
- **p5.js dist() Reference**: https://p5js.org/reference/#/p5/dist
- **The Coding Train**: Conditionals and Booleans videos

---

*End of Week 6*
