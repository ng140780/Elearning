import { LearnerState, LearnerSettings, Bookmark, HistoryEntry, CourseProgress, LessonProgress, LearningUnitId } from '../types';

/**
 * Persistence Service
 * 
 * Abstracts all storage operations behind a clean interface.
 * Currently uses localStorage, but can be replaced with:
 * - A backend API service
 * - IndexedDB for larger datasets
 * - A database-backed service for multi-user support
 * 
 * Migration path to multi-user:
 * 1. Replace localStorage calls with API calls
 * 2. Add user authentication context
 * 3. Scope all operations to the authenticated user
 * 4. The LearnerContext will not need to change
 */

const STORAGE_KEY = 'learnhub_learner_state';

const DEFAULT_SETTINGS: LearnerSettings = {
  theme: 'light',
  fontSize: 'medium',
  sidebarCollapsed: false,
};

const DEFAULT_STATE: LearnerState = {
  progress: {},
  lessonProgress: {},
  bookmarks: [],
  history: [],
  settings: DEFAULT_SETTINGS,
  enrolledCourses: [],
};

/** Load the complete learner state from storage */
export function loadLearnerState(): LearnerState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(stored);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

/** Save the complete learner state to storage */
export function saveLearnerState(state: LearnerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save learner state:', e);
  }
}

/** Update settings */
export function updateSettings(settings: Partial<LearnerSettings>): LearnerSettings {
  const state = loadLearnerState();
  const newSettings = { ...state.settings, ...settings };
  state.settings = newSettings;
  saveLearnerState(state);
  return newSettings;
}

/** Get settings */
export function getSettings(): LearnerSettings {
  return loadLearnerState().settings;
}

/** Record a lesson access in history */
export function addToHistory(entry: Omit<HistoryEntry, 'id' | 'accessedAt'>): void {
  const state = loadLearnerState();
  const newEntry: HistoryEntry = {
    ...entry,
    id: `${entry.targetId}-${Date.now()}`,
    accessedAt: new Date().toISOString(),
  };
  
  // Remove duplicates for the same target
  state.history = state.history.filter(
    h => !(h.targetId === entry.targetId && h.type === entry.type)
  );
  
  // Add to front, keep max 50 entries
  state.history = [newEntry, ...state.history].slice(0, 50);
  saveLearnerState(state);
}

/** Get learning history */
export function getHistory(): HistoryEntry[] {
  return loadLearnerState().history;
}

/** Add or remove a bookmark */
export function toggleBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark[] {
  const state = loadLearnerState();
  const existingIndex = state.bookmarks.findIndex(b => b.targetId === bookmark.targetId && b.type === bookmark.type);
  
  if (existingIndex >= 0) {
    state.bookmarks.splice(existingIndex, 1);
  } else {
    state.bookmarks.push({
      ...bookmark,
      id: `bm-${bookmark.targetId}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
  }
  
  saveLearnerState(state);
  return state.bookmarks;
}

/** Get all bookmarks */
export function getBookmarks(): Bookmark[] {
  return loadLearnerState().bookmarks;
}

/** Check if an item is bookmarked */
export function isBookmarked(targetId: LearningUnitId, type: 'course' | 'lesson' | 'learning-path'): boolean {
  const bookmarks = loadLearnerState().bookmarks;
  return bookmarks.some(b => b.targetId === targetId && b.type === type);
}

/** Update course progress */
export function updateCourseProgress(courseId: LearningUnitId, progress: Partial<CourseProgress>): CourseProgress {
  const state = loadLearnerState();
  const existing = state.progress[courseId] || {
    courseId,
    completedLessons: [],
    totalLessons: 0,
    percentage: 0,
  };
  
  state.progress[courseId] = { ...existing, ...progress };
  saveLearnerState(state);
  return state.progress[courseId];
}

/** Get course progress */
export function getCourseProgress(courseId: LearningUnitId): CourseProgress | null {
  return loadLearnerState().progress[courseId] || null;
}

/** Get all course progress */
export function getAllCourseProgress(): Record<LearningUnitId, CourseProgress> {
  return loadLearnerState().progress;
}

/** Mark a lesson as complete or incomplete */
export function setLessonCompletion(
  lessonId: LearningUnitId,
  courseId: LearningUnitId,
  completed: boolean
): LessonProgress {
  const state = loadLearnerState();
  const progress: LessonProgress = {
    lessonId,
    courseId,
    completed,
    completedAt: completed ? new Date().toISOString() : undefined,
    lastAccessedAt: new Date().toISOString(),
  };
  
  state.lessonProgress[lessonId] = progress;
  saveLearnerState(state);
  return progress;
}

/** Get lesson progress */
export function getLessonProgress(lessonId: LearningUnitId): LessonProgress | null {
  return loadLearnerState().lessonProgress[lessonId] || null;
}

/** Check if a lesson is completed */
export function isLessonCompleted(lessonId: LearningUnitId): boolean {
  const progress = getLessonProgress(lessonId);
  return progress?.completed || false;
}

/** Record lesson access */
export function recordLessonAccess(lessonId: LearningUnitId, courseId: LearningUnitId): void {
  const state = loadLearnerState();
  const existing = state.lessonProgress[lessonId];
  
  state.lessonProgress[lessonId] = {
    lessonId,
    courseId,
    completed: existing?.completed || false,
    completedAt: existing?.completedAt,
    lastAccessedAt: new Date().toISOString(),
    timeSpent: existing?.timeSpent,
  };
  
  // Update course last accessed
  if (state.progress[courseId]) {
    state.progress[courseId].lastAccessedAt = new Date().toISOString();
    state.progress[courseId].lastLessonId = lessonId;
  }
  
  saveLearnerState(state);
}

/** Clear all learner data (for testing/reset) */
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
