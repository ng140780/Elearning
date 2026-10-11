import { contentManifest } from '../content/manifest';
import type { Course, Module, Lesson, LearningUnitId } from '../types';

/**
 * Course Management Service
 * 
 * Provides CRUD operations for courses, modules, and lessons.
 * All changes are persisted to localStorage and the manifest.
 */

// In-memory copy of the manifest for editing
let editableManifest = JSON.parse(JSON.stringify(contentManifest));

/** Save the manifest to localStorage */
function saveManifest() {
  localStorage.setItem('learnhub_manifest', JSON.stringify(editableManifest));
}

/** Load the manifest from localStorage or use default */
function loadManifest() {
  const stored = localStorage.getItem('learnhub_manifest');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Merge with default manifest to ensure new courses are included
      editableManifest = {
        ...contentManifest,
        ...parsed,
        // Ensure we have all default courses plus any user-added ones
        courses: mergeCourses(contentManifest.courses || [], parsed.courses || []),
        programs: mergePrograms(contentManifest.programs || [], parsed.programs || []),
      };
    } catch {
      editableManifest = JSON.parse(JSON.stringify(contentManifest));
    }
  }
}

/** Merge default courses with user-added courses */
function mergeCourses(defaultCourses: Course[], userCourses: Course[]): Course[] {
  const merged = [...defaultCourses];
  const defaultIds = new Set(defaultCourses.map(c => c.id));
  
  // Add user courses that don't exist in defaults
  userCourses.forEach(userCourse => {
    if (!defaultIds.has(userCourse.id)) {
      merged.push(userCourse);
    }
  });
  
  return merged;
}

/** Merge default programs with user-added programs */
function mergePrograms(defaultPrograms: any[], userPrograms: any[]): any[] {
  const merged = [...defaultPrograms];
  const defaultIds = new Set(defaultPrograms.map(p => p.id));
  
  // Add user programs that don't exist in defaults
  userPrograms.forEach(userProgram => {
    if (!defaultIds.has(userProgram.id)) {
      merged.push(userProgram);
    }
  });
  
  return merged;
}

// Load on initialization
loadManifest();

/** Get all courses */
export function getCourses(): Course[] {
  return editableManifest.courses;
}

/** Get a course by ID */
export function getCourse(id: LearningUnitId): Course | undefined {
  return editableManifest.courses.find((c: Course) => c.id === id);
}

/** Add a new course */
export function addCourse(course: Omit<Course, 'id'>): Course {
  const newCourse: Course = {
    ...course,
    id: `course-${Date.now()}`,
  };
  editableManifest.courses.push(newCourse);
  saveManifest();
  return newCourse;
}

/** Update a course */
export function updateCourse(id: LearningUnitId, updates: Partial<Course>): Course | null {
  const index = editableManifest.courses.findIndex((c: Course) => c.id === id);
  if (index === -1) return null;
  
  editableManifest.courses[index] = { ...editableManifest.courses[index], ...updates };
  saveManifest();
  return editableManifest.courses[index];
}

/** Delete a course and all its content */
export function deleteCourse(id: LearningUnitId): boolean {
  const index = editableManifest.courses.findIndex((c: Course) => c.id === id);
  if (index === -1) return false;
  
  editableManifest.courses.splice(index, 1);
  saveManifest();
  return true;
}

/** Add a module to a course */
export function addModule(courseId: LearningUnitId, module: Omit<Module, 'id'>): Module | null {
  const course = getCourse(courseId);
  if (!course) return null;
  
  const newModule: Module = {
    ...module,
    id: `module-${Date.now()}`,
    lessons: module.lessons || [],
  };
  
  if (!course.modules) {
    course.modules = [];
  }
  course.modules.push(newModule);
  saveManifest();
  return newModule;
}

/** Update a module */
export function updateModule(courseId: LearningUnitId, moduleId: LearningUnitId, updates: Partial<Module>): Module | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
  if (moduleIndex === -1) return null;
  
  course.modules[moduleIndex] = { ...course.modules[moduleIndex], ...updates };
  saveManifest();
  return course.modules[moduleIndex];
}

