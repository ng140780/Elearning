import { contentManifest } from '../content/manifest';
import { Course, LearningPath, Subject, LearningUnitId, Lesson, Module, Program } from '../types';
import { validateContent } from './validation';
import { getCourses as getEditableCourses, getCourse as getEditableCourse } from './courseManagement';

// Validate content on load
const validationResult = validateContent();
if (!validationResult.valid) {
  console.error('Content validation failed:', validationResult.errors);
}
if (validationResult.warnings.length > 0) {
  console.warn('Content warnings:', validationResult.warnings);
}

/**
 * Content Service
 * 
 * Provides a clean interface for accessing learning content.
 * Hides the implementation details of how content is stored and discovered.
 * 
 * Future migration:
 * - Replace direct imports with API calls
 * - Add content validation
 * - Support lazy loading of content
 */

/** Get all courses */
export function getAllCourses(): Course[] {
  // Use editable courses (from localStorage or default)
  return [...getEditableCourses()].sort((a, b) => a.order - b.order);
}

/** Get a course by ID */
export function getCourseById(id: LearningUnitId): Course | undefined {
  return getEditableCourse(id);
}

/** Get courses by subject */
export function getCoursesBySubject(subjectId: string): Course[] {
  return getEditableCourses().filter(
    (c: Course) => c.subject === subjectId || c.subjects?.includes(subjectId)
  );
}

/** Get courses by difficulty */
export function getCoursesByDifficulty(difficulty: string): Course[] {
  return getEditableCourses().filter((c: Course) => c.difficulty === difficulty);
}

/** Search courses by title or description */
export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllCourses();
  return getEditableCourses().filter((c: Course) =>
    c.title.toLowerCase().includes(q) ||
    c.description?.toLowerCase().includes(q) ||
    c.subject.toLowerCase().includes(q) ||
    c.provider?.toLowerCase().includes(q)
  );
}

/** Get all subjects */
export function getAllSubjects(): Subject[] {
  const subjects = contentManifest.subjects;
  return subjects.map(s => ({
    ...s,
    courseCount: getEditableCourses().filter(
      (c: Course) => c.subject === s.id || c.subjects?.includes(s.id)
    ).length,
  }));
}

/** Get a subject by ID */
export function getSubjectById(id: string): Subject | undefined {
  return getAllSubjects().find(s => s.id === id);
}

/** Get all learning paths */
export function getAllLearningPaths(): LearningPath[] {
  return [...contentManifest.learningPaths].sort((a, b) => a.order - b.order);
}

/** Get a learning path by ID */
export function getLearningPathById(id: LearningUnitId): LearningPath | undefined {
  return contentManifest.learningPaths.find(lp => lp.id === id);
}

/** Get all lessons for a course (flat list) */
export function getAllLessonsForCourse(courseId: LearningUnitId): Lesson[] {
  const course = getCourseById(courseId);
  if (!course?.modules) return [];
  
  const lessons: Lesson[] = [];
  for (const module of course.modules) {
    if (module.lessons) {
      lessons.push(...module.lessons);
    }
  }
  return lessons;
}

/** Get a specific lesson with its context */
export function getLessonWithContext(courseId: LearningUnitId, lessonId: LearningUnitId): {
  lesson: Lesson;
  module: Module;
  course: Course;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  lessonIndex: number;
  totalLessons: number;
} | null {
  const course = getCourseById(courseId);
  if (!course) return null;
  
  const allLessons = getAllLessonsForCourse(courseId);
  const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) return null;
  
  const lesson = allLessons[lessonIndex];
  const module = course.modules!.find(m => m.lessons?.some(l => l.id === lessonId))!;
  
  return {
    lesson,
    module,
    course,
    previousLesson: lessonIndex > 0 ? allLessons[lessonIndex - 1] : null,
    nextLesson: lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null,
    lessonIndex,
    totalLessons: allLessons.length,
  };
}

/** Get unique subjects from courses */
export function getUniqueSubjects(): string[] {
  const subjects = new Set<string>();
  contentManifest.courses.forEach(c => {
    subjects.add(c.subject);
    c.subjects?.forEach(s => subjects.add(s));
  });
  return Array.from(subjects);
}

/** Get unique difficulty levels from courses */
export function getUniqueDifficulties(): string[] {
  const difficulties = new Set<string>();
  contentManifest.courses.forEach(c => {
    if (c.difficulty) difficulties.add(c.difficulty);
  });
  return Array.from(difficulties);
}

/** Get all programs */
export function getAllPrograms(): Program[] {
  return [...contentManifest.programs].sort((a, b) => a.order - b.order);
}

/** Get a program by ID */
export function getProgramById(id: string): Program | undefined {
  return contentManifest.programs.find(p => p.id === id);
}

/** Get courses in a program with full course details */
export function getProgramCourses(programId: string): Array<{ course: Course; programCourse: Program['courses'][0] }> {
  const program = getProgramById(programId);
  if (!program) return [];
  
  return program.courses
    .sort((a, b) => a.order - b.order)
    .map(pc => {
      const course = getCourseById(pc.courseId);
      return course ? { course, programCourse: pc } : null;
    })
    .filter((item): item is { course: Course; programCourse: Program['courses'][0] } => item !== null);
}

/** Calculate program progress */
export function getProgramProgress(programId: string): { completedCourses: number; totalCourses: number; completedCredits: number; totalCredits: number; percentage: number } {
  const programCourses = getProgramCourses(programId);
  const totalCourses = programCourses.length;
  const totalCredits = programCourses.reduce((sum, pc) => sum + pc.programCourse.credits, 0);
  
  let completedCourses = 0;
  let completedCredits = 0;
  
  programCourses.forEach(({ course, programCourse }) => {
    const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
    if (totalLessons === 0) return;
    
    const completedLessons = course.modules?.reduce((sum, m) => 
      sum + (m.lessons?.filter(l => {
        const progress = JSON.parse(localStorage.getItem('learnhub_learner_state') || '{}').lessonProgress?.[l.id];
        return progress?.completed;
      }).length || 0), 0) || 0;
    
    if (completedLessons === totalLessons) {
      completedCourses++;
      completedCredits += programCourse.credits;
    }
  });
  
  return {
    completedCourses,
    totalCourses,
    completedCredits,
    totalCredits,
    percentage: totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0,
  };
}
