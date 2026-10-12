# Week 1: Your Development Environment

## Overview

**Week:** 1 of 20  
**Topic:** Your Development Environment  
**Estimated Study Time:** 3-4 hours  

### Learning Objectives

By the end of this week, you will be able to:

✅ Set up your programming toolkit (browser + code editor)  
✅ Create and run your first p5.js program  
✅ Understand the purpose of `setup()` and `draw()`  
✅ Use the p5.js coordinate system  
✅ Draw basic shapes on a canvas  
✅ Read and understand error messages  
✅ Use basic debugging techniques  

### Why This Matters

Every programming journey starts with setting up your environment. This week, you'll learn:
- How programmers write and test code
- The structure of a p5.js program
- How to see your code come to life visually
- How to fix mistakes when things go wrong

These skills are the foundation for everything that follows.

### Prerequisites

None! This is your first week. We'll start from absolute zero.

---

## Lesson 1.1: What is Programming?

### What Does a Programmer Do?

A programmer writes instructions that tell a computer what to do. These instructions are called **code**.

Think of it like writing a recipe:
- You list the ingredients (data)
- You describe the steps (logic)
- The computer follows your recipe exactly

### How Do Computers Understand Code?

Computers only understand **binary** (0s and 1s). But writing in binary is incredibly difficult for humans.

That's why we use **programming languages** like JavaScript. JavaScript is designed to be readable by humans, and then translated into binary for the computer.

**The Process:**
```
You write: let x = 5;
     ↓
JavaScript translates: 01101100 01100101 01110100...
     ↓
Computer executes: Stores the number 5 in memory
```

### Why JavaScript?

JavaScript is:
- **Beginner-friendly** - Easy to read and write
- **Universal** - Runs in every web browser
- **Versatile** - Used for websites, games, apps, and more
- **Popular** - Huge community and lots of resources

### Why p5.js?

p5.js is a **library** (collection of helpful code) that makes it easy to create graphics and interactive programs.

With p5.js, you can:
- Draw shapes and images
- Respond to mouse and keyboard input
- Create animations
- Build games and visualizations

Instead of just seeing text in a console, you'll see your code come to life visually!

---

## Lesson 1.2: Setting Up Your Environment

### What You Need

1. **A Web Browser** (Chrome, Firefox, or Edge)
2. **A Code Editor** (we'll use the p5.js Web Editor)
3. **Internet Connection**

### Option 1: p5.js Web Editor (Recommended for Beginners)

The easiest way to start is using the online editor.

**Step 1: Open the Editor**
- Go to: https://editor.p5js.org/
- You'll see a code editor on the left and a preview on the right

**Step 2: Create an Account (Optional)**
- Click "Sign Up" if you want to save your work
- Or just start coding without an account

**Step 3: Understand the Interface**
```
┌─────────────────────────────────────┐
│  Code Editor (Left Side)            │
│  - Write your JavaScript here       │
│  - Two files: sketch.js + index.html│
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Preview (Right Side)               │
│  - See your program running         │
│  - Updates automatically            │
└─────────────────────────────────────┘
```

### Option 2: VS Code (For More Control)

If you prefer working locally on your computer:

**Step 1: Install VS Code**
- Download from: https://code.visualstudio.com/
- Install and open it

**Step 2: Install p5.vscode Extension**
- Click the Extensions icon (square icon on left)
- Search for "p5.vscode"
- Click Install

**Step 3: Create a New p5.js Project**
- Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
- Type "p5: Create Project"
- Choose a location and name

**Step 4: Open with Live Server**
- Right-click on `index.html`
- Select "Open with Live Server"
- Your program opens in the browser

---

## Lesson 1.3: Your First p5.js Program

### The Structure of a p5.js Program

Every p5.js program has two special functions:

```javascript
function setup() {
  // Runs once at the start
}

function draw() {
  // Runs repeatedly (60 times per second)
}
```

**What's the difference?**

- `setup()` - Runs **once** when the program starts
  - Use it to initialize things (create canvas, set colors, etc.)
  
- `draw()` - Runs **repeatedly** (about 60 times per second)
  - Use it to draw and update your program
  - Creates animations and interactivity

### Your First Sketch

Let's create a simple program:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200, 200, 50, 50);
}
```

**Let's break this down line by line:**

#### Line 1: `function setup() {`
- This defines the setup function
- Everything between `{` and `}` is part of setup
- This code runs once when the program starts

#### Line 2: `createCanvas(400, 400);`
- Creates a drawing area (canvas)
- First number: width in pixels (400)
- Second number: height in pixels (400)
- The canvas is 400 pixels wide and 400 pixels tall

#### Line 3: `}`
- Closes the setup function

#### Line 4: `function draw() {`
- This defines the draw function
- This code runs repeatedly (60 times per second)

#### Line 5: `background(220);`
- Sets the background color
- The number 220 means light gray
- Colors range from 0 (black) to 255 (white)

#### Line 6: `ellipse(200, 200, 50, 50);`
- Draws an ellipse (circle if width = height)
- First number: x position (200 pixels from left)
- Second number: y position (200 pixels from top)
- Third number: width (50 pixels)
- Fourth number: height (50 pixels)

#### Line 7: `}`
- Closes the draw function

### Try It Yourself!

**Exercise 1.1: Run Your First Program**

1. Open the p5.js Web Editor: https://editor.p5js.org/
2. Delete any existing code in `sketch.js`
3. Copy the code above
4. Click the "Play" button (▶) or press `Ctrl+S`
5. You should see a gray canvas with a circle in the middle!

**Expected Result:**
```
┌────────────────────┐
│                    │
│                    │
│        ●           │
│    (gray circle)   │
│                    │
│                    │
└────────────────────┘
```

---

## Lesson 1.4: Understanding the Coordinate System

### How Coordinates Work in p5.js

The canvas uses a coordinate system to position shapes.

**Important:** The origin (0, 0) is at the **top-left corner**, not the bottom-left like in math class!

```
(0,0) ──────────────────→ x increases
  │
  │
  │
  │
  ↓
