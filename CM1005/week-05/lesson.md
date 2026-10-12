# Week 5: Objects and Properties

## A. Weekly Overview

- **Week:** 5 of 20
- **Topic:** Variables, Objects and Interaction (Part 3: Objects)
- **Lesson Title:** Organizing Data with Objects
- **Estimated Study Hours:** 3-4 hours
- **Learning Objectives:**
  - Create objects using object literal syntax
  - Access and modify object properties
  - Understand the difference between variables and objects
  - Use objects to organize related data
  - Create methods (functions inside objects)
  - Understand the `this` keyword
- **Why This Matters:** Objects allow you to group related data and behavior together. Instead of having separate variables for `playerX`, `playerY`, `playerSize`, etc., you can create a single `player` object that contains all of this information. This makes your code more organized, easier to understand, and simpler to maintain as your programs grow.
- **Prerequisites:** Week 3 (variables and data types), Week 4 (interaction and input)

---

## B. Lesson Content

### What are Objects?

Objects are containers that group related data together. Think of an object as a box with labeled compartments.

**Without objects (messy):**
```javascript
let playerX = 400;
let playerY = 300;
let playerSize = 50;
let playerSpeed = 5;
let playerColor = [200, 200, 255];
```

**With objects (organized):**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255]
};
```

### Creating Objects

Use curly braces `{}` to create an object:

```javascript
let spaceship = {
  x: 400,
  y: 300,
  width: 50,
  height: 30
};
```

**Syntax breakdown:**
- `let spaceship =` - declare a variable
- `{` - start of object
- `x: 400,` - property named "x" with value 400
- `y: 300,` - property named "y" with value 300
- `}` - end of object

### Accessing Properties

Use **dot notation** to access object properties:

```javascript
console.log(spaceship.x);      // 400
console.log(spaceship.y);      // 300
console.log(spaceship.width);  // 50
```

**Alternative: Bracket notation**
```javascript
console.log(spaceship["x"]);      // 400
console.log(spaceship["width"]);  // 50
```

**When to use each:**
- Dot notation: Most common, cleaner syntax
- Bracket notation: When property name is stored in a variable

### Modifying Properties

Change object properties just like variables:

```javascript
spaceship.x = 500;           // Change x to 500
spaceship.y += 10;           // Add 10 to y
spaceship.width *= 2;        // Double the width
```

**Example:**
```javascript
let player = {
  x: 400,
  y: 300,
  score: 0
};

player.x = 450;        // Move player
player.score += 10;    // Add points

console.log(player.x);      // 450
console.log(player.score);  // 10
```

### Adding New Properties

You can add new properties at any time:

```javascript
let player = {
  x: 400,
  y: 300
};

// Add new properties
player.speed = 5;
player.lives = 3;
player.name = "Hero";

console.log(player.speed);  // 5
console.log(player.lives);  // 3
console.log(player.name);   // "Hero"
```

### Object Methods

Objects can contain functions, called **methods**:

```javascript
let player = {
  x: 400,
  y: 300,
  speed: 5,
  
  // Method to move the player
  move: function(dx, dy) {
    this.x += dx;
    this.y += dy;
  },
  
  // Method to draw the player
  draw: function() {
    fill(200, 200, 255);
    ellipse(this.x, this.y, 50, 50);
  }
};

// Call the methods
player.move(10, 0);  // Move right
player.draw();       // Draw the player
```

### The `this` Keyword

Inside an object method, `this` refers to the object itself:

```javascript
let ball = {
  x: 100,
  y: 100,
  
  moveRight: function() {
    this.x += 5;  // "this.x" means "ball.x"
  },
  
  getPosition: function() {
    return "Position: " + this.x + ", " + this.y;
  }
};

ball.moveRight();
console.log(ball.x);           // 105
console.log(ball.getPosition()); // "Position: 105, 100"
```

**Why use `this`?**
- It makes methods reusable
- The method works for any object that has it
- Clear that you're modifying the object's own properties

### Nested Objects

Objects can contain other objects:

```javascript
let game = {
  player: {
    x: 400,
    y: 300,
    health: 100
  },
  enemy: {
    x: 100,
    y: 100,
    health: 50
  },
  score: 0
};

// Access nested properties
console.log(game.player.x);      // 400
console.log(game.enemy.health);  // 50

