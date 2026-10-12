# Week 1 Review & Consolidation

## Summary of Concepts Learned

This week, you learned the foundations of programming with p5.js:

### 1. Programming Basics
- Programming is writing instructions for computers
- JavaScript is beginner-friendly and runs in browsers
- p5.js makes it easy to create graphics and interactive programs

### 2. Development Environment
- p5.js Web Editor (https://editor.p5js.org/)
- VS Code as an alternative
- Understanding the interface (code editor + preview)

### 3. Program Structure
- `setup()` runs once at the start
- `draw()` runs repeatedly (60 times/second)
- This creates animations and interactivity

### 4. Coordinate System
- Origin (0, 0) is at top-left corner
- x increases to the right
- y increases downward
- Canvas dimensions: width × height

### 5. Drawing Functions
- `point(x, y)` - single point
- `line(x1, y1, x2, y2)` - line between two points
- `rect(x, y, width, height)` - rectangle
- `ellipse(x, y, width, height)` - ellipse/circle
- `triangle(x1, y1, x2, y2, x3, y3)` - triangle

### 6. Colors and Styles
- RGB color model (0-255 for each component)
- `background(color)` - sets background
- `fill(color)` - sets fill color
- `stroke(color)` - sets outline color
- `strokeWeight(weight)` - sets outline thickness
- `noFill()` and `noStroke()` - remove fill/outline

### 7. Debugging
- Reading error messages
- Using the console
- Common errors: missing semicolons, misspelled functions, wrong parameters

---

## Glossary of New Terms

| Term | Definition |
|------|-----------|
| **Algorithm** | A step-by-step procedure for solving a problem |
| **Canvas** | The drawing area where shapes are rendered |
| **Coordinate** | A pair of numbers (x, y) that specify a position |
| **Debug** | The process of finding and fixing errors in code |
| **Function** | A reusable block of code that performs a task |
| **Library** | A collection of pre-written code (like p5.js) |
| **Parameter** | A value passed to a function |
| **Pixel** | The smallest unit of a digital image |
| **RGB** | Red, Green, Blue - color model using three values |
| **Syntax** | The rules for writing valid code |

---

## JavaScript Features Introduced

- `function` keyword for defining functions
- Semicolons to end statements
- Comments with `//`
- Function calls with parentheses
- Numbers and strings as parameters

---

## p5.js Functions Introduced

### Setup & Draw
- `createCanvas(width, height)`
- `background(color)`

### Drawing
- `point(x, y)`
- `line(x1, y1, x2, y2)`
- `rect(x, y, width, height)`
- `ellipse(x, y, width, height)`
- `triangle(x1, y1, x2, y2, x3, y3)`

### Styling
- `fill(r, g, b)`
- `stroke(r, g, b)`
- `strokeWeight(weight)`
- `noFill()`
- `noStroke()`

### Built-in Variables
- `width` - canvas width
- `height` - canvas height

---

## Five Review Questions

**Question 1:** What is the difference between `setup()` and `draw()`?

<details>
<summary>Answer</summary>
`setup()` runs once when the program starts and is used for initialization (creating canvas, setting initial values). `draw()` runs repeatedly (about 60 times per second) and is used for animation and updates.
</details>

---

**Question 2:** Where is the origin (0, 0) in the p5.js coordinate system?

<details>
<summary>Answer</summary>
The origin (0, 0) is at the top-left corner of the canvas. The x-axis increases to the right, and the y-axis increases downward.
</details>

---

**Question 3:** How do you create a purple circle with a yellow outline?

<details>
<summary>Answer</summary>
```javascript
fill(128, 0, 128);      // Purple fill
stroke(255, 255, 0);    // Yellow outline
ellipse(200, 200, 100, 100);  // Circle at center
```
</details>

---

**Question 4:** What's wrong with this code?
```javascript
function setup() {
  createCanvas(400, 400)
}
function draw() {
  background(220)
  ellips(200, 200, 50, 50)
}
```

<details>
<summary>Answer</summary>
Two issues:
1. Missing semicolons (though JavaScript is forgiving)
2. `ellips` is misspelled - should be `ellipse`
</details>

---

**Question 5:** How would you draw a rectangle in the exact center of a 400x400 canvas with dimensions 100x80?

<details>
<summary>Answer</summary>
```javascript
rect(150, 160, 100, 80);
```
The top-left corner should be at (150, 160) so the rectangle is centered:
- x = (400 - 100) / 2 = 150
- y = (400 - 80) / 2 = 160
</details>

---

## Preview of Week 2

Next week, you'll learn:

### Drawing in 2D (Advanced)
- More complex shapes and positioning
- Drawing order and layering
- Creating detailed scenes
- Using mathematical calculations for positioning

### Project Milestone
You'll enhance your Space Explorer scene with:
- More detailed spaceship design
- Multiple planets and moons
- Asteroid belt
- Better color schemes
- Layered background effects

### Key Concepts
- Drawing order (what appears on top)
- Using variables for positioning (preview)
- Mathematical calculations for shapes
- Creating depth with layering

---

## Additional Practice

If you want more practice before moving to Week 2:

1. **Draw your initials** using basic shapes
2. **Create a simple house** with multiple shapes
3. **Draw a face** using circles and ellipses
4. **Create a landscape** with mountains, trees, and sky
5. **Design a logo** using only basic shapes

---

## Resources for Review

- **p5.js Getting Started**: https://p5js.org/get-started/
- **p5.js Examples**: https://p5js.org/examples/
- **The Coding Train - Week 1 videos**: Check the playlist
- **MDN JavaScript Basics**: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics

---

## Questions?

If you're struggling with any concepts:
1. Review the lesson materials
2. Try the exercises again
3. Check the p5.js reference: https://p5js.org/reference/
4. Ask in the course discussion forum
5. Watch The Coding Train videos

---

## Progress Check

✓ Completed Week 1
✓ Understand basic p5.js structure
✓ Can draw basic shapes
✓ Can use colors
✓ Can debug simple errors
✓ Created first Space Explorer scene

**You're ready for Week 2!** 🚀

---

*End of Week 1 Review*
