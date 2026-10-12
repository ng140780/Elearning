# Week 5: Project

## Project: Player Object

**Objective:** Convert the player from separate variables to an organized object with methods

### Step 1: Define the Player Object

Create a player object with properties and methods:

```javascript
let player = {
  // Properties
  x: 400,
  y: 300,
  size: 40,
  speed: 5,
  color: [100, 200, 255],
  
  // Methods
  move: function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    
    // Keep player within canvas bounds
    this.x = constrain(this.x, this.size/2, width - this.size/2);
    this.y = constrain(this.y, this.size/2, height - this.size/2);
  },
  
  display: function() {
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
};
```

### Step 2: Update the Setup Function

```javascript
function setup() {
  createCanvas(800, 600);
  // Player is already initialized as an object
}
```

### Step 3: Update the Draw Function

```javascript
function draw() {
  background(20);
  
  // Update and display player
  player.move();
  player.display();
}
```

### Step 4: Test the Project

**Expected Behavior:**
- Player appears as a blue circle
- Arrow keys move the player smoothly
- Player stays within canvas boundaries
- Code is organized using an object structure

### Step 5: Add More Features (Optional)

**Enhancement Ideas:**
1. Add a `health` property and display a health bar
2. Add a `score` property
3. Add a `reset()` method to return player to starting position
4. Add different movement modes (e.g., diagonal movement)
5. Add a trail effect behind the player

**Example Enhancement:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 40,
  speed: 5,
  color: [100, 200, 255],
  health: 100,
  score: 0,
  
  move: function() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;
    
    this.x = constrain(this.x, this.size/2, width - this.size/2);
    this.y = constrain(this.y, this.size/2, height - this.size/2);
  },
  
  display: function() {
    // Draw player
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    
    // Draw health bar
    fill(50);
    rect(10, 10, 200, 20);
    fill(0, 255, 0);
    rect(10, 10, this.health * 2, 20);
    
    // Draw score
    fill(255);
    textSize(20);
    text("Score: " + this.score, 10, 50);
  },
  
  reset: function() {
    this.x = 400;
    this.y = 300;
    this.health = 100;
    this.score = 0;
  }
};
```

### Submission Requirements

1. Complete code with player object
2. Working movement with arrow keys
3. Boundary checking
4. Clean, organized code using object structure
5. Screenshot of the running program
6. Brief explanation of how the object structure improves the code

### Grading Rubric

| Criteria | Points |
|----------|--------|
| Player object created correctly | 20 |
| Properties defined (x, y, size, speed, color) | 20 |
| Methods implemented (move, display) | 20 |
| Movement works with arrow keys | 15 |
| Boundary checking works | 15 |
| Code is clean and well-organized | 10 |
| **Total** | **100** |

---

*End of Week 5 Project*
