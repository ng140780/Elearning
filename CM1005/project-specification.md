# CM1005 Project Specification: Space Explorer

## Project Overview

**Project Name:** Space Explorer  
**Type:** 2D Interactive Game  
**Technology:** JavaScript + p5.js  
**Duration:** Built progressively over 20 weeks  

---

## Project Description

Space Explorer is a 2D interactive game where the player controls a spaceship navigating through space. The player must collect stars for points while avoiding asteroids and enemies. The game features smooth movement, collision detection, score tracking, and multiple game states.

---

## Learning Outcomes

By completing this project, you will demonstrate mastery of:

✅ Setting up a p5.js development environment  
✅ Drawing 2D graphics and managing coordinates  
✅ Using variables to store and manipulate game state  
✅ Implementing conditional logic for game rules  
✅ Working with arrays to manage multiple objects  
✅ Using loops to iterate over collections  
✅ Writing functions to organize code  
✅ Creating and using objects with properties and methods  
✅ Implementing constructor functions for object creation  
✅ Debugging and testing a complete application  

---

## Game Features

### Core Mechanics (Required)

1. **Player Ship**
   - Controlled by arrow keys or WASD
   - Smooth movement using vectors
   - Stays within canvas boundaries
   - Visual representation (spaceship shape)

2. **Collectibles (Stars)**
   - Multiple stars appear on screen
   - Player collects stars by touching them
   - Each star adds to the score
   - Stars respawn after collection

3. **Obstacles (Asteroids)**
   - Multiple asteroids move around the screen
   - Collision with asteroids reduces lives
   - Asteroids bounce off walls
   - Different sizes and speeds

4. **Score System**
   - Points awarded for collecting stars
   - Score displayed on screen
   - High score tracking (optional)

5. **Lives System**
   - Player starts with 3 lives
   - Lives lost on asteroid collision
   - Game over when lives reach 0
   - Visual display of remaining lives

6. **Game States**
   - Start screen with instructions
   - Playing state (main gameplay)
   - Game over screen with final score
   - Restart functionality

### Advanced Features (Optional Extensions)

- Power-ups (shields, speed boost, multi-shot)
- Different enemy types with unique behaviors
- Levels with increasing difficulty
- Sound effects and music
- Particle effects for explosions
- Background parallax scrolling
- Boss enemies
- Weapon systems

---

## Technical Requirements

### Code Organization

```javascript
// Global variables
let player;
let stars = [];
let asteroids = [];
let score = 0;
let lives = 3;
let gameState = 'start'; // 'start', 'playing', 'gameover'

// Setup
function setup() {
  createCanvas(800, 600);
  // Initialize game objects
}

// Main game loop
function draw() {
  // Handle different game states
  if (gameState === 'start') {
    showStartScreen();
  } else if (gameState === 'playing') {
    updateGame();
    drawGame();
  } else if (gameState === 'gameover') {
    showGameOver();
  }
}

// Input handling
function keyPressed() {
  // Handle player input
}
```

### Required Components

1. **Player Class/Object**
   - Position (x, y) or p5.Vector
   - Velocity (speed and direction)
   - Size and appearance
   - Movement methods
   - Boundary checking

2. **Star Class/Object**
   - Position
   - Size and appearance
   - Collection detection
   - Respawn logic

3. **Asteroid Class/Object**
   - Position and velocity
   - Size (varying)
   - Movement pattern
   - Collision detection

4. **Game Management**
   - Score tracking
   - Lives management
   - Game state control
   - Collision detection system

### Code Quality Standards

✅ **Variables**: Use descriptive names (playerX, not x)  
✅ **Functions**: Break code into small, focused functions  
✅ **Comments**: Explain complex logic  
✅ **Organization**: Group related code together  
✅ **Consistency**: Use consistent naming conventions  
✅ **Testing**: Verify all features work correctly  

---

## Week-by-Week Development Plan

