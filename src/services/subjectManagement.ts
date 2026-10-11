import { contentManifest } from '../content/manifest';
import type { Subject } from '../types';

/**
 * Subject Management Service
 * 
 * Provides CRUD operations for subjects/categories.
 * All changes are persisted to localStorage.
 */

let editableSubjects: Subject[] = [];

function saveSubjects() {
  localStorage.setItem('learnhub_subjects', JSON.stringify(editableSubjects));
}

function loadSubjects() {
  const stored = localStorage.getItem('learnhub_subjects');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const defaultIds = new Set(contentManifest.subjects.map(s => s.id));
      editableSubjects = [...contentManifest.subjects];
      parsed.forEach((subject: Subject) => {
        if (!defaultIds.has(subject.id)) {
          editableSubjects.push(subject);
        }
      });
    } catch {
      editableSubjects = [...contentManifest.subjects];
    }
  } else {
    editableSubjects = [...contentManifest.subjects];
  }
}

loadSubjects();

/** Get all subjects */
export function getSubjects(): Subject[] {
  return editableSubjects;
}

/** Get a subject by ID */
export function getSubject(id: string): Subject | undefined {
  return editableSubjects.find(s => s.id === id);
}

/** Add a new subject */
export function addSubject(subject: Omit<Subject, 'courseCount'>): Subject {
  const newSubject: Subject = {
    ...subject,
    courseCount: 0,
  };
  editableSubjects.push(newSubject);
  saveSubjects();
  return newSubject;
}

/** Update a subject */
export function updateSubject(id: string, updates: Partial<Subject>): Subject | null {
  const index = editableSubjects.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  editableSubjects[index] = { ...editableSubjects[index], ...updates };
  saveSubjects();
  return editableSubjects[index];
}

/** Delete a subject */
export function deleteSubject(id: string): boolean {
  const index = editableSubjects.findIndex(s => s.id === id);
  if (index === -1) return false;
  
  editableSubjects.splice(index, 1);
  saveSubjects();
  return true;
}

/** Reset to default subjects */
export function resetSubjectsToDefault() {
  editableSubjects = [...contentManifest.subjects];
  localStorage.removeItem('learnhub_subjects');
}
