# Week 1 Assessment

## Quiz: Development Environment & Basic Drawing

### Part 1: Multiple Choice (10 marks)

**Question 1 (2 marks)**
What is the correct way to create a canvas that is 500 pixels wide and 400 pixels tall?

A) `createCanvas(400, 500);`
B) `createCanvas(500, 400);`
C) `canvas(500, 400);`
D) `new Canvas(500, 400);`

**Answer:** B

---

**Question 2 (2 marks)**
In p5.js, where is the origin (0, 0) of the coordinate system?

A) Bottom-left corner
B) Center of the canvas
C) Top-left corner
D) Top-right corner

**Answer:** C

---

**Question 3 (2 marks)**
Which function runs only once when the program starts?

A) `draw()`
B) `loop()`
C) `setup()`
D) `init()`

**Answer:** C

---

**Question 4 (2 marks)**
What does `fill(255, 0, 0)` do?

A) Sets the background to red
B) Sets the outline color to red
C) Sets the fill color to red
D) Creates a red circle

**Answer:** C

---

**Question 5 (2 marks)**
Which function draws a circle?

A) `circle(x, y, radius)`
B) `ellipse(x, y, width, height)`
C) `round(x, y, diameter)`
D) Both B and C are correct ways to draw a circle

**Answer:** D (ellipse with equal width/height draws a circle)

---

### Part 2: Code Reading (10 marks)

**Question 6 (5 marks)**
What will the following code draw?

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  fill(0, 0, 255);
  rect(100, 100, 200, 200);
}
```

Describe the output:
- Canvas size: ___________
- Background color: ___________
- Shape drawn: ___________
- Shape color: ___________
- Shape position: ___________
- Shape size: ___________

**Answer:**
- Canvas size: 400x400 pixels
- Background color: White
- Shape drawn: Rectangle
- Shape color: Blue
- Shape position: Top-left corner at (100, 100)
- Shape size: 200 pixels wide, 200 pixels tall

---

**Question 7 (5 marks)**
Identify the error in this code:

```javascript
function setup() {
  createCanvas(400, 400)
}

function draw() {
  background(220)
  ellipse(200, 200, 50, 50)
}
```

What is wrong? How would you fix it?

**Answer:**
Missing semicolons at the end of statements. While JavaScript is forgiving about semicolons, it's best practice to include them. The fixed code:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200, 200, 50, 50);
}
```

---

### Part 3: Predict the Output (10 marks)

**Question 8 (5 marks)**
What will this code display?

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  fill(255);
  ellipse(0, 0, 50, 50);
  ellipse(400, 0, 50, 50);
  ellipse(0, 400, 50, 50);
  ellipse(400, 400, 50, 50);
}
```

Describe what you would see:

**Answer:**
A black canvas with four white circles. Each circle is partially visible at the four corners of the canvas. The circles are centered at the corners, so only a quarter of each circle is visible within the canvas boundaries.

---

**Question 9 (5 marks)**
What colors will the three shapes be?

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  fill(255, 0, 0);
  rect(50, 50, 100, 100);
  
  fill(0, 255, 0);
  ellipse(200, 200, 100, 100);
  
  fill(0, 0, 255);
  triangle(300, 300, 350, 400, 250, 400);
}
```

**Answer:**
- Rectangle: Red (RGB: 255, 0, 0)
- Ellipse: Green (RGB: 0, 255, 0)
- Triangle: Blue (RGB: 0, 0, 255)

---

### Part 4: Debugging (10 marks)

**Question 10 (5 marks)**
This code should draw a yellow circle on a purple background, but it's not working. Find and fix the errors.

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(128, 0, 128);
  fill(255, 255, 0)
  ellipse(200, 200, 100, 100)
}
```

**Answer:**
Missing semicolons after `fill()` and `ellipse()`. Fixed code:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(128, 0, 128);
  fill(255, 255, 0);
  ellipse(200, 200, 100, 100);
}
```

---

**Question 11 (5 marks)**
This code should draw a green square in the center of the canvas, but the square appears in the wrong position. What's wrong?

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  fill(0, 255, 0);
  rect(200, 200, 100, 100);
}
```

**Answer:**
The rectangle is positioned with its top-left corner at (200, 200), not centered. To center a 100x100 rectangle on a 400x400 canvas, it should be at (150, 150):

```javascript
rect(150, 150, 100, 100);
```

---

### Part 5: Practical Programming (10 marks)

**Question 12 (10 marks)**
Write a complete p5.js program that draws the following scene:
- A light blue sky background (RGB: 135, 206, 235)
- A yellow sun in the top-right corner
- A green ground at the bottom
- A brown tree trunk
- Dark green tree leaves (circle)

Include proper setup() and draw() functions.

**Sample Answer:**

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
  
  // Tree trunk
  fill(139, 69, 19);
  rect(100, 200, 30, 100);
  
  // Tree leaves
  fill(0, 100, 0);
  ellipse(115, 180, 100, 100);
}
```

**Marking Rubric:**
- Canvas created correctly (2 marks)
- Background color correct (2 marks)
- Sun drawn in correct position with yellow color (2 marks)
- Ground drawn correctly (2 marks)
- Tree trunk and leaves drawn (2 marks)

---

## Total Marks: 50

### Grade Boundaries
- 45-50: Excellent (A)
- 40-44: Very Good (B)
- 35-39: Good (C)
- 30-34: Satisfactory (D)
- Below 30: Needs Improvement (F)

---

## Self-Assessment Checklist

Before submitting, verify you can:

- [ ] Explain what programming is and why we use JavaScript
- [ ] Set up and use the p5.js web editor
- [ ] Create a canvas with specific dimensions
- [ ] Understand the coordinate system (origin at top-left)
- [ ] Draw points, lines, rectangles, ellipses, and triangles
- [ ] Use RGB colors with fill(), stroke(), and background()
- [ ] Read and understand error messages
- [ ] Use basic debugging techniques
- [ ] Explain the difference between setup() and draw()
- [ ] Create a simple scene with multiple shapes

---

## Reflection Questions

1. What was the most challenging concept this week?

2. What concept do you feel most confident about?

3. What questions do you still have?

4. How much time did you spend on this week's materials?

5. What will you focus on improving next week?

---

*End of Week 1 Assessment*