### Phase 1: Foundations (Weeks 1-6)

**Week 1-2: Setup and Drawing**
- Create canvas and background
- Draw static space scene
- Add player ship (stationary)

**Week 3-4: Variables and Interaction**
- Make player movable with keyboard
- Add boundary checking
- Implement basic collision detection

**Week 5-6: Objects and Conditionals**
- Create Player object with properties
- Add score display
- Implement lives system

### Phase 2: Core Programming (Weeks 7-12)

**Week 7-8: Arrays and Loops**
- Add multiple stars using arrays
- Draw stars with loops
- Implement star collection

**Week 9-10: Advanced Iteration**
- Add multiple asteroids
- Implement asteroid movement
- Create collision detection system

**Week 11-12: Functions**
- Refactor code into functions
- Create helper functions for collision detection
- Organize game logic

### Phase 3: Advanced Concepts (Weeks 13-18)

**Week 13-14: 2D Arrays and Data Structures**
- Create grid-based level (optional)
- Manage dynamic object arrays
- Implement object spawning/removal

**Week 15-16: Object Methods and Vectors**
- Add methods to game objects
- Implement smooth movement with p5.Vector
- Add advanced behaviors

**Week 17-18: Multiple Object Types**
- Create different enemy types
- Implement power-ups (optional)
- Add visual effects

### Phase 4: OOP and Completion (Weeks 19-20)

**Week 19: Constructor Functions**
- Convert objects to use constructors
- Create Entity base constructor
- Implement inheritance patterns

**Week 20: Final Polish**
- Add start/game over screens
- Implement restart functionality
- Polish visuals and gameplay
- Test and debug

---

## Assessment Rubric

### Technical Implementation (60%)

| Criteria | Excellent (A) | Good (B) | Satisfactory (C) | Needs Work (D/F) |
|----------|---------------|----------|------------------|------------------|
| **Player Control** (10%) | Smooth, responsive movement with boundary checking | Movement works but may have minor issues | Basic movement implemented | Movement doesn't work properly |
| **Game Objects** (10%) | Multiple object types with proper behavior | Objects work but limited variety | Basic objects implemented | Objects don't work correctly |
| **Collision Detection** (10%) | Accurate collision detection for all objects | Most collisions work correctly | Basic collision detection | Collision detection flawed |
| **Score/Lives** (10%) | Complete scoring system with display | Score and lives work | Basic scoring implemented | Scoring doesn't work |
| **Game States** (10%) | All states work with smooth transitions | Most states work | Basic state management | States don't work properly |
| **Code Quality** (10%) | Clean, well-organized, documented code | Good organization, some comments | Code works but messy | Poor code quality |

### Creative Elements (20%)

| Criteria | Excellent | Good | Satisfactory | Needs Work |
|----------|-----------|------|--------------|------------|
| **Visual Design** (10%) | Attractive, cohesive visual style | Good visuals | Basic visuals | Poor visuals |
| **Game Feel** (10%) | Engaging, polished gameplay | Enjoyable to play | Functional but plain | Not engaging |

### Documentation (20%)

| Criteria | Excellent | Good | Satisfactory | Needs Work |
|----------|-----------|------|--------------|------------|
| **Code Comments** (10%) | Comprehensive, clear comments | Good documentation | Some comments | Missing comments |
| **README** (10%) | Complete documentation with instructions | Good documentation | Basic documentation | Missing documentation |

---

## Submission Requirements

### Code Submission
- Complete source code (sketch.js)
- All necessary asset files (if any)
- README with:
  - Project description
  - How to run the game
  - Controls and objectives
  - Known issues or limitations

### Demonstration
- Live demonstration of working game
- Explanation of key features
- Discussion of challenges and solutions
- Reflection on learning outcomes

### Optional Enhancements
Document any extra features you implemented beyond the requirements.

---

## Tips for Success

