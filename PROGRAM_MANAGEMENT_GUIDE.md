# 🎓 Program Management Guide

This guide explains how to create and manage learning programs (degrees, certificates, diplomas) using the Program Management interface.

## 📍 Accessing Program Management

1. Navigate to **Programs** page (click "Programs" in the header)
2. Click the **"Manage Programs"** button in the top-right corner
3. You'll be taken to the Program Management interface

## 🎯 What You Can Do

### ✅ Create Programs
- Bachelor's degrees (BSc, BA, etc.)
- Master's degrees (MSc, MA, etc.)
- Professional certificates
- Diplomas
- Custom learning paths

### ✅ Add Courses to Programs
- Select from existing courses
- Set credit values
- Define prerequisites
- Organize by year/semester
- Mark as required or elective

### ✅ Edit Programs
- Update program details
- Modify course structure
- Change credit requirements
- Adjust prerequisites

### ✅ Delete Programs
- Remove entire programs
- Remove individual courses from programs

## 🚀 Creating Your First Program

### Step 1: Click "Add Program"
- In the Program Management interface, click the **"Add Program"** button
- A modal will open with program details form

### Step 2: Fill in Program Details
```
Program Title: BSc Computer Science
Description: A comprehensive 3-year undergraduate program...
Level: Bachelor's Degree
Total Credits: 180
Estimated Duration: 3 years
```

### Step 3: Click "Add Program"
- Your program will appear in the left panel
- Click on it to select it and start adding courses

## 📚 Adding Courses to a Program

### Step 1: Select Your Program
- Click on the program name in the left panel

### Step 2: Click "Add Course"
- Click the **"Add Course"** button in the top-right of the program details panel

### Step 3: Configure the Course
```
Course: [Select from dropdown]
Credits: 15
Required course: [✓]
Year: 1
Semester: Fall
Prerequisites: [Select if needed]
```

### Step 4: Click "Add Course"
- The course will be added to your program
- Repeat for all courses in your program

## 🎓 Example: Creating a BSc Computer Science Program

### Program Structure
```
Year 1 (Fall):
  - CS101: Introduction to Computer Science (15 credits)
  - MATH101: Calculus I (15 credits)

Year 1 (Spring):
  - CS102: Data Structures (15 credits) [Prereq: CS101]
  - MATH102: Calculus II (15 credits) [Prereq: MATH101]

Year 2 (Fall):
  - CS201: Algorithms (15 credits) [Prereq: CS102]
  - CS202: Database Systems (15 credits) [Prereq: CS102]

... and so on
```

### Step-by-Step Creation

1. **Create the Program**
   - Title: "BSc Computer Science"
   - Level: "Bachelor's Degree"
   - Total Credits: 180
   - Duration: "3 years"

2. **Add Year 1 Courses**
   - Add CS101 (15 credits, Year 1, Fall, Required)
   - Add MATH101 (15 credits, Year 1, Fall, Required)
   - Add CS102 (15 credits, Year 1, Spring, Required, Prereq: CS101)
   - Add MATH102 (15 credits, Year 1, Spring, Required, Prereq: MATH101)

3. **Add Year 2 Courses**
   - Add CS201 (15 credits, Year 2, Fall, Required, Prereq: CS102)
   - Add CS202 (15 credits, Year 2, Fall, Required, Prereq: CS102)
   - Continue for all courses...

4. **Review and Save**
   - Check that all prerequisites are set correctly
   - Verify credit totals
   - Ensure course order makes sense

## 🔄 Managing Existing Programs

### Editing a Program
1. Select the program from the left panel
2. Click the **edit icon** (pencil) next to the program name
3. Update the details in the modal
4. Click "Save Changes"

### Removing a Course
1. Select the program
2. Find the course in the list
3. Click the **trash icon** next to the course
4. Confirm deletion

### Deleting a Program
1. Find the program in the left panel
2. Click the **trash icon** next to the program name
3. Confirm deletion
4. ⚠️ **Warning**: This will delete the entire program and all course associations

