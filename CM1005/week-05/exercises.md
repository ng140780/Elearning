# Week 5: Exercises

## Exercise 5.1: Basic Object Creation

**Objective:** Create a simple object with properties

**Instructions:**
1. Create an object called `book`
2. Add properties: `title`, `author`, `pages`, `isRead`
3. Set appropriate values for each property
4. Print all properties to the console

**Expected Result:**
```
The Hobbit
J.R.R. Tolkien
310
false
```

**Hints:**
- Use object literal syntax with `{}`
- Separate properties with commas
- Use appropriate data types (strings, numbers, booleans)

**Solution:**
```javascript
let book = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pages: 310,
  isRead: false
};

console.log(book.title);
console.log(book.author);
console.log(book.pages);
console.log(book.isRead);
```

---

## Exercise 5.2: Object Methods

**Objective:** Add methods to an object

**Instructions:**
1. Create a `calculator` object with a `result` property (start at 0)
2. Add methods: `add(num)`, `subtract(num)`, `multiply(num)`, `divide(num)`
3. Each method should update the `result` property
4. Test all methods

**Expected Result:**
```
15  (after add(10) and add(5))
10  (after subtract(5))
50  (after multiply(5))
10  (after divide(5))
```

**Hints:**
- Use `this.result` to access the result property
- Remember to handle division by zero
- Chain method calls for testing

**Solution:**
```javascript
let calculator = {
  result: 0,
  
  add: function(num) {
    this.result += num;
    return this;
  },
  
  subtract: function(num) {
    this.result -= num;
    return this;
  },
  
  multiply: function(num) {
    this.result *= num;
    return this;
  },
  
  divide: function(num) {
    if (num !== 0) {
      this.result /= num;
    }
    return this;
  }
};

// Test the methods
calculator.add(10).add(5);
console.log(calculator.result);  // 15

calculator.subtract(5);
console.log(calculator.result);  // 10

calculator.multiply(5);
console.log(calculator.result);  // 50

calculator.divide(5);
console.log(calculator.result);  // 10
```

---

## Exercise 5.3: Nested Objects

**Objective:** Work with nested objects

**Instructions:**
1. Create a `school` object with nested `student` and `teacher` objects
2. Student should have: `name`, `grade`, `subjects` (array)
3. Teacher should have: `name`, `subject`, `yearsExperience`
4. Access and modify nested properties

**Expected Result:**
```
Alice
10
Math
Mr. Smith
```

**Solution:**
```javascript
let school = {
  name: "Lincoln High",
  student: {
    name: "Alice",
    grade: 10,
    subjects: ["Math", "Science", "English"]
  },
  teacher: {
    name: "Mr. Smith",
    subject: "Math",
    yearsExperience: 15
  }
};

// Access nested properties
console.log(school.student.name);
console.log(school.student.grade);
console.log(school.teacher.subject);
console.log(school.teacher.name);

// Modify nested properties
school.student.grade = 11;
school.teacher.yearsExperience = 16;
```

---

## Exercise 5.4: Object Iteration

**Objective:** Loop through object properties

**Instructions:**
1. Create an object with at least 5 properties
2. Use a `for...in` loop to iterate through all properties
3. Print each property name and value

**Expected Result:**
```
name: John
age: 30
city: New York
job: Developer
hobby: Gaming
```

**Hints:**
- Use `for (let key in object)` syntax
- Access values with `object[key]`

**Solution:**
```javascript
let person = {
  name: "John",
  age: 30,
  city: "New York",
  job: "Developer",
  hobby: "Gaming"
};

for (let key in person) {
  console.log(key + ": " + person[key]);
}
```

---

## Exercise 5.5: Game Entity Object

**Objective:** Create a complete game entity

**Instructions:**
1. Create an `enemy` object with properties: `x`, `y`, `health`, `speed`
2. Add methods: `move()`, `takeDamage(amount)`, `isDead()`
3. The `move()` method should randomly move the enemy
4. Test all methods

**Expected Result:**
- Enemy moves around the screen
- Health decreases when taking damage
- `isDead()` returns true when health <= 0

**Solution:**
```javascript
let enemy = {
  x: 200,
  y: 150,
  health: 100,
  speed: 2,
  
  move: function() {
    // Random movement
    let dx = random(-this.speed, this.speed);
    let dy = random(-this.speed, this.speed);
    this.x += dx;
    this.y += dy;
    
    // Keep within bounds
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  },
  
  takeDamage: function(amount) {
    this.health -= amount;
    if (this.health < 0) {
      this.health = 0;
    }
  },
  
  isDead: function() {
    return this.health <= 0;
  },
  
  draw: function() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 40, 40);
    
    // Health bar
    fill(0, 255, 0);
    rect(this.x - 20, this.y - 30, this.health * 0.4, 5);
  }
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  enemy.move();
  enemy.draw();
}

function mousePressed() {
  enemy.takeDamage(20);
  console.log("Health: " + enemy.health);
  console.log("Is dead? " + enemy.isDead());
}
```

