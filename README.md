# LearnHub - Personal E-Learning Platform

A modern, modular e-learning web application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

### Implemented
- **Home Page**: Hero section, course search, featured courses, subject browsing, learning paths, continue learning section
- **Explore Courses**: Full catalogue with search, subject filters, difficulty filters, and sorting
- **Course Details**: Complete course information with modules, lessons, progress, and bookmarking
- **Learning Environment**: Focused lesson viewer with sidebar navigation, progress tracking, and prev/next navigation
- **My Learning Dashboard**: Personal progress overview with stats, in-progress courses, and activity
- **Learning Paths**: Structured learning programmes with progress tracking
- **Bookmarks**: Save and manage bookmarked courses and lessons
- **Learning History**: Chronological view of all accessed content
- **Settings**: Theme preferences, font size, and data management
- **Progress Tracking**: Automatic calculation from lesson completion data
- **Persistence**: All learner data persists in localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Semantic HTML, keyboard navigation, focus states, ARIA labels

## Architecture

### Flexible Learning Hierarchy

The application supports any course structure depth:
- Programme → Year → Module → Topic → Lesson
- Course → Module → Lesson
- Course → Lesson
- Module → Topic → Lesson
- Any custom combination

All structures use the same `LearningUnit` type with parent-child relationships.

### Content Separation

Content is stored separately from UI components:
```
src/
  content/manifest.ts    # Central content registry
  services/content.ts    # Content access API
  types/index.ts         # Type definitions
```

### Persistence Layer

All learner data goes through a dedicated service:
```
src/services/persistence.ts  # localStorage operations
src/context/LearnerContext.tsx # React state management
```

### Progress Calculation

Progress is always calculated from actual data, never manually set:
```
src/services/progress.ts  # Progress calculation from lesson completion
```

## Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── types/
│   └── index.ts              # All TypeScript types
├── content/
│   └── manifest.ts           # Course and learning path data
├── services/
│   ├── content.ts            # Content access API
│   ├── persistence.ts        # localStorage abstraction
│   └── progress.ts           # Progress calculation
├── context/
│   └── LearnerContext.tsx     # Learner state management
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Page footer
│   │   └── Layout.tsx        # Page wrapper
│   └── ui/
│       ├── CourseCard.tsx     # Reusable course card
│       ├── ProgressBar.tsx   # Progress indicator
│       └── EmptyState.tsx    # Empty state component
└── pages/
    ├── Home.tsx              # Homepage
    ├── ExploreCourses.tsx     # Course catalogue
    ├── CourseDetails.tsx      # Course detail view
    ├── MyLearning.tsx         # Personal dashboard
    ├── LearningEnvironment.tsx # Lesson viewer
    ├── LearningPaths.tsx      # Learning paths list
    ├── LearningPathDetail.tsx # Learning path detail
    ├── Bookmarks.tsx          # Saved items
    ├── History.tsx            # Activity history
    └── Settings.tsx           # User preferences
```

## Adding New Content

### Adding a Course

Edit `src/content/manifest.ts` and add a new course to the `courses` array:

```typescript
{
  id: 'unique-course-id',
  type: 'course',
  title: 'Course Title',
  description: 'Course description...',
  subject: 'subject-id',
  subjects: ['subject-id'],
  difficulty: 'beginner', // beginner | intermediate | advanced | expert
  estimatedHours: 40,
  provider: 'LearnHub',
  order: 7,
  learningObjectives: ['Objective 1', 'Objective 2'],
  prerequisites: [],
  modules: [
    {
      id: 'module-id',
      type: 'module',
      title: 'Module Title',
      description: 'Module description',
      order: 1,
      lessons: [
        {
          id: 'lesson-id',
          type: 'lesson',
          title: 'Lesson Title',
          contentType: 'text', // text | video | exercise | quiz | project | reading | external
          content: '# Markdown Content\n\nYour lesson content here...',
          order: 1,
        },
      ],
    },
  ],
}
```

### Adding a Learning Path

Add to the `learningPaths` array:

```typescript
{
  id: 'path-id',
  title: 'Path Title',
  description: 'Path description',
  courses: ['course-id-1', 'course-id-2'],
  estimatedHours: 100,
  difficulty: 'beginner',
  objectives: ['Objective 1'],
  order: 4,
}
```

### Adding a Subject

Add to the `subjects` array:

```typescript
{
  id: 'new-subject',
  name: 'Subject Name',
  icon: '📖',
  description: 'Subject description',
}
```

## Multi-User Migration Path

The architecture is designed for easy migration to a multi-user platform:

### Current State
- Single learner, no authentication
- All data in localStorage
- Content and learner state are separated

### Migration Steps

1. **Add Authentication**
   - Implement user registration/login
   - Add JWT/session management
   - Protect routes that require authentication

2. **Replace Persistence Layer**
   - Replace `src/services/persistence.ts` localStorage calls with API calls
   - Each API call includes the authenticated user's ID
   - The LearnerContext interface remains unchanged

3. **Add Database**
   - Create tables for: users, progress, bookmarks, history, preferences
   - Content tables remain shared across all users
   - Learner-specific tables reference user IDs

4. **Add Admin Features**
   - Course creation/editing interfaces
   - User management
   - Analytics and reporting

5. **Add Public Features**
   - Course discovery for unauthenticated users
   - Public profiles and certificates
   - Social features (reviews, discussions)

### Key Boundaries

The following separations make migration straightforward:

- **Content** (shared): `src/content/manifest.ts` → future database/API
- **Learner State** (per-user): `src/context/LearnerContext.tsx` → future user-scoped API
- **Persistence** (storage): `src/services/persistence.ts` → future backend service
- **Progress** (calculated): `src/services/progress.ts` → remains the same

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router v6** - Navigation
- **Lucide React** - Icons
- **localStorage** - Data persistence

## Design Principles

- Clean, professional educational interface
- Content-first design prioritizing readability
- Responsive across all screen sizes
- Accessible (keyboard navigation, ARIA labels, semantic HTML)
- Performance-focused (minimal dependencies, efficient rendering)
- Modular architecture for easy extension
