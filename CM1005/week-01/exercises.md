# Week 1: Exercises

## Exercise 1.1: Your First Sketch

**Objective:** Create and run your first p5.js program

**Instructions:**
1. Open the p5.js Web Editor: https://editor.p5js.org/
2. Create a new sketch
3. Write code that creates a 400x400 canvas
4. Set the background to light blue (RGB: 135, 206, 235)
5. Draw a yellow circle (RGB: 255, 255, 0) in the center with diameter 100

**Expected Result:**
- A light blue canvas with a yellow circle in the middle

**Hints:**
- Use `createCanvas(400, 400)` in setup()
- Use `background(135, 206, 235)` in draw()
- Use `fill(255, 255, 0)` before drawing the circle
- Use `ellipse(200, 200, 100, 100)` to draw the circle

**Solution:** (Try it yourself first!)
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 235);
  fill(255, 255, 0);
  ellipse(200, 200, 100, 100);
}
```

---

## Exercise 1.2: Shape Gallery

**Objective:** Practice drawing different shapes

**Instructions:**
Create a sketch that displays:
1. A red square in the top-left corner
2. A green circle in the top-right corner
3. A blue triangle in the bottom-center
4. A purple line from top-left to bottom-right

**Requirements:**
- Canvas size: 400x400
- Each shape should be clearly visible
- Use appropriate colors (RGB values)

**Hints:**
- Top-left: around (50, 50)
- Top-right: around (350, 50)
- Bottom-center: around (200, 350)
- Use `fill()` before drawing shapes
- Use `stroke()` for the line

**Solution:**
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  // Red square (top-left)
  fill(255, 0, 0);
  rect(20, 20, 80, 80);
  
  // Green circle (top-right)
  fill(0, 255, 0);
  ellipse(350, 60, 80, 80);
  
  // Blue triangle (bottom-center)
  fill(0, 0, 255);
  triangle(200, 300, 150, 380, 250, 380);
  
  // Purple line (diagonal)
  stroke(128, 0, 128);
  strokeWeight(3);
  line(0, 0, 400, 400);
}
```

---

## Exercise 1.3: Coordinate Practice

**Objective:** Understand the coordinate system

**Instructions:**
Create a sketch that draws:
1. A small circle at each corner of the canvas
2. A circle in the exact center
3. Labels showing the coordinates (use the `text()` function)

**Requirements:**
- Canvas size: 400x400
- Corner circles at: (0,0), (400,0), (0,400), (400,400)
- Center circle at: (200,200)
- Use different colors for each circle

**Hints:**
- Corners are at the edges, so circles might be partially off-screen
- Center is at (width/2, height/2) or (200, 200)
- Use `text("label", x, y)` to display text
- Use `textAlign(CENTER, CENTER)` to center text

**Solution:**
```javascript
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240);
  
  // Top-left corner
  fill(255, 0, 0);
  ellipse(0, 0, 30, 30);
  fill(0);
  text("(0, 0)", 30, 30);
  
  // Top-right corner
  fill(0, 255, 0);
  ellipse(400, 0, 30, 30);
  fill(0);
  text("(400, 0)", 360, 30);
  
  // Bottom-left corner
  fill(0, 0, 255);
  ellipse(0, 400, 30, 30);
  fill(0);
  text("(0, 400)", 40, 370);
  
  // Bottom-right corner
  fill(255, 255, 0);
  ellipse(400, 400, 30, 30);
  fill(0);
  text("(400, 400)", 350, 370);
  
  // Center
  fill(128, 0, 128);
  ellipse(200, 200, 40, 40);
  fill(255);
  text("(200, 200)", 200, 230);
}
```

---

## Exercise 1.4: Color Mixer

**Objective:** Experiment with RGB colors

**Instructions:**
Create a sketch that displays:
1. Three large circles showing pure red, green, and blue
2. Three circles showing secondary colors (yellow, cyan, magenta)
3. One circle showing white
4. One circle showing black

**Requirements:**
- Arrange the circles in a grid pattern
- Each circle should be clearly labeled with its color name
- Use appropriate RGB values

**RGB Values Reference:**
- Red: (255, 0, 0)
- Green: (0, 255, 0)
- Blue: (0, 0, 255)
- Yellow: (255, 255, 0) - Red + Green
- Cyan: (0, 255, 255) - Green + Blue
- Magenta: (255, 0, 255) - Red + Blue
- White: (255, 255, 255)
- Black: (0, 0, 0)

