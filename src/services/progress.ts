import { Course, CourseProgress, LearningUnitId } from '../types';
import { getAllCourseProgress, isLessonCompleted } from './persistence';

/**
 * Progress Calculation Service
 * 
 * Calculates progress from actual lesson completion data.
 * Progress is never manually set - it's always derived from
 * the number of completed lessons vs total lessons.
 */

/** Count total lessons in a course */
export function countTotalLessons(course: Course): number {
  if (!course.modules) return 0;
  return course.modules.reduce((total, module) => {
    return total + (module.lessons?.length || 0);
  }, 0);
}

/** Count completed lessons in a course */
export function countCompletedLessons(course: Course): number {
  if (!course.modules) return 0;
  let completed = 0;
  for (const module of course.modules) {
    if (module.lessons) {
      for (const lesson of module.lessons) {
        if (isLessonCompleted(lesson.id)) {
          completed++;
        }
      }
    }
  }
  return completed;
}

/** Calculate course progress percentage */
export function calculateCoursePercentage(course: Course): number {
  const total = countTotalLessons(course);
  if (total === 0) return 0;
  const completed = countCompletedLessons(course);
  return Math.round((completed / total) * 100);
}

/** Get complete course progress for a course */
export function getFullCourseProgress(course: Course): CourseProgress {
  const total = countTotalLessons(course);
  const completedLessons: LearningUnitId[] = [];
  
  if (course.modules) {
    for (const module of course.modules) {
      if (module.lessons) {
        for (const lesson of module.lessons) {
          if (isLessonCompleted(lesson.id)) {
            completedLessons.push(lesson.id);
          }
        }
      }
    }
  }
  
  const storedProgress = getAllCourseProgress()[course.id];
  
  return {
    courseId: course.id,
    completedLessons,
    totalLessons: total,
    percentage: total > 0 ? Math.round((completedLessons.length / total) * 100) : 0,
    startedAt: storedProgress?.startedAt,
    lastAccessedAt: storedProgress?.lastAccessedAt,
    lastLessonId: storedProgress?.lastLessonId,
  };
}

/** Get all courses with progress */
export function getCoursesWithProgress(courses: Course[]): Array<{ course: Course; progress: CourseProgress }> {
  return courses.map(course => ({
    course,
    progress: getFullCourseProgress(course),
  }));
}

/** Get in-progress courses (started but not complete) */
export function getInProgressCourses(courses: Course[]): Array<{ course: Course; progress: CourseProgress }> {
  return getCoursesWithProgress(courses).filter(
    ({ progress }) => progress.percentage > 0 && progress.percentage < 100
  );
}

/** Get completed courses */
export function getCompletedCourses(courses: Course[]): Array<{ course: Course; progress: CourseProgress }> {
  return getCoursesWithProgress(courses).filter(
    ({ progress }) => progress.percentage === 100 && progress.totalLessons > 0
  );
}
