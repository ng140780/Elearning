import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, GraduationCap, AlertTriangle } from 'lucide-react';
import { getPrograms, addProgram, updateProgram, deleteProgram, addCourseToProgram, removeCourseFromProgram } from '../services/programManagement';
import { getCourses } from '../services/courseManagement';
import type { Program, ProgramCourse } from '../types';

export default function ProgramManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null);
  
  // Program form states
  const [programTitle, setProgramTitle] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [programLevel, setProgramLevel] = useState<'certificate' | 'diploma' | 'bachelor' | 'master' | 'professional'>('certificate');
  const [programCredits, setProgramCredits] = useState(0);
  const [programDuration, setProgramDuration] = useState('');
  
  // Course form states
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [courseCredits, setCourseCredits] = useState(10);
  const [courseRequired, setCourseRequired] = useState(true);
  const [courseYear, setCourseYear] = useState<number | undefined>(undefined);
  const [courseSemester, setCourseSemester] = useState<'fall' | 'spring' | 'summer' | undefined>(undefined);
  const [coursePrerequisites, setCoursePrerequisites] = useState<string[]>([]);

  useEffect(() => {
    setPrograms(getPrograms());
    setCourses(getCourses());
  }, []);

  const refreshPrograms = () => {
    setPrograms(getPrograms());
    if (selectedProgram) {
      const updated = getPrograms().find(p => p.id === selectedProgram.id);
      setSelectedProgram(updated || null);
    }
  };

  // Program operations
  const handleAddProgram = () => {
    if (!programTitle.trim()) return;
    
    addProgram({
      type: 'program',
      title: programTitle,
      description: programDescription,
      level: programLevel,
      totalCredits: programCredits,
      estimatedDuration: programDuration,
      courses: [],
      objectives: [],
      prerequisites: [],
      order: programs.length + 1,
    });
    
    setProgramTitle('');
    setProgramDescription('');
    setProgramLevel('certificate');
    setProgramCredits(0);
    setProgramDuration('');
    setShowAddProgram(false);
    refreshPrograms();
  };

  const handleUpdateProgram = () => {
    if (!editingProgram || !programTitle.trim()) return;
    
    updateProgram(editingProgram.id, {
      title: programTitle,
      description: programDescription,
      level: programLevel,
      totalCredits: programCredits,
      estimatedDuration: programDuration,
    });
    
    setEditingProgram(null);
    setProgramTitle('');
    setProgramDescription('');
    setProgramLevel('certificate');
    setProgramCredits(0);
    setProgramDuration('');
    refreshPrograms();
  };

  const handleDeleteProgram = (programId: string, programName: string) => {
    setShowDeleteConfirm({ type: 'program', id: programId, name: programName });
  };

  const confirmDelete = () => {
    if (!showDeleteConfirm) return;
    
    if (showDeleteConfirm.type === 'program') {
      deleteProgram(showDeleteConfirm.id);
      if (selectedProgram?.id === showDeleteConfirm.id) {
        setSelectedProgram(null);
      }
    } else if (showDeleteConfirm.type === 'course' && selectedProgram) {
      removeCourseFromProgram(selectedProgram.id, showDeleteConfirm.id);
    }
    
    setShowDeleteConfirm(null);
    refreshPrograms();
  };

  // Course operations
  const handleAddCourse = () => {
    if (!selectedProgram || !selectedCourseId) return;
    
    addCourseToProgram(selectedProgram.id, {
      courseId: selectedCourseId,
      credits: courseCredits,
      required: courseRequired,
      year: courseYear,
      semester: courseSemester,
      prerequisites: coursePrerequisites,
    });
    
    setSelectedCourseId('');
    setCourseCredits(10);
    setCourseRequired(true);
    setCourseYear(undefined);
    setCourseSemester(undefined);
    setCoursePrerequisites([]);
    setShowAddCourse(false);
    refreshPrograms();
  };

  const handleDeleteCourse = (courseId: string, courseName: string) => {
    setShowDeleteConfirm({ type: 'course', id: courseId, name: courseName });
  };

  const levelLabels = {
    certificate: 'Certificate',
    diploma: 'Diploma',
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    professional: 'Professional Certificate',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/programs" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Programs
        </Link>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Program Management</h1>
        <p className="text-surface-500">Create and manage degree programs and certificates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Program List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-surface-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-surface-900">Programs</h2>
              <button
                onClick={() => setShowAddProgram(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Program
              </button>
            </div>
            <div className="space-y-2">
              {programs.map(program => (
                <div
                  key={program.id}
                  className={`group relative p-3 rounded-lg transition-colors ${
                    selectedProgram?.id === program.id
                      ? 'bg-primary-50 border border-primary-200 text-primary-700'
                      : 'hover:bg-surface-50 border border-transparent'
                  }`}
                >
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="w-4 h-4" />
                      <p className="font-medium text-sm">{program.title}</p>
                    </div>
                    <p className="text-xs text-surface-500">
                      {program.courses?.length || 0} courses • {program.totalCredits || 0} credits
                    </p>
                  </button>
                  <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProgram(program);
                        setProgramTitle(program.title);
                        setProgramDescription(program.description || '');
                        setProgramLevel(program.level);
                        setProgramCredits(program.totalCredits || 0);
                        setProgramDuration(program.estimatedDuration || '');
                      }}
                      className="p-1 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                      title="Edit program"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProgram(program.id, program.title);
                      }}
                      className="p-1 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete program"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="lg:col-span-2">
          {selectedProgram ? (
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-surface-900">{selectedProgram.title}</h2>
                  <p className="text-sm text-surface-500 mt-1">{selectedProgram.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-surface-400">
                    <span>{levelLabels[selectedProgram.level]}</span>
                    <span>{selectedProgram.totalCredits} credits</span>
                    {selectedProgram.estimatedDuration && <span>{selectedProgram.estimatedDuration}</span>}
                  </div>
                </div>
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Course
                </button>
              </div>

              {/* Courses in Program */}
              <div className="space-y-3">
                <h3 className="font-semibold text-surface-900">Courses ({selectedProgram.courses?.length || 0})</h3>
                {selectedProgram.courses && selectedProgram.courses.length > 0 ? (
                  <div className="space-y-2">
                    {selectedProgram.courses
                      .sort((a, b) => a.order - b.order)
                      .map((pc, index) => {
                        const course = courses.find(c => c.id === pc.courseId);
                        return (
                          <div key={pc.courseId} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1">
                              <span className="text-xs font-semibold text-surface-500 w-6">{index + 1}.</span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-surface-900">{course?.title || pc.courseId}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-surface-500">
                                  <span>{pc.credits} credits</span>
                                  {pc.year && <span>Year {pc.year}</span>}
                                  {pc.semester && <span className="capitalize">{pc.semester}</span>}
                                  {!pc.required && <span className="text-amber-600">(Elective)</span>}
                                  {pc.prerequisites && pc.prerequisites.length > 0 && (
                                    <span className="text-blue-600">
                                      Prereq: {pc.prerequisites.map(id => courses.find(c => c.id === id)?.title || id).join(', ')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteCourse(pc.courseId, course?.title || pc.courseId)}
                              className="p-1.5 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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
              <GraduationCap className="w-12 h-12 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-600 font-medium">Select a program to manage</p>
              <p className="text-surface-400 text-sm mt-1">Choose a program from the list to add or remove courses</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Program Modal */}
      {showAddProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Add New Program</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  value={programTitle}
                  onChange={(e) => setProgramTitle(e.target.value)}
                  placeholder="e.g., BSc Computer Science"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={programDescription}
                  onChange={(e) => setProgramDescription(e.target.value)}
                  placeholder="Brief description of the program..."
                  rows={3}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Level</label>
                <select
                  value={programLevel}
                  onChange={(e) => setProgramLevel(e.target.value as any)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="certificate">Certificate</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="professional">Professional Certificate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Total Credits</label>
                <input
                  type="number"
                  value={programCredits}
                  onChange={(e) => setProgramCredits(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Estimated Duration</label>
                <input
                  type="text"
                  value={programDuration}
                  onChange={(e) => setProgramDuration(e.target.value)}
                  placeholder="e.g., 3 years, 6 months"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddProgram}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Add Program
              </button>
              <button
                onClick={() => {
                  setShowAddProgram(false);
                  setProgramTitle('');
                  setProgramDescription('');
                  setProgramLevel('certificate');
                  setProgramCredits(0);
                  setProgramDuration('');
                }}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Program Modal */}
      {editingProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Edit Program</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  value={programTitle}
                  onChange={(e) => setProgramTitle(e.target.value)}
                  placeholder="e.g., BSc Computer Science"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={programDescription}
                  onChange={(e) => setProgramDescription(e.target.value)}
                  placeholder="Brief description of the program..."
                  rows={3}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Level</label>
                <select
                  value={programLevel}
                  onChange={(e) => setProgramLevel(e.target.value as any)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="certificate">Certificate</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="professional">Professional Certificate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Total Credits</label>
                <input
                  type="number"
                  value={programCredits}
                  onChange={(e) => setProgramCredits(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Estimated Duration</label>
                <input
                  type="text"
                  value={programDuration}
                  onChange={(e) => setProgramDuration(e.target.value)}
                  placeholder="e.g., 3 years, 6 months"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdateProgram}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditingProgram(null);
                  setProgramTitle('');
                  setProgramDescription('');
                  setProgramLevel('certificate');
                  setProgramCredits(0);
                  setProgramDuration('');
                }}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Add Course to Program</h3>
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
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Credits</label>
                <input
                  type="number"
                  value={courseCredits}
                  onChange={(e) => setCourseCredits(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={courseRequired}
                    onChange={(e) => setCourseRequired(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-surface-700">Required course</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Year (optional)</label>
                <input
                  type="number"
                  value={courseYear || ''}
                  onChange={(e) => setCourseYear(e.target.value ? Number(e.target.value) : undefined)}
                  min="1"
                  placeholder="e.g., 1, 2, 3"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Semester (optional)</label>
                <select
                  value={courseSemester || ''}
                  onChange={(e) => setCourseSemester(e.target.value as any || undefined)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">None</option>
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Prerequisites (optional)</label>
                <select
                  multiple
                  value={coursePrerequisites}
                  onChange={(e) => setCoursePrerequisites(Array.from(e.target.selectedOptions, option => option.value))}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  size={4}
                >
                  {selectedProgram?.courses?.map(pc => {
                    const course = courses.find(c => c.id === pc.courseId);
                    return course ? (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ) : null;
                  })}
                </select>
                <p className="text-xs text-surface-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddCourse}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Add Course
              </button>
              <button
                onClick={() => {
                  setShowAddCourse(false);
                  setSelectedCourseId('');
                  setCourseCredits(10);
                  setCourseRequired(true);
                  setCourseYear(undefined);
                  setCourseSemester(undefined);
                  setCoursePrerequisites([]);
                }}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
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
              Are you sure you want to {showDeleteConfirm.type === 'program' ? 'delete' : 'remove'} <strong>{showDeleteConfirm.name}</strong>?
              {showDeleteConfirm.type === 'program' && ' This will delete the entire program and all its course associations.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
