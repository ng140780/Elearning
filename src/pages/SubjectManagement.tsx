import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Tag, AlertTriangle } from 'lucide-react';
import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from '../services/subjectManagement';
import { getAllCourses } from '../services/content';
import type { Subject } from '../types';

const EMOJI_OPTIONS = ['💻', '📐', '📊', '🌐', '🎨', '📈', '📚', '🔬', '🧮', '🎯', '🛠️', '🎓', '💡', '🚀', '📱', '🤖'];

export default function SubjectManagement() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: string; name: string } | null>(null);

  // Form states
  const [subjectName, setSubjectName] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [subjectIcon, setSubjectIcon] = useState('💡');

  useEffect(() => {
    setSubjects(getSubjects());
    setCourses(getAllCourses());
  }, []);

  const refreshSubjects = () => {
    setSubjects(getSubjects());
  };

  const getCourseCount = (subjectId: string) => {
    return courses.filter(c => c.subject === subjectId || c.subjects?.includes(subjectId)).length;
  };

  const handleAddSubject = () => {
    if (!subjectName.trim()) return;
    const id = subjectName.toLowerCase().replace(/\s+/g, '-');
    addSubject({
      id,
      name: subjectName,
      description: subjectDescription,
      icon: subjectIcon,
    });
    resetForm();
    setShowAddSubject(false);
    refreshSubjects();
  };

  const handleUpdateSubject = () => {
    if (!editingSubject || !subjectName.trim()) return;
    updateSubject(editingSubject.id, {
      name: subjectName,
      description: subjectDescription,
      icon: subjectIcon,
    });
    resetForm();
    setEditingSubject(null);
    refreshSubjects();
  };

  const handleDeleteSubject = (id: string, name: string) => {
    setShowDeleteConfirm({ id, name });
  };

  const confirmDelete = () => {
    if (!showDeleteConfirm) return;
    deleteSubject(showDeleteConfirm.id);
    setShowDeleteConfirm(null);
    refreshSubjects();
  };

  const resetForm = () => {
    setSubjectName('');
    setSubjectDescription('');
    setSubjectIcon('💡');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link to="/courses" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Subject Management</h1>
        <p className="text-surface-500">Create and manage course categories and subjects</p>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-surface-900">Subjects ({subjects.length})</h2>
          <button
            onClick={() => setShowAddSubject(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            Add Subject
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(subject => {
            const courseCount = getCourseCount(subject.id);
            return (
              <div key={subject.id} className="group relative p-4 border border-surface-200 rounded-lg hover:border-primary-200 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{subject.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-surface-900 truncate">{subject.name}</h3>
                    {subject.description && (
                      <p className="text-xs text-surface-500 mt-1 line-clamp-2">{subject.description}</p>
                    )}
                    <p className="text-xs text-surface-400 mt-2">
                      {courseCount} {courseCount === 1 ? 'course' : 'courses'}
                    </p>
                  </div>
                </div>
                <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                  <button
                    onClick={() => {
                      setEditingSubject(subject);
                      setSubjectName(subject.name);
                      setSubjectDescription(subject.description || '');
                      setSubjectIcon(subject.icon || '💡');
                    }}
                    className="p-1.5 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                    title="Edit subject"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSubject(subject.id, subject.name)}
                    className="p-1.5 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Delete subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Subject Modal */}
      {showAddSubject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Add New Subject</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g., Machine Learning"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={subjectDescription}
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  placeholder="Brief description..."
                  rows={2}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSubjectIcon(emoji)}
                      className={`w-10 h-10 text-2xl rounded-lg border-2 transition-colors ${
                        subjectIcon === emoji
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-surface-200 hover:border-surface-300'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleAddSubject} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                Add Subject
              </button>
              <button onClick={() => { setShowAddSubject(false); resetForm(); }} className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {editingSubject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Edit Subject</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={subjectDescription}
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSubjectIcon(emoji)}
                      className={`w-10 h-10 text-2xl rounded-lg border-2 transition-colors ${
                        subjectIcon === emoji
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-surface-200 hover:border-surface-300'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleUpdateSubject} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                Save Changes
              </button>
              <button onClick={() => { setEditingSubject(null); resetForm(); }} className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-surface-900">Confirm Delete</h3>
            </div>
            <p className="text-surface-600 mb-2">
              Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>?
            </p>
            <p className="text-red-600 text-sm mb-4">
              ⚠️ Courses with this subject will still exist but won't be categorized under this subject.
            </p>
            <div className="flex gap-2">
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