y increases
```

### Coordinates Explained

- **x-coordinate**: Horizontal position (left to right)
  - x = 0 is the left edge
  - x = 400 is the right edge (on a 400px canvas)
  
- **y-coordinate**: Vertical position (top to bottom)
  - y = 0 is the top edge
  - y = 400 is the bottom edge (on a 400px canvas)

### Example: Positioning Shapes

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Top-left corner
  ellipse(50, 50, 30, 30);
  
  // Top-right corner
  ellipse(350, 50, 30, 30);
  
  // Bottom-left corner
  ellipse(50, 350, 30, 30);
  
  // Bottom-right corner
  ellipse(350, 350, 30, 30);
  
  // Center
  ellipse(200, 200, 30, 30);
}
```

**Visual Result:**
```
┌────────────────────┐
│ ●              ●   │
│                    │
│                    │
│         ●          │
│                    │
│                    │
│ ●              ●   │
└────────────────────┘
```

### Common Mistake: Confusing x and y

**Wrong:**
```javascript
ellipse(50, 350, 30, 30);  // This is bottom-left, not top-right!
```

**Right:**
```javascript
ellipse(350, 50, 30, 30);  // This is top-right
```

**Remember:** 
- First number is x (horizontal)
- Second number is y (vertical)

---

## Lesson 1.5: Drawing Basic Shapes

p5.js provides several functions to draw shapes:

### 1. Point

```javascript
point(x, y);
```

Draws a single point at the specified coordinates.

**Example:**
```javascript
point(200, 200);  // Point in the center
```

### 2. Line

```javascript
line(x1, y1, x2, y2);
```

Draws a line from (x1, y1) to (x2, y2).

**Example:**
```javascript
line(0, 0, 400, 400);  // Diagonal line from top-left to bottom-right
```

### 3. Rectangle

```javascript
rect(x, y, width, height);
```

Draws a rectangle with the top-left corner at (x, y).

**Example:**
```javascript
rect(100, 100, 200, 150);  // Rectangle at (100, 100), 200px wide, 150px tall
```

### 4. Ellipse (Circle)

```javascript
ellipse(x, y, width, height);
```

Draws an ellipse centered at (x, y).

**Example:**
```javascript
ellipse(200, 200, 100, 100);  // Circle with diameter 100px at center
```

**Note:** If width equals height, you get a perfect circle!

### 5. Triangle

```javascript
triangle(x1, y1, x2, y2, x3, y3);
```

Draws a triangle with three vertices.

