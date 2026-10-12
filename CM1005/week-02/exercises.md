# Week 2 Exercises: Advanced Drawing

## Exercise 2.1: Drawing Order Practice

**Objective:** Understand how drawing order affects layering

**Instructions:**
Create a scene with the following layers (from bottom to top):
1. Blue sky background
2. Yellow sun (partially behind clouds)
3. White clouds (overlapping the sun)
4. Gray mountains (in front of clouds)
5. Green ground (at the bottom)

**Expected Result:**
A landscape scene with proper depth and layering

**Hints:**
- Draw elements in the order you want them to appear
- Later shapes appear on top of earlier shapes
- Use `background()` first, then layer other elements

**Solution:**
```javascript
function setup() {
  createCanvas(600, 400);
}

function draw() {
  // Sky (bottom layer)
  background(135, 206, 235);
  
  // Sun (behind clouds)
  fill(255, 255, 0);
  noStroke();
  ellipse(450, 100, 100, 100);
  
  // Clouds (over sun)
  fill(255);
  ellipse(400, 120, 80, 60);
  ellipse(450, 110, 90, 70);
  ellipse(500, 120, 80, 60);
  
  // Mountains (in front of clouds)
  fill(128, 128, 128);
  triangle(0, 400, 200, 200, 400, 400);
  triangle(300, 400, 500, 250, 700, 400);
  
  // Ground (top layer)
  fill(34, 139, 34);
  rect(0, 350, 600, 50);
}
```

---

## Exercise 2.2: Mathematical Positioning

**Objective:** Use mathematical calculations for precise positioning

**Instructions:**
Draw 5 circles in a horizontal row, evenly spaced across the canvas. Each circle should be centered vertically.

**Requirements:**
- Canvas: 500x300
- 5 circles
- Evenly spaced horizontally
- Centered vertically
- Each circle: 40 pixels diameter

**Hints:**
- Calculate spacing: `width / numberOfCircles`
- Center each circle in its spacing unit
- Vertical center: `height / 2`

**Solution:**
```javascript
function setup() {
  createCanvas(500, 300);
}

function draw() {
  background(255);
  
  let numCircles = 5;
  let spacing = width / numCircles;
  let y = height / 2;
  
  fill(100, 150, 255);
  noStroke();
  
  for (let i = 0; i < numCircles; i++) {
    let x = spacing * i + spacing / 2;
    ellipse(x, y, 40, 40);
  }
}
```

---

## Exercise 2.3: Grid Pattern

**Objective:** Create a grid of objects using nested positioning

**Instructions:**
Create a 4x4 grid of squares. Each square should be 50x50 pixels with 10 pixels spacing between them. The grid should be centered on the canvas.

**Requirements:**
- Canvas: 400x400
- Grid: 4 rows × 4 columns
- Square size: 50x50
- Spacing: 10 pixels
- Grid centered on canvas

**Hints:**
- Calculate total grid width: `4 * 50 + 3 * 10 = 230`
- Calculate starting x: `(width - 230) / 2`
- Use nested loops for rows and columns

**Solution:**
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  let rows = 4;
  let cols = 4;
  let size = 50;
  let spacing = 10;
  
  let totalWidth = cols * size + (cols - 1) * spacing;
  let totalHeight = rows * size + (rows - 1) * spacing;
  
  let startX = (width - totalWidth) / 2;
  let startY = (height - totalHeight) / 2;
  
  fill(100, 150, 255);
  noStroke();
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = startX + col * (size + spacing);
      let y = startY + row * (size + spacing);
      rect(x, y, size, size);
    }
  }
}
```

---

## Exercise 2.4: Circular Pattern

**Objective:** Place objects in a circular arrangement

**Instructions:**
Draw 12 circles arranged in a circle around the center of the canvas.

**Requirements:**
- Canvas: 400x400
- 12 circles
- Arranged in a circle
- Radius of arrangement: 150 pixels
- Each circle: 20 pixels diameter

**Hints:**
- Use `TWO_PI` for full circle (2π radians)
- Calculate angle for each object: `TWO_PI * i / numObjects`
- Use `cos()` and `sin()` for x and y positions
- Add radius to center position

**Solution:**
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 150;
  let numObjects = 12;
  
  fill(255, 100, 100);
  noStroke();
  
  for (let i = 0; i < numObjects; i++) {
    let angle = TWO_PI * i / numObjects;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    ellipse(x, y, 20, 20);
  }
  
  // Draw center point
  fill(0);
  ellipse(centerX, centerY, 10, 10);
}
```

---

## Exercise 2.5: Arcs and Curves

**Objective:** Practice drawing arcs and bezier curves

**Instructions:**
Create a smiley face using arcs for the smile and bezier curves for the eyes.

**Requirements:**
- Canvas: 400x400
- Yellow face (circle)
- Two eyes (bezier curves or arcs)
- Smile (arc)
- Face should be centered

