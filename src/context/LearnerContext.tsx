import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react';
import { LearnerState, LearnerSettings, Bookmark, HistoryEntry, LearningUnitId } from '../types';
import * as persistence from '../services/persistence';

// ============================================================
// Learner Context - Manages all learner-specific state
// ============================================================
// This context is separate from content data, enabling future
// multi-user support by simply replacing the persistence layer.

type LearnerAction =
  | { type: 'SET_STATE'; payload: LearnerState }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<LearnerSettings> }
  | { type: 'ADD_HISTORY'; payload: Omit<HistoryEntry, 'id' | 'accessedAt'> }
  | { type: 'TOGGLE_BOOKMARK'; payload: Omit<Bookmark, 'id' | 'createdAt'> }
  | { type: 'MARK_LESSON_COMPLETE'; payload: { lessonId: LearningUnitId; courseId: LearningUnitId } }
  | { type: 'MARK_LESSON_INCOMPLETE'; payload: { lessonId: LearningUnitId; courseId: LearningUnitId } }
  | { type: 'RECORD_ACCESS'; payload: { lessonId: LearningUnitId; courseId: LearningUnitId } }
  | { type: 'CLEAR_DATA' };

interface LearnerContextValue {
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

const LearnerContext = createContext<LearnerContextValue | null>(null);

function learnerReducer(state: LearnerState, action: LearnerAction): LearnerState {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    
    case 'UPDATE_SETTINGS': {
      const newSettings = { ...state.settings, ...action.payload };
      persistence.updateSettings(action.payload);
      return { ...state, settings: newSettings };
    }
    
    case 'ADD_HISTORY': {
      const newEntry: HistoryEntry = {
        ...action.payload,
        id: `${action.payload.targetId}-${Date.now()}`,
        accessedAt: new Date().toISOString(),
      };
      const filtered = state.history.filter(
        h => !(h.targetId === action.payload.targetId && h.type === action.payload.type)
      );
      const newHistory = [newEntry, ...filtered].slice(0, 50);
      persistence.addToHistory(action.payload);
      return { ...state, history: newHistory };
    }
    
    case 'TOGGLE_BOOKMARK': {
      const existingIndex = state.bookmarks.findIndex(
        b => b.targetId === action.payload.targetId && b.type === action.payload.type
      );
      let newBookmarks: Bookmark[];
      if (existingIndex >= 0) {
        newBookmarks = state.bookmarks.filter((_, i) => i !== existingIndex);
      } else {
        newBookmarks = [...state.bookmarks, {
          ...action.payload,
          id: `bm-${action.payload.targetId}-${Date.now()}`,
          createdAt: new Date().toISOString(),
        }];
      }
      persistence.toggleBookmark(action.payload);
      return { ...state, bookmarks: newBookmarks };
    }
    
    case 'MARK_LESSON_COMPLETE': {
      const { lessonId, courseId } = action.payload;
      persistence.setLessonCompletion(lessonId, courseId, true);
      const newLessonProgress = {
        ...state.lessonProgress,
        [lessonId]: {
          ...state.lessonProgress[lessonId],
          lessonId,
          courseId,
          completed: true,
          completedAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
        },
      };
      return { ...state, lessonProgress: newLessonProgress };
    }
    
    case 'MARK_LESSON_INCOMPLETE': {
      const { lessonId, courseId } = action.payload;
      persistence.setLessonCompletion(lessonId, courseId, false);
      const newLessonProgress = {
        ...state.lessonProgress,
        [lessonId]: {
          ...state.lessonProgress[lessonId],
          lessonId,
          courseId,
          completed: false,
          completedAt: undefined,
          lastAccessedAt: new Date().toISOString(),
        },
      };
      return { ...state, lessonProgress: newLessonProgress };
    }
    
    case 'RECORD_ACCESS': {
      const { lessonId, courseId } = action.payload;
      persistence.recordLessonAccess(lessonId, courseId);
      return state;
    }
    
    case 'CLEAR_DATA':
      persistence.clearAllData();
      return {
        progress: {},
        lessonProgress: {},
        bookmarks: [],
        history: [],
        settings: { theme: 'light', fontSize: 'medium', sidebarCollapsed: false },
      };
    
    default:
      return state;
  }
}

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(learnerReducer, {
    progress: {},
    lessonProgress: {},
    bookmarks: [],
    history: [],
    settings: { theme: 'light', fontSize: 'medium', sidebarCollapsed: false },
  });

  // Load state on mount
  useEffect(() => {
    const savedState = persistence.loadLearnerState();
    dispatch({ type: 'SET_STATE', payload: savedState });
  }, []);

  const updateSettings = useCallback((settings: Partial<LearnerSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

  const addToHistory = useCallback((entry: Omit<HistoryEntry, 'id' | 'accessedAt'>) => {
    dispatch({ type: 'ADD_HISTORY', payload: entry });
  }, []);

  const toggleBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: bookmark });
  }, []);

  const markLessonComplete = useCallback((lessonId: LearningUnitId, courseId: LearningUnitId) => {
    dispatch({ type: 'MARK_LESSON_COMPLETE', payload: { lessonId, courseId } });
  }, []);

  const markLessonIncomplete = useCallback((lessonId: LearningUnitId, courseId: LearningUnitId) => {
    dispatch({ type: 'MARK_LESSON_INCOMPLETE', payload: { lessonId, courseId } });
  }, []);

  const recordAccess = useCallback((lessonId: LearningUnitId, courseId: LearningUnitId) => {
    dispatch({ type: 'RECORD_ACCESS', payload: { lessonId, courseId } });
  }, []);

  const isBookmarked = useCallback((targetId: LearningUnitId, type: 'course' | 'lesson' | 'learning-path') => {
    return state.bookmarks.some(b => b.targetId === targetId && b.type === type);
  }, [state.bookmarks]);

  const isLessonCompleted = useCallback((lessonId: LearningUnitId) => {
    return state.lessonProgress[lessonId]?.completed || false;
  }, [state.lessonProgress]);

  const clearData = useCallback(() => {
    dispatch({ type: 'CLEAR_DATA' });
  }, []);

  return (
    <LearnerContext.Provider value={{
      state,
      updateSettings,
      addToHistory,
      toggleBookmark,
      markLessonComplete,
      markLessonIncomplete,
      recordAccess,
      isBookmarked,
      isLessonCompleted,
      clearData,
    }}>
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error('useLearner must be used within a LearnerProvider');
  }
  return context;
}
