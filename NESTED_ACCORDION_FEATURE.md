# Nested Accordion Feature

## Overview
Added two-level accordion system to the Program Detail page for better organization of courses by year and semester.

## Structure

### Year Level (First Accordion)
- **Location**: Top level
- **Shows**: Total credits, total courses, completed count, completion percentage
- **Action**: Click to expand/collapse all semesters within that year

### Semester Level (Second Accordion)
- **Location**: Inside each year
- **Shows**: Semester name, credits, courses, completed count, completion percentage
- **Action**: Click to expand/collapse courses within that semester
- **Sorting**: Fall → Spring → Summer → All

## Visual Hierarchy

```
┌─ Year 1 ─────────────────────────────────────┐
│  120 credits • 4 courses • 2 completed • 50% │
├──────────────────────────────────────────────┤
│ ┌─ Fall Semester ──────────────────────────┐ │
│ │  60 credits • 2 courses • 1 completed   │ │
│ ├──────────────────────────────────────────┤ │
│ │  • CM1005: Introduction to Programming I │ │
│ │  • CM1015: Computational Mathematics     │ │
│ └──────────────────────────────────────────┘ │
│ ┌─ Spring Semester ────────────────────────┐ │
│ │  60 credits • 2 courses • 1 completed   │ │
│ ├──────────────────────────────────────────┤ │
│ │  • CM1020: Discrete Mathematics          │ │
│ │  • CM1025: Fundamentals of CS            │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

## Implementation Details

### State Management
```typescript
// Track year expansion
const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>({});

// Track semester expansion
const [expandedSemesters, setExpandedSemesters] = useState<Record<string, boolean>>({});
```

### Semester Grouping
```typescript
// Group courses by semester within each year
const coursesBySemester: Record<string, typeof courses> = {};
courses.forEach(course => {
  const semester = course.programCourse.semester || 'all';
  if (!coursesBySemester[semester]) {
    coursesBySemester[semester] = [];
  }
  coursesBySemester[semester].push(course);
});
```

### Sorting
Semesters are sorted in academic order:
1. Fall (1)
2. Spring (2)
3. Summer (3)
4. All/Unspecified (4)

## User Experience

### Default State
- All years expanded by default
- All semesters expanded by default
- Users can collapse what they don't need

### Visual Feedback
- Chevron icons indicate expand/collapse state
- Different background colors for hierarchy:
  - Year: `bg-surface-50`
  - Semester: `bg-surface-100`
  - Courses: `bg-white`

### Progress Tracking
- Year level: Shows overall year progress
- Semester level: Shows semester-specific progress
- Both update in real-time as courses are completed

## Benefits

1. **Better Organization**: Clear separation by academic periods
2. **Reduced Clutter**: Collapse completed or future semesters
3. **Quick Overview**: See progress at both year and semester level
4. **Intuitive Navigation**: Matches academic structure students expect
5. **Scalable**: Works with any number of years or semesters

## Testing Checklist

- [x] Year accordion expands/collapses
- [x] Semester accordion expands/collapses independently
- [x] Progress percentages calculate correctly
- [x] Semesters sort in correct order
- [x] Course cards display correctly within semesters
- [x] Prerequisites and locks work correctly
- [x] Responsive on mobile devices
- [x] Build successful with no errors

## Files Modified

- `src/pages/ProgramDetail.tsx`: Added nested accordion logic and UI

## Future Enhancements

Potential improvements:
1. **Collapse All/Expand All** button
2. **Remember State** in localStorage
3. **Auto-collapse** completed semesters
4. **Drag and drop** to reorder semesters
5. **Color coding** by completion status
6. **Progress bars** in accordion headers
7. **Keyboard navigation** for accessibility
