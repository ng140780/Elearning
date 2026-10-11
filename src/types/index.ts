// ============================================================
// Core Type Definitions for the E-Learning Platform
// ============================================================
// These types define the flexible learning hierarchy that supports
// any structure depth (Course > Module > Topic > Lesson, etc.)

/** Unique identifier for any learning unit */
export type LearningUnitId = string;

/** Types of learning units in the hierarchy */
export type LearningUnitType = 
  | 'programme'
  | 'course'
  | 'module'
  | 'topic'
  | 'lesson'
  | 'learning-path';

/** Difficulty levels */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/** Content type for lessons */
export type LessonContentType = 
  | 'text'
  | 'video'
  | 'exercise'
  | 'quiz'
  | 'project'
  | 'reading'
  | 'external';

/** A learning unit in the flexible hierarchy */
export interface LearningUnit {
  id: LearningUnitId;
  type: LearningUnitType;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: string; // e.g., "2 hours", "30 minutes"
  difficulty?: DifficultyLevel;
  objectives?: string[];
  prerequisites?: LearningUnitId[];
  children?: LearningUnitId[]; // IDs of child units
  parentId?: LearningUnitId;
  metadata?: Record<string, unknown>;
  order: number;
  credits?: number; // For academic credits
  year?: number; // For year-based programs (1, 2, 3, 4)
  semester?: 'fall' | 'spring' | 'summer'; // For semester-based programs
}

/** Extended course information */
export interface Course extends LearningUnit {
  type: 'course';
  provider?: string;
  institution?: string;
  subject: string;
  subjects?: string[];
  estimatedHours?: number;
  totalLessons?: number;
  learningObjectives?: string[];
  prerequisites?: string[];
  modules?: Module[];
  credits?: number;
  year?: number;
  semester?: 'fall' | 'spring' | 'summer';
}

/** A program that structures multiple courses (e.g., BSc degree, certification) */
export interface Program {
  id: string;
  type: 'program';
  title: string;
  description: string;
  thumbnail?: string;
  level: 'certificate' | 'diploma' | 'bachelor' | 'master' | 'professional';
  totalCredits?: number;
  estimatedDuration?: string; // e.g., "3 years", "6 months"
  courses: ProgramCourse[]; // Structured list of courses in the program
  objectives?: string[];
  prerequisites?: string[];
  order: number;
}

/** A course within a program with additional context */
export interface ProgramCourse {
  courseId: string;
  year?: number;
  semester?: 'fall' | 'spring' | 'summer';
  credits: number;
  prerequisites?: string[]; // Course IDs that must be completed first
  order: number;
  required: boolean; // true = required, false = elective
}

/** Module within a course */
export interface Module extends LearningUnit {
  type: 'module';
  lessons?: Lesson[];
  topics?: Topic[];
}

/** Topic within a module */
export interface Topic extends LearningUnit {
  type: 'topic';
  lessons?: Lesson[];
}

/** A lesson - the atomic learning unit */
export interface Lesson extends LearningUnit {
  type: 'lesson';
  contentType: LessonContentType;
  content?: string; // Markdown or HTML content
  videoUrl?: string;
  externalUrl?: string;
  resources?: Resource[];
}

/** A learning resource */
export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'code' | 'video' | 'document';
  url: string;
  description?: string;
}

/** A learning path - structured sequence of courses */
export interface LearningPath {
  id: LearningUnitId;
  title: string;
  description: string;
  thumbnail?: string;
  courses: LearningUnitId[];
  estimatedHours?: number;
  difficulty?: DifficultyLevel;
  objectives?: string[];
  order: number;
}

/** Subject/category for filtering */
export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  courseCount?: number;
}

// ============================================================
// Learner State Types (separated from content)
// ============================================================

/** Progress for a single lesson */
export interface LessonProgress {
  lessonId: LearningUnitId;
  courseId: LearningUnitId;
  completed: boolean;
  completedAt?: string;
  lastAccessedAt?: string;
  timeSpent?: number; // seconds
}

/** Progress for a course */
export interface CourseProgress {
  courseId: LearningUnitId;
  completedLessons: LearningUnitId[];
  totalLessons: number;
  percentage: number;
  startedAt?: string;
  lastAccessedAt?: string;
  lastLessonId?: LearningUnitId;
}

/** A bookmark */
export interface Bookmark {
  id: string;
  type: 'course' | 'lesson' | 'learning-path';
  targetId: LearningUnitId;
  title: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
}

/** History entry */
export interface HistoryEntry {
  id: string;
  type: 'course' | 'lesson';
  targetId: LearningUnitId;
  courseId?: LearningUnitId;
  title: string;
  description?: string;
  thumbnail?: string;
  accessedAt: string;
}

/** Complete learner state */
export interface LearnerState {
  progress: Record<LearningUnitId, CourseProgress>;
  lessonProgress: Record<LearningUnitId, LessonProgress>;
  bookmarks: Bookmark[];
  history: HistoryEntry[];
  settings: LearnerSettings;
}

/** Learner preferences */
export interface LearnerSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  sidebarCollapsed: boolean;
}

// ============================================================
// Content Manifest
// ============================================================

export interface ContentManifest {
  version: string;
  courses: Course[];
  programs: Program[];
  learningPaths: LearningPath[];
  subjects: Subject[];
}
