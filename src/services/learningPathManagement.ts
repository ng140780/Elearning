import { contentManifest } from '../content/manifest';
import type { LearningPath } from '../types';

/**
 * Learning Path Management Service
 * 
 * Provides CRUD operations for learning paths.
 * All changes are persisted to localStorage.
 */

// In-memory copy for editing
let editablePaths: LearningPath[] = [];

function savePaths() {
  localStorage.setItem('learnhub_learning_paths', JSON.stringify(editablePaths));
}

function loadPaths() {
  const stored = localStorage.getItem('learnhub_learning_paths');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Merge with defaults
      const defaultIds = new Set(contentManifest.learningPaths.map(lp => lp.id));
      editablePaths = [...contentManifest.learningPaths];
      parsed.forEach((path: LearningPath) => {
        if (!defaultIds.has(path.id)) {
          editablePaths.push(path);
        }
      });
    } catch {
      editablePaths = [...contentManifest.learningPaths];
    }
  } else {
    editablePaths = [...contentManifest.learningPaths];
  }
}

loadPaths();

/** Get all learning paths */
export function getLearningPaths(): LearningPath[] {
  return editablePaths;
}

/** Get a learning path by ID */
export function getLearningPath(id: string): LearningPath | undefined {
  return editablePaths.find(lp => lp.id === id);
}

/** Add a new learning path */
export function addLearningPath(path: Omit<LearningPath, 'id'>): LearningPath {
  const newPath: LearningPath = {
    ...path,
    id: `learning-path-${Date.now()}`,
  };
  editablePaths.push(newPath);
  savePaths();
  return newPath;
}

/** Update a learning path */
export function updateLearningPath(id: string, updates: Partial<LearningPath>): LearningPath | null {
  const index = editablePaths.findIndex(lp => lp.id === id);
  if (index === -1) return null;
  
  editablePaths[index] = { ...editablePaths[index], ...updates };
  savePaths();
  return editablePaths[index];
}

/** Delete a learning path */
export function deleteLearningPath(id: string): boolean {
  const index = editablePaths.findIndex(lp => lp.id === id);
  if (index === -1) return false;
  
  editablePaths.splice(index, 1);
  savePaths();
  return true;
}

/** Add a course to a learning path */
export function addCourseToPath(pathId: string, courseId: string): boolean {
  const path = getLearningPath(pathId);
  if (!path) return false;
  
  if (!path.courses.includes(courseId)) {
    path.courses.push(courseId);
    savePaths();
  }
  return true;
}

/** Remove a course from a learning path */
export function removeCourseFromPath(pathId: string, courseId: string): boolean {
  const path = getLearningPath(pathId);
  if (!path) return false;
  
  const index = path.courses.indexOf(courseId);
  if (index === -1) return false;
  
  path.courses.splice(index, 1);
  savePaths();
  return true;
}

/** Reset to default learning paths */
export function resetLearningPathsToDefault() {
  editablePaths = [...contentManifest.learningPaths];
  localStorage.removeItem('learnhub_learning_paths');
}