// Modify nested properties
game.player.health -= 10;
game.score += 100;
```

### Objects vs Variables

**Variables:**
- Store a single value
- Independent of each other
- Good for simple data

**Objects:**
- Store multiple related values
- Group data together logically
- Can contain methods (behavior)
- Good for complex entities

**When to use objects:**
- When you have multiple related variables
- When data and behavior belong together
- When you need to create multiple similar things

### Common Object Patterns

**Pattern 1: Entity Object**
```javascript
let enemy = {
  x: 200,
  y: 150,
  size: 40,
  speed: 2,
  
  update: function() {
    this.x += this.speed;
  },
  
  draw: function() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
};
```

**Pattern 2: State Object**
```javascript
let gameState = {
  score: 0,
  lives: 3,
  level: 1,
  isPaused: false,
  
  addScore: function(points) {
    this.score += points;
  },
  
  loseLife: function() {
    this.lives--;
    if (this.lives <= 0) {
      this.isPaused = true;
    }
  }
};
```

**Pattern 3: Configuration Object**
```javascript
let settings = {
  canvasWidth: 800,
  canvasHeight: 600,
  backgroundColor: [0, 0, 0],
  playerSpeed: 5,
  enemyCount: 10
};
```

### Object Iteration

Loop through object properties:

```javascript
let player = {
  x: 400,
  y: 300,
  speed: 5,
  lives: 3
};

// Loop through all properties
for (let key in player) {
  console.log(key + ": " + player[key]);
}
// Output:
// x: 400
// y: 300
// speed: 5
// lives: 3
```

### Common Mistakes

**1. Forgetting `this` in methods:**
```javascript
// Wrong:
let player = {
  x: 400,
  move: function() {
    x += 5;  // Error: x is not defined
  }
};

// Right:
let player = {
  x: 400,
  move: function() {
    this.x += 5;  // Correct: refers to player.x
  }
};
```

**2. Confusing object property with variable:**
```javascript
let x = 100;
let obj = { x: 200 };

console.log(x);      // 100 (the variable)
console.log(obj.x);  // 200 (the property)
```

**3. Trying to access non-existent property:**
```javascript
let player = { x: 400, y: 300 };
console.log(player.speed);  // undefined (not an error)
```

---

## C. Guided Coding Practice

### Exercise 5.1: Create a Player Object

**Objective:** Create an object to represent a game player

**Instructions:**
1. Create an object called `player`
2. Add properties: `x`, `y`, `size`, `speed`
3. Set initial values: x=400, y=300, size=50, speed=5
4. Print all properties to the console

**Expected Result:**
```
400
300
50
5
```

**Hints:**
- Use object literal syntax with `{}`
- Separate properties with commas
- Access properties with dot notation

**Solution:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5
};

console.log(player.x);
console.log(player.y);
console.log(player.size);
console.log(player.speed);
```

---

### Exercise 5.2: Object Methods

**Objective:** Add methods to an object

**Instructions:**
1. Create a `ball` object with properties: `x`, `y`, `radius`
2. Add a method `move(dx, dy)` that updates x and y
3. Add a method `draw()` that draws the ball
4. Test the methods

**Expected Result:**
- Ball moves when `move()` is called
- Ball appears on canvas when `draw()` is called

**Solution:**
```javascript
let ball = {
  x: 200,
  y: 200,
  radius: 25,
  
  move: function(dx, dy) {
    this.x += dx;
    this.y += dy;
  },
  
  draw: function() {
    fill(255, 100, 100);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  ball.draw();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) ball.move(10, 0);
  if (keyCode === LEFT_ARROW) ball.move(-10, 0);
  if (keyCode === UP_ARROW) ball.move(0, -10);
  if (keyCode === DOWN_ARROW) ball.move(0, 10);
}
```

---

### Exercise 5.3: Game State Object

**Objective:** Create an object to manage game state

**Instructions:**
1. Create a `gameState` object with: `score`, `lives`, `level`
2. Add methods: `addScore(points)`, `loseLife()`, `nextLevel()`
3. Test the methods

**Expected Result:**
- Score increases when `addScore()` is called
- Lives decrease when `loseLife()` is called
- Level increases when `nextLevel()` is called

**Solution:**
```javascript
let gameState = {
  score: 0,
  lives: 3,
  level: 1,
  
  addScore: function(points) {
    this.score += points;
    console.log("Score: " + this.score);
  },
  
  loseLife: function() {
    this.lives--;
    console.log("Lives: " + this.lives);
    if (this.lives <= 0) {
      console.log("Game Over!");
    }
  },
  
  nextLevel: function() {
    this.level++;
    console.log("Level: " + this.level);
  }
};

// Test the methods
gameState.addScore(100);  // Score: 100
gameState.addScore(50);   // Score: 150
gameState.loseLife();     // Lives: 2
gameState.nextLevel();    // Level: 2
```

---

