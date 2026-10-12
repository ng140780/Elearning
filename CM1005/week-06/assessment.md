# Week 6: Assessment

## Quiz: Conditional Statements

**Total Marks: 50**

### Part 1: Multiple Choice (20 marks)

**Question 1 (5 marks)**
What will this code output?
```javascript
let x = 10;
if (x > 5) {
  console.log("A");
} else {
  console.log("B");
}
```

A) A
B) B
C) AB
D) Nothing

**Answer:** A

---

**Question 2 (5 marks)**
Which operator checks for strict equality (value AND type)?

A) `=`
B) `==`
C) `===`
D) `!=`

**Answer:** C

---

**Question 3 (5 marks)**
What does `&&` mean in a conditional?

A) OR - at least one must be true
B) AND - both must be true
C) NOT - inverts the value
D) EQUAL - checks equality

**Answer:** B

---

**Question 4 (5 marks)**
What will this code output?
```javascript
let age = 17;
let hasLicense = true;

if (age >= 16 && hasLicense) {
  console.log("Can drive");
} else {
  console.log("Cannot drive");
}
```

A) Can drive
B) Cannot drive
C) Error
D) Nothing

**Answer:** A

---

### Part 2: Short Answer (15 marks)

**Question 5 (5 marks)**
Explain the difference between `==` and `===` operators.

**Answer:**
`==` is loose equality that converts types before comparing (5 == "5" is true). `===` is strict equality that checks both value and type without conversion (5 === "5" is false). Always use `===` to avoid unexpected behavior.

---

**Question 6 (5 marks)**
What is collision detection and why is it important in games?

**Answer:**
Collision detection is checking if two objects overlap or touch. It's important in games for detecting when a player collects items, hits enemies, reaches goals, or interacts with the environment. It enables game logic and player feedback.

---

**Question 7 (5 marks)**
How do you detect if two circles are colliding?

**Answer:**
Calculate the distance between their centers using the dist() function, then check if that distance is less than the sum of their radii: `if (dist(x1, y1, x2, y2) < (size1/2 + size2/2))`

---

### Part 3: Code Writing (15 marks)

**Question 8 (15 marks)**
Write a complete collision detection system for a player and multiple stars:
- Player object with x, y, size properties
- Array of 3 star objects with x, y, size properties
- Check collision with each star
- When collision detected, move star to random position and increase score
- Display score on screen

**Sample Answer:**
```javascript
let player = {
  x: 400,
  y: 300,
  size: 50
};

let stars = [
  { x: 100, y: 100, size: 30 },
  { x: 300, y: 200, size: 30 },
  { x: 600, y: 400, size: 30 }
];

let score = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  // Check collision with each star
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let distance = dist(player.x, player.y, star.x, star.y);
    let collisionDistance = (player.size / 2) + (star.size / 2);
    
    if (distance < collisionDistance) {
      score += 10;
      star.x = random(50, width - 50);
      star.y = random(50, height - 50);
    }
    
    // Draw star
    fill(255, 255, 0);
    ellipse(star.x, star.y, star.size, star.size);
  }
  
  // Draw player
  fill(100, 200, 255);
  ellipse(player.x, player.y, player.size, player.size);
  
  // Draw score
  fill(255);
  textSize(24);
  text("Score: " + score, 20, 20);
}
```

**Marking Scheme:**
- Player object created (2 marks)
- Stars array with 3 objects (3 marks)
- Loop through stars (2 marks)
- Distance calculation correct (3 marks)
- Collision condition correct (2 marks)
- Score increases on collision (1 mark)
- Star repositioned after collision (1 mark)
- Score displayed (1 mark)

---

## Practical Task

**Task:** Create a complete game with collision detection

**Requirements:**
1. Player object controlled by arrow keys (15 marks)
2. At least 3 collectible stars (10 marks)
3. Collision detection for all stars (15 marks)
4. Score tracking and display (10 marks)
5. Visual feedback on collision (flash effect) (10 marks)
6. Boundary checking for player (10 marks)
7. Clean, organized code with comments (10 marks)
8. Optional: Add enemies that decrease score (10 bonus marks)

**Deliverables:**
- Complete p5.js sketch code
- Screenshot of working game
- Brief explanation (100-150 words) of how collision detection works
- List of features implemented

**Grading Rubric:**

| Criteria | Points |
|----------|--------|
| Player movement works | 15 |
| Multiple stars present | 10 |
| Collision detection correct | 15 |
| Score tracking works | 10 |
| Visual feedback present | 10 |
| Boundary checking works | 10 |
| Code quality and comments | 10 |
| **Total** | **80** |
| **Bonus: Enemies** | **10** |
| **Maximum** | **90** |

---

## Submission Guidelines

1. Submit all code files
2. Include screenshots of your working game
3. Write a brief explanation of collision detection
4. Submit via the course platform by the deadline

**Late Submission Policy:**
- 1 day late: 10% deduction
- 2 days late: 20% deduction
- 3+ days late: Not accepted

---

## Self-Assessment Checklist

Before submitting, verify:

- [ ] Player moves smoothly with arrow keys
- [ ] Multiple stars are visible
- [ ] Collision detected when player touches star
- [ ] Score increases correctly
- [ ] Stars move to new positions after collection
- [ ] Visual feedback (flash) appears on collision
- [ ] Player stays within canvas boundaries
- [ ] Score displays correctly
- [ ] Code is clean and well-commented
- [ ] No console errors

---

## Learning Reflection

After completing this assessment, reflect on:

1. What was the most challenging part of implementing collision detection?
2. How did you debug your collision logic?
3. What would you add to make the game more interesting?
4. How does collision detection relate to real-world applications?

---

*End of Week 6 Assessment*
