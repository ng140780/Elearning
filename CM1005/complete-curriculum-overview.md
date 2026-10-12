# CM1005 Complete Curriculum Overview

## 20-Week Course Structure

This document provides a complete overview of all 20 weeks of the CM1005 course.

---

## Phase 1: Foundations (Weeks 1-6)

### Week 1: Your Development Environment ✅ COMPLETE
**Topics:** Setup, p5.js basics, setup() and draw(), basic shapes, colors, debugging  
**Project:** Space scene with stars, spaceship, planet  
**Status:** ✅ Complete with lesson, exercises, project, assessment, review

### Week 2: Drawing in 2D (Advanced) ✅ COMPLETE
**Topics:** Drawing order, mathematical positioning, arcs, curves, transformations, depth, complex shapes, animation  
**Project:** Enhanced space scene with layered background  
**Status:** ✅ Complete with lesson, exercises, project, assessment, review

### Week 3: Variables and Data Types
**Topics:** Variables, assignment, data types (number, string, boolean), operators, expressions  
**Project:** Add moving spaceship with position variables  
**Key Concepts:**
- Declaring variables with `let`
- Data types and type conversion
- Arithmetic and comparison operators
- Using variables for animation

### Week 4: Interaction and Input
**Topics:** Mouse interaction, keyboard input, built-in variables (mouseX, mouseY, keyCode), events  
**Project:** Control spaceship with mouse/keyboard  
**Key Concepts:**
- `mouseX`, `mouseY`, `pmouseX`, `pmouseY`
- `keyIsDown()`, `keyPressed()`, `keyReleased()`
- `keyCode` constants (UP_ARROW, DOWN_ARROW, etc.)
- Event-driven programming

### Week 5: Objects and Properties
**Topics:** Object literals, properties, methods, this keyword, organizing code with objects  
**Project:** Create Player object with position, size, and movement methods  
**Key Concepts:**
- Object syntax: `{ property: value }`
- Accessing properties with dot notation
- Object methods
- The `this` keyword

