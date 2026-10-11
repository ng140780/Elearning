import { contentManifest } from '../content/manifest';
import type { Course, LearningPath, Subject, ContentManifest } from '../types';

/**
 * Content Validation
 * 
 * Validates content data and reports missing or invalid references.
 * Run this at build time or on content load to catch issues early.
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateContent(manifest: ContentManifest = contentManifest): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const courseIds = new Set(manifest.courses.map(c => c.id));
  const subjectIds = new Set(manifest.subjects.map(s => s.id));
  const lessonIds = new Set<string>();
  
  // Validate courses
  for (const course of manifest.courses) {
    // Check required fields
    if (!course.id) errors.push(`Course missing ID`);
    if (!course.title) errors.push(`Course ${course.id} missing title`);
    if (!course.subject) errors.push(`Course ${course.id} missing subject`);
    
    // Check subject reference
    if (course.subject && !subjectIds.has(course.subject)) {
      warnings.push(`Course ${course.id} references unknown subject: ${course.subject}`);
    }
    
    // Check prerequisites
    if (course.prerequisites) {
      for (const prereq of course.prerequisites) {
        if (!courseIds.has(prereq)) {
          warnings.push(`Course ${course.id} has unknown prerequisite: ${prereq}`);
        }
      }
    }
    
    // Check modules and lessons
    if (course.modules) {
      for (const mod of course.modules) {
        if (!mod.id) errors.push(`Module in course ${course.id} missing ID`);
        if (!mod.title) errors.push(`Module ${mod.id} missing title`);
        
        if (mod.lessons) {
          for (const lesson of mod.lessons) {
            if (!lesson.id) errors.push(`Lesson in module ${mod.id} missing ID`);
            if (!lesson.title) errors.push(`Lesson ${lesson.id} missing title`);
            if (!lesson.contentType) errors.push(`Lesson ${lesson.id} missing contentType`);
            
            // Check for duplicate lesson IDs
            if (lessonIds.has(lesson.id)) {
              errors.push(`Duplicate lesson ID: ${lesson.id}`);
            }
            lessonIds.add(lesson.id);
          }
        }
        
        if (!mod.lessons || mod.lessons.length === 0) {
          warnings.push(`Module ${mod.id} has no lessons`);
        }
      }
    }
    
    if (!course.modules || course.modules.length === 0) {
      warnings.push(`Course ${course.id} has no modules`);
    }
  }
  
  // Validate learning paths
  for (const path of manifest.learningPaths) {
    if (!path.id) errors.push(`Learning path missing ID`);
    if (!path.title) errors.push(`Learning path ${path.id} missing title`);
    
    // Check course references
    if (path.courses) {
      for (const courseId of path.courses) {
        if (!courseIds.has(courseId)) {
          errors.push(`Learning path ${path.id} references unknown course: ${courseId}`);
        }
      }
    }
  }
  
  // Check for duplicate course IDs
  const courseIdArray = manifest.courses.map(c => c.id);
  const duplicateCourseIds = courseIdArray.filter((id, index) => courseIdArray.indexOf(id) !== index);
  if (duplicateCourseIds.length > 0) {
    errors.push(`Duplicate course IDs: ${duplicateCourseIds.join(', ')}`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Validation can be run manually: validateContent()
// Or integrated into build process / content loading