/** Delete a module and all its lessons (CASCADE DELETE) */
export function deleteModule(courseId: LearningUnitId, moduleId: LearningUnitId): boolean {
  const course = getCourse(courseId);
  if (!course || !course.modules) return false;
  
  const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
  if (moduleIndex === -1) return false;
  
  // Get all lesson IDs in this module for cascade deletion
  const moduleToDelete = course.modules[moduleIndex];
  const lessonIds = moduleToDelete.lessons?.map(l => l.id) || [];
  
  // Remove the module
  course.modules.splice(moduleIndex, 1);
  
  // Also remove progress for all deleted lessons
  const progressData = localStorage.getItem('learnhub_learner_state');
  if (progressData) {
    try {
      const state = JSON.parse(progressData);
      // Remove lesson progress
      lessonIds.forEach(lessonId => {
        delete state.lessonProgress[lessonId];
      });
      // Update course progress
      if (state.progress[courseId]) {
        state.progress[courseId].completedLessons = state.progress[courseId].completedLessons.filter(
          (id: string) => !lessonIds.includes(id)
        );
        // Recalculate percentage
        const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
        state.progress[courseId].totalLessons = totalLessons;
        state.progress[courseId].percentage = totalLessons > 0 
          ? Math.round((state.progress[courseId].completedLessons.length / totalLessons) * 100)
          : 0;
      }
      localStorage.setItem('learnhub_learner_state', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to update progress after module deletion:', e);
    }
  }
  
  saveManifest();
  return true;
}

/** Add a lesson to a module */
export function addLesson(courseId: LearningUnitId, moduleId: LearningUnitId, lesson: Omit<Lesson, 'id'>): Lesson | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module) return null;
  
  const newLesson: Lesson = {
    ...lesson,
    id: `lesson-${Date.now()}`,
  };
  
  if (!module.lessons) {
    module.lessons = [];
  }
  module.lessons.push(newLesson);
  saveManifest();
  return newLesson;
}

/** Update a lesson */
export function updateLesson(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  updates: Partial<Lesson>
): Lesson | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return null;
  
  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) return null;
  
  module.lessons[lessonIndex] = { ...module.lessons[lessonIndex], ...updates };
  saveManifest();
  return module.lessons[lessonIndex];
}

/** Delete a lesson */
export function deleteLesson(courseId: LearningUnitId, moduleId: LearningUnitId, lessonId: LearningUnitId): boolean {
  const course = getCourse(courseId);
  if (!course || !course.modules) return false;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return false;
  
  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) return false;
  
  module.lessons.splice(lessonIndex, 1);
  
  // Remove progress for this lesson
  const progressData = localStorage.getItem('learnhub_learner_state');
  if (progressData) {
    try {
      const state = JSON.parse(progressData);
      delete state.lessonProgress[lessonId];
      // Update course progress
      if (state.progress[courseId]) {
        state.progress[courseId].completedLessons = state.progress[courseId].completedLessons.filter(
          (id: string) => id !== lessonId
        );
        const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
        state.progress[courseId].totalLessons = totalLessons;
        state.progress[courseId].percentage = totalLessons > 0
          ? Math.round((state.progress[courseId].completedLessons.length / totalLessons) * 100)
          : 0;
      }
      localStorage.setItem('learnhub_learner_state', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to update progress after lesson deletion:', e);
    }
  }
  
  saveManifest();
  return true;
}

/** Reset to default manifest */
export function resetToDefault() {
  editableManifest = JSON.parse(JSON.stringify(contentManifest));
  localStorage.removeItem('learnhub_manifest');
}

// ============================================================
// TOPIC MANAGEMENT
// ============================================================

import type { Topic, Resource, QuizQuestion, ExerciseDefinition } from '../types';

/** Add a topic to a module */
export function addTopic(courseId: LearningUnitId, moduleId: LearningUnitId, topic: Omit<Topic, 'id'>): Topic | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module) return null;
  
  const newTopic: Topic = {
    ...topic,
    id: `topic-${Date.now()}`,
    lessons: topic.lessons || [],
  };
  
  if (!module.topics) {
    module.topics = [];
  }
  module.topics.push(newTopic);
  saveManifest();
  return newTopic;
}

/** Update a topic */
export function updateTopic(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  topicId: LearningUnitId,
  updates: Partial<Topic>
): Topic | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.topics) return null;
  
  const topicIndex = module.topics.findIndex(t => t.id === topicId);
  if (topicIndex === -1) return null;
  
  module.topics[topicIndex] = { ...module.topics[topicIndex], ...updates };
  saveManifest();
  return module.topics[topicIndex];
}

/** Delete a topic and all its lessons (CASCADE DELETE) */
export function deleteTopic(courseId: LearningUnitId, moduleId: LearningUnitId, topicId: LearningUnitId): boolean {
  const course = getCourse(courseId);
  if (!course || !course.modules) return false;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.topics) return false;
  
  const topicIndex = module.topics.findIndex(t => t.id === topicId);
  if (topicIndex === -1) return false;
  
  // Get all lesson IDs for cascade deletion
  const topicToDelete = module.topics[topicIndex];
  const lessonIds = topicToDelete.lessons?.map(l => l.id) || [];
  
  module.topics.splice(topicIndex, 1);
  
  // Clean up progress
  const progressData = localStorage.getItem('learnhub_learner_state');
  if (progressData) {
    try {
      const state = JSON.parse(progressData);
      lessonIds.forEach(lessonId => {
        delete state.lessonProgress[lessonId];
      });
      if (state.progress[courseId]) {
        state.progress[courseId].completedLessons = state.progress[courseId].completedLessons.filter(
          (id: string) => !lessonIds.includes(id)
        );
        const totalLessons = course.modules?.reduce((sum, m) => {
          const moduleLessons = (m.lessons?.length || 0) + (m.topics?.reduce((s, t) => s + (t.lessons?.length || 0), 0) || 0);
          return sum + moduleLessons;
        }, 0) || 0;
        state.progress[courseId].totalLessons = totalLessons;
        state.progress[courseId].percentage = totalLessons > 0
          ? Math.round((state.progress[courseId].completedLessons.length / totalLessons) * 100)
          : 0;
      }
      localStorage.setItem('learnhub_learner_state', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to update progress after topic deletion:', e);
    }
  }
  
  saveManifest();
  return true;
}