**Example:**
```javascript
triangle(200, 50, 350, 350, 50, 350);  // Triangle pointing up
```

### Practice: Draw a Simple Scene

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 235);  // Sky blue
  
  // Sun
  fill(255, 255, 0);  // Yellow
  ellipse(350, 50, 60, 60);
  
  // Ground
  fill(34, 139, 34);  // Green
  rect(0, 300, 400, 100);
  
  // Tree trunk
  fill(139, 69, 19);  // Brown
  rect(100, 200, 20, 100);
  
  // Tree leaves
  fill(0, 128, 0);  // Dark green
  ellipse(110, 180, 80, 80);
}
```

---

## Lesson 1.6: Colors and Styles

### Understanding Colors in p5.js

p5.js uses the **RGB color model**:
- **R**ed: 0-255
- **G**reen: 0-255
- **B**lue: 0-255

### Grayscale Colors

Use a single number (0-255):
- 0 = black
- 255 = white
- 128 = medium gray

```javascript
background(0);    // Black background
background(255);  // White background
background(128);  // Gray background
```

### RGB Colors

Use three numbers (red, green, blue):

```javascript
background(255, 0, 0);    // Red
background(0, 255, 0);    // Green
background(0, 0, 255);    // Blue
background(255, 255, 0);  // Yellow (red + green)
```

### Setting Colors

#### fill() - Sets the fill color for shapes

```javascript
fill(255, 0, 0);  // Red fill
ellipse(200, 200, 100, 100);  // Red circle
```

#### stroke() - Sets the outline color

```javascript
stroke(0, 0, 255);  // Blue outline
ellipse(200, 200, 100, 100);  // Circle with blue outline
```

#### background() - Sets the background color

```javascript
background(135, 206, 235);  // Sky blue background
```

### Removing Fill or Stroke

```javascript
noFill();    // No fill (transparent inside)
noStroke();  // No outline

// Example: Circle with outline only
noFill();
stroke(255, 0, 0);
strokeWeight(5);  // Thick outline
ellipse(200, 200, 100, 100);
```

### Setting Stroke Weight

```javascript
strokeWeight(1);   // Thin line (default)
strokeWeight(5);   // Thick line
strokeWeight(10);  // Very thick line
```

### Example: Colorful Shapes

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  // Red square
  fill(255, 0, 0);
  rect(50, 50, 100, 100);
  
  // Green circle with blue outline
  fill(0, 255, 0);
  stroke(0, 0, 255);
  strokeWeight(5);
  ellipse(250, 100, 100, 100);
  
  // Purple triangle, no fill
  noFill();
  stroke(128, 0, 128);
  strokeWeight(3);
  triangle(100, 250, 200, 350, 0, 350);
}
```

---

## Lesson 1.7: Reading Error Messages

### Why Errors Happen

Errors (also called "bugs") are mistakes in your code. They're normal! Even professional programmers make errors every day.

The key is learning to read error messages and fix them.

### Types of Errors

#### 1. Syntax Errors

Mistakes in the structure of your code.

**Example:**
```javascript
// Missing semicolon
ellipse(200, 200, 50, 50)  // Error!

// Correct:
ellipse(200, 200, 50, 50);  // Semicolon at the end
```

**Common syntax errors:**
- Missing semicolons
- Missing closing brackets `}`
- Misspelled function names
- Wrong number of parameters

#### 2. Reference Errors

Using a variable or function that doesn't exist.

**Example:**
```javascript
ellipss(200, 200, 50, 50);  // Error! "ellipss" is not defined
```

**Fix:**
```javascript
ellipse(200, 200, 50, 50);  // Correct spelling
```

#### 3. Type Errors

Using a value in the wrong way.

**Example:**
```javascript
let x = "hello";
ellipse(x, 200, 50, 50);  // Error! x should be a number, not a string
```

### How to Read Error Messages

When an error occurs, p5.js shows a message in the console.

**Example error:**
```
Uncaught ReferenceError: ellipss is not defined
    at draw (sketch.js:7)
```

**How to read this:**
1. **Error type:** `ReferenceError` - You used something that doesn't exist
2. **What's wrong:** `ellipss is not defined` - You misspelled "ellipse"
3. **Where:** `at draw (sketch.js:7)` - The error is in the draw function, line 7

### Using the Console

The console is where error messages appear.