1. **Start Simple**: Get basic movement working before adding complexity
2. **Test Frequently**: Test after each major change
3. **Use Version Control**: Save copies as you progress
4. **Ask for Help**: Don't struggle alone - use forums and resources
5. **Plan Before Coding**: Think through logic before writing code
6. **Comment Your Code**: Future you will thank present you
7. **Take Breaks**: Step away when stuck - fresh eyes help

---

## Example Code Structure

```javascript
// ============================================
// SPACE EXPLORER - Final Project
// ============================================

// Game variables
let player;
let stars = [];
let asteroids = [];
let score = 0;
let lives = 3;
let gameState = 'start';

// ============================================
// SETUP
// ============================================
function setup() {
  createCanvas(800, 600);
  
  // Create player
  player = {
    x: 400,
    y: 300,
    size: 30,
    speed: 5
  };
  
  // Create initial stars
  for (let i = 0; i < 10; i++) {
    stars.push(createStar());
  }
  
  // Create initial asteroids
  for (let i = 0; i < 5; i++) {
    asteroids.push(createAsteroid());
  }
}

// ============================================
// MAIN DRAW LOOP
// ============================================
function draw() {
  background(0);
  
  if (gameState === 'start') {
    showStartScreen();
  } else if (gameState === 'playing') {
    updateGame();
    drawGame();
    drawHUD();
  } else if (gameState === 'gameover') {
    showGameOver();
  }
}

// ============================================
// GAME LOGIC
// ============================================
function updateGame() {
  // Update player
  updatePlayer();
  
  // Update stars
  for (let i = 0; i < stars.length; i++) {
    checkStarCollection(i);
  }
  
  // Update asteroids
  for (let i = 0; i < asteroids.length; i++) {
    updateAsteroid(i);
    checkAsteroidCollision(i);
  }
}

function updatePlayer() {
  // Movement
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.x += player.speed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.y -= player.speed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.y += player.speed;
  }
  
  // Boundary checking
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

// ============================================
// DRAWING
// ============================================
function drawGame() {
  // Draw stars
  for (let star of stars) {
    drawStar(star);
  }
  
  // Draw asteroids
  for (let asteroid of asteroids) {
    drawAsteroid(asteroid);
  }
  
  // Draw player
  drawPlayer();
}

function drawPlayer() {
  fill(200, 200, 255);
  triangle(
    player.x, player.y - player.size/2,
    player.x - player.size/2, player.y + player.size/2,
    player.x + player.size/2, player.y + player.size/2
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function createStar() {
  return {
    x: random(width),
    y: random(height),
    size: random(2, 5)
  };
}

function createAsteroid() {
  return {
    x: random(width),
    y: random(height),
    size: random(20, 40),
    speedX: random(-2, 2),
    speedY: random(-2, 2)
  };
}

function checkStarCollection(index) {
  let star = stars[index];
  let d = dist(player.x, player.y, star.x, star.y);
  
  if (d < player.size/2 + star.size/2) {
    stars.splice(index, 1);
    score += 10;
    stars.push(createStar()); // Respawn
  }
}

// ============================================
// INPUT HANDLING
// ============================================
function keyPressed() {
  if (gameState === 'start' && key === ' ') {
    gameState = 'playing';
  } else if (gameState === 'gameover' && key === ' ') {
    resetGame();
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  player.x = 400;
  player.y = 300;
  stars = [];
  asteroids = [];
  
  for (let i = 0; i < 10; i++) {
    stars.push(createStar());
  }
  for (let i = 0; i < 5; i++) {
    asteroids.push(createAsteroid());
  }
  
  gameState = 'playing';
}
```

---

## Resources

- **p5.js Reference**: https://p5js.org/reference/
- **p5.js Examples**: https://p5js.org/examples/
- **The Coding Train**: https://www.youtube.com/@TheCodingTrain
- **Game Development Tutorials**: Check course resources

---

**Good luck with your Space Explorer project!** 🚀