/** Add a lesson to a topic */
export function addLessonToTopic(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  topicId: LearningUnitId,
  lesson: Omit<Lesson, 'id'>
): Lesson | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.topics) return null;
  
  const topic = module.topics.find(t => t.id === topicId);
  if (!topic) return null;
  
  const newLesson: Lesson = {
    ...lesson,
    id: `lesson-${Date.now()}`,
  };
  
  if (!topic.lessons) {
    topic.lessons = [];
  }
  topic.lessons.push(newLesson);
  saveManifest();
  return newLesson;
}

// ============================================================
// RESOURCE MANAGEMENT
// ============================================================

/** Add a resource to a lesson */
export function addResource(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  resource: Omit<Resource, 'id'>
): Resource | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return null;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson) return null;
  
  const newResource: Resource = {
    ...resource,
    id: `resource-${Date.now()}`,
  };
  
  if (!lesson.resources) {
    lesson.resources = [];
  }
  lesson.resources.push(newResource);
  saveManifest();
  return newResource;
}

/** Update a resource */
export function updateResource(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  resourceId: string,
  updates: Partial<Resource>
): Resource | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return null;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.resources) return null;
  
  const resourceIndex = lesson.resources.findIndex(r => r.id === resourceId);
  if (resourceIndex === -1) return null;
  
  lesson.resources[resourceIndex] = { ...lesson.resources[resourceIndex], ...updates };
  saveManifest();
  return lesson.resources[resourceIndex];
}

/** Delete a resource */
export function deleteResource(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  resourceId: string
): boolean {
  const course = getCourse(courseId);
  if (!course || !course.modules) return false;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return false;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.resources) return false;
  
  const resourceIndex = lesson.resources.findIndex(r => r.id === resourceId);
  if (resourceIndex === -1) return false;
  
  lesson.resources.splice(resourceIndex, 1);
  saveManifest();
  return true;
}

// ============================================================
// QUIZ MANAGEMENT
// ============================================================

/** Add a quiz question to a lesson */
export function addQuizQuestion(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  question: Omit<QuizQuestion, 'id'>
): QuizQuestion | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return null;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson) return null;
  
  const newQuestion: QuizQuestion = {
    ...question,
    id: `question-${Date.now()}`,
  };
  
  if (!lesson.quizQuestions) {
    lesson.quizQuestions = [];
  }
  lesson.quizQuestions.push(newQuestion);
  saveManifest();
  return newQuestion;
}

/** Update a quiz question */
export function updateQuizQuestion(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  questionId: string,
  updates: Partial<QuizQuestion>
): QuizQuestion | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return null;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.quizQuestions) return null;
  
  const questionIndex = lesson.quizQuestions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) return null;
  
  lesson.quizQuestions[questionIndex] = { ...lesson.quizQuestions[questionIndex], ...updates };
  saveManifest();
  return lesson.quizQuestions[questionIndex];
}

/** Delete a quiz question */
export function deleteQuizQuestion(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  questionId: string
): boolean {
  const course = getCourse(courseId);
  if (!course || !course.modules) return false;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return false;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.quizQuestions) return false;
  
  const questionIndex = lesson.quizQuestions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) return false;
  
  lesson.quizQuestions.splice(questionIndex, 1);
  saveManifest();
  return true;
}

// ============================================================
// EXERCISE MANAGEMENT
// ============================================================

/** Set or update exercise for a lesson */
export function setExercise(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId,
  exercise: ExerciseDefinition
): ExerciseDefinition | null {
  const course = getCourse(courseId);
  if (!course || !course.modules) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return null;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson) return null;
  
  lesson.exercise = exercise;
  saveManifest();
  return lesson.exercise;
}

/** Delete exercise from a lesson */
export function deleteExercise(
  courseId: LearningUnitId,
  moduleId: LearningUnitId,
  lessonId: LearningUnitId
): boolean {
  const course = getCourse(courseId);
  if (!course || !course.modules) return false;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module || !module.lessons) return false;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.exercise) return false;
  
  delete lesson.exercise;
  saveManifest();
  return true;
}