### Exercise 5.4: Nested Objects

**Objective:** Work with nested objects

**Instructions:**
1. Create a `game` object with nested `player` and `enemy` objects
2. Each should have `x`, `y`, `health` properties
3. Add a `score` property to the game
4. Access and modify nested properties

**Solution:**
```javascript
let game = {
  player: {
    x: 400,
    y: 300,
    health: 100
  },
  enemy: {
    x: 100,
    y: 100,
    health: 50
  },
  score: 0
};

// Access nested properties
console.log(game.player.x);      // 400
console.log(game.enemy.health);  // 50

// Modify nested properties
game.player.health -= 20;
game.enemy.health -= 30;
game.score += 100;

console.log(game.player.health);  // 80
console.log(game.enemy.health);   // 20
console.log(game.score);          // 100
```

---

## D. Weekly Project Milestone

### Project: Player Object for Space Explorer

**New Feature:** Convert the player from separate variables to an organized object

**Concepts Used:**
- Object literal syntax
- Object properties
- Object methods
- The `this` keyword

**Step-by-Step Implementation:**

1. **Create the player object:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255]
};
```

2. **Add movement method:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255],
  
  move: function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    
    // Boundary checking
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
};
```

3. **Add draw method:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255],
  
  move: function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  },
  
  draw: function() {
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    
    // Draw spaceship body
    triangle(
      this.x, this.y - this.size/2,
      this.x - this.size/3, this.y + this.size/2,
      this.x + this.size/3, this.y + this.size/2
    );
    
    // Draw cockpit
    fill(100, 200, 255);
    ellipse(this.x, this.y, this.size/3, this.size/3);
  }
};
```

4. **Update the draw() function:**
```javascript
function draw() {
  background(0);
  
  // Update and draw player
  player.move();
  player.draw();
}
```

**Complete Code:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50,
  speed: 5,
  color: [200, 200, 255],
  
  move: function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  },
  
  draw: function() {
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    
    // Spaceship body
    triangle(
      this.x, this.y - this.size/2,
      this.x - this.size/3, this.y + this.size/2,
      this.x + this.size/3, this.y + this.size/2
    );
    
    // Cockpit
    fill(100, 200, 255);
    ellipse(this.x, this.y, this.size/3, this.size/3);
  }
};

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  player.move();
  player.draw();
}
```

**Acceptance Criteria:**
- ✅ Player is defined as an object (not separate variables)
- ✅ Object has properties: x, y, size, speed, color
- ✅ Object has methods: move(), draw()
- ✅ Methods use `this` to access properties
- ✅ Player moves with arrow keys
- ✅ Player stays within canvas boundaries
- ✅ Code is organized and readable

**Testing Checklist:**
- [ ] Player object is created correctly
- [ ] All properties are accessible
- [ ] move() method works with arrow keys
- [ ] draw() method displays the spaceship
- [ ] Boundary checking works
- [ ] No console errors
- [ ] Code is well-organized

**Extension Challenges:**
1. Add a `reset()` method that returns player to starting position
2. Add `health` and `score` properties
3. Add an `update()` method that combines move and draw
4. Create an `enemy` object with similar structure
5. Add collision detection between player and enemy

---

## E. Weekly Assessment

### Quiz: Objects and Properties (40 marks)

**Question 1 (5 marks)**
What is the correct syntax to create an object?

A) `let obj = (x: 10, y: 20);`
B) `let obj = [x: 10, y: 20];`
C) `let obj = {x: 10, y: 20};`
D) `let obj = <x: 10, y: 20>;`

**Answer:** C

---

**Question 2 (5 marks)**
How do you access the `x` property of an object called `player`?

A) `player[x]`
B) `player.x`
C) `player->x`
D) `player::x`

**Answer:** B

---

**Question 3 (5 marks)**
What does `this` refer to inside an object method?

A) The current function
B) The global window object
C) The object that contains the method
D) The previous object

**Answer:** C

---

**Question 4 (5 marks)**
What will this code output?
```javascript
let obj = {
  x: 10,
  double: function() {
    this.x *= 2;
  }
};
obj.double();
console.log(obj.x);
```

A) 10
B) 20
C) undefined
D) Error

**Answer:** B

---

**Question 5 (10 marks)**
Create an object called `car` with:
- Properties: `brand`, `model`, `year`, `speed`
- Method: `accelerate(amount)` that increases speed
- Method: `brake(amount)` that decreases speed

**Answer:**
```javascript
let car = {
  brand: "Toyota",
  model: "Camry",
  year: 2023,
  speed: 0,
  
  accelerate: function(amount) {
    this.speed += amount;
  },
  
  brake: function(amount) {
    this.speed -= amount;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
};

car.accelerate(50);  // speed is now 50
car.brake(20);       // speed is now 30
```

