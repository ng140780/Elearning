import { contentManifest } from '../content/manifest';
import type { Program, ProgramCourse } from '../types';

/**
 * Program Management Service
 * 
 * Provides CRUD operations for programs.
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
      editableManifest = JSON.parse(stored);
      // Ensure programs array exists
      if (!editableManifest.programs) {
        editableManifest.programs = [];
      }
    } catch {
      editableManifest = JSON.parse(JSON.stringify(contentManifest));
    }
  }
}

// Load on initialization
loadManifest();

/** Get all programs */
export function getPrograms(): Program[] {
  return editableManifest.programs || [];
}

/** Get a program by ID */
export function getProgram(id: string): Program | undefined {
  return (editableManifest.programs || []).find((p: Program) => p.id === id);
}

/** Add a new program */
export function addProgram(program: Omit<Program, 'id'>): Program {
  const newProgram: Program = {
    ...program,
    id: `program-${Date.now()}`,
  };
  if (!editableManifest.programs) {
    editableManifest.programs = [];
  }
  editableManifest.programs.push(newProgram);
  saveManifest();
  return newProgram;
}

/** Update a program */
export function updateProgram(id: string, updates: Partial<Program>): Program | null {
  const index = (editableManifest.programs || []).findIndex((p: Program) => p.id === id);
  if (index === -1) return null;
  
  editableManifest.programs[index] = { ...editableManifest.programs[index], ...updates };
  saveManifest();
  return editableManifest.programs[index];
}

/** Delete a program */
export function deleteProgram(id: string): boolean {
  const index = (editableManifest.programs || []).findIndex((p: Program) => p.id === id);
  if (index === -1) return false;
  
  editableManifest.programs.splice(index, 1);
  saveManifest();
  return true;
}

/** Add a course to a program */
export function addCourseToProgram(programId: string, programCourse: Omit<ProgramCourse, 'order'>): ProgramCourse | null {
  const program = getProgram(programId);
  if (!program) return null;
  
  const newProgramCourse: ProgramCourse = {
    ...programCourse,
    order: (program.courses?.length || 0) + 1,
  };
  
  if (!program.courses) {
    program.courses = [];
  }
  program.courses.push(newProgramCourse);
  saveManifest();
  return newProgramCourse;
}

/** Remove a course from a program */
export function removeCourseFromProgram(programId: string, courseId: string): boolean {
  const program = getProgram(programId);
  if (!program || !program.courses) return false;
  
  const index = program.courses.findIndex(pc => pc.courseId === courseId);
  if (index === -1) return false;
  
  program.courses.splice(index, 1);
  saveManifest();
  return true;
}

/** Reset to default manifest */
export function resetProgramsToDefault() {
  editableManifest = JSON.parse(JSON.stringify(contentManifest));
  localStorage.removeItem('learnhub_manifest');
}
