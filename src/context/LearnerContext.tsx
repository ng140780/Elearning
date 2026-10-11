import { useState, useEffect, ReactNode } from 'react';
import type { LearnerState, LearnerSettings, Bookmark, HistoryEntry, LearningUnitId } from '../types';
import { learnerStore } from '../store/learnerStore';

// ============================================================
// Learner Context - React bindings for the learner store
// ============================================================

export interface LearnerAPI {
  state: LearnerState;
  updateSettings: (settings: Partial<LearnerSettings>) => void;
  addToHistory: (entry: Omit<HistoryEntry, 'id' | 'accessedAt'>) => void;
  toggleBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  markLessonComplete: (lessonId: LearningUnitId, courseId: LearningUnitId) => void;
  markLessonIncomplete: (lessonId: LearningUnitId, courseId: LearningUnitId) => void;
  recordAccess: (lessonId: LearningUnitId, courseId: LearningUnitId) => void;
  isBookmarked: (targetId: LearningUnitId, type: 'course' | 'lesson' | 'learning-path') => boolean;
  isLessonCompleted: (lessonId: LearningUnitId) => boolean;
  clearData: () => void;
}

// Provider component - renders children without using hooks
export function LearnerProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Hook to access learner state with auto-updates
export function useLearner(): LearnerAPI {
  const [state, setState] = useState<LearnerState>(() => learnerStore.getState());

  useEffect(() => {
    const unsubscribe = learnerStore.subscribe((newState) => {
      setState({ ...newState });
    });
    return unsubscribe;
  }, []);

  return {
    state,
    updateSettings: (settings) => learnerStore.updateSettings(settings),
    addToHistory: (entry) => learnerStore.addToHistory(entry),
    toggleBookmark: (bookmark) => learnerStore.toggleBookmark(bookmark),
    markLessonComplete: (lessonId, courseId) => learnerStore.markLessonComplete(lessonId, courseId),
    markLessonIncomplete: (lessonId, courseId) => learnerStore.markLessonIncomplete(lessonId, courseId),
    recordAccess: (lessonId, courseId) => learnerStore.recordAccess(lessonId, courseId),
    isBookmarked: (targetId, type) => learnerStore.isBookmarked(targetId, type),
    isLessonCompleted: (lessonId) => learnerStore.isLessonCompleted(lessonId),
    clearData: () => learnerStore.clearData(),
  };
}
