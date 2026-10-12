# Week 5: Review

## Summary of Concepts Learned

This week, you learned about objects and how to use them to organize your code:

1. **Object Creation**: How to create objects using object literal syntax with `{}`
2. **Properties**: How to store data in objects using key-value pairs
3. **Methods**: How to add functions to objects to define behavior
4. **The `this` Keyword**: How to access object properties from within methods
5. **Object Organization**: How to group related data and behavior together

## Key Concepts

### Object Literal Syntax
```javascript
let objectName = {
  property1: value1,
  property2: value2,
  method1: function() {
    // code
  }
};
```

### Accessing Properties and Methods
```javascript
// Dot notation
objectName.property1
objectName.method1()

// Bracket notation
objectName["property1"]
```

### Using `this` in Methods
```javascript
let player = {
  x: 100,
  move: function() {
    this.x += 5;  // 'this' refers to the player object
  }
};
```

## Important Terms

- **Object**: A collection of related properties and methods
- **Property**: A value stored in an object (like a variable)
- **Method**: A function stored in an object (like a behavior)
- **Object Literal**: The `{}` syntax for creating objects
- **`this` Keyword**: Refers to the object that contains the current method
- **Dot Notation**: Accessing properties with `object.property`
- **Bracket Notation**: Accessing properties with `object["property"]`

## JavaScript Features Introduced

- Object literal syntax `{}`
- Properties and methods
- The `this` keyword
- Dot notation and bracket notation
- Object methods that modify object properties

## p5.js Functions Introduced

No new p5.js functions this week, but you learned how to:
- Use object properties with p5.js drawing functions
- Create methods that call p5.js functions
- Organize game entities as objects

## Common Mistakes to Avoid

1. **Forgetting `this`**: Always use `this.propertyName` when accessing object properties from within methods
2. **Missing commas**: Remember to separate properties and methods with commas
3. **Confusing properties and methods**: Properties are values, methods are functions (need parentheses to call)
4. **Not initializing properties**: Make sure all properties have initial values when creating the object

## Five Review Questions

1. **What is the main advantage of using objects instead of separate variables?**
   - Answer: Objects group related data and behavior together, making code more organized and maintainable

2. **How do you access a property called `speed` in an object called `player`?**
   - Answer: `player.speed` or `player["speed"]`

3. **What does the `this` keyword refer to inside an object method?**
   - Answer: It refers to the object that contains the method

4. **What's the difference between a property and a method?**
   - Answer: A property stores data (like a variable), while a method performs actions (like a function)

5. **Why is it important to use `this` when accessing object properties in methods?**
   - Answer: Without `this`, JavaScript won't know which object's properties you're referring to

## Preview of Next Week

In Week 6, you'll learn about:
- **Conditional Statements**: Making decisions in your code with `if`, `else if`, and `else`
- **Comparison Operators**: Comparing values with `==`, `!=`, `<`, `>`, `<=`, `>=`
- **Logical Operators**: Combining conditions with `&&` (AND), `||` (OR), `!` (NOT)
- **Collision Detection**: Using conditionals to detect when objects touch
- **Game Logic**: Implementing rules and behaviors based on conditions

You'll use these concepts to add collision detection to your Space Explorer game, allowing the player to collect stars and avoid enemies!

## Additional Resources

- **MDN Working with Objects**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
- **JavaScript.info Objects**: https://javascript.info/object
- **p5.js Objects Tutorial**: https://p5js.org/learn/objects.html
- **The Coding Train**: Objects videos on YouTube

## Practice Suggestions

Before moving to Week 6, try these practice exercises:

1. Create a `ball` object with properties (x, y, size, speed) and methods (move, bounce, display)
2. Create a `gameState` object to track score, lives, and level
3. Create multiple enemy objects and store them in an array
4. Build a simple inventory system using objects

## Reflection Questions

Take a few minutes to reflect on what you've learned:

1. How has using objects changed the way you think about organizing code?
2. What was the most challenging concept this week?
3. How do you see objects being useful in your future projects?
4. What questions do you still have about objects?

---

## Week 5 Complete! ✓

You've successfully completed Week 5 of CM1005. You now understand how to:
- Create and use objects
- Organize code with object-oriented patterns
- Use the `this` keyword correctly
- Build more complex and maintainable programs

**Next up: Week 6 - Conditional Statements and Game Logic**

---

*End of Week 5 Review*
