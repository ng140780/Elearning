import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Route, AlertTriangle, BookOpen } from 'lucide-react';
import {
  getLearningPaths,
  addLearningPath,
  updateLearningPath,
  deleteLearningPath,
  addCourseToPath,
  removeCourseFromPath,
} from '../services/learningPathManagement';
import { getCourses } from '../services/courseManagement';
import type { LearningPath } from '../types';

export default function LearningPathManagement() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [showAddPath, setShowAddPath] = useState(false);
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null);

  // Form states
  const [pathTitle, setPathTitle] = useState('');
  const [pathDescription, setPathDescription] = useState('');
  const [pathHours, setPathHours] = useState(0);
  const [pathDifficulty, setPathDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert'>('beginner');
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    setPaths(getLearningPaths());
    setCourses(getCourses());
  }, []);

  const refreshPaths = () => {
    setPaths(getLearningPaths());
    if (selectedPath) {
      const updated = getLearningPaths().find(p => p.id === selectedPath.id);
      setSelectedPath(updated || null);
    }
  };

  // Path operations
  const handleAddPath = () => {
    if (!pathTitle.trim()) return;
    addLearningPath({
      title: pathTitle,
      description: pathDescription,
      courses: [],
      estimatedHours: pathHours,
      difficulty: pathDifficulty,
      order: paths.length + 1,
    });
    resetForm();
    setShowAddPath(false);
    refreshPaths();
  };

  const handleUpdatePath = () => {
    if (!editingPath || !pathTitle.trim()) return;
    updateLearningPath(editingPath.id, {
      title: pathTitle,
      description: pathDescription,
      estimatedHours: pathHours,
      difficulty: pathDifficulty,
    });
    resetForm();
    setEditingPath(null);
    refreshPaths();
  };

  const handleDeletePath = (id: string, name: string) => {
    setShowDeleteConfirm({ type: 'path', id, name });
  };

  const confirmDelete = () => {
    if (!showDeleteConfirm) return;
    if (showDeleteConfirm.type === 'path') {
      deleteLearningPath(showDeleteConfirm.id);
      if (selectedPath?.id === showDeleteConfirm.id) setSelectedPath(null);
    } else if (showDeleteConfirm.type === 'course' && selectedPath) {
      removeCourseFromPath(selectedPath.id, showDeleteConfirm.id);
    }
    setShowDeleteConfirm(null);
    refreshPaths();
  };

  // Course in path operations
  const handleAddCourseToPath = () => {
    if (!selectedPath || !selectedCourseId) return;
    addCourseToPath(selectedPath.id, selectedCourseId);
    setSelectedCourseId('');
    setShowAddCourse(false);
    refreshPaths();
  };

  const handleRemoveCourseFromPath = (courseId: string, courseName: string) => {
    setShowDeleteConfirm({ type: 'course', id: courseId, name: courseName });
  };

  const resetForm = () => {
    setPathTitle('');
    setPathDescription('');
    setPathHours(0);
    setPathDifficulty('beginner');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link to="/learning-paths" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Learning Paths
        </Link>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Learning Path Management</h1>
        <p className="text-surface-500">Create and manage learning paths</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Path List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-surface-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-surface-900">Learning Paths</h2>
              <button
                onClick={() => setShowAddPath(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-medium hover:bg-primary-700"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Path
              </button>
            </div>
            <div className="space-y-2">
              {paths.map(path => (
                <div
                  key={path.id}
                  className={`group relative p-3 rounded-lg transition-colors ${
                    selectedPath?.id === path.id
                      ? 'bg-primary-50 border border-primary-200 text-primary-700'
                      : 'hover:bg-surface-50 border border-transparent'
                  }`}
                >
                  <button
                    onClick={() => setSelectedPath(path)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Route className="w-4 h-4" />
                      <p className="font-medium text-sm">{path.title}</p>
                    </div>
                    <p className="text-xs text-surface-500">
                      {path.courses?.length || 0} courses • {path.estimatedHours || 0}h
                    </p>
                  </button>
                  <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPath(path);
                        setPathTitle(path.title);
                        setPathDescription(path.description || '');
                        setPathHours(path.estimatedHours || 0);
                        setPathDifficulty(path.difficulty || 'beginner');
                      }}
                      className="p-1 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                      title="Edit path"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePath(path.id, path.title);
                      }}
                      className="p-1 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete path"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Path Details */}
        <div className="lg:col-span-2">
          {selectedPath ? (
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-surface-900">{selectedPath.title}</h2>
                  <p className="text-sm text-surface-500 mt-1">{selectedPath.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-surface-400">
                    <span>{selectedPath.courses?.length || 0} courses</span>
                    {selectedPath.estimatedHours && <span>{selectedPath.estimatedHours} hours</span>}
                    {selectedPath.difficulty && <span className="capitalize">{selectedPath.difficulty}</span>}
                  </div>
                </div>
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Course
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-surface-900">Courses ({selectedPath.courses?.length || 0})</h3>
                {selectedPath.courses && selectedPath.courses.length > 0 ? (
                  <div className="space-y-2">
                    {selectedPath.courses.map((courseId, index) => {
                      const course = courses.find(c => c.id === courseId);
                      return (
                        <div key={courseId} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-xs font-semibold text-surface-500 w-6">{index + 1}.</span>
                            <BookOpen className="w-4 h-4 text-surface-400" />
                            <p className="text-sm font-medium text-surface-900">{course?.title || courseId}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveCourseFromPath(courseId, course?.title || courseId)}
                            className="p-1.5 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Remove course"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-surface-400">
                    <p className="text-sm">No courses added yet</p>
                    <p className="text-xs mt-1">Click "Add Course" to get started</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-200 p-12 text-center">
              <Route className="w-12 h-12 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-600 font-medium">Select a learning path to manage</p>
              <p className="text-surface-400 text-sm mt-1">Choose a path from the list to add or remove courses</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Path Modal */}
      {showAddPath && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Add New Learning Path</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={pathTitle}
                  onChange={(e) => setPathTitle(e.target.value)}
                  placeholder="e.g., Data Science Track"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={pathDescription}
                  onChange={(e) => setPathDescription(e.target.value)}
                  placeholder="Describe this learning path..."
                  rows={3}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Estimated Hours</label>
                <input
                  type="number"
                  value={pathHours}
                  onChange={(e) => setPathHours(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Difficulty</label>
                <select
                  value={pathDifficulty}
                  onChange={(e) => setPathDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleAddPath} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                Add Path
              </button>
              <button onClick={() => { setShowAddPath(false); resetForm(); }} className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Path Modal */}
      {editingPath && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Edit Learning Path</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={pathTitle}
                  onChange={(e) => setPathTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={pathDescription}
                  onChange={(e) => setPathDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Estimated Hours</label>
                <input
                  type="number"
                  value={pathHours}
                  onChange={(e) => setPathHours(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Difficulty</label>
                <select
                  value={pathDifficulty}
                  onChange={(e) => setPathDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleUpdatePath} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                Save Changes
              </button>
              <button onClick={() => { setEditingPath(null); resetForm(); }} className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course to Path Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Add Course to Path</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Course *</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleAddCourseToPath} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                Add Course
              </button>
              <button onClick={() => { setShowAddCourse(false); setSelectedCourseId(''); }} className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300">
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
            <p className="text-surface-600 mb-4">
              Are you sure you want to {showDeleteConfirm.type === 'path' ? 'delete' : 'remove'} <strong>{showDeleteConfirm.name}</strong>?
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