## 🎨 Program Features Explained

### Program Levels
- **Certificate**: Short-term professional certification
- **Diploma**: Mid-level qualification
- **Bachelor's Degree**: 3-4 year undergraduate program
- **Master's Degree**: 1-2 year graduate program
- **Professional Certificate**: Industry-specific certification

### Course Properties

#### Credits
- Number of academic credits for the course
- Typical values: 5-20 credits per course
- Must add up to program's total credits

#### Required vs Elective
- **Required**: Must be completed to earn the degree
- **Elective**: Optional, student can choose alternatives

#### Year and Semester
- **Year**: Academic year (1, 2, 3, 4)
- **Semester**: Fall, Spring, or Summer
- Helps organize the learning path

#### Prerequisites
- Courses that must be completed before taking this course
- Select from courses already in the program
- Creates a dependency graph
- Students must complete prerequisites first

## 💡 Best Practices

### 1. Plan Before You Build
- Sketch out your program structure on paper first
- List all courses and their prerequisites
- Calculate total credits
- Determine the logical order

### 2. Use Meaningful Course IDs
- CS101, CS102, MATH201, etc.
- Makes it easier to understand the program
- Helps with prerequisite management

### 3. Set Prerequisites Carefully
- Only require truly necessary prerequisites
- Don't create circular dependencies
- Consider alternative paths for electives

### 4. Test Your Program
- After creating, view the program details page
- Check that the structure looks correct
- Verify prerequisites are enforced
- Ensure progress tracking works

### 5. Document Your Program
- Add a clear description
- List learning objectives
- Explain the program structure
- Mention any special requirements

## 🔍 Troubleshooting

### "Course not showing in dropdown"
- Make sure the course exists in the course catalog
- Go to "Manage Courses" to create it first
- Refresh the page after creating a course

### "Can't delete a program"
- Make sure you're clicking the trash icon next to the program name
- Confirm the deletion in the modal
- Check that you have the right program selected

### "Prerequisites not working"
- Make sure prerequisite courses are added to the program first
- Prerequisites can only reference courses within the same program
- Check that course IDs match exactly

### "Credits don't add up"
- Review all course credit values
- Update the program's total credits if needed
- Remember: total credits should match the sum of all course credits

## 🎯 Advanced Features

### Creating Elective Tracks
You can create multiple elective options:
```
Year 3 (Spring) - Choose ONE:
  - CS301: Machine Learning (15 credits, Elective)
  - CS302: Web Development (15 credits, Elective)
  - CS303: Mobile Development (15 credits, Elective)
```

### Cross-Program Prerequisites
Currently, prerequisites can only reference courses within the same program. For cross-program dependencies, consider:
- Creating a combined program
- Using learning paths instead
- Documenting external requirements in the description

### Part-Time Programs
Adjust the structure for part-time students:
- Extend the duration (e.g., "6 years" instead of "3 years")
- Reduce courses per semester
- Keep the same total credits

## 📊 Program Analytics

After students start using your program, you can track:
- Enrollment numbers
- Completion rates
- Average time to complete
- Most common failure points (prerequisites)

## 🔄 Migration from Learning Paths

If you were using Learning Paths for structured programs, consider migrating to Programs:

**Learning Paths** (Simple):
- Sequential course list
- No prerequisites
- No credits
- No year/semester structure

**Programs** (Advanced):
- Full degree/certificate structure
- Prerequisites enforcement
- Credit tracking
- Year/semester organization
- Required vs elective courses

## 🎓 Next Steps

1. **Create your first program** using this guide
2. **Add courses** from your existing catalog
3. **Set up prerequisites** to create a logical flow
4. **Test the program** by viewing it as a student would
5. **Iterate and improve** based on feedback

## 📞 Need Help?

- Check the course catalog first (Manage Courses)
- Review existing programs for examples
- Plan your structure before building
- Test thoroughly before publishing

---

**Happy Program Building! 🎓**
