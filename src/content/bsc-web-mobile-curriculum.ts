import { Course } from '../types';

/**
 * BSc Computer Science - Web & Mobile Development Specialism
 * CM1005: Introduction to Programming I - Complete 20-Week Curriculum
 * 
 * Based on University of London BSc Computer Science
 * Primary Language: JavaScript with p5.js
 * Project: Space Explorer Game (progressive development)
 */

export const bscWebMobileCurriculum: Course[] = [
  {
    id: 'wm-y1-cm1005',
    type: 'course',
    title: 'CM1005: Introduction to Programming I',
    description: 'Complete beginner-friendly programming course using JavaScript and p5.js. Build a Space Explorer game progressively over 20 weeks while learning computational thinking, variables, conditionals, loops, functions, and object-oriented programming.',
    subject: 'computer-science',
    subjects: ['computer-science'],
    difficulty: 'beginner',
    estimatedHours: 300,
    provider: 'University of London',
    credits: 15,
    year: 1,
    semester: 'fall',
    order: 1,
    learningObjectives: [
      'Set up a development environment and run JavaScript programs',
      'Draw 2D graphics using p5.js and understand the coordinate system',
      'Use variables, data types, and operators to manage program state',
      'Implement conditional logic with if/else statements',
      'Work with arrays and loops to manage collections of data',
      'Write custom functions to organize code',
      'Create objects with properties and methods',
      'Use constructor functions to create multiple object instances',
      'Debug programs using systematic techniques',
      'Build a complete interactive graphical application',
    ],
    prerequisites: [],
    modules: [
      {
        id: 'wm-y1-cm1005-m1',
        type: 'module',
        title: 'Week 1: Your Development Environment',
        description: 'Set up your programming toolkit and create your first p5.js sketch',
        order: 1,
        lessons: [
          {
            id: 'wm-y1-cm1005-m1-l1',
            type: 'lesson',
            title: 'What is Programming?',
            contentType: 'text',
            content: `# What is Programming?

Programming is the process of creating instructions that tell a computer what to do. These instructions are called **code**.

## How Computers Understand Code

Computers only understand binary (0s and 1s). We use programming languages like JavaScript that are readable by humans and then translated into binary.

\`\`\`
You write: let x = 5;
     ↓
JavaScript translates: 01101100 01100101...
     ↓
Computer executes: Stores the number 5 in memory
\`\`\`

## Why JavaScript?

- **Beginner-friendly** - Easy to read and write
- **Universal** - Runs in every web browser
- **Versatile** - Used for websites, games, apps
- **Popular** - Huge community and resources

## Why p5.js?

p5.js is a library that makes it easy to create graphics and interactive programs. With p5.js you can:
- Draw shapes and images
- Respond to mouse and keyboard input
- Create animations
- Build games and visualizations

Instead of just seeing text, you'll see your code come to life visually!`,
            order: 1,
          },
          {
            id: 'wm-y1-cm1005-m1-l2',
            type: 'lesson',
            title: 'Setting Up Your Environment',
            contentType: 'text',
            content: `# Setting Up Your Environment

## What You Need

1. **A Web Browser** (Chrome, Firefox, or Edge)
2. **A Code Editor** (p5.js Web Editor recommended)
3. **Internet Connection**

## Option 1: p5.js Web Editor (Recommended)

The easiest way to start:

1. Go to: https://editor.p5js.org/
2. You'll see a code editor on the left and preview on the right
3. Click "Play" (▶) to run your code

## The p5.js Program Structure

Every p5.js program has two special functions:

\`\`\`javascript
function setup() {
  // Runs ONCE at the start
  // Use for initialization
}

function draw() {
  // Runs REPEATEDLY (60 times/second)
  // Use for animation and updates
}
\`\`\`

## Your First Sketch

\`\`\`javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200, 200, 50, 50);
}
\`\`\`

**Line by line:**
- \`createCanvas(400, 400)\` - Creates a 400x400 pixel drawing area
- \`background(220)\` - Sets background to light gray (0=black, 255=white)
- \`ellipse(200, 200, 50, 50)\` - Draws a circle at position (200,200) with diameter 50`,
            order: 2,
          },
          {
            id: 'wm-y1-cm1005-m1-l3',
            type: 'lesson',
            title: 'The Coordinate System',
            contentType: 'text',
            content: `# The Coordinate System

## How Coordinates Work

The canvas uses a coordinate system to position shapes.

**Important:** The origin (0, 0) is at the **top-left corner**, not the bottom-left like in math!

\`\`\`
(0,0) ──────────────────→ x increases
  │
  │
  │
  ↓
y increases
\`\`\`

## Coordinates Explained

- **x-coordinate**: Horizontal position (left to right)
  - x = 0 is the left edge
  - x = 400 is the right edge (on a 400px canvas)
  
- **y-coordinate**: Vertical position (top to bottom)
  - y = 0 is the top edge
  - y = 400 is the bottom edge (on a 400px canvas)

## Example: Positioning Shapes

\`\`\`javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Top-left corner
  ellipse(50, 50, 30, 30);
  
  // Top-right corner
  ellipse(350, 50, 30, 30);
  
  // Center
  ellipse(200, 200, 30, 30);
  
  // Bottom-left
  ellipse(50, 350, 30, 30);
  
  // Bottom-right
  ellipse(350, 350, 30, 30);
}
\`\`\`

## Common Mistake

Don't confuse x and y!

\`\`\`javascript
// Wrong - this is bottom-left, not top-right!
ellipse(50, 350, 30, 30);

// Right - this is top-right
ellipse(350, 50, 30, 30);
\`\`\`

**Remember:** First number is x (horizontal), second is y (vertical).`,
            order: 3,
          },
          {
            id: 'wm-y1-cm1005-m1-l4',
            type: 'lesson',
            title: 'Drawing Basic Shapes',
            contentType: 'text',
            content: `# Drawing Basic Shapes

p5.js provides several functions to draw shapes:

## 1. Point

\`\`\`javascript
point(x, y);

// Example:
point(200, 200);  // Single point in center
\`\`\`

## 2. Line

\`\`\`javascript
line(x1, y1, x2, y2);

// Example:
line(0, 0, 400, 400);  // Diagonal line
\`\`\`

## 3. Rectangle

\`\`\`javascript
rect(x, y, width, height);

// Example:
rect(100, 100, 200, 150);  // Rectangle at (100,100)
\`\`\`

## 4. Ellipse (Circle)

\`\`\`javascript
ellipse(x, y, width, height);

// Example:
ellipse(200, 200, 100, 100);  // Circle diameter 100
\`\`\`

**Note:** If width equals height, you get a perfect circle!

## 5. Triangle

\`\`\`javascript
triangle(x1, y1, x2, y2, x3, y3);

// Example:
triangle(200, 50, 350, 350, 50, 350);  // Triangle
\`\`\`

## Practice: Draw a Simple Scene

\`\`\`javascript
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
\`\`\`

## Exercise

Try creating your own scene with:
- A house (rectangle + triangle roof)
- A car (rectangles + circles for wheels)
- A person (circles + lines)`,
            order: 4,
          },
          {
            id: 'wm-y1-cm1005-m1-l5',
            type: 'lesson',
            title: 'Colors and Styles',
            contentType: 'text',
            content: `# Colors and Styles

## RGB Color Model

p5.js uses RGB (Red, Green, Blue) colors:
- Each value ranges from 0 to 255
- 0 = none of that color
- 255 = maximum of that color

## Grayscale Colors

Use a single number (0-255):

\`\`\`javascript
background(0);    // Black
background(128);  // Gray
background(255);  // White
\`\`\`

## RGB Colors

Use three numbers (red, green, blue):

\`\`\`javascript
background(255, 0, 0);    // Red
background(0, 255, 0);    // Green
background(0, 0, 255);    // Blue
background(255, 255, 0);  // Yellow (red + green)
background(128, 0, 128);  // Purple
\`\`\`

## Setting Colors

### fill() - Sets the fill color

\`\`\`javascript
fill(255, 0, 0);  // Red fill
ellipse(200, 200, 100, 100);  // Red circle
\`\`\`

### stroke() - Sets the outline color

\`\`\`javascript
stroke(0, 0, 255);  // Blue outline
ellipse(200, 200, 100, 100);  // Circle with blue outline
\`\`\`

### strokeWeight() - Sets outline thickness

\`\`\`javascript
strokeWeight(5);  // 5 pixel thick outline
\`\`\`

### Removing Fill or Stroke

\`\`\`javascript
noFill();    // No fill (transparent inside)
noStroke();  // No outline
\`\`\`

## Example: Colorful Shapes

\`\`\`javascript
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
\`\`\`

## Exercise

Create a rainbow with 7 colored rectangles side by side!`,
            order: 5,
          },
          {
            id: 'wm-y1-cm1005-m1-l6',
            type: 'lesson',
            title: 'Reading Error Messages',
            contentType: 'text',
            content: `# Reading Error Messages

Errors (bugs) are normal! Even professional programmers make errors every day. The key is learning to read error messages and fix them.

## Types of Errors

### 1. Syntax Errors

Mistakes in the structure of your code.

\`\`\`javascript
// Missing semicolon
ellipse(200, 200, 50, 50)  // Error!

// Correct:
ellipse(200, 200, 50, 50);  // Semicolon at end
\`\`\`

### 2. Reference Errors

Using something that doesn't exist.

\`\`\`javascript
ellipss(200, 200, 50, 50);  // Error! "ellipss" not defined

// Fix:
ellipse(200, 200, 50, 50);  // Correct spelling
\`\`\`

## How to Read Error Messages

Example error:
\`\`\`
Uncaught ReferenceError: ellipss is not defined
    at draw (sketch.js:7)
\`\`\`

**How to read this:**
1. **Error type:** \`ReferenceError\` - used something that doesn't exist
2. **What's wrong:** \`ellipss is not defined\` - misspelled "ellipse"
3. **Where:** \`at draw (sketch.js:7)\` - error in draw function, line 7

## Debugging Techniques

### 1. Read the Error Message

The error tells you what went wrong and where.

### 2. Check the Line Number

Go to the line mentioned in the error.

### 3. Use console.log()

Add print statements to check values:

\`\`\`javascript
let x = 200;
console.log("x is:", x);  // Prints: x is: 200
\`\`\`

### 4. Comment Out Code

If unsure what's causing an error:

\`\`\`javascript
// ellipse(200, 200, 50, 50);  // This line is ignored
\`\`\`

## Common Errors Checklist

- Missing semicolons
- Misspelled function names
- Wrong number of parameters
- Using undefined variables
- Missing closing brackets }

## Exercise

Fix these buggy programs:

**Bug 1:**
\`\`\`javascript
function setup() {
  createCanvas(400, 400)
}
\`\`\`

**Bug 2:**
\`\`\`javascript
function draw() {
  background(220);
  ellips(200, 200, 50, 50);
}
\`\`\``,
            order: 6,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m2',
        type: 'module',
        title: 'Week 2: Advanced Drawing',
        description: 'Learn advanced drawing techniques including transformations, arcs, curves, and animation',
        order: 2,
        lessons: [
          {
            id: 'wm-y1-cm1005-m2-l1',
            type: 'lesson',
            title: 'Drawing Order and Layering',
            contentType: 'text',
            content: `# Drawing Order and Layering

In p5.js, shapes are drawn in the order they appear in your code. Later shapes appear on top of earlier shapes.

\`\`\`javascript
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
\`\`\`

Think of drawing like painting on a canvas - first stroke is bottom layer, last stroke is top layer.`,
            order: 1,
          },
          {
            id: 'wm-y1-cm1005-m2-l2',
            type: 'lesson',
            title: 'Transformations: translate, rotate, scale',
            contentType: 'text',
            content: `# Transformations

## translate() - Move the Origin

\`\`\`javascript
function draw() {
  background(255);
  
  // Move origin to (200, 200)
  translate(200, 200);
  
  // Now (0, 0) is at (200, 200)
  rect(0, 0, 50, 50);  // Appears at (200, 200)
}
\`\`\`

## rotate() - Rotate the Canvas

\`\`\`javascript
function draw() {
  background(255);
  
  translate(width/2, height/2);
  rotate(PI/4);  // Rotate 45 degrees
  
  rect(-50, -50, 100, 100);
}
\`\`\`

## push() and pop() - Save and Restore State

\`\`\`javascript
function draw() {
  background(255);
  
  rect(50, 50, 50, 50);  // Normal
  
  push();  // Save state
  translate(200, 200);
  rotate(PI/4);
  rect(0, 0, 50, 50);  // Rotated
  pop();  // Restore state
  
  rect(350, 50, 50, 50);  // Normal again
}
\`\`\``,
            order: 2,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m3',
        type: 'module',
        title: 'Week 3: Variables and Data Types',
        description: 'Learn to store and manipulate data with variables',
        order: 3,
        lessons: [
          {
            id: 'wm-y1-cm1005-m3-l1',
            type: 'lesson',
            title: 'What are Variables?',
            contentType: 'text',
            content: `# Variables

Variables are containers that store data values. Think of them as labeled boxes.

\`\`\`javascript
let score = 0;
let playerName = "Space Explorer";
let isGameOver = false;
\`\`\`

## Data Types

### Numbers
\`\`\`javascript
let age = 25;
let price = 19.99;
let temperature = -5;
\`\`\`

### Strings
\`\`\`javascript
let message = "Hello, World!";
\`\`\`

### Booleans
\`\`\`javascript
let isLoggedIn = true;
let hasWon = false;
\`\`\`

## Using Variables

\`\`\`javascript
let spaceshipX = 400;
let spaceshipY = 300;

function draw() {
  background(0);
  ellipse(spaceshipX, spaceshipY, 50, 50);
}
\`\`\``,
            order: 1,
          },
          {
            id: 'wm-y1-cm1005-m3-l2',
            type: 'lesson',
            title: 'Moving Spaceship with Variables',
            contentType: 'text',
            content: `# Moving Spaceship

\`\`\`javascript
let spaceshipX = 400;
let spaceshipY = 300;
let speed = 2;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Move spaceship
  spaceshipX += speed;
  
  // Wrap around screen
  if (spaceshipX > width) {
    spaceshipX = 0;
  }
  
  // Draw spaceship
  fill(200, 200, 255);
  triangle(spaceshipX, spaceshipY - 20, 
           spaceshipX - 15, spaceshipY + 20, 
           spaceshipX + 15, spaceshipY + 20);
}
\`\`\`

Now your spaceship moves automatically across the screen!`,
            order: 2,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m4',
        type: 'module',
        title: 'Week 4: Interaction and Input',
        description: 'Control your program with mouse and keyboard',
        order: 4,
        lessons: [
          {
            id: 'wm-y1-cm1005-m4-l1',
            type: 'lesson',
            title: 'Mouse and Keyboard Input',
            contentType: 'text',
            content: `# Mouse and Keyboard Input

## Mouse Variables

\`\`\`javascript
mouseX    // Current mouse X position
mouseY    // Current mouse Y position
\`\`\`

### Following the Mouse
\`\`\`javascript
function draw() {
  background(0);
  ellipse(mouseX, mouseY, 50, 50);
}
\`\`\`

## Keyboard Input

\`\`\`javascript
if (keyIsDown(LEFT_ARROW)) {
  // Move left
}
\`\`\`

### Key Codes
- LEFT_ARROW = 37
- UP_ARROW = 38
- RIGHT_ARROW = 39
- DOWN_ARROW = 40`,
            order: 1,
          },
          {
            id: 'wm-y1-cm1005-m4-l2',
            type: 'lesson',
            title: 'Keyboard-Controlled Spaceship',
            contentType: 'text',
            content: `# Keyboard-Controlled Spaceship

\`\`\`javascript
let spaceshipX = 400;
let spaceshipY = 300;
let speed = 5;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) {
    spaceshipX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spaceshipX += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    spaceshipY -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    spaceshipY += speed;
  }
  
  // Boundary checking
  spaceshipX = constrain(spaceshipX, 0, width);
  spaceshipY = constrain(spaceshipY, 0, height);
  
  // Draw spaceship
  fill(200, 200, 255);
  triangle(spaceshipX, spaceshipY - 20,
           spaceshipX - 15, spaceshipY + 20,
           spaceshipX + 15, spaceshipY + 20);
}
\`\`\`

Now you can control the spaceship with arrow keys!`,
            order: 2,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m5',
        type: 'module',
        title: 'Week 5-6: Objects and Conditionals',
        description: 'Organize code with objects and make decisions with conditionals',
        order: 5,
        lessons: [
          {
            id: 'wm-y1-cm1005-m5-l1',
            type: 'lesson',
            title: 'Objects and Properties',
            contentType: 'text',
            content: `# Objects

Objects group related data together:

\`\`\`javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255]
};
\`\`\`

## Accessing Properties

\`\`\`javascript
console.log(player.x);      // 400
console.log(player.color);  // [200, 200, 255]
\`\`\`

## Player Object Example

\`\`\`javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5
};

function draw() {
  background(0);
  
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
}
\`\`\``,
            order: 1,
          },
          {
            id: 'wm-y1-cm1005-m5-l2',
            type: 'lesson',
            title: 'Conditional Statements',
            contentType: 'text',
            content: `# Conditional Statements

## If Statements

\`\`\`javascript
if (score > 100) {
  console.log("You win!");
}
\`\`\`

## If-Else

\`\`\`javascript
if (score > 100) {
  console.log("You win!");
} else {
  console.log("Keep playing!");
}
\`\`\`

## Collision Detection

\`\`\`javascript
let player = { x: 400, y: 300, size: 30 };
let star = { x: 200, y: 200, size: 20 };

let distance = dist(player.x, player.y, star.x, star.y);

if (distance < player.size/2 + star.size/2) {
  // Collision detected!
  console.log("Collected star!");
}
\`\`\`

The \`dist()\` function calculates the distance between two points.`,
            order: 2,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m6',
        type: 'module',
        title: 'Week 7-10: Arrays and Loops',
        description: 'Work with collections of data and repeat actions',
        order: 6,
        lessons: [
          {
            id: 'wm-y1-cm1005-m6-l1',
            type: 'lesson',
            title: 'Arrays',
            contentType: 'text',
            content: `# Arrays

Arrays store multiple values in a single variable:

\`\`\`javascript
let scores = [100, 85, 92, 78, 95];
let names = ["Alice", "Bob", "Charlie"];
\`\`\`

## Accessing Elements

\`\`\`javascript
console.log(scores[0]);  // 100 (first element)
console.log(scores[2]);  // 92 (third element)
\`\`\`

**Note:** Arrays are 0-indexed (first element is at index 0)

## Array Length

\`\`\`javascript
let length = scores.length;  // 5
\`\`\`

## Multiple Stars Example

\`\`\`javascript
let stars = [];

function setup() {
  createCanvas(800, 600);
  
  // Create 5 stars
  for (let i = 0; i < 5; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: 20
    });
  }
}

function draw() {
  background(0);
  
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(255, 255, 0);
    ellipse(star.x, star.y, star.size, star.size);
  }
}
\`\`\``,
            order: 1,
          },
          {
            id: 'wm-y1-cm1005-m6-l2',
            type: 'lesson',
            title: 'For Loops',
            contentType: 'text',
            content: `# For Loops

## Loop Syntax

\`\`\`javascript
for (initialization; condition; increment) {
  // Code to repeat
}
\`\`\`

## Example

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // Prints: 0, 1, 2, 3, 4
}
\`\`\`

## Drawing with Loops

\`\`\`javascript
function draw() {
  background(255);
  
  // Draw 10 circles in a row
  for (let i = 0; i < 10; i++) {
    let x = i * 50 + 25;
    ellipse(x, 200, 40, 40);
  }
}
\`\`\`

## Complete Game with Arrays and Loops

\`\`\`javascript
let player = { x: 400, y: 300, size: 30 };
let stars = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  
  for (let i = 0; i < 20; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(10, 25)
    });
  }
}

function draw() {
  background(0);
  
  // Movement
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;
  
  // Check collisions
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let distance = dist(player.x, player.y, star.x, star.y);
    
    if (distance < player.size/2 + star.size/2) {
      star.x = random(width);
      star.y = random(height);
      score += 10;
    }
    
    fill(255, 255, 0);
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
  
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
\`\`\``,
            order: 2,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m7',
        type: 'module',
        title: 'Week 11-12: Functions',
        description: 'Organize code into reusable functions',
        order: 7,
        lessons: [
          {
            id: 'wm-y1-cm1005-m7-l1',
            type: 'lesson',
            title: 'Functions',
            contentType: 'text',
            content: `# Functions

Functions are reusable blocks of code:

\`\`\`javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alice");  // Hello, Alice!
greet("Bob");    // Hello, Bob!
\`\`\`

## Return Values

\`\`\`javascript
function add(a, b) {
  return a + b;
}

let result = add(5, 3);  // result is 8
\`\`\`

## Refactored Game

\`\`\`javascript
let player;
let stars = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  player = createPlayer(400, 300);
  
  for (let i = 0; i < 30; i++) {
    stars.push(createStar());
  }
}

function draw() {
  background(0);
  handleInput();
  updateStars();
  checkCollisions();
  drawStars();
  drawPlayer();
  drawScore();
}

function createPlayer(x, y) {
  return { x: x, y: y, size: 30, speed: 5 };
}

function createStar() {
  return {
    x: random(width),
    y: random(height),
    size: random(10, 25),
    speedX: random(-2, 2),
    speedY: random(-2, 2)
  };
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
}

function updateStars() {
  for (let star of stars) {
    star.x += star.speedX;
    star.y += star.speedY;
    
    if (star.x < 0 || star.x > width) star.speedX *= -1;
    if (star.y < 0 || star.y > height) star.speedY *= -1;
  }
}

function checkCollisions() {
  for (let star of stars) {
    let distance = dist(player.x, player.y, star.x, star.y);
    if (distance < player.size/2 + star.size/2) {
      star.x = random(width);
      star.y = random(height);
      score += 10;
    }
  }
}

function drawStars() {
  fill(255, 255, 0);
  for (let star of stars) {
    ellipse(star.x, star.y, star.size, star.size);
  }
}

function drawPlayer() {
  fill(200, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
}

function drawScore() {
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}
\`\`\`

Functions make code:
- **Reusable** - Write once, use many times
- **Organized** - Clear separation of concerns
- **Maintainable** - Easier to debug and update`,
            order: 1,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m8',
        type: 'module',
        title: 'Week 13-18: Advanced Topics',
        description: '2D arrays, object methods, vectors, and game mechanics',
        order: 8,
        lessons: [
          {
            id: 'wm-y1-cm1005-m8-l1',
            type: 'lesson',
            title: 'p5.Vector and Object Methods',
            contentType: 'text',
            content: `# p5.Vector

Vectors represent position, velocity, or direction:

\`\`\`javascript
let position = createVector(100, 200);
let velocity = createVector(2, 3);

function draw() {
  position.add(velocity);
  ellipse(position.x, position.y, 50, 50);
}
\`\`\`

## Vector-Based Movement

\`\`\`javascript
let player = {
  position: createVector(400, 300),
  velocity: createVector(0, 0),
  size: 30,
  speed: 0.5,
  friction: 0.95
};

function draw() {
  background(0);
  
  // Apply acceleration
  if (keyIsDown(LEFT_ARROW)) player.velocity.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.velocity.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.velocity.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.velocity.y += player.speed;
  
  // Apply friction
  player.velocity.mult(player.friction);
  
  // Update position
  player.position.add(player.velocity);
  
  // Draw
  fill(200, 200, 255);
  ellipse(player.position.x, player.position.y, player.size, player.size);
}
\`\`\`

Vectors provide smooth, physics-based movement!`,
            order: 1,
          },
          {
            id: 'wm-y1-cm1005-m8-l2',
            type: 'lesson',
            title: 'Complete Game with Enemies',
            contentType: 'text',
            content: `# Complete Space Explorer Game

\`\`\`javascript
let player;
let stars = [];
let enemies = [];
let score = 0;
let lives = 3;
let gameState = 'playing';

function setup() {
  createCanvas(800, 600);
  
  player = {
    position: createVector(400, 300),
    velocity: createVector(0, 0),
    size: 30,
    speed: 0.5,
    friction: 0.95
  };
  
  for (let i = 0; i < 20; i++) {
    stars.push({
      position: createVector(random(width), random(height)),
      size: random(10, 25)
    });
  }
  
  for (let i = 0; i < 5; i++) {
    enemies.push({
      position: createVector(random(width), random(height)),
      velocity: createVector(random(-2, 2), random(-2, 2)),
      size: 30
    });
  }
}

function draw() {
  background(0);
  
  if (gameState === 'playing') {
    updateGame();
    drawGame();
  } else {
    drawGameOver();
  }
}

function updateGame() {
  // Player movement
  if (keyIsDown(LEFT_ARROW)) player.velocity.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.velocity.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.velocity.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.velocity.y += player.speed;
  
  player.velocity.mult(player.friction);
  player.position.add(player.velocity);
  
  // Update enemies
  for (let enemy of enemies) {
    enemy.position.add(enemy.velocity);
    
    if (enemy.position.x < 0 || enemy.position.x > width) {
      enemy.velocity.x *= -1;
    }
    if (enemy.position.y < 0 || enemy.position.y > height) {
      enemy.velocity.y *= -1;
    }
  }
  
  // Check star collisions
  for (let star of stars) {
    let distance = p5.Vector.dist(player.position, star.position);
    if (distance < player.size/2 + star.size/2) {
      star.position.set(random(width), random(height));
      score += 10;
    }
  }
  
  // Check enemy collisions
  for (let enemy of enemies) {
    let distance = p5.Vector.dist(player.position, enemy.position);
    if (distance < player.size/2 + enemy.size/2) {
      lives--;
      enemy.position.set(random(width), random(height));
      if (lives <= 0) {
        gameState = 'gameover';
      }
    }
  }
}

function drawGame() {
  // Draw stars
  fill(255, 255, 0);
  for (let star of stars) {
    ellipse(star.position.x, star.position.y, star.size, star.size);
  }
  
  // Draw enemies
  fill(255, 0, 0);
  for (let enemy of enemies) {
    ellipse(enemy.position.x, enemy.position.y, enemy.size, enemy.size);
  }
  
  // Draw player
  fill(200, 200, 255);
  ellipse(player.position.x, player.position.y, player.size, player.size);
  
  // Draw HUD
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
  text("Lives: " + lives, 10, 60);
}

function drawGameOver() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width/2, height/2 - 50);
  textSize(24);
  text("Final Score: " + score, width/2, height/2);
  text("Press SPACE to restart", width/2, height/2 + 50);
}

function keyPressed() {
  if (key === ' ' && gameState === 'gameover') {
    resetGame();
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  player.position.set(400, 300);
  player.velocity.set(0, 0);
  
  for (let star of stars) {
    star.position.set(random(width), random(height));
  }
  
  for (let enemy of enemies) {
    enemy.position.set(random(width), random(height));
  }
  
  gameState = 'playing';
}
\`\`\`

This is a complete, working game with:
- Player movement with physics
- Collectible stars
- Enemy obstacles
- Score and lives system
- Game over state
- Restart functionality`,
            order: 2,
          },
        ],
      },
      {
        id: 'wm-y1-cm1005-m9',
        type: 'module',
        title: 'Week 19-20: Constructor Functions and Final Project',
        description: 'Use constructor functions and complete your Space Explorer game',
        order: 9,
        lessons: [
          {
            id: 'wm-y1-cm1005-m9-l1',
            type: 'lesson',
            title: 'Constructor Functions',
            contentType: 'text',
            content: `# Constructor Functions

Constructor functions create multiple objects with the same structure:

\`\`\`javascript
function Player(x, y) {
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.size = 30;
  this.speed = 0.5;
  
  this.update = function() {
    if (keyIsDown(LEFT_ARROW)) this.velocity.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.velocity.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.velocity.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.velocity.y += this.speed;
    
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
  };
  
  this.draw = function() {
    fill(200, 200, 255);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };
}

// Create player instance
let player = new Player(400, 300);

function draw() {
  background(0);
  player.update();
  player.draw();
}
\`\`\`

## Benefits of Constructors

- **Reusability** - Create multiple instances easily
- **Organization** - Group related data and behavior
- **Maintainability** - Update in one place

## Final Project

Your Space Explorer game is now complete! It includes:
- Constructor functions for game entities
- Vector-based physics
- Collision detection
- Score and lives system
- Multiple game states
- Smooth animations

**Congratulations!** You've completed CM1005!`,
            order: 1,
          },
        ],
      },
    ],
  },
];