**Marking:** 
- Object created correctly (2 marks)
- All properties present (3 marks)
- accelerate method works (2 marks)
- brake method works (2 marks)
- Uses `this` correctly (1 mark)

---

**Question 6 (10 marks)**
What's wrong with this code? Fix it.
```javascript
let ball = {
  x: 100,
  y: 100,
  
  move: function() {
    x += 5;
    y += 5;
  }
};
```

**Answer:**
The code is missing `this` keyword. It should be:
```javascript
let ball = {
  x: 100,
  y: 100,
  
  move: function() {
    this.x += 5;
    this.y += 5;
  }
};
```

**Marking:**
- Identifies the problem (4 marks)
- Provides correct solution (6 marks)

---

### Practical Task (20 marks)

Create a complete game entity object (choose one: player, enemy, or collectible) with:
- At least 5 properties (position, size, speed, color, etc.)
- At least 2 methods (update and draw)
- Working code that displays and animates the entity
- Proper use of `this` keyword

**Marking Rubric:**
- Object created with correct syntax (4 marks)
- At least 5 properties defined (5 marks)
- At least 2 methods implemented (5 marks)
- Methods use `this` correctly (3 marks)
- Code runs without errors (3 marks)

---

## F. Review and Consolidation

### Summary of Concepts Learned

This week, you learned:
- How to create objects using object literal syntax
- How to access and modify object properties
- The difference between variables and objects
- How to add methods to objects
- How to use the `this` keyword
- How to organize related data with objects
- Common object patterns and best practices

### Glossary of New Terms

| Term | Definition |
|------|-----------|
| **Object** | A collection of related properties and methods |
| **Property** | A value stored in an object (like a variable) |
| **Method** | A function stored in an object |
| **Object Literal** | Syntax for creating objects using `{}` |
| **Dot Notation** | Accessing properties with `object.property` |
| **this** | Keyword that refers to the current object |
| **Nested Object** | An object contained within another object |

### JavaScript Features Introduced

- Object literal syntax: `{ property: value }`
- Dot notation: `object.property`
- Bracket notation: `object["property"]`
- Object methods: functions inside objects
- `this` keyword: refers to the containing object
- `for...in` loop: iterate through object properties

### p5.js Functions Introduced

No new p5.js functions this week, but you learned to:
- Use object properties with p5.js drawing functions
- Create methods that call p5.js functions
- Organize game entities as objects

### Five Review Questions

1. **What's the advantage of using objects instead of separate variables?**
   <details>
   <summary>Answer</summary>
   Objects group related data and behavior together, making code more organized and easier to maintain. Instead of managing `playerX`, `playerY`, `playerSpeed` separately, you have a single `player` object that contains everything.
   </details>

2. **How do you access a property called `score` in an object called `game`?**
   <details>
   <summary>Answer</summary>
   Use dot notation: `game.score` or bracket notation: `game["score"]`
   </details>

3. **What does `this` refer to inside an object method?**
   <details>
   <summary>Answer</summary>
   `this` refers to the object that contains the method. It allows the method to access and modify the object's own properties.
   </details>

4. **How would you add a new property `lives` to an existing object `player`?**
   <details>
   <summary>Answer</summary>
   ```javascript
   player.lives = 3;
   ```
   You can add properties to objects at any time, even after they're created.
   </details>

5. **Create an object with a method that modifies its own property:**
   <details>
   <summary>Answer</summary>
   ```javascript
   let counter = {
     value: 0,
     increment: function() {
       this.value++;
     }
   };
   counter.increment();
   console.log(counter.value);  // 1
   ```
   </details>

### Preview of Next Week

In Week 6, you'll learn about:
- Conditional statements (if/else)
- Comparison operators
- Logical operators (AND, OR, NOT)
- Making decisions in your code
- Collision detection

Your player object will be able to detect collisions with other objects!

---

## Additional Practice

If you want more practice before moving to Week 6:

1. **Create multiple objects:** Make player, enemy, and collectible objects
2. **Object interaction:** Make objects interact with each other
3. **Inventory system:** Create an object that stores items
4. **Settings object:** Organize game settings in an object
5. **Animation object:** Create an object that animates itself

---

## Resources for Review

- **MDN Working with Objects**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
- **JavaScript.info Objects**: https://javascript.info/object
- **p5.js Objects Tutorial**: https://p5js.org/learn/objects.html
- **The Coding Train**: Objects videos

---

*End of Week 5*