---

## Exercise 5.6: Multiple Objects

**Objective:** Create and manage multiple objects

**Instructions:**
1. Create an array of 3 enemy objects
2. Each enemy should have different starting positions
3. Update and draw all enemies in a loop
4. Click to damage a random enemy

**Expected Result:**
- 3 enemies moving independently
- Clicking damages a random enemy
- Enemies disappear when health reaches 0

**Solution:**
```javascript
let enemies = [];

function setup() {
  createCanvas(600, 400);
  
  // Create 3 enemies
  for (let i = 0; i < 3; i++) {
    enemies.push({
      x: random(100, 500),
      y: random(100, 300),
      health: 100,
      speed: random(1, 3),
      
      move: function() {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
      },
      
      takeDamage: function(amount) {
        this.health -= amount;
      },
      
      draw: function() {
        if (this.health > 0) {
          fill(255, 0, 0);
          ellipse(this.x, this.y, 40, 40);
          
          fill(0, 255, 0);
          rect(this.x - 20, this.y - 30, this.health * 0.4, 5);
        }
      }
    });
  }
}

function draw() {
  background(0);
  
  for (let enemy of enemies) {
    enemy.move();
    enemy.draw();
  }
}

function mousePressed() {
  // Damage a random enemy
  let index = floor(random(enemies.length));
  enemies[index].takeDamage(25);
  console.log("Damaged enemy " + index);
}
```

---

## Exercise 5.7: Object Composition

**Objective:** Create objects that contain other objects

**Instructions:**
1. Create a `weapon` object with: `name`, `damage`, `range`
2. Create a `player` object with: `name`, `health`, `weapon` (nested object)
3. Add a method `attack()` that uses the weapon's damage
4. Test the composition

**Expected Result:**
```
Player attacks with Sword for 25 damage!
```

**Solution:**
```javascript
let weapon = {
  name: "Sword",
  damage: 25,
  range: 50
};

let player = {
  name: "Hero",
  health: 100,
  weapon: weapon,
  
  attack: function() {
    console.log(this.name + " attacks with " + 
                this.weapon.name + " for " + 
                this.weapon.damage + " damage!");
  }
};

player.attack();
// Output: Hero attacks with Sword for 25 damage!

// Modify the weapon
player.weapon.damage = 50;
player.attack();
// Output: Hero attacks with Sword for 50 damage!
```

---

## Challenge Exercise: Inventory System

**Objective:** Create an inventory system using objects

**Instructions:**
1. Create a `player` object with an `inventory` array
2. Add methods: `addItem(item)`, `removeItem(item)`, `hasItem(item)`
3. Each item should be an object with: `name`, `quantity`, `type`
4. Test the inventory system

**Solution:**
```javascript
let player = {
  name: "Adventurer",
  inventory: [],
  
  addItem: function(item) {
    // Check if item already exists
    let existing = this.inventory.find(i => i.name === item.name);
    
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.inventory.push(item);
    }
  },
  
  removeItem: function(itemName) {
    let index = this.inventory.findIndex(i => i.name === itemName);
    
    if (index !== -1) {
      this.inventory[index].quantity--;
      
      if (this.inventory[index].quantity <= 0) {
        this.inventory.splice(index, 1);
      }
    }
  },
  
  hasItem: function(itemName) {
    return this.inventory.some(i => i.name === itemName);
  },
  
  showInventory: function() {
    console.log(this.name + "'s Inventory:");
    for (let item of this.inventory) {
      console.log("- " + item.name + " x" + item.quantity);
    }
  }
};

// Test the inventory
player.addItem({ name: "Potion", quantity: 3, type: "consumable" });
player.addItem({ name: "Sword", quantity: 1, type: "weapon" });
player.addItem({ name: "Potion", quantity: 2, type: "consumable" });

player.showInventory();
// Output:
// Adventurer's Inventory:
// - Potion x5
// - Sword x1

console.log(player.hasItem("Sword"));  // true
console.log(player.hasItem("Shield")); // false

player.removeItem("Potion");
player.showInventory();
// Output:
// Adventurer's Inventory:
// - Potion x4
// - Sword x1
```

---

## Submission Guidelines

For each exercise:
1. Write the complete code
2. Test it to ensure it works correctly
3. Add comments explaining your code
4. Take a screenshot of the output
5. Write a brief explanation of what you learned

---

*End of Week 5 Exercises*
