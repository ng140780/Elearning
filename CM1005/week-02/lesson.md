# Week 2: Drawing in 2D (Advanced)

## Overview

**Week:** 2 of 20  
**Topic:** Drawing in 2D - Advanced Techniques  
**Estimated Study Time:** 3-4 hours  

### Learning Objectives

By the end of this week, you will be able to:

✅ Use mathematical calculations for precise positioning  
✅ Understand drawing order and layering  
✅ Create complex scenes with multiple elements  
✅ Use arcs and curves  
✅ Apply transformations (translate, rotate, scale)  
✅ Create depth and perspective in 2D drawings  

### Why This Matters

Mastering advanced drawing techniques allows you to:
- Create more realistic and detailed graphics
- Position elements precisely using math
- Build complex scenes efficiently
- Prepare for animation in later weeks

### Prerequisites from Week 1

- Understanding of setup() and draw()
- Basic shape drawing (rect, ellipse, line, triangle)
- Coordinate system knowledge
- Color and styling (fill, stroke, background)

---

## Lesson 2.1: Drawing Order and Layering

### How Drawing Order Works

In p5.js, shapes are drawn in the order they appear in your code. Later shapes appear on top of earlier shapes.

```javascript
function draw() {
  background(255);
  
  // This rectangle is drawn first (bottom layer)
  fill(255, 0, 0);
  rect(100, 100, 200, 200);
  
  // This ellipse is drawn second (middle layer)
  fill(0, 255, 0);
  ellipse(200, 200, 150, 150);
  
  // This triangle is drawn last (top layer)
  fill(0, 0, 255);
  triangle(200, 50, 250, 150, 150, 150);
}
```

### Practical Example: Layered Scene

```javascript
function draw() {
  // Background (bottom layer)
  background(135, 206, 235);  // Sky
  
  // Sun (behind clouds)
  fill(255, 255, 0);
  ellipse(350, 80, 80, 80);
  
  // Clouds (middle layer)
  fill(255);
  ellipse(100, 100, 80, 60);
  ellipse(140, 100, 80, 60);
  ellipse(120, 80, 80, 60);
  
  // Mountains (front layer)
  fill(100, 100, 100);
  triangle(0, 400, 200, 200, 400, 400);
  triangle(200, 400, 400, 250, 600, 400);
  
  // Ground (top layer)
  fill(34, 139, 34);
  rect(0, 350, 800, 50);
}
```

### Key Principle

Think of drawing like painting on a canvas:
- First stroke = bottom layer
- Last stroke = top layer
- You can't draw "behind" something already drawn (unless you redraw the background)

---

## Lesson 2.2: Mathematical Positioning

### Using Math for Precise Placement

Instead of hardcoding positions, use mathematical calculations:

```javascript
function draw() {
  background(255);
  
  // Center of canvas
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Draw circle at exact center
  ellipse(centerX, centerY, 100, 100);
  
  // Draw circles in a row with equal spacing
  let spacing = width / 5;
  for (let i = 0; i < 5; i++) {
    ellipse(spacing * i + spacing/2, 100, 30, 30);
  }
}
```

### Grid Positioning

Create a grid of objects:

```javascript
function draw() {
  background(255);
  
  let cols = 5;
  let rows = 4;
  let cellWidth = width / cols;
  let cellHeight = height / rows;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = col * cellWidth + cellWidth / 2;
      let y = row * cellHeight + cellHeight / 2;
      ellipse(x, y, 30, 30);
    }
  }
}
```

### Circular Positioning

Place objects in a circle:

```javascript
function draw() {
  background(255);
  
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 150;
  let numObjects = 12;
  
  for (let i = 0; i < numObjects; i++) {
    let angle = TWO_PI * i / numObjects;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    ellipse(x, y, 20, 20);
  }
}
```

**Note:** `TWO_PI` is a p5.js constant equal to 2π (about 6.28). `cos()` and `sin()` are trigonometric functions.

---

## Lesson 2.3: Arcs and Curves

### Drawing Arcs

An arc is a portion of an ellipse:

```javascript
arc(x, y, width, height, startAngle, stopAngle);
```

Angles are in radians. Key constants:
- `0` = 3 o'clock (right)
- `HALF_PI` = 6 o'clock (bottom) = π/2
- `PI` = 9 o'clock (left) = π
- `TWO_PI` = Full circle = 2π

