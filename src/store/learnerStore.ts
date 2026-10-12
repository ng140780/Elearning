import type { LearnerState, LearnerSettings, Bookmark, HistoryEntry, LearningUnitId } from '../types';
import * as persistence from '../services/persistence';
import { resetToDefault as resetManifest } from '../services/courseManagement';

// ============================================================
// Learner Store - Module-level state management
// ============================================================
// Uses a pub/sub pattern to avoid React context issues
// in environments with multiple React instances.

const DEFAULT_STATE: LearnerState = {
  progress: {},
  lessonProgress: {},
  bookmarks: [],
  history: [],
  settings: { theme: 'light', fontSize: 'medium', sidebarCollapsed: false },
  enrolledCourses: [],
};

type Listener = (state: LearnerState) => void;

let currentState: LearnerState = { ...DEFAULT_STATE };
const listeners: Set<Listener> = new Set();

// Load initial state
try {
  currentState = persistence.loadLearnerState();
} catch {
  currentState = { ...DEFAULT_STATE };
}

function notify() {
  listeners.forEach(listener => listener(currentState));
}

function setState(updater: (prev: LearnerState) => LearnerState) {
  currentState = updater(currentState);
  notify();
}

// Public API
export const learnerStore = {
  getState(): LearnerState {
    return currentState;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  updateSettings(settings: Partial<LearnerSettings>) {
    persistence.updateSettings(settings);
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  },

  addToHistory(entry: Omit<HistoryEntry, 'id' | 'accessedAt'>) {
    persistence.addToHistory(entry);
    setState(prev => {
      const newEntry: HistoryEntry = {
        ...entry,
        id: `${entry.targetId}-${Date.now()}`,
        accessedAt: new Date().toISOString(),
      };
      const filtered = prev.history.filter(
        h => !(h.targetId === entry.targetId && h.type === entry.type)
      );
      return { ...prev, history: [newEntry, ...filtered].slice(0, 50) };
    });
  },

  toggleBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>) {
    const bookmarks = persistence.toggleBookmark(bookmark);
    setState(prev => ({ ...prev, bookmarks }));
  },

  markLessonComplete(lessonId: LearningUnitId, courseId: LearningUnitId) {
    persistence.setLessonCompletion(lessonId, courseId, true);
    setState(prev => ({
      ...prev,
      lessonProgress: {
        ...prev.lessonProgress,
        [lessonId]: {
          lessonId,
          courseId,
          completed: true,
          completedAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
        },
      },
    }));
  },

  markLessonIncomplete(lessonId: LearningUnitId, courseId: LearningUnitId) {
    persistence.setLessonCompletion(lessonId, courseId, false);
    setState(prev => ({
      ...prev,
      lessonProgress: {
        ...prev.lessonProgress,
        [lessonId]: {
          lessonId,
          courseId,
          completed: false,
          completedAt: undefined,
          lastAccessedAt: new Date().toISOString(),
        },
      },
    }));
  },

  recordAccess(lessonId: LearningUnitId, courseId: LearningUnitId) {
    persistence.recordLessonAccess(lessonId, courseId);
  },

  isBookmarked(targetId: LearningUnitId, type: 'course' | 'lesson' | 'learning-path'): boolean {
    return currentState.bookmarks.some(b => b.targetId === targetId && b.type === type);
  },

  isLessonCompleted(lessonId: LearningUnitId): boolean {
    return currentState.lessonProgress[lessonId]?.completed || false;
  },

  removeCourseProgress(courseId: LearningUnitId) {
    setState(prev => {
      // Remove all lesson progress for this course
      const newLessonProgress = { ...prev.lessonProgress };
      Object.keys(newLessonProgress).forEach(lessonId => {
        if (newLessonProgress[lessonId].courseId === courseId) {
          delete newLessonProgress[lessonId];
        }
      });

      // Remove course from progress
      const newProgress = { ...prev.progress };
      delete newProgress[courseId];

      // Remove from history
      const newHistory = prev.history.filter(h => h.courseId !== courseId);

      // Remove bookmark if exists
      const newBookmarks = prev.bookmarks.filter(b => b.targetId !== courseId);

      // Remove from enrolled courses
      const newEnrolledCourses = prev.enrolledCourses.filter(id => id !== courseId);

      // Persist changes
      persistence.saveLearnerState({
        ...prev,
        lessonProgress: newLessonProgress,
        progress: newProgress,
        history: newHistory,
        bookmarks: newBookmarks,
        enrolledCourses: newEnrolledCourses,
      });

      return {
        ...prev,
        lessonProgress: newLessonProgress,
        progress: newProgress,
        history: newHistory,
        bookmarks: newBookmarks,
        enrolledCourses: newEnrolledCourses,
      };
    });
  },

  enrollCourse(courseId: string) {
    setState(prev => {
      if (prev.enrolledCourses.includes(courseId)) {
        return prev; // Already enrolled
      }

      const newEnrolledCourses = [...prev.enrolledCourses, courseId];

      persistence.saveLearnerState({
        ...prev,
        enrolledCourses: newEnrolledCourses,
      });

      return {
        ...prev,
        enrolledCourses: newEnrolledCourses,
      };
    });
  },

  unenrollCourse(courseId: string) {
    setState(prev => {
      if (!prev.enrolledCourses.includes(courseId)) {
        return prev; // Not enrolled
      }

      const newEnrolledCourses = prev.enrolledCourses.filter(id => id !== courseId);

      // Also remove all progress for this course
      const newLessonProgress = { ...prev.lessonProgress };
      Object.keys(newLessonProgress).forEach(lessonId => {
        if (newLessonProgress[lessonId].courseId === courseId) {
          delete newLessonProgress[lessonId];
        }
      });

      const newProgress = { ...prev.progress };
      delete newProgress[courseId];

      const newHistory = prev.history.filter(h => h.courseId !== courseId);
      const newBookmarks = prev.bookmarks.filter(b => b.targetId !== courseId);

      persistence.saveLearnerState({
        ...prev,
        enrolledCourses: newEnrolledCourses,
        lessonProgress: newLessonProgress,
        progress: newProgress,
        history: newHistory,
        bookmarks: newBookmarks,
      });

      return {
        ...prev,
        enrolledCourses: newEnrolledCourses,
        lessonProgress: newLessonProgress,
        progress: newProgress,
        history: newHistory,
        bookmarks: newBookmarks,
      };
    });
  },

  isEnrolled(courseId: string): boolean {
    return currentState.enrolledCourses.includes(courseId);
  },

  clearData() {
    persistence.clearAllData();
    resetManifest();
    currentState = { ...DEFAULT_STATE };
    notify();
  },
};
