# 🎓 Creating Programs Guide

This guide explains how to create structured learning programs like BSc degrees, professional certificates, and sequential learning paths.

## 📋 Table of Contents
1. [Program Types](#program-types)
2. [Creating a BSc Degree Program](#creating-a-bsc-degree-program)
3. [Creating a Sequential Certificate](#creating-a-sequential-certificate)
4. [Program Structure Options](#program-structure-options)
5. [Managing Programs](#managing-programs)

---

## 🎯 Program Types

The system supports several program levels:

| Level | Description | Example |
|-------|-------------|---------|
| `certificate` | Short certification program | Web Development Certificate |
| `diploma` | Diploma-level program | Diploma in Data Science |
| `bachelor` | Bachelor's degree (3-4 years) | BSc Computer Science |
| `master` | Master's degree (1-2 years) | MSc Artificial Intelligence |
| `professional` | Professional certification | Frontend Developer Certificate |

---

## 🏛️ Creating a BSc Degree Program

### Example: BSc Computer Science (3-Year Program)

A BSc program typically has:
- **Year-based structure** (Year 1, Year 2, Year 3)
- **Semesters** (Fall, Spring, Summer)
- **Credits** per course
- **Prerequisites** between courses
- **Required and elective** courses

### Step 1: Define the Program

Add to `src/content/manifest.ts` in the `programs` array:

```typescript
{
  id: 'bsc-computer-science',
  type: 'program',
  title: 'BSc Computer Science',
  description: 'A comprehensive 3-year undergraduate program covering computer science fundamentals, algorithms, software engineering, and specialized topics.',
  level: 'bachelor',
  totalCredits: 180,
  estimatedDuration: '3 years',
  objectives: [
    'Master fundamental computer science concepts',
    'Develop strong programming skills across multiple paradigms',
    'Understand algorithms, data structures, and computational complexity',
    'Build software engineering and system design expertise',
    'Apply knowledge to real-world problems through projects',
  ],
  prerequisites: [],
  courses: [
    // Year 1 - Fall Semester
    { 
      courseId: 'cs101', 
      year: 1, 
      semester: 'fall', 
      credits: 15, 
      required: true, 
      order: 1 
    },
    { 
      courseId: 'math301', 
      year: 1, 
      semester: 'fall', 
      credits: 15, 
      required: true, 
      order: 2 
    },
    
    // Year 1 - Spring Semester
    { 
      courseId: 'web101', 
      year: 1, 
      semester: 'spring', 
      credits: 15, 
      required: true, 
      order: 3,
      prerequisites: ['cs101'] // Must complete cs101 first
    },
    
    // Year 2 - Fall Semester
    { 
      courseId: 'ds201', 
      year: 2, 
      semester: 'fall', 
      credits: 15, 
      required: true, 
      order: 4,
      prerequisites: ['cs101', 'math301'] // Must complete both first
    },
    
    // Year 3 - Electives
    { 
      courseId: 'ux101', 
      year: 3, 
      semester: 'fall', 
      credits: 10, 
      required: false, // Elective
      order: 5 
    },
    { 
      courseId: 'phil201', 
      year: 3, 
      semester: 'spring', 
      credits: 10, 
      required: false, // Elective
      order: 6 
    },
  ],
  order: 1,
}
```

### Key Features:

1. **Year & Semester**: Organize courses by academic year and semester
2. **Credits**: Assign credit values to each course
3. **Prerequisites**: Define which courses must be completed first
4. **Required vs Elective**: Mark courses as required or optional
5. **Order**: Control the sequence within each year/semester

---

## 📜 Creating a Sequential Certificate

### Example: Frontend Developer Certificate (8 Modules)

A sequential certificate has:
- **No years/semesters** (just sequential order)
- **Progressive difficulty**
- **Prerequisites** between modules
- **All courses required**

### Step 1: Define the Program

```typescript
{
  id: 'frontend-developer',
  type: 'program',
  title: 'Frontend Developer Professional Certificate',
  description: 'A structured 8-module program to become a professional frontend developer. Learn HTML, CSS, JavaScript, React, and modern web development practices.',
  level: 'professional',
  totalCredits: 80,
  estimatedDuration: '6 months',
  objectives: [
    'Build responsive, accessible websites from scratch',
    'Master modern JavaScript and TypeScript',
    'Develop production-ready React applications',
    'Implement testing and deployment workflows',
    'Create a professional portfolio of projects',
  ],
  prerequisites: [],
  courses: [
    // Module 1: HTML & CSS Basics
    { 
      courseId: 'web101', 
      credits: 10, 
      required: true, 
      order: 1 
    },
    
    // Module 2: UX Design Principles
    { 
      courseId: 'ux101', 
      credits: 10, 
      required: true, 
      order: 2 
    },
    
    // Module 3: Advanced JavaScript (add this course first)
    { 
      courseId: 'js201', 
      credits: 10, 
      required: true, 
      order: 3,
      prerequisites: ['web101'] // Must complete web101 first
    },
    
    // Module 4: React Fundamentals (add this course first)
    { 
      courseId: 'react301', 
      credits: 10, 
      required: true, 
      order: 4,
      prerequisites: ['js201'] // Must complete js201 first
    },
    
    // Module 5: State Management (add this course first)
    { 
      courseId: 'react302', 
      credits: 10, 
      required: true, 
      order: 5,
      prerequisites: ['react301']
    },
    
    // Module 6: Testing (add this course first)
    { 
      courseId: 'test401', 
      credits: 10, 
      required: true, 
      order: 6,
      prerequisites: ['react301']
    },
    
    // Module 7: Deployment (add this course first)
    { 
      courseId: 'deploy402', 
      credits: 10, 
      required: true, 
      order: 7,
      prerequisites: ['react302', 'test401'] // Must complete both
    },
    
    // Module 8: Capstone Project (add this course first)
    { 
      courseId: 'capstone501', 
      credits: 10, 
      required: true, 
      order: 8,
      prerequisites: ['deploy402']
    },
  ],
  order: 2,
}
```

### Key Features:

1. **Sequential Order**: Courses follow a logical progression
2. **No Years/Semesters**: Just numbered order (1, 2, 3, ...)
3. **Prerequisites**: Each module builds on previous ones
4. **All Required**: No electives in a sequential certificate

---

## 🏗️ Program Structure Options

### Option 1: Year-Based Structure (BSc/Master)

Best for academic degrees with semesters:

```typescript
courses: [
  { courseId: 'course1', year: 1, semester: 'fall', credits: 15, order: 1 },
  { courseId: 'course2', year: 1, semester: 'fall', credits: 15, order: 2 },
  { courseId: 'course3', year: 1, semester: 'spring', credits: 15, order: 3 },
  { courseId: 'course4', year: 2, semester: 'fall', credits: 15, order: 4 },
]
```

**UI Display**: Groups courses by year, shows semester labels

### Option 2: Sequential Structure (Certificate)

Best for professional certifications:

```typescript
courses: [
  { courseId: 'course1', credits: 10, order: 1 },
  { courseId: 'course2', credits: 10, order: 2, prerequisites: ['course1'] },
  { courseId: 'course3', credits: 10, order: 3, prerequisites: ['course2'] },
]
```

**UI Display**: Shows numbered list with progress indicators

### Option 3: Mixed Structure

You can mix both approaches:

```typescript
courses: [
  // Year 1
  { courseId: 'course1', year: 1, semester: 'fall', credits: 15, order: 1 },
  { courseId: 'course2', year: 1, semester: 'spring', credits: 15, order: 2 },
  
  // Year 2 - Sequential within year
  { courseId: 'course3', year: 2, credits: 15, order: 3, prerequisites: ['course2'] },
  { courseId: 'course4', year: 2, credits: 15, order: 4, prerequisites: ['course3'] },
]
```

---

## 🎨 Program Features

### 1. Prerequisites System

Courses can have prerequisites that must be completed first:

```typescript
{
  courseId: 'advanced-course',
  prerequisites: ['basic-course-1', 'basic-course-2'],
  // ...
}
```

**Behavior**:
- ✅ If prerequisites are met: Course is unlocked
- 🔒 If prerequisites not met: Course shows as locked
- ✔️ If course is completed: Shows green checkmark

### 2. Required vs Elective

Mark courses as required or elective:

```typescript
{
  courseId: 'required-course',
  required: true, // Must complete for certification
  // ...
}

{
  courseId: 'elective-course',
  required: false, // Optional
  // ...
}
```

**UI Display**:
- Required courses: No label
- Elective courses: Shows "(Elective)" badge

### 3. Credit Tracking

Track progress by credits:

```typescript
{
  totalCredits: 180, // Total credits for program
  courses: [
    { credits: 15, ... },
    { credits: 15, ... },
    // ...
  ]
}
```

**UI Display**: Shows "X of Y credits completed"

### 4. Progress Calculation

The system automatically calculates:
- ✅ Completed courses
- ✅ Completed credits
- ✅ Overall percentage
- ✅ Next available course

---

## 🛠️ Managing Programs

### Adding a New Program

1. **Create courses first** (if they don't exist)
2. **Add program to manifest** in `src/content/manifest.ts`
3. **Define course structure** with prerequisites and credits
4. **Test the program** by navigating to `/programs`

### Editing a Program

1. Open `src/content/manifest.ts`
2. Find your program in the `programs` array
3. Modify the program properties
4. Save and refresh the browser

### Deleting a Program

1. Open `src/content/manifest.ts`
2. Remove the program from the `programs` array
3. Save and refresh the browser

**Note**: Deleting a program doesn't delete the courses - they remain available in the course catalog.

---

## 📊 Program Progress Tracking

The system tracks:

| Metric | Description |
|--------|-------------|
| Completed Courses | Number of courses fully completed |
| Total Courses | Total courses in the program |
| Completed Credits | Credits earned from completed courses |
| Total Credits | Total credits required for program |
| Percentage | Overall completion percentage |

**Progress is calculated automatically** based on lesson completion in each course.

---

## 🎯 Best Practices

### For BSc Degrees:
- ✅ Use year and semester fields
- ✅ Set realistic credit values (15 per course is common)
- ✅ Define clear prerequisites
- ✅ Include both required and elective courses
- ✅ Total credits should match degree requirements (e.g., 180 for BSc)

### For Professional Certificates:
- ✅ Use sequential order (no years/semesters)
- ✅ Keep all courses required
- ✅ Define clear prerequisites for progressive learning
- ✅ Estimate realistic duration (e.g., "6 months")
- ✅ Total credits should be achievable (e.g., 80 for certificate)

### For Learning Paths:
- ✅ Use Learning Paths (not Programs) for informal learning
- ✅ Programs are for structured, credentialed learning
- ✅ Learning Paths are for skill-based progression

---

## 🔍 Example Programs

### 1. BSc Computer Science (3 Years)

```
Year 1 (Fall):
  - CS101: Introduction to Computer Science (15 credits)
  - MATH301: Linear Algebra (15 credits)

Year 1 (Spring):
  - WEB101: Modern Web Development (15 credits) [Prereq: CS101]

Year 2 (Fall):
  - DS201: Data Science with Python (15 credits) [Prereq: CS101, MATH301]

Year 3 (Fall):
  - UX101: UX Design Principles (10 credits) [Elective]

Year 3 (Spring):
  - PHIL201: Introduction to Philosophy (10 credits) [Elective]

Total: 80 credits (partial example)
```

### 2. Frontend Developer Certificate (Sequential)

```
1. WEB101: Modern Web Development (10 credits)
2. UX101: UX Design Principles (10 credits)
3. JS201: Advanced JavaScript (10 credits) [Prereq: WEB101]
4. REACT301: React Fundamentals (10 credits) [Prereq: JS201]
5. REACT302: State Management (10 credits) [Prereq: REACT301]
6. TEST401: Testing (10 credits) [Prereq: REACT301]
7. DEPLOY402: Deployment (10 credits) [Prereq: REACT302, TEST401]
8. CAPSTONE501: Capstone Project (10 credits) [Prereq: DEPLOY402]

Total: 80 credits
```

---

## 🚀 Next Steps

1. **Create your courses** using the Course Management interface
2. **Define your program** in `src/content/manifest.ts`
3. **Test the program** by navigating to `/programs`
4. **Start learning** by clicking "Start Program"
5. **Track progress** as you complete courses

---

## 💡 Tips

- **Plan your program structure** before creating courses
- **Use meaningful course IDs** (e.g., `cs101`, `math301`)
- **Test prerequisites** to ensure they work correctly
- **Update program description** to be clear and engaging
- **Set realistic credit values** based on course content
- **Review objectives** to ensure they align with courses

---

## 📞 Support

If you need help creating programs:
1. Check the example programs in `src/content/manifest.ts`
2. Review the TypeScript types in `src/types/index.ts`
3. Test your program structure in the UI
4. Check the browser console for any errors

---

**Happy Program Building! 🎓**