```javascript
function draw() {
  background(255);
  
  // Quarter circle (top-right)
  arc(200, 200, 150, 150, 0, HALF_PI);
  
  // Half circle (bottom)
  arc(400, 200, 150, 150, 0, PI);
  
  // Three-quarter circle
  arc(600, 200, 150, 150, 0, PI + HALF_PI);
}
```

### Drawing Curves

p5.js provides several curve functions:

#### Bezier Curve

```javascript
bezier(x1, y1, x2, y2, x3, y3, x4, y4);
```

- (x1, y1) = start point
- (x2, y2) = first control point
- (x3, y3) = second control point
- (x4, y4) = end point

```javascript
function draw() {
  background(255);
  noFill();
  stroke(0);
  strokeWeight(2);
  
  bezier(50, 300, 150, 50, 350, 50, 450, 300);
  
  // Show control points
  fill(255, 0, 0);
  ellipse(150, 50, 10, 10);
  ellipse(350, 50, 10, 10);
}
```

#### Quadratic Curve

```javascript
curve(x1, y1, x2, y2, x3, y3, x4, y4);
```

Simpler than bezier, uses 4 points.

---

## Lesson 2.4: Transformations

### translate() - Move the Origin

`translate(x, y)` moves the origin (0, 0) to a new position:

```javascript
function draw() {
  background(255);
  
  // Draw at (50, 50)
  rect(50, 50, 50, 50);
  
  // Move origin to (200, 200)
  translate(200, 200);
  
  // Now (0, 0) is at (200, 200)
  rect(0, 0, 50, 50);  // Appears at (200, 200)
}
```

**Important:** Transformations accumulate. Each `translate()` adds to the previous ones.

### rotate() - Rotate the Canvas

`rotate(angle)` rotates everything drawn after it:

```javascript
function draw() {
  background(255);
  
  // Move to center
  translate(width/2, height/2);
  
  // Rotate 45 degrees (PI/4 radians)
  rotate(PI/4);
  
  // Draw rectangle - it will be rotated
  rect(-50, -50, 100, 100);
}
```

**Note:** Angles are in radians by default. Use `radians(degrees)` to convert.

### scale() - Resize the Canvas

`scale(sx, sy)` scales everything drawn after it:

```javascript
function draw() {
  background(255);
  
  // Draw at normal size
  ellipse(100, 100, 50, 50);
  
  // Scale by 2x
  scale(2);
  
  // This will appear twice as large
  ellipse(100, 100, 50, 50);
}
```

### Combining Transformations

```javascript
function draw() {
  background(255);
  
  // Move to center
  translate(width/2, height/2);
  
  // Rotate slowly
  rotate(frameCount * 0.01);
  
  // Draw a rectangle
  rect(-50, -50, 100, 100);
}
```

**Note:** `frameCount` is a built-in variable that increases by 1 each frame.

### push() and pop() - Save and Restore State

Use `push()` and `pop()` to save and restore transformation state:

```javascript
function draw() {
  background(255);
  
  // First rectangle (no transformation)
  rect(50, 50, 50, 50);
  
  push();  // Save current state
  translate(200, 200);
  rotate(PI/4);
  rect(0, 0, 50, 50);  // Rotated rectangle
  pop();  // Restore previous state
  
  // Back to original state
  rect(350, 50, 50, 50);  // Not rotated
}
```

---

## Lesson 2.5: Creating Depth with Layering

### Foreground, Midground, Background

Create depth by layering elements:

```javascript
function draw() {
  // Background - sky
  background(135, 206, 235);
  
  // Background layer - distant mountains
  fill(150, 150, 180);
  triangle(0, 400, 200, 250, 400, 400);
  triangle(300, 400, 500, 280, 700, 400);
  
  // Midground layer - closer mountains
  fill(100, 100, 130);
  triangle(100, 400, 300, 300, 500, 400);
  
  // Foreground layer - ground
  fill(34, 139, 34);
  rect(0, 380, 800, 20);
  
  // Foreground objects - trees
  fill(139, 69, 19);
  rect(150, 320, 20, 60);
  fill(0, 100, 0);
  ellipse(160, 300, 80, 80);
}
```

### Size and Position for Depth

Objects that are:
- **Farther away**: Smaller, higher on canvas, less detail
- **Closer**: Larger, lower on canvas, more detail

