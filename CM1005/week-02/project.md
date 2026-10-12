# Week 2 Project: Enhanced Space Scene

## Objective

Enhance your Space Explorer scene with advanced drawing techniques including layering, mathematical positioning, and basic animation.

## What You'll Build

- Layered space background with depth
- Mathematically positioned stars
- Animated twinkling stars
- Enhanced spaceship with more detail
- Orbiting moon around the planet

## Complete Code

```javascript
function setup() {
  createCanvas(800, 600);
}

function draw() {
  // Deep space background
  background(10, 10, 30);
  
  // Distant stars (small, dim)
  fill(150, 150, 200);
  noStroke();
  for (let i = 0; i < 50; i++) {
    let x = (i * 137) % width;
    let y = (i * 211) % height;
    ellipse(x, y, 1, 1);
  }
  
  // Medium stars (twinkling)
  for (let i = 0; i < 20; i++) {
    let x = (i * 97) % width;
    let y = (i * 173) % height;
    let brightness = 150 + sin(frameCount * 0.05 + i) * 100;
    fill(brightness);
    ellipse(x, y, 2, 2);
  }
  
  // Bright stars (larger)
  fill(255);
  ellipse(100, 150, 4, 4);
  ellipse(250, 80, 3, 3);
  ellipse(400, 200, 5, 5);
  ellipse(600, 100, 4, 4);
  ellipse(700, 300, 3, 3);
  
  // Nebula effect (layered circles)
  noStroke();
  fill(100, 50, 150, 30);
  ellipse(200, 400, 200, 150);
  fill(50, 100, 150, 20);
  ellipse(250, 420, 180, 130);
  
  // Planet with ring
  push();
  translate(650, 450);
  
  // Planet body
  fill(150, 100, 50);
  noStroke();
  ellipse(0, 0, 120, 120);
  
  // Planet shadow
  fill(100, 60, 30);
  arc(0, 0, 120, 120, -HALF_PI, HALF_PI);
  
  // Planet ring
  noFill();
  stroke(200, 150, 100);
  strokeWeight(3);
  ellipse(0, 0, 180, 40);
  
  // Orbiting moon
  let moonAngle = frameCount * 0.03;
  let moonX = cos(moonAngle) * 100;
  let moonY = sin(moonAngle) * 30;
  fill(200);
  noStroke();
  ellipse(moonX, moonY, 20, 20);
  
  pop();
  
  // Enhanced spaceship
  push();
  translate(400, 300);
  
  // Engine glow (animated)
  let glowSize = 15 + sin(frameCount * 0.2) * 5;
  fill(255, 100, 0, 150);
  ellipse(0, 25, 10, glowSize);
  fill(255, 200, 0, 100);
  ellipse(0, 30, 8, glowSize * 0.7);
  
  // Ship body
  fill(200, 200, 255);
  noStroke();
  triangle(0, -30, -25, 20, 25, 20);
  
  // Cockpit
  fill(100, 200, 255);
  ellipse(0, -5, 15, 15);
  
  // Wings
  fill(150, 150, 200);
  triangle(-25, 20, -40, 30, -20, 10);
  triangle(25, 20, 40, 30, 20, 10);
  
  pop();
}
```

## Features Implemented

✅ **Layered background** - Multiple star layers for depth  
✅ **Mathematical positioning** - Stars positioned using modulo arithmetic  
✅ **Animation** - Twinkling stars using sin()  
✅ **Nebula effect** - Semi-transparent layered circles  
✅ **Planet with ring** - Using arc() for shadow  
✅ **Orbiting moon** - Circular motion with cos()/sin()  
✅ **Animated engine** - Pulsing glow effect  
✅ **Detailed spaceship** - Multiple shapes with wings  

## Acceptance Criteria

- Canvas is 800x600 pixels
- Deep space background (very dark blue/black)
- Multiple star layers with different sizes
- At least some stars are twinkling (animated)
- Planet with ring visible
- Moon orbiting the planet
- Enhanced spaceship with engine glow
- Smooth animation (60 fps)
- No error messages in console

## Testing Checklist

- [ ] Background is dark space color
- [ ] Multiple star layers visible
- [ ] Stars twinkle (change brightness)
- [ ] Nebula effect visible
- [ ] Planet has ring
- [ ] Moon orbits planet smoothly
- [ ] Spaceship has engine glow
- [ ] Engine glow pulses
- [ ] Spaceship has wings
- [ ] Animation is smooth
- [ ] No console errors

## Extension Challenges

1. **More Planets**: Add 2-3 more planets at different distances
2. **Asteroid Belt**: Add rotating asteroids between planets
3. **Shooting Stars**: Add occasional shooting star animations
4. **Warp Speed**: Add a "warp speed" effect with streaking stars
5. **Multiple Ships**: Add enemy ships or allied ships

## What You Learned

This week, you applied:
- Drawing order and layering
- Mathematical positioning
- Arcs and curves
- Transformations (translate, rotate)
- push() and pop() for state management
- Animation with frameCount and trigonometry
- Creating depth with multiple layers

## Next Week Preview

In Week 3, you'll learn about variables and data types, which will allow you to:
- Store the spaceship's position
- Make the spaceship move smoothly
- Track game state (score, lives)
- Respond to user input

---

*End of Week 2 Project*