**Hints:**
- Use `arc()` for the smile (bottom half of circle)
- Use `bezier()` for curved eyes
- Face: large yellow circle
- Position features relative to center

**Solution:**
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Face
  fill(255, 255, 0);
  noStroke();
  ellipse(centerX, centerY, 200, 200);
  
  // Left eye (arc)
  fill(0);
  arc(centerX - 40, centerY - 30, 30, 30, 0, PI);
  
  // Right eye (arc)
  arc(centerX + 40, centerY - 30, 30, 30, 0, PI);
  
  // Smile (arc)
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(centerX, centerY + 20, 100, 80, 0, PI);
}
```

---

## Exercise 2.6: Transformations

**Objective:** Use translate(), rotate(), and scale()

**Instructions:**
Create a pattern of rotated squares. Draw 8 squares, each rotated 45 degrees more than the previous one, all centered on the canvas.

**Requirements:**
- Canvas: 400x400
- 8 squares
- Each square: 100x100
- Each rotated 45° (PI/4 radians) more than previous
- All centered on canvas
- Different colors for each square

**Hints:**
- Use `translate()` to move to center
- Use `rotate()` with increasing angles
- Use `push()` and `pop()` to save/restore state
- Calculate angle: `i * PI/4`

**Solution:**
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  translate(width/2, height/2);
  
  let colors = [
    [255, 0, 0],
    [255, 127, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 0, 255],
    [75, 0, 130],
    [148, 0, 211],
    [255, 0, 255]
  ];
  
  for (let i = 0; i < 8; i++) {
    push();
    rotate(i * PI/4);
    fill(colors[i][0], colors[i][1], colors[i][2]);
    noStroke();
    rect(-50, -50, 100, 100);
    pop();
  }
}
```

---

## Exercise 2.7: Animation - Bouncing Ball

**Objective:** Create a simple animation using frameCount

**Instructions:**
Create a ball that bounces back and forth horizontally across the canvas.

**Requirements:**
- Canvas: 600x400
- Ball: 50 pixels diameter
- Ball moves from left to right
- When it reaches the edge, it reverses direction
- Smooth animation

**Hints:**
- Use a variable for x position
- Use a variable for direction (1 or -1)
- Update position each frame
- Check boundaries and reverse direction
- Use `frameCount` or a separate variable

**Solution:**
```javascript
let x = 50;
let direction = 1;
let speed = 3;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);
  
  // Update position
  x += speed * direction;
  
  // Check boundaries
  if (x > width - 25 || x < 25) {
    direction = -direction;
  }
  
  // Draw ball
  fill(255, 0, 0);
  noStroke();
  ellipse(x, 200, 50, 50);
}
```

---

## Exercise 2.8: Complex Scene - Solar System

**Objective:** Combine multiple techniques to create a complex scene

**Instructions:**
Create a simple solar system with:
- Sun in the center
- 3 planets orbiting at different distances
- Planets should be different sizes and colors
- Optional: Add moons orbiting planets

**Requirements:**
- Canvas: 600x600
- Sun: yellow, center
- 3 planets: different colors, sizes, orbit radii
- Planets should be positioned using circular math
- Use transformations for orbits

**Hints:**
- Use `translate()` to move to center
- Use `rotate()` with `frameCount` for animation
- Calculate planet positions with `cos()` and `sin()`
- Use `push()` and `pop()` for each planet

**Solution:**
```javascript
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  
  translate(width/2, height/2);
  
  // Sun
  fill(255, 255, 0);
  noStroke();
  ellipse(0, 0, 80, 80);
  
  // Planet 1 (closest)
  push();
  rotate(frameCount * 0.02);
  let x1 = 120;
  fill(100, 150, 255);
  ellipse(x1, 0, 30, 30);
  pop();
  
  // Planet 2 (middle)
  push();
  rotate(frameCount * 0.015);
  let x2 = 200;
  fill(255, 100, 100);
  ellipse(x2, 0, 40, 40);
  pop();
  
  // Planet 3 (farthest)
  push();
  rotate(frameCount * 0.01);
  let x3 = 280;
  fill(100, 255, 100);
  ellipse(x3, 0, 35, 35);
  pop();
}
```

---

## Challenge Exercises

### Challenge 1: Spirograph Pattern
Create a spirograph pattern by drawing circles that rotate and change size over time.

### Challenge 2: Fractal Tree
Create a simple fractal tree using recursion (advanced - research recursive functions).

### Challenge 3: Particle System
Create a simple particle system where particles spawn, move, and fade out.

---

## Submission Guidelines

For each exercise:
1. Write the complete code
2. Test it to ensure it works correctly
3. Take a screenshot of the result
4. Write a brief explanation of what you learned

---

*End of Week 2 Exercises*
