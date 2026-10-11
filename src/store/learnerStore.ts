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

  clearData() {
    persistence.clearAllData();
    resetManifest();
    currentState = { ...DEFAULT_STATE };
    notify();
  },
};
