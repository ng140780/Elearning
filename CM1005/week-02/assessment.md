# Week 2 Assessment

## Quiz: Advanced Drawing Techniques

### Part 1: Multiple Choice (10 marks)

**Question 1 (2 marks)**
In p5.js, if you draw a red rectangle first, then a blue ellipse, which appears on top?

A) Red rectangle
B) Blue ellipse
C) They blend together
D) Whichever is larger

**Answer:** B

---

**Question 2 (2 marks)**
What does `translate(100, 50)` do?

A) Moves the canvas 100 pixels right and 50 pixels down
B) Moves the origin (0,0) to position (100, 50)
C) Draws a shape at (100, 50)
D) Scales the canvas by 100x50

**Answer:** B

---

**Question 3 (2 marks)**
What is the value of `HALF_PI` in radians?

A) 0
B) π/2 (approximately 1.57)
C) π (approximately 3.14)
D) 2π (approximately 6.28)

**Answer:** B

---

**Question 4 (2 marks)**
Which function saves the current transformation state?

A) `save()`
B) `store()`
C) `push()`
D) `remember()`

**Answer:** C

---

**Question 5 (2 marks)**
What does `frameCount` represent?

A) The number of shapes drawn
B) The number of frames displayed since the program started
C) The current frame rate
D) The number of seconds elapsed

**Answer:** B

---

### Part 2: Code Reading (10 marks)

**Question 6 (5 marks)**
What will this code draw?

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  translate(200, 200);
  rotate(frameCount * 0.02);
  fill(255, 0, 0);
  rect(-50, -50, 100, 100);
}
```

Describe the animation:

**Answer:**
A red square centered on the canvas that continuously rotates clockwise. The rotation is smooth because `frameCount` increases by 1 each frame, and the small multiplier (0.02) creates slow rotation.

---

**Question 7 (5 marks)**
What pattern will this code create?

```javascript
function draw() {
  background(255);
  for (let i = 0; i < 8; i++) {
    let angle = TWO_PI * i / 8;
    let x = 200 + cos(angle) * 100;
    let y = 200 + sin(angle) * 100;
    ellipse(x, y, 30, 30);
  }
}
```

**Answer:**
8 circles arranged in a perfect circular pattern around the point (200, 200). Each circle is positioned at equal intervals around a circle with radius 100 pixels. The circles are evenly spaced at 45-degree intervals (360° / 8 = 45°).

---

### Part 3: Practical Programming (20 marks)

**Question 8 (10 marks)**
Write code to draw a simple house with:
- A rectangular wall (100x80) at position (150, 250)
- A triangular roof on top
- A rectangular door (30x50) centered at the bottom of the wall
- Two square windows (20x20) on either side of the door

**Sample Answer:**

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 235);
  
  // Wall
  fill(200, 150, 100);
  rect(150, 250, 100, 80);
  
  // Roof
  fill(150, 50, 50);
  triangle(150, 250, 250, 250, 200, 200);
  
  // Door
  fill(100, 50, 0);
  rect(185, 280, 30, 50);
  
  // Left window
  fill(150, 200, 255);
  rect(160, 265, 20, 20);
  
  // Right window
  rect(220, 265, 20, 20);
}
```

**Marking:**
- Wall drawn correctly (2 marks)
- Roof drawn correctly (2 marks)
- Door positioned correctly (2 marks)
- Both windows present (2 marks)
- Colors appropriate (2 marks)

---

**Question 9 (10 marks)**
Create an animation where a circle moves in a figure-8 pattern (infinity symbol).

**Sample Answer:**

```javascript
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);
  
  let t = frameCount * 0.05;
  let x = 300 + 150 * sin(t);
  let y = 200 + 75 * sin(t * 2);
  
  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, 30, 30);
}
```

**Marking:**
- Animation works (3 marks)
- Figure-8 pattern visible (4 marks)
- Smooth motion (2 marks)
- Code is clean and commented (1 mark)

---

## Total Marks: 40

### Grade Boundaries
- 36-40: Excellent (A)
- 32-35: Very Good (B)
- 28-31: Good (C)
- 24-27: Satisfactory (D)
- Below 24: Needs Improvement (F)

---

*End of Week 2 Assessment*
