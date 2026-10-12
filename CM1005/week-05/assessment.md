# Week 5: Assessment

## Quiz: Objects and Properties

**Total Marks: 50**

### Part 1: Multiple Choice (20 marks)

**Question 1 (5 marks)**
What is the correct syntax to create an object in JavaScript?

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

### Part 2: Short Answer (15 marks)

**Question 5 (5 marks)**
Explain the difference between an object property and an object method.

**Answer:**
A property is a value stored in an object (like a variable), while a method is a function stored in an object (like a behavior). Properties store data, methods perform actions.

---

**Question 6 (5 marks)**
What is the advantage of using objects instead of separate variables?

**Answer:**
Objects group related data and behavior together, making code more organized, easier to maintain, and more reusable. Instead of managing multiple separate variables, you have one cohesive unit.

---

**Question 7 (5 marks)**
Why do we use the `this` keyword in object methods?

**Answer:**
The `this` keyword refers to the object that contains the method, allowing the method to access and modify the object's own properties. Without `this`, the method wouldn't know which object's properties to use.

---

### Part 3: Code Writing (15 marks)

**Question 8 (15 marks)**
Create a `car` object with:
- Properties: `brand`, `model`, `year`, `speed` (start at 0)
- Methods: 
  - `accelerate(amount)` - increases speed
  - `brake(amount)` - decreases speed (minimum 0)
  - `getInfo()` - returns a string with car details

Write the complete object and test it.

**Sample Answer:**
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
  },
  
  getInfo: function() {
    return this.year + " " + this.brand + " " + this.model + 
           " - Speed: " + this.speed + " km/h";
  }
};

// Test
car.accelerate(60);
console.log(car.getInfo());  // 2023 Toyota Camry - Speed: 60 km/h

car.brake(20);
console.log(car.getInfo());  // 2023 Toyota Camry - Speed: 40 km/h
```

**Marking Scheme:**
- Object created correctly (3 marks)
- All properties defined (3 marks)
- accelerate method works (3 marks)
- brake method works with minimum check (3 marks)
- getInfo method returns correct string (3 marks)

---

## Practical Task

**Task:** Create a complete game entity object

**Requirements:**
1. Create an `enemy` object with at least 5 properties
2. Add at least 2 methods (e.g., move, attack, takeDamage)
3. Use `this` keyword correctly in all methods
4. Create a working p5.js sketch that displays and uses the enemy
5. Add comments explaining your code

**Deliverables:**
- Complete code file
- Screenshot of running program
- Brief explanation (3-4 sentences) of how you used objects

**Grading Rubric:**

| Criteria | Points |
|----------|--------|
| Object created with correct syntax | 10 |
| At least 5 properties defined | 15 |
| At least 2 methods implemented | 20 |
| Correct use of `this` keyword | 15 |
| Working p5.js sketch | 20 |
| Code is clean and commented | 10 |
| Explanation provided | 10 |
| **Total** | **100** |

---

## Submission Guidelines

1. Submit all code files
2. Include screenshots of your working program
3. Write a brief reflection (100-150 words) on what you learned about objects
4. Submit via the course platform by the deadline

**Late Submission Policy:**
- 1 day late: 10% deduction
- 2 days late: 20% deduction
- 3+ days late: Not accepted

---

*End of Week 5 Assessment*