**To open the console:**
- Right-click on your sketch
- Select "Inspect" or "Inspect Element"
- Click the "Console" tab

**Or use keyboard shortcut:**
- Windows/Linux: `F12` or `Ctrl+Shift+J`
- Mac: `Cmd+Option+J`

### Debugging Techniques

#### 1. Read the Error Message

The error message tells you:
- What went wrong
- Where it happened
- Sometimes how to fix it

#### 2. Check the Line Number

The error message includes a line number. Go to that line and look for mistakes.

#### 3. Use console.log()

Add `console.log()` statements to check values:

```javascript
let x = 200;
console.log("x is:", x);  // Prints: x is: 200
```

This helps you see what's happening in your code.

#### 4. Comment Out Code

If you're not sure what's causing an error, comment out sections:

```javascript
// ellipse(200, 200, 50, 50);  // This line is now ignored
```

Add `//` at the start of a line to comment it out.

#### 5. Start Fresh

If you're really stuck, try creating a new sketch and adding code back piece by piece.

---

## Lesson 1.8: The draw() Loop and Animation

### Understanding the Draw Loop

The `draw()` function runs repeatedly, about 60 times per second. This is called the **draw loop**.

**Why is this useful?**
- Creates animations
- Responds to user input
- Updates the display continuously

### Simple Animation Example

```javascript
let x = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Draw a circle at position x
  ellipse(x, 200, 50, 50);
  
  // Move the circle to the right
  x = x + 1;
  
  // Reset when it goes off screen
  if (x > 450) {
    x = -50;
  }
}
```

**What happens:**
1. The circle starts at x = 0 (left edge)
2. Each frame, x increases by 1
3. The circle moves to the right
4. When x > 450, it resets to -50 (off-screen left)
5. The circle appears to move across the screen continuously

### Frame Rate

p5.js tries to run `draw()` 60 times per second. This is called the **frame rate**.

You can check the current frame rate:

```javascript
function draw() {
  background(220);
  text("Frame rate: " + frameRate(), 10, 20);
}
```

You can also set a specific frame rate:

```javascript
function setup() {
  createCanvas(400, 400);
  frameRate(30);  // 30 frames per second instead of 60
}
```

---

## Summary

This week, you learned:

✅ **What programming is** - Writing instructions for computers  
✅ **How to set up your environment** - p5.js Web Editor or VS Code  
✅ **The structure of a p5.js program** - setup() and draw() functions  
✅ **The coordinate system** - x (horizontal) and y (vertical)  
✅ **How to draw shapes** - point, line, rect, ellipse, triangle  
✅ **How to use colors** - RGB model, fill(), stroke(), background()  
✅ **How to read error messages** - Debugging techniques  
✅ **How animation works** - The draw() loop  

### Key Functions Learned

- `createCanvas(width, height)` - Create drawing area
- `background(color)` - Set background color
- `ellipse(x, y, width, height)` - Draw ellipse/circle
- `rect(x, y, width, height)` - Draw rectangle
- `line(x1, y1, x2, y2)` - Draw line
- `point(x, y)` - Draw point
- `triangle(x1, y1, x2, y2, x3, y3)` - Draw triangle
- `fill(r, g, b)` - Set fill color
- `stroke(r, g, b)` - Set stroke color
- `strokeWeight(weight)` - Set stroke thickness
- `noFill()` - Remove fill
- `noStroke()` - Remove stroke

### Key Concepts

- **Canvas** - The drawing area
- **Coordinates** - (x, y) positions on the canvas
- **RGB colors** - Red, Green, Blue values (0-255)
- **setup()** - Runs once at the start
- **draw()** - Runs repeatedly (animation loop)
- **Syntax** - The rules for writing code
- **Debugging** - Finding and fixing errors

---

## What's Next?

In Week 2, you'll learn:
- More advanced drawing techniques
- How to create complex scenes
- Better color schemes
- Drawing order and layering

**Preview:** You'll transform your basic canvas into a beautiful space scene!

---

## Need Help?

- **p5.js Reference:** https://p5js.org/reference/
- **p5.js Tutorials:** https://p5js.org/learn/
- **The Coding Train:** https://www.youtube.com/@TheCodingTrain
- **Course Discussion:** Ask questions in the course forum

---

*End of Week 1 Lesson*
