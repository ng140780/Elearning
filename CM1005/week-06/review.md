# Week 6: Review

## Summary of Concepts Learned

This week, you learned about conditional statements and how to make decisions in your code:

1. **if Statements**: Execute code only when a condition is true
2. **if...else Statements**: Execute different code based on whether a condition is true or false
3. **if...else if...else**: Check multiple conditions in sequence
4. **Comparison Operators**: Compare values (==, ===, !=, <, >, <=, >=)
5. **Logical Operators**: Combine conditions (&&, ||, !)
6. **Collision Detection**: Check if objects overlap using distance calculation
7. **Boundary Checking**: Keep objects within defined limits
8. **Game State Management**: Use conditionals to control game flow

## Key Concepts

### Conditional Statements
```javascript
// Basic if
if (condition) {
  // Code if true
}

// if...else
if (condition) {
  // Code if true
} else {
  // Code if false
}

// if...else if...else
if (condition1) {
  // Code if condition1 is true
} else if (condition2) {
  // Code if condition2 is true
} else {
  // Code if all conditions are false
}
```

### Comparison Operators
- `===` Strict equality (value AND type)
- `!==` Strict inequality
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal
- `<=` Less than or equal

### Logical Operators
- `&&` AND - both conditions must be true
- `||` OR - at least one condition must be true
- `!` NOT - inverts the boolean value

### Collision Detection
```javascript
// Circle collision
let distance = dist(x1, y1, x2, y2);
let collisionDistance = (size1 / 2) + (size2 / 2);

if (distance < collisionDistance) {
  // Collision detected!
}
```

### Boundary Checking
```javascript
// Using constrain()
player.x = constrain(player.x, 0, width);
player.y = constrain(player.y, 0, height);

// Using conditionals
if (player.x < 0) player.x = 0;
if (player.x > width) player.x = width;
```

## Important Terms

| Term | Definition |
|------|-----------|
| **Conditional Statement** | Code that executes only if a condition is true |
| **Boolean Expression** | Expression that evaluates to true or false |
| **Comparison Operator** | Operator that compares two values (==, ===, <, >, etc.) |
| **Logical Operator** | Operator that combines conditions (&&, \|\|, !) |
| **Collision Detection** | Checking if two objects overlap or touch |
| **Boundary Checking** | Keeping objects within defined limits |
| **Game State** | Current condition of the game (start, playing, gameover) |
| **Truthy/Falsy** | Values that evaluate to true or false in conditions |

## JavaScript Features Introduced

- `if`, `else if`, `else` statements
- Comparison operators: `===`, `!==`, `<`, `>`, `<=`, `>=`
- Logical operators: `&&` (AND), `||` (OR), `!` (NOT)
- Ternary operator: `condition ? valueIfTrue : valueIfFalse`
- Truthy and falsy values
- `dist()` function for distance calculation
- `constrain()` function for limiting values

## p5.js Functions Introduced

- `dist(x1, y1, x2, y2)` - Calculate distance between two points
- `constrain(value, min, max)` - Limit a value to a range
- `random(min, max)` - Generate random numbers
- `keyIsDown(code)` - Check if a key is pressed (review from Week 4)

## Common Mistakes to Avoid

1. **Using = instead of ===**
   ```javascript
   // Wrong: This assigns 5 to x
   if (x = 5) { }
   
   // Right: This compares x to 5
   if (x === 5) { }
   ```

2. **Forgetting else clause**
   ```javascript
   // Might not handle all cases
   if (score > 100) {
     grade = "A";
   }
   
   // Better: Handle all cases
   if (score > 100) {
     grade = "A";
   } else {
     grade = "F";
   }
   ```

3. **Incorrect logical operators**
   ```javascript
   // Wrong: This is always false
   if (x < 5 && x > 10) { }
   
   // Right: Use OR for this logic
   if (x < 5 || x > 10) { }
   ```

4. **Collision detection errors**
   ```javascript
   // Wrong: Comparing distance to size
   if (distance < player.size) { }
   
   // Right: Compare to sum of radii
   if (distance < (size1/2 + size2/2)) { }
   ```

## Five Review Questions

1. **What's the difference between `==` and `===`?**
   <details>
   <summary>Answer</summary>
   `==` is loose equality that converts types before comparing (5 == "5" is true). `===` is strict equality that checks both value and type (5 === "5" is false). Always use `===` to avoid bugs.
   </details>

2. **How do you check if two circles are colliding?**
   <details>
   <summary>Answer</summary>
   Calculate the distance between their centers using `dist()`, then check if that distance is less than the sum of their radii: `if (dist(x1, y1, x2, y2) < (size1/2 + size2/2))`
   </details>

3. **What does the `&&` operator do?**
   <details>
   <summary>Answer</summary>
   `&&` is the AND operator. It returns true only if BOTH conditions are true. Example: `age >= 18 && hasLicense` is true only if both conditions are met.
   </details>

4. **How would you keep a player within the canvas boundaries?**
   <details>
   <summary>Answer</summary>
   Use the `constrain()` function: `player.x = constrain(player.x, 0, width);` or use conditionals: `if (player.x < 0) player.x = 0; if (player.x > width) player.x = width;`
   </details>

5. **What's a common mistake when writing conditionals?**
   <details>
   <summary>Answer</summary>
   Using `=` (assignment) instead of `===` (comparison). Example: `if (x = 5)` assigns 5 to x and always evaluates to true. Should be `if (x === 5)` to compare x to 5.
   </details>

## Preview of Next Week

In Week 7, you'll learn about:
- **Arrays**: Storing multiple values in a single variable
- **Array indexing**: Accessing array elements with [0], [1], [2], etc.
- **Array methods**: push(), pop(), length
- **Creating multiple game objects**: Stars, enemies, collectibles
- **Looping through arrays**: Introduction to for loops

Your Space Explorer game will have multiple stars to collect instead of just one!

## Additional Practice

Before moving to Week 7, try these practice exercises:

1. **Create a quiz game** with multiple choice questions and score tracking
2. **Build a simple platformer** with gravity and jumping mechanics
3. **Make a guessing game** where the player guesses a random number
4. **Create a traffic light simulator** that changes colors based on conditions
5. **Build a simple RPG battle system** with health, attack, and defense

## Resources for Review

- **MDN if...else**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
- **JavaScript.info Conditional Operators**: https://javascript.info/ifelse
- **p5.js dist() Reference**: https://p5js.org/reference/#/p5/dist
- **The Coding Train**: Conditionals and Booleans videos
- **MDN Comparison Operators**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators

## Reflection Questions

Take a few minutes to reflect on what you've learned:

1. How has learning conditionals changed the way you think about programming?
2. What was the most challenging concept this week?
3. How do you see collision detection being used in other types of applications?
4. What questions do you still have about conditional statements?

## Week 6 Complete! ✓

You've successfully completed Week 6 of CM1005. You now understand how to:
- Make decisions in your code with conditional statements
- Compare values using comparison operators
- Combine conditions with logical operators
- Detect collisions between objects
- Keep objects within boundaries
- Manage game states

**Next up: Week 7 - Arrays and Multiple Objects**

---

*End of Week 6 Review*