```javascript
function draw() {
  background(135, 206, 235);
  
  // Distant tree (small, high)
  fill(100, 100, 100);
  rect(100, 250, 10, 30);
  fill(0, 80, 0);
  ellipse(105, 240, 30, 30);
  
  // Middle tree (medium, middle)
  fill(120, 80, 40);
  rect(300, 280, 20, 60);
  fill(0, 100, 0);
  ellipse(310, 260, 60, 60);
  
  // Close tree (large, low)
  fill(139, 69, 19);
  rect(550, 300, 40, 100);
  fill(0, 128, 0);
  ellipse(570, 260, 120, 120);
}
```

---

## Lesson 2.6: Complex Shapes

### Building Complex Shapes from Simple Ones

Combine basic shapes to create complex objects:

```javascript
function drawHouse(x, y, size) {
  // Wall
  fill(200, 150, 100);
  rect(x, y, size, size);
  
  // Roof
  fill(150, 50, 50);
  triangle(x, y, x + size, y, x + size/2, y - size/2);
  
  // Door
  fill(100, 50, 0);
  rect(x + size/3, y + size/2, size/3, size/2);
  
  // Window
  fill(150, 200, 255);
  rect(x + size/6, y + size/6, size/4, size/4);
  rect(x + size/2 + size/6, y + size/6, size/4, size/4);
}

function draw() {
  background(135, 206, 235);
  drawHouse(100, 250, 150);
  drawHouse(350, 280, 120);
}
```

### Using Functions for Reusability

Create reusable drawing functions:

```javascript
function drawTree(x, y, trunkHeight, leafSize) {
  // Trunk
  fill(139, 69, 19);
  rect(x - 10, y, 20, trunkHeight);
  
  // Leaves
  fill(0, 128, 0);
  ellipse(x, y - leafSize/2, leafSize, leafSize);
}

function draw() {
  background(135, 206, 235);
  
  // Draw multiple trees
  drawTree(100, 350, 80, 100);
  drawTree(250, 370, 60, 80);
  drawTree(400, 340, 100, 120);
  drawTree(550, 360, 70, 90);
}
```

---

## Lesson 2.7: Animation Basics

### Using frameCount for Animation

`frameCount` increases by 1 each frame (60 times per second):

```javascript
function draw() {
  background(255);
  
  // Circle moves from left to right
  let x = frameCount % width;
  ellipse(x, 200, 50, 50);
}
```

### Oscillating Motion

Use `sin()` for smooth back-and-forth motion:

```javascript
function draw() {
  background(255);
  
  // Circle oscillates left and right
  let x = width/2 + sin(frameCount * 0.05) * 150;
  ellipse(x, 200, 50, 50);
}
```

### Growing and Shrinking

```javascript
function draw() {
  background(255);
  
  // Circle grows and shrinks
  let size = 50 + sin(frameCount * 0.05) * 30;
  ellipse(width/2, height/2, size, size);
}
```

### Rotating Objects

```javascript
function draw() {
  background(255);
  
  translate(width/2, height/2);
  rotate(frameCount * 0.02);
  
  rect(-50, -50, 100, 100);
}
```

---

## Summary

This week, you learned:

✅ **Drawing order** - Later shapes appear on top  
✅ **Mathematical positioning** - Use calculations for precise placement  
✅ **Arcs and curves** - Draw partial circles and curved lines  
✅ **Transformations** - translate(), rotate(), scale()  
✅ **push() and pop()** - Save and restore transformation state  
✅ **Creating depth** - Layer elements for foreground/background  
✅ **Complex shapes** - Combine simple shapes into complex objects  
✅ **Animation basics** - Use frameCount and trigonometry  

### Key Functions Learned

- `arc(x, y, width, height, start, stop)`
- `bezier(x1, y1, x2, y2, x3, y3, x4, y4)`
- `translate(x, y)`
- `rotate(angle)`
- `scale(sx, sy)`
- `push()` and `pop()`
- `radians(degrees)`

### Key Concepts

- **Drawing order** determines layering
- **Radians** are used for angles (TWO_PI = full circle)
- **Transformations** affect all subsequent drawing
- **push/pop** save and restore state
- **frameCount** enables animation

---

## What's Next?

In Week 3, you'll learn about:
- Variables and data types
- Storing and updating values
- Mouse and keyboard interaction
- Making your spaceship move!

---

*End of Week 2 Lesson*
