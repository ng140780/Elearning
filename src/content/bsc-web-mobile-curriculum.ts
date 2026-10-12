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
        title: 'Week 1 Project: Space Scene',
        description: 'Create your first space-themed scene for the Space Explorer game',
        order: 2,
        lessons: [
          {
            id: 'wm-y1-cm1005-m2-l1',
            type: 'lesson',
            title: 'Building Your Space Scene',
            contentType: 'text',
            content: `# Week 1 Project: Space Scene

## Objective

Create the foundation for your Space Explorer game by setting up the canvas and drawing a basic space scene.

## Complete Code

\`\`\`javascript
function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);  // Black space
  
  // Stars
  fill(255);
  noStroke();
  ellipse(100, 150, 3, 3);
  ellipse(250, 80, 2, 2);
  ellipse(400, 200, 4, 4);
  ellipse(600, 100, 3, 3);
  ellipse(700, 300, 2, 2);
  
  // Planet
  fill(150, 100, 50);
  ellipse(700, 500, 120, 120);
  
  // Spaceship
  fill(200, 200, 255);
  triangle(400, 280, 380, 320, 420, 320);
  fill(100, 200, 255);
  ellipse(400, 300, 15, 15);
}
\`\`\`

## Acceptance Criteria

- Canvas is 800x600 pixels
- Background is black
- At least 5 stars visible
- Spaceship visible in center
- No error messages in console

## What You Learned

This week, you learned:
- How to set up a p5.js sketch
- How to use the coordinate system
- How to draw basic shapes
- How to use colors (RGB)
- How to layer shapes (drawing order)
- How to create a simple scene

## Next Week Preview

In Week 2, you'll learn:
- More advanced drawing techniques
- How to create complex shapes
- Better color schemes
- How to organize your drawing code

Your spaceship will stay in place for now. Next week, you'll learn about variables, which will allow you to move the spaceship!`,
            order: 1,
          },
        ],
      },
    ],
  },
];