### Week 6: Conditional Statements
**Topics:** if/else, comparison operators, logical operators, boolean expressions, boundary checking  
**Project:** Add collision detection and boundary checking  
**Key Concepts:**
- `if`, `else if`, `else`
- Comparison: `==`, `===`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`
- Collision detection with `dist()`

---

## Phase 2: Core Programming (Weeks 7-12)

### Week 7: Arrays Basics
**Topics:** Array creation, indexing, length, adding/removing elements, array methods  
**Project:** Store multiple stars in an array  
**Key Concepts:**
- Array syntax: `[item1, item2, ...]`
- Indexing (0-based)
- `length` property
- `push()`, `pop()`, `shift()`, `unshift()`

### Week 8: For Loops
**Topics:** Loop syntax, iteration, counters, loop control (break, continue)  
**Project:** Draw multiple stars with a loop  
**Key Concepts:**
- `for` loop structure
- Loop variables and counters
- Iterating a specific number of times
- Nested loops introduction

### Week 9: Array Traversal
**Topics:** Looping through arrays, accessing elements, updating array items  
**Project:** Update all stars in the game (movement, collision)  
**Key Concepts:**
- `for` loop with arrays
- Accessing each element
- Modifying array elements
- Finding items in arrays

### Week 10: Nested Loops
**Topics:** Loops within loops, 2D patterns, grid creation  
**Project:** Create a starfield background with grid pattern  
**Key Concepts:**
- Nested loop structure
- 2D iteration (rows and columns)
- Creating grid patterns
- Performance considerations

### Week 11: Functions Basics
**Topics:** Function declaration, parameters, arguments, calling functions, return values  
**Project:** Create helper functions for game logic  
**Key Concepts:**
- Function syntax
- Parameters and arguments
- Return values
- Function scope

### Week 12: Functions Advanced
**Topics:** Function scope, global vs local variables, refactoring, organizing code  
**Project:** Refactor game into well-organized functions  
**Key Concepts:**
- Variable scope
- Global vs local variables
- Refactoring techniques
- Code organization

---

## Phase 3: Advanced Concepts (Weeks 13-18)

### Week 13: 2D Arrays
**Topics:** Arrays of arrays, grids, matrices, accessing 2D data  
**Project:** Create a grid-based level or map  
**Key Concepts:**
- 2D array syntax
- Accessing elements: `array[row][col]`
- Iterating through 2D arrays
- Grid-based game logic

### Week 14: Advanced Array Methods
**Topics:** `map()`, `filter()`, `reduce()`, `find()`, `splice()`, array manipulation  
**Project:** Manage dynamic game objects with advanced methods  
**Key Concepts:**
- Functional array methods
- Transforming arrays
- Filtering data
- Combining arrays

### Week 15: Object Methods
**Topics:** Methods in objects, `this` keyword, object behavior, encapsulation  
**Project:** Add methods to Player object (move, draw, checkCollision)  
**Key Concepts:**
- Defining methods in objects
- Using `this` to access properties
- Object behavior
- Encapsulation

### Week 16: p5.Vector
**Topics:** Vector math, position vectors, velocity vectors, vector operations  
**Project:** Implement smooth movement with vectors  
**Key Concepts:**
- `createVector(x, y)`
- Vector addition and subtraction
- Magnitude and normalization
- Using vectors for position and velocity

### Week 17: Multiple Objects
**Topics:** Arrays of objects, object management, creating multiple instances  
**Project:** Create Enemy and Collectible objects  
**Key Concepts:**
- Arrays containing objects
- Managing multiple objects
- Object lifecycle (create, update, destroy)
- Spawning and despawning

### Week 18: Object Interaction
**Topics:** Collision detection between objects, object relationships, game mechanics  
**Project:** Implement complete game mechanics  
**Key Concepts:**
- Collision detection algorithms
- Object-to-object interaction
- Game state management
- Score and lives system

---

## Phase 4: Object-Oriented Programming (Weeks 19-20)

### Week 19: Constructor Functions
**Topics:** Constructor functions, `new` keyword, creating object instances, `this` in constructors  
**Project:** Create entity constructors for Player, Enemy, Collectible  
**Key Concepts:**
- Constructor function syntax
- Using `new` to create instances
- `this` in constructors
- Object factories

### Week 20: Final Project Integration
**Topics:** Combining all concepts, polishing, testing, documentation  
**Project:** Complete Space Explorer game with all features  
**Key Concepts:**
- Code integration
- Testing and debugging
- Documentation
- Final presentation

---

## Topic-to-Week Mapping

| Original Topic | Weeks Covered | Key Concepts |
|----------------|---------------|--------------|
| 1. Development Environment | Week 1 | Setup, basic drawing, debugging |
| 2. Drawing in 2D | Week 2 | Advanced shapes, transformations, animation |
| 3. Variables, Objects, Interaction | Weeks 3-5 | Variables, data types, mouse/keyboard, objects |
| 4. Conditional Statements | Week 6 | if/else, comparisons, logic, collision |
| 5. Basic loops and arrays | Weeks 7-8 | Arrays, for loops, iteration |
| 6. Traversing with for loops | Weeks 9-10 | Array traversal, nested loops |
| 7. Functions | Weeks 11-12 | Function basics, scope, refactoring |
| 8. Advanced loops and arrays | Weeks 13-14 | 2D arrays, advanced methods |
| 9. Extending Objects | Weeks 15-16 | Object methods, p5.Vector |
| 10. Constructor functions | Weeks 17-20 | Multiple objects, constructors, final project |

---

## Progressive Project Plan

### Space Explorer Game Evolution

**Week 1-2:** Static space scene
- Canvas, stars, spaceship, planet
- Basic shapes and colors

**Week 3-4:** Interactive spaceship
- Position variables
- Mouse/keyboard control
- Movement

**Week 5-6:** Game rules
- Player object
- Boundary checking
- Collision detection

**Week 7-8:** Multiple objects
- Array of stars
- Loop-generated objects
- Collectibles

**Week 9-10:** Dynamic behavior
- Moving stars
- Animated background
- Object updates

**Week 11-12:** Organized code
- Helper functions
- Clean structure
- Refactored game

**Week 13-14:** Advanced management
- 2D grid levels
- Dynamic object arrays
- Complex data structures

**Week 15-16:** Smooth movement
- Vector-based physics
- Velocity and acceleration
- Professional movement

**Week 17-18:** Complete game
- Enemies and obstacles
- Score system
- Lives and game over

**Week 19-20:** Professional polish
- Constructor functions
- Final integration
- Complete, polished game

---

## Assessment Strategy

### Weekly Assessments
Each week includes:
- Conceptual questions (understanding)
- Code reading (comprehension)
- Predict the output (analysis)
- Debugging exercises (application)
- Practical programming task (creation)

### Major Assessments
- **Week 10:** Mid-term assessment (Topics 1-6)
- **Week 20:** Final project submission (all topics)

### Project Milestones
- **Week 6:** Basic interactive scene (30%)
- **Week 12:** Organized game with functions (60%)
- **Week 20:** Complete polished game (100%)

---

## Learning Outcomes by Phase

### Phase 1 (Weeks 1-6): Foundations
Students will be able to:
- Set up a development environment
- Draw 2D graphics with p5.js
- Use variables to store data
- Respond to user input
- Create objects with properties
- Implement conditional logic

### Phase 2 (Weeks 7-12): Core Programming
Students will be able to:
- Work with arrays of data
- Use loops for iteration
- Write custom functions
- Organize code effectively
- Manage program state
- Debug systematically

### Phase 3 (Weeks 13-18): Advanced Concepts
Students will be able to:
- Use 2D arrays and advanced methods
- Implement vector mathematics
- Create smooth animations
- Manage multiple objects
- Detect collisions
- Build game mechanics

### Phase 4 (Weeks 19-20): OOP and Integration
Students will be able to:
- Use constructor functions
- Create object instances
- Integrate all concepts
- Build complete applications
- Test and debug effectively
- Document their work

---

## Time Allocation

**Recommended study time per week:** 3-4 hours

**Breakdown:**
- Reading lesson: 1 hour
- Completing exercises: 1 hour
- Working on project: 1-2 hours
- Assessment and review: 30 minutes

**Total course time:** 60-80 hours

---

## Resources by Week

### Weeks 1-2: Setup and Drawing
- p5.js Get Started: https://p5js.org/get-started/
- p5.js Examples: https://p5js.org/examples/
- The Coding Train: Getting Started videos

### Weeks 3-6: Variables and Interaction
- MDN JavaScript Guide: Variables
- p5.js Events: https://p5js.org/reference/#group-Events
- JavaScript.info: Data types

### Weeks 7-12: Arrays and Functions
- MDN Arrays: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays
- p5.js Arrays tutorial
- JavaScript.info: Functions

### Weeks 13-18: Advanced Concepts
- MDN Array methods
- p5.js Vector tutorial
- The Nature of Code: Vectors

### Weeks 19-20: OOP and Final Project
- MDN Object-oriented JavaScript
- JavaScript.info: Constructor functions
- p5.js Objects tutorial

---

## Completion Status

| Week | Lesson | Exercises | Project | Assessment | Review | Status |
|------|--------|-----------|---------|------------|--------|--------|
| 1 | ✅ | ✅ | ✅ | ✅ | ✅ | Complete |
| 2 | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | In Progress |
| 3-20 | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | Pending |

**Legend:**
- ✅ Complete
- ⏳ In Progress / Pending

---

## Next Steps

1. Complete Week 2 materials (exercises, project, assessment, review)
2. Continue with Week 3 (Variables and Data Types)
3. Progress through all 20 weeks systematically
4. Integrate all content into LearnHub platform
5. Test and verify all materials

---

*Last Updated: 2026-01-12*  
*Course Version: 1.0*  
*Status: In Progress - Week 2*
