# Week 1: Project Milestone

## Space Explorer - Week 1: Setting Up the Canvas

### Objective

Create the foundation for your Space Explorer game by setting up the canvas and drawing a basic space scene.

### What You'll Build

By the end of this week, you'll have:
- A properly sized canvas for your game
- A space-themed background (dark blue/black)
- A simple representation of your spaceship
- A few stars in the background

### Step-by-Step Instructions

#### Step 1: Create the Canvas

Start with the basic p5.js structure:

```javascript
function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
}
```

**Explanation:**
- Canvas size: 800 pixels wide, 600 pixels tall
- Background: black (0) to represent space

#### Step 2: Add a Starry Background

Draw several small white circles to represent stars:

```javascript
function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Draw stars
  fill(255);
  noStroke();
  
  // Star 1
  ellipse(100, 150, 3, 3);
  
  // Star 2
  ellipse(250, 80, 2, 2);
  
  // Star 3
  ellipse(400, 200, 4, 4);
  
  // Star 4
  ellipse(600, 100, 3, 3);
  
  // Star 5
  ellipse(700, 300, 2, 2);
  
  // Add more stars...
  ellipse(150, 400, 3, 3);
  ellipse(350, 450, 2, 2);
  ellipse(550, 350, 4, 4);
  ellipse(650, 500, 3, 3);
}
```

**Explanation:**
- `fill(255)` sets the color to white
- `noStroke()` removes the outline
- Each `ellipse()` draws a small circle (star)
- Vary the sizes (2-4 pixels) for visual interest

#### Step 3: Add Your Spaceship

Draw a simple spaceship using basic shapes:

```javascript
function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Draw stars
  fill(255);
  noStroke();
  ellipse(100, 150, 3, 3);
  ellipse(250, 80, 2, 2);
  ellipse(400, 200, 4, 4);
  ellipse(600, 100, 3, 3);
  ellipse(700, 300, 2, 2);
  ellipse(150, 400, 3, 3);
  ellipse(350, 450, 2, 2);
  ellipse(550, 350, 4, 4);
  ellipse(650, 500, 3, 3);
  
  // Draw spaceship
  // Body (triangle)
  fill(200, 200, 255);
  triangle(400, 280, 380, 320, 420, 320);
  
  // Cockpit (small circle)
  fill(100, 200, 255);
  ellipse(400, 300, 15, 15);
  
  // Engine glow
  fill(255, 100, 0);
  ellipse(400, 325, 10, 15);
}
```

**Explanation:**
- Spaceship body: A triangle pointing up
- Cockpit: A small blue circle in the middle
- Engine: An orange ellipse at the bottom (like a flame)

#### Step 4: Add a Planet (Optional)

Add a planet in the corner for visual interest:

```javascript
function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Draw stars
  fill(255);
  noStroke();
  ellipse(100, 150, 3, 3);
  ellipse(250, 80, 2, 2);
  ellipse(400, 200, 4, 4);
  ellipse(600, 100, 3, 3);
  ellipse(700, 300, 2, 2);
  ellipse(150, 400, 3, 3);
  ellipse(350, 450, 2, 2);
  ellipse(550, 350, 4, 4);
  ellipse(650, 500, 3, 3);
  
  // Draw planet (bottom-right corner)
  fill(150, 100, 50);
  ellipse(700, 500, 120, 120);
  
  // Planet ring
  noFill();
  stroke(200, 150, 100);
  strokeWeight(3);
  ellipse(700, 500, 160, 40);
  
  // Draw spaceship
  noStroke();
  fill(200, 200, 255);
  triangle(400, 280, 380, 320, 420, 320);
  
  fill(100, 200, 255);
  ellipse(400, 300, 15, 15);
  
  fill(255, 100, 0);
  ellipse(400, 325, 10, 15);
}
```

### Complete Week 1 Code

Here's the complete code for your Week 1 project:

```javascript
function setup() {
  createCanvas(800, 600);
}

function draw() {
  // Space background
  background(0);
  
  // Stars
  fill(255);
  noStroke();
  ellipse(100, 150, 3, 3);
  ellipse(250, 80, 2, 2);
  ellipse(400, 200, 4, 4);
  ellipse(600, 100, 3, 3);
  ellipse(700, 300, 2, 2);
  ellipse(150, 400, 3, 3);
  ellipse(350, 450, 2, 2);
  ellipse(550, 350, 4, 4);
  ellipse(650, 500, 3, 3);
  
  // Planet
  fill(150, 100, 50);
  ellipse(700, 500, 120, 120);
  
  noFill();
  stroke(200, 150, 100);
  strokeWeight(3);
  ellipse(700, 500, 160, 40);
  
  // Spaceship
  noStroke();
  fill(200, 200, 255);
  triangle(400, 280, 380, 320, 420, 320);
  
  fill(100, 200, 255);
  ellipse(400, 300, 15, 15);
  
  fill(255, 100, 0);
  ellipse(400, 325, 10, 15);
}
```

### Acceptance Criteria

Your Week 1 project is complete when:

✅ Canvas is 800x600 pixels  
✅ Background is black (space)  
✅ At least 5 stars are visible  
✅ A spaceship is visible in the center  
✅ The spaceship has a body, cockpit, and engine  
✅ (Optional) A planet is visible  

### Testing Checklist

Before submitting, verify:

- [ ] The canvas displays correctly
- [ ] All shapes are visible
- [ ] Colors are appropriate for a space theme
- [ ] The spaceship is clearly identifiable
- [ ] No error messages in the console
- [ ] The code is well-formatted and readable

### Extension Challenges

If you finish early, try these:

1. **More Stars**: Add 20+ stars with varying sizes and brightness
2. **Multiple Planets**: Add 2-3 planets of different colors and sizes
3. **Moon**: Add a small moon orbiting the planet
4. **Nebula**: Use semi-transparent circles to create a colorful nebula effect
5. **Spaceship Details**: Add wings, windows, or other details to the spaceship

### What You Learned

This week, you learned:
- How to set up a p5.js sketch
- How to use the coordinate system
- How to draw basic shapes
- How to use colors (RGB)
- How to layer shapes (drawing order)
- How to create a simple scene

### Next Week Preview

In Week 2, you'll learn:
- More advanced drawing techniques
- How to create complex shapes
- Better color schemes
- How to organize your drawing code

Your spaceship will stay in place for now. Next week, you'll learn about variables, which will allow you to move the spaceship!

### Save Your Work

Make sure to:
1. Save your sketch with a clear name (e.g., "space-explorer-week-1")
2. Comment your code to explain what each section does
3. Take a screenshot of your final result
4. Keep a backup copy

---

## Submission

Submit your Week 1 project:
- Screenshot of your space scene
- Complete source code
- Brief description of what you built
- Any challenges you faced and how you overcame them

---

*End of Week 1 Project*
