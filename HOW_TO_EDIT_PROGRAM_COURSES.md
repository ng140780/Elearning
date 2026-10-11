# How to Edit Courses in a Program

## Overview

You can now fully manage courses within your programs through the Program Management interface. This includes adding, editing, and removing courses, as well as modifying their properties like credits, year, semester, prerequisites, and required status.

## Accessing Program Management

1. Navigate to the **Programs** page
2. Click the **"Manage Programs"** button in the top-right corner
3. Select the program you want to edit from the left panel

## Editing Courses in a Program

### Method 1: Edit Existing Course Properties

1. **Select the program** from the left panel
2. **Find the course** you want to edit in the courses list
3. **Click the edit icon** (pencil) next to the course
4. **Modify the properties**:
   - **Credits**: Change the number of credits for this course
   - **Required**: Toggle whether the course is required or elective
   - **Year**: Assign the course to a specific year (1, 2, 3, etc.)
   - **Semester**: Assign to Fall, Spring, or Summer semester
   - **Prerequisites**: Select which courses must be completed first
5. **Click "Save Changes"** to apply the updates

### Method 2: Add a New Course to Program

1. **Select the program** from the left panel
2. **Click "Add Course"** button in the top-right
3. **Fill in the course details**:
   - **Course**: Select from available courses (required)
   - **Credits**: Set credit value (default: 10)
   - **Required**: Check if course is required (default: checked)
   - **Year**: Optional year assignment
   - **Semester**: Optional semester assignment
   - **Prerequisites**: Optional prerequisite courses
4. **Click "Add Course"** to add it to the program

### Method 3: Remove a Course from Program

1. **Select the program** from the left panel
2. **Find the course** you want to remove
3. **Click the delete icon** (trash) next to the course
4. **Confirm deletion** in the dialog

## What You Can Edit

### Course Properties in a Program

| Property | Description | Example |
|----------|-------------|---------|
| **Credits** | Number of credits for this course in the program | 30 credits |
| **Required** | Whether students must take this course | Required or Elective |
| **Year** | Which year of the program this course is in | Year 1, 2, 3, etc. |
| **Semester** | Which semester the course is offered | Fall, Spring, Summer |
| **Prerequisites** | Courses that must be completed first | CM1005, CM1010 |

### Program Properties

You can also edit the program itself by clicking the edit icon next to the program name:
- **Title**: Program name
- **Description**: Program description
- **Level**: Certificate, Diploma, Bachelor's, Master's, Professional
- **Total Credits**: Total credits required for the program
- **Duration**: Estimated time to complete (e.g., "3-6 years")

## Example: Editing BSc Computer Science Program

### Scenario: Move a course from Fall to Spring semester

1. Go to **Programs** → **Manage Programs**
2. Select **"BSc Computer Science (University of London)"**
3. Find **"CM1005: Introduction to Programming I"**
4. Click the **edit icon** (pencil)
5. Change **Semester** from "Fall" to "Spring"
6. Click **"Save Changes"**
7. The course now appears in the Spring semester accordion

### Scenario: Change a course from required to elective

1. Select the program
2. Find the course (e.g., "CM2030: Graphics Programming")
3. Click the **edit icon**
4. **Uncheck** "Required course"
5. Click **"Save Changes"**
6. The course now shows as "(Elective)" in the program

### Scenario: Add prerequisites to a course

1. Select the program
2. Find the course (e.g., "CM2035: Algorithms and Data Structures II")
3. Click the **edit icon**
4. In the **Prerequisites** dropdown, hold Ctrl/Cmd and select:
   - "CM1035: Algorithms and Data Structures I"
5. Click **"Save Changes"**
6. The course now shows "Requires: CM1035" and will be locked until the prerequisite is completed

## Visual Indicators

### In Program Management
- **Edit icon** (pencil): Click to edit course properties
- **Delete icon** (trash): Click to remove course from program
- **Course order**: Courses are displayed in order (1, 2, 3, etc.)

### In Program Detail View
- **Required courses**: No special label
- **Elective courses**: Shows "(Elective)" badge
- **Prerequisites**: Shows "Requires: [course names]"
- **Locked courses**: Grayed out with lock icon (prerequisites not met)
- **Completed courses**: Green background with checkmark

## Tips and Best Practices

### Organizing Courses by Year and Semester

1. **Use consistent year numbering**: Year 1, Year 2, Year 3
2. **Assign semesters logically**:
   - Fall: First semester of academic year
   - Spring: Second semester
   - Summer: Optional third semester
3. **Set prerequisites carefully**: Ensure logical progression
4. **Balance workload**: Distribute credits evenly across semesters

### Managing Prerequisites

- **Only add prerequisites that exist in the program**: You can only select from courses already in the program
- **Avoid circular dependencies**: Course A requires B, B requires A
- **Test the flow**: After setting prerequisites, view the program to ensure courses unlock correctly

### Credit Management

- **Standard credits**: Most university courses are 30 credits
- **Total credits**: Ensure program total matches sum of all course credits
- **Update program total**: After adding/editing courses, update the program's total credits if needed

## Troubleshooting

### "I can't see my course in the prerequisites dropdown"

**Solution**: The course must be added to the program first. You can only set prerequisites from courses that are already in the program.

### "I changed the year/semester but don't see it in the program view"

**Solution**: Refresh your browser. The program view groups courses by year and semester, so changes should appear immediately.

### "I want to change the course content, not just the program properties"

**Solution**: Program management only controls how courses are organized in the program. To edit course content (lessons, modules), use the **Course Management** page at `/manage`.

### "I removed a course by mistake"

**Solution**: Use the "Add Course" button to add it back. You'll need to reconfigure its properties (credits, year, semester, prerequisites).

## Advanced Features

### Reordering Courses

Currently, courses are ordered by the `order` field. To reorder:
1. Edit each course
2. Manually adjust the order (this feature could be enhanced with drag-and-drop in the future)

### Bulk Editing

Currently, you must edit courses one at a time. For bulk operations, you would need to:
1. Export program data (future feature)
2. Edit in a spreadsheet
3. Import back (future feature)

### Copying Programs

To create a similar program:
1. Create a new program
2. Add the same courses
3. Adjust properties as needed

## Workflow Summary

```
1. Navigate to Programs → Manage Programs
2. Select your program
3. Choose action:
   ├─ Add Course → Fill form → Save
   ├─ Edit Course → Click pencil → Modify → Save
   └─ Remove Course → Click trash → Confirm
4. View changes in Programs → [Program Name]
5. Test prerequisites and progression
```

## Files Modified

- `src/services/programManagement.ts`: Added `updateCourseInProgram` function
- `src/pages/ProgramManagement.tsx`: Added edit button and edit modal for courses

## Related Documentation

- [Program Management Guide](./PROGRAM_MANAGEMENT_GUIDE.md)
- [Nested Accordion Feature](./NESTED_ACCORDION_FEATURE.md)
- [New Features](./NEW_FEATURES.md)

---

**Status**: ✅ Fully functional and tested  
**Last Updated**: 2026-01-12