**Solution:**
```javascript
function setup() {
  createCanvas(500, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240);
  
  // Primary colors (top row)
  fill(255, 0, 0);
  ellipse(100, 100, 80, 80);
  fill(0);
  text("Red", 100, 150);
  
  fill(0, 255, 0);
  ellipse(250, 100, 80, 80);
  fill(0);
  text("Green", 250, 150);
  
  fill(0, 0, 255);
  ellipse(400, 100, 80, 80);
  fill(0);
  text("Blue", 400, 150);
  
  // Secondary colors (middle row)
  fill(255, 255, 0);
  ellipse(100, 250, 80, 80);
  fill(0);
  text("Yellow", 100, 300);
  
  fill(0, 255, 255);
  ellipse(250, 250, 80, 80);
  fill(0);
  text("Cyan", 250, 300);
  
  fill(255, 0, 255);
  ellipse(400, 250, 80, 80);
  fill(0);
  text("Magenta", 400, 300);
}
```

---

## Exercise 1.5: Simple Scene

**Objective:** Combine multiple shapes to create a scene

**Instructions:**
Create a simple landscape scene with:
1. A sky background (light blue)
2. A sun (yellow circle) in the upper right
3. Green ground at the bottom
4. A simple house (rectangle + triangle roof)
5. A tree (rectangle trunk + circle leaves)

**Requirements:**
- Canvas size: 500x400
- Use appropriate colors
- Layer shapes correctly (background first, then objects)

**Hints:**
- Draw background first
- Draw ground as a rectangle at the bottom
- House: rectangle for walls, triangle for roof
- Tree: rectangle for trunk, ellipse for leaves
- Use `fill()` before each shape

**Solution:**
```javascript
function setup() {
  createCanvas(500, 400);
}

function draw() {
  // Sky
  background(135, 206, 235);
  
  // Sun
  fill(255, 255, 0);
  noStroke();
  ellipse(420, 80, 80, 80);
  
  // Ground
  fill(34, 139, 34);
  rect(0, 300, 500, 100);
  
  // House - walls
  fill(200, 150, 100);
  rect(100, 200, 120, 100);
  
  // House - roof
  fill(150, 50, 50);
  triangle(90, 200, 230, 200, 160, 140);
  
  // House - door
  fill(100, 50, 0);
  rect(145, 250, 30, 50);
  
  // Tree - trunk
  fill(139, 69, 19);
  rect(350, 220, 20, 80);
  
  // Tree - leaves
  fill(0, 128, 0);
  ellipse(360, 200, 80, 80);
}
```

---

## Exercise 1.6: Debugging Practice

**Objective:** Find and fix errors in buggy code

**Instructions:**
Each code snippet below has an error. Find the error, fix it, and explain what was wrong.

### Bug 1:
```javascript
function setup() {
  createCanvas(400, 400)
}

function draw() {
  background(220);
  ellipse(200, 200, 50, 50);
}
```

**What's wrong?**
**How to fix it?**

### Bug 2:
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellips(200, 200, 50, 50);
}
```

**What's wrong?**
**How to fix it?**

### Bug 3:
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0)
  rect(100, 100, 50, 50)
  ellipse(200, 200, 50, 50);
}
```

**What's wrong?**
**How to fix it?**

### Bug 4:
```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200, 200);
}
```

**What's wrong?**
**How to fix it?**

### Solutions:

**Bug 1:** Missing semicolon after `createCanvas(400, 400)`
**Fix:** Add semicolon: `createCanvas(400, 400);`

**Bug 2:** Misspelled function name `ellips` instead of `ellipse`
**Fix:** Change to `ellipse(200, 200, 50, 50);`

**Bug 3:** Missing semicolons after `fill()` and `rect()`
**Fix:** Add semicolons:
```javascript
fill(255, 0, 0);
rect(100, 100, 50, 50);
```

**Bug 4:** `ellipse()` requires 4 parameters (x, y, width, height), only 2 provided
**Fix:** Add width and height: `ellipse(200, 200, 50, 50);`

---

## Challenge Exercises

### Challenge 1: Animated Circle
Create a circle that moves from left to right across the screen. When it reaches the right edge, it should reappear on the left.

**Hint:** Use a variable to track the x position, increment it in draw(), and reset it when it goes off-screen.

### Challenge 2: Colorful Grid
Draw a 4x4 grid of squares, each with a different color.

**Hint:** Calculate positions using multiplication. For example, square at column 2, row 3 would be at x = 2 * 100, y = 3 * 100.

### Challenge 3: Smiley Face
Draw a smiley face using circles and arcs.

**Hint:** Use a large circle for the face, two small circles for eyes, and an arc for the smile.

---

## Submission Guidelines

For each exercise:
1. Write the complete code
2. Test it to make sure it works
3. Take a screenshot of the result
4. Write a brief explanation of what you learned

---

*End of Week 1 Exercises*
