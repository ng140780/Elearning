# Week 2 Review & Consolidation

## Summary of Concepts Learned

This week, you learned advanced drawing techniques:
- **Drawing order and layering** - Shapes drawn later appear on top
- **Mathematical positioning** - Using calculations for precise placement
- **Arcs and curves** - Drawing partial circles and curved lines
- **Transformations** - translate(), rotate(), scale()
- **push() and pop()** - Saving and restoring transformation state
- **Creating depth** - Layering elements for foreground/background
- **Complex shapes** - Combining simple shapes into complex objects
- **Animation basics** - Using frameCount and trigonometry

## Glossary of New Terms

| Term | Definition |
|------|-----------|
| **Layering** | Drawing shapes in order to create depth |
| **Transformation** | Changing the coordinate system (translate, rotate, scale) |
| **Radians** | Unit of angle measurement (2π radians = 360°) |
| **Origin** | The point (0, 0) in the coordinate system |
| **Trigonometry** | Math involving angles (sin, cos, tan) |
| **Animation** | Creating the illusion of motion through rapid frame updates |
| **frameCount** | Built-in variable that counts frames since program started |
| **push()/pop()** | Save and restore the current transformation state |

## JavaScript Features Introduced

- Mathematical calculations: `width / 2`, `height / 2`
- Trigonometric functions: `sin()`, `cos()`
- Constants: `TWO_PI`, `PI`, `HALF_PI`
- `frameCount` variable for animation
- Nested function calls
- Mathematical positioning formulas

## p5.js Functions Introduced

### Drawing
- `arc(x, y, width, height, start, stop)` - Draw an arc
- `bezier(x1, y1, x2, y2, x3, y3, x4, y4)` - Draw a bezier curve

### Transformations
- `translate(x, y)` - Move the origin
- `rotate(angle)` - Rotate the canvas
- `scale(sx, sy)` - Scale the canvas
- `push()` - Save current transformation state
- `pop()` - Restore previous transformation state

### Utilities
- `radians(degrees)` - Convert degrees to radians
- `sin(angle)` - Sine function
- `cos(angle)` - Cosine function
- `TWO_PI` - Constant for full circle (2π)
- `PI` - Constant for half circle (π)
- `HALF_PI` - Constant for quarter circle (π/2)

## Five Review Questions

1. **If you draw a red rectangle, then a blue circle at the same position, which appears on top?**
   <details>
   <summary>Answer</summary>
   The blue circle appears on top because it's drawn after the red rectangle. In p5.js, later drawings appear on top of earlier ones.
   </details>

2. **What does `translate(100, 50)` do?**
   <details>
   <summary>Answer</summary>
   It moves the origin (0, 0) to the position (100, 50). All subsequent drawing will be relative to this new origin until you call pop() or translate again.
   </details>

3. **How would you draw a circle that rotates around the center of the canvas?**
   <details>
   <summary>Answer</summary>
   ```javascript
   translate(width/2, height/2);
   rotate(frameCount * 0.02);
   ellipse(100, 0, 30, 30);
   ```
   This moves to center, rotates based on frame count, then draws a circle 100 pixels from the (now rotated) origin.
   </details>

4. **What's the difference between `push()` and `pop()`?**
   <details>
   <summary>Answer</summary>
   `push()` saves the current transformation state (position, rotation, scale). `pop()` restores the most recently saved state. They work in pairs to isolate transformations.
   </details>

5. **How would you make a shape oscillate (move back and forth) smoothly?**
   <details>
   <summary>Answer</summary>
   Use the `sin()` function with `frameCount`:
   ```javascript
   let x = width/2 + sin(frameCount * 0.05) * 100;
   ellipse(x, height/2, 50, 50);
   ```
   The sin() function creates smooth oscillation between -1 and 1, which when multiplied by 100 creates movement of ±100 pixels.
   </details>

## Preview of Week 3

In Week 3, you'll learn about:
- **Variables** - Storing and managing data
- **Data types** - Numbers, strings, booleans
- **Variable updates** - Changing values over time
- **Using variables in drawing** - Making dynamic graphics

Your animated space scene will become interactive! You'll use variables to:
- Store the spaceship's position
- Make the spaceship move based on user input
- Track game state (score, lives)
- Create dynamic, changing graphics

---

## Additional Practice

If you want more practice before moving to Week 3:

1. **Create a solar system** with a sun and orbiting planets
2. **Draw a clock** with rotating hands
3. **Make a bouncing ball** that bounces off walls
4. **Create a spiral pattern** using rotation and translation
5. **Animate a car** driving across the screen with rotating wheels

---

## Resources for Review

- **p5.js Transformations**: https://p5js.org/learn/transformations.html
- **p5.js Curves**: https://p5js.org/learn/curves.html
- **The Coding Train**: Transformations videos
- **MDN Math Objects**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

---

## Progress Check

✓ Completed Week 1: Basic drawing and setup
✓ Completed Week 2: Advanced drawing and animation
→ Next: Week 3 - Variables and data types

**You're ready for Week 3!** 🚀

---

*End of Week 2 Review*
