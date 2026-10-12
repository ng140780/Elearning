# Week 6: Project

## Project: Collision Detection for Space Explorer

**Objective:** Add collision detection between the player and collectible stars

### Step 1: Define Player and Star Objects

Create objects for the player and a collectible star:

```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [100, 200, 255]
};

let star = {
  x: 200,
  y: 200,
  size: 30,
  color: [255, 255, 0]
};

let score = 0;
```

### Step 2: Add Collision Detection

In the draw() function, check if the player collides with the star:

```javascript
function draw() {
  background(20);
  
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
    // Collision detected!
    score += 10;
    
    // Move star to new random position
    star.x = random(50, width - 50);
    star.y = random(50, height - 50);
    
    console.log("Score: " + score);
  }
  
  // Draw star
  fill(star.color[0], star.color[1], star.color[2]);
  noStroke();
  ellipse(star.x, star.y, star.size, star.size);
  
  // Draw player
  fill(player.color[0], player.color[1], player.color[2]);
  ellipse(player.x, player.y, player.size, player.size);
  
  // Draw score
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
}
```

### Step 3: Add Visual Feedback

Add a flash effect when collision occurs:

```javascript
let flashTimer = 0;

function draw() {
  background(20);
  
  // ... movement and collision code ...
  
  if (distance < collisionDistance) {
    score += 10;
    star.x = random(50, width - 50);
    star.y = random(50, height - 50);
    flashTimer = 10;  // Flash for 10 frames
    console.log("Score: " + score);
  }
  
  // Visual feedback
  if (flashTimer > 0) {
    fill(255, 255, 0, 50);
    noStroke();
    rect(0, 0, width, height);
    flashTimer--;
  }
  
  // ... rest of drawing code ...
}
```

### Step 4: Add Multiple Stars (Optional Enhancement)

Create an array of stars:

```javascript
let stars = [];

function setup() {
  createCanvas(800, 600);
  
  // Create 5 stars
  for (let i = 0; i < 5; i++) {
    stars.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 30,
      color: [255, 255, 0]
    });
  }
}

function draw() {
  background(20);
  
  // ... player movement code ...
  
  // Check collision with each star
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let distance = dist(player.x, player.y, star.x, star.y);
    let collisionDistance = (player.size / 2) + (star.size / 2);
    
    if (distance < collisionDistance) {
      score += 10;
      
      // Move star to new position
      star.x = random(50, width - 50);
      star.y = random(50, height - 50);
      
      flashTimer = 10;
    }
    
    // Draw star
    fill(star.color[0], star.color[1], star.color[2]);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // ... rest of drawing code ...
}
```

### Step 5: Add Enemies (Optional Enhancement)

Add enemies that the player must avoid:

```javascript
let enemies = [];

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
  for (let i = 0; i < 3; i++) {
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
  background(20);
  
  // ... player movement and star collision code ...
  
  // Move and draw enemies
  for (let enemy of enemies) {
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;
    
    // Bounce off walls
    if (enemy.x < 0 || enemy.x > width) enemy.speedX *= -1;
    if (enemy.y < 0 || enemy.y > height) enemy.speedY *= -1;
    
    // Check collision with player
    let distance = dist(player.x, player.y, enemy.x, enemy.y);
    if (distance < (player.size / 2) + (enemy.size / 2)) {
      // Enemy collision - lose points or lives
      score -= 5;
      player.x = 400;  // Reset player position
      player.y = 300;
    }
    
    // Draw enemy
    fill(255, 0, 0);
    ellipse(enemy.x, enemy.y, enemy.size, enemy.size);
  }
  
  // ... rest of drawing code ...
}
```

### Complete Code

```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [100, 200, 255]
};

let stars = [];
let score = 0;
let flashTimer = 0;

function setup() {
  createCanvas(800, 600);
  
  // Create 5 stars
  for (let i = 0; i < 5; i++) {
    stars.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 30,
      color: [255, 255, 0]
    });
  }
}

function draw() {
  background(20);
  
  // Move player
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
  
  // Boundary checking
  player.x = constrain(player.x, player.size/2, width - player.size/2);
  player.y = constrain(player.y, player.size/2, height - player.size/2);
  
  // Check collision with each star
  for (let star of stars) {
    let distance = dist(player.x, player.y, star.x, star.y);
    let collisionDistance = (player.size / 2) + (star.size / 2);
    
    if (distance < collisionDistance) {
      score += 10;
      star.x = random(50, width - 50);
      star.y = random(50, height - 50);
      flashTimer = 10;
    }
    
    // Draw star
    fill(star.color[0], star.color[1], star.color[2]);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // Visual feedback
  if (flashTimer > 0) {
    fill(255, 255, 0, 50);
    noStroke();
    rect(0, 0, width, height);
    flashTimer--;
  }
  
  // Draw player
  fill(player.color[0], player.color[1], player.color[2]);
  noStroke();
  ellipse(player.x, player.y, player.size, player.size);
  
  // Draw score
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
}
```

### Testing Checklist

- [ ] Player moves smoothly with arrow keys
- [ ] Stars are visible and yellow
- [ ] Collision detected when player touches star
- [ ] Score increases by 10 on collision
- [ ] Star moves to new random position after collision
- [ ] Yellow flash appears briefly on collision
- [ ] Player stays within canvas boundaries
- [ ] Score displays in top-left corner
- [ ] No console errors
- [ ] Code is well-organized and commented

### Acceptance Criteria

✅ Player object with movement and boundary checking
✅ Star object(s) that can be collected
✅ Collision detection using distance calculation
✅ Score increases on successful collision
✅ Visual feedback (flash) on collision
✅ Stars respawn at random positions
✅ Clean, readable code with comments

### Extension Challenges

1. **Multiple Stars**: Create an array of 5-10 stars
2. **Enemies**: Add red enemies that decrease score on collision
3. **Lives System**: Add lives that decrease on enemy collision
4. **Timer**: Add a countdown timer
5. **Power-ups**: Add special items that give bonus points
6. **Sound Effects**: Add sounds for collision and collection
7. **Particle Effects**: Add particles when collecting stars
8. **Difficulty Levels**: Increase enemy speed as score increases

### Grading Rubric

| Criteria | Points |
|----------|--------|
| Player movement works | 15 |
| Collision detection implemented | 25 |
| Score tracking works | 15 |
| Visual feedback present | 15 |
| Boundary checking works | 10 |
| Code is clean and commented | 10 |
| **Total** | **90** |

**Bonus Points:**
- Multiple stars: +5
- Enemies added: +5
- Lives system: +5
- Sound effects: +5
- **Maximum: 110 points**

### Submission Requirements

1. Complete p5.js sketch code
2. Screenshot of the running program
3. Brief explanation (3-4 sentences) of how collision detection works
4. List of any extension features you implemented

---

*End of Week 6 Project*
