import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, Save, X, BookOpen, AlertTriangle, Folder, FileText, HelpCircle, Code, Link2 } from 'lucide-react';
import { getCourses, addModule, updateModule, deleteModule, addLesson, updateLesson, deleteLesson, addCourse, updateCourse, deleteCourse, addTopic, updateTopic, deleteTopic, addResource, updateResource, deleteResource, addQuizQuestion, updateQuizQuestion, deleteQuizQuestion, setExercise, deleteExercise } from '../services/courseManagement';
import type { Course, Module, Lesson, Topic, Resource, QuizQuestion, ExerciseDefinition } from '../types';

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<{ moduleId: string; lesson: Lesson } | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null);
  
  // Course form states
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseSubject, setCourseSubject] = useState('computer-science');
  const [courseDifficulty, setCourseDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert'>('beginner');
  const [courseHours, setCourseHours] = useState(10);
  
  // Module/Lesson form states
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonType, setLessonType] = useState<'text' | 'video' | 'exercise' | 'quiz' | 'project'>('text');
  
  // Topic states
  const [showAddTopic, setShowAddTopic] = useState<string | null>(null);
  const [editingTopic, setEditingTopic] = useState<{ moduleId: string; topic: Topic } | null>(null);
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  
  // Resource states
  const [showAddResource, setShowAddResource] = useState<string | null>(null);
  const [editingResource, setEditingResource] = useState<{ moduleId: string; lessonId: string; resource: Resource } | null>(null);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceType, setResourceType] = useState<'pdf' | 'link' | 'code' | 'video' | 'document'>('link');
  
  // Quiz states
  const [showAddQuiz, setShowAddQuiz] = useState<string | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<{ moduleId: string; lessonId: string; question: QuizQuestion } | null>(null);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizType, setQuizType] = useState<'multiple-choice' | 'true-false' | 'short-answer'>('multiple-choice');
  const [quizOptions, setQuizOptions] = useState<string[]>(['', '', '', '']);
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState<string | number>(0);
  const [quizExplanation, setQuizExplanation] = useState('');
  
  // Exercise states
  const [showAddExercise, setShowAddExercise] = useState<string | null>(null);
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exerciseStarterCode, setExerciseStarterCode] = useState('');
  const [exerciseExpectedOutput, setExerciseExpectedOutput] = useState('');
  const [exerciseLanguage, setExerciseLanguage] = useState('python');

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const refreshCourses = () => {
    setCourses(getCourses());
    if (selectedCourse) {
      const updated = getCourses().find(c => c.id === selectedCourse.id);
      setSelectedCourse(updated || null);
    }
  };

  // Course operations
  const handleAddCourse = () => {
    if (!courseTitle.trim()) return;
    
    addCourse({
      type: 'course',
      title: courseTitle,
      description: courseDescription,
      subject: courseSubject,
      difficulty: courseDifficulty,
      estimatedHours: courseHours,
      provider: 'LearnHub',
      order: courses.length + 1,
      modules: [],
    });
    
    setCourseTitle('');
    setCourseDescription('');
    setCourseSubject('computer-science');
    setCourseDifficulty('beginner');
    setCourseHours(10);
    setShowAddCourse(false);
    refreshCourses();
  };

  const handleUpdateCourse = () => {
    if (!editingCourse || !courseTitle.trim()) return;
    
    updateCourse(editingCourse.id, {
      title: courseTitle,
      description: courseDescription,
      subject: courseSubject,
      difficulty: courseDifficulty,
      estimatedHours: courseHours,
    });
    
    setEditingCourse(null);
    setCourseTitle('');
    setCourseDescription('');
    setCourseSubject('computer-science');
    setCourseDifficulty('beginner');
    setCourseHours(10);
    refreshCourses();
  };

  const handleDeleteCourse = (courseId: string, courseName: string) => {
    setShowDeleteConfirm({ type: 'course', id: courseId, name: courseName });
  };

  const confirmDelete = () => {
    if (!showDeleteConfirm) return;
    
    if (showDeleteConfirm.type === 'course') {
      deleteCourse(showDeleteConfirm.id);
      if (selectedCourse?.id === showDeleteConfirm.id) {
        setSelectedCourse(null);
      }
    } else if (showDeleteConfirm.type === 'module' && selectedCourse) {
      deleteModule(selectedCourse.id, showDeleteConfirm.id);
    } else if (showDeleteConfirm.type === 'lesson' && selectedCourse) {
      const module = selectedCourse.modules?.find(m => 
        m.lessons?.some(l => l.id === showDeleteConfirm.id)
      );
      if (module) {
        deleteLesson(selectedCourse.id, module.id, showDeleteConfirm.id);
      }
    } else if (showDeleteConfirm.type === 'topic' && selectedCourse) {
      // Find the module that contains this topic
      const module = selectedCourse.modules?.find(m => 
        m.topics?.some(t => t.id === showDeleteConfirm.id)
      );
      if (module) {
        deleteTopic(selectedCourse.id, module.id, showDeleteConfirm.id);
      }
    }
    
    setShowDeleteConfirm(null);
    refreshCourses();
  };

  // Module operations
  const handleAddModule = () => {
    if (!selectedCourse || !moduleTitle.trim()) return;
    
    addModule(selectedCourse.id, {
      type: 'module',
      title: moduleTitle,
      description: moduleDescription,
      order: (selectedCourse.modules?.length || 0) + 1,
    });
    
    setModuleTitle('');
    setModuleDescription('');
    setShowAddModule(false);
    refreshCourses();
  };

  const handleUpdateModule = () => {
    if (!selectedCourse || !editingModule || !moduleTitle.trim()) return;
    
    updateModule(selectedCourse.id, editingModule.id, {
      title: moduleTitle,
      description: moduleDescription,
    });
    
    setEditingModule(null);
    setModuleTitle('');
    setModuleDescription('');
    refreshCourses();
  };

  const handleDeleteModule = (moduleId: string, moduleName: string) => {
    if (!selectedCourse) return;
    setShowDeleteConfirm({ type: 'module', id: moduleId, name: moduleName });
  };

  // Lesson operations
  const handleAddLesson = (moduleId: string) => {
    if (!selectedCourse || !lessonTitle.trim()) return;
    
    const module = selectedCourse.modules?.find(m => m.id === moduleId);
    if (!module) return;
    
    addLesson(selectedCourse.id, moduleId, {
      type: 'lesson',
      title: lessonTitle,
      contentType: lessonType,
      content: lessonContent,
      order: (module.lessons?.length || 0) + 1,
    });
    
    setLessonTitle('');
    setLessonContent('');
    setLessonType('text');
    setShowAddLesson(null);
    refreshCourses();
  };

  const handleUpdateLesson = () => {
    if (!selectedCourse || !editingLesson || !lessonTitle.trim()) return;
    
    updateLesson(selectedCourse.id, editingLesson.moduleId, editingLesson.lesson.id, {
      title: lessonTitle,
      content: lessonContent,
      contentType: lessonType,
    });
    
    setEditingLesson(null);
    setLessonTitle('');
    setLessonContent('');
    setLessonType('text');
    refreshCourses();
  };

  const handleDeleteLesson = (moduleId: string, lesson: Lesson) => {
    setEditingLesson({ moduleId, lesson });
    setShowDeleteConfirm({ type: 'lesson', id: lesson.id, name: lesson.title });
  };

  // Topic operations
  const handleAddTopic = (moduleId: string) => {
    if (!selectedCourse || !topicTitle.trim()) return;
    addTopic(selectedCourse.id, moduleId, {
      type: 'topic',
      title: topicTitle,
      description: topicDescription,
      order: 1,
    });
    setTopicTitle('');
    setTopicDescription('');
    setShowAddTopic(null);
    refreshCourses();
  };

  const handleUpdateTopic = () => {
    if (!selectedCourse || !editingTopic || !topicTitle.trim()) return;
    updateTopic(selectedCourse.id, editingTopic.moduleId, editingTopic.topic.id, {
      title: topicTitle,
      description: topicDescription,
    });
    setEditingTopic(null);
    setTopicTitle('');
    setTopicDescription('');
    refreshCourses();
  };

  const handleDeleteTopic = (moduleId: string, topic: Topic) => {
    setShowDeleteConfirm({ type: 'topic', id: topic.id, name: topic.title });
  };

  // Resource operations
  const handleAddResource = (moduleId: string, lessonId: string) => {
    if (!selectedCourse || !resourceTitle.trim() || !resourceUrl.trim()) return;
    addResource(selectedCourse.id, moduleId, lessonId, {
      title: resourceTitle,
      url: resourceUrl,
      type: resourceType,
    });
    setResourceTitle('');
    setResourceUrl('');
    setResourceType('link');
    setShowAddResource(null);
    refreshCourses();
  };

  const handleUpdateResource = () => {
    if (!selectedCourse || !editingResource) return;
    updateResource(selectedCourse.id, editingResource.moduleId, editingResource.lessonId, editingResource.resource.id, {
      title: resourceTitle,
      url: resourceUrl,
      type: resourceType,
    });
    setEditingResource(null);
    setResourceTitle('');
    setResourceUrl('');
    setResourceType('link');
    refreshCourses();
  };

  const handleDeleteResource = (moduleId: string, lessonId: string, resource: Resource) => {
    if (!selectedCourse) return;
    deleteResource(selectedCourse.id, moduleId, lessonId, resource.id);
    refreshCourses();
  };

  // Quiz operations
  const handleAddQuiz = (moduleId: string, lessonId: string) => {
    if (!selectedCourse || !quizQuestion.trim()) return;
    addQuizQuestion(selectedCourse.id, moduleId, lessonId, {
      question: quizQuestion,
      type: quizType,
      options: quizType === 'multiple-choice' ? quizOptions : undefined,
      correctAnswer: quizCorrectAnswer,
      explanation: quizExplanation,
    });
    setQuizQuestion('');
    setQuizOptions(['', '', '', '']);
    setQuizCorrectAnswer(0);
    setQuizExplanation('');
    setShowAddQuiz(null);
    refreshCourses();
  };

  const handleUpdateQuiz = () => {
    if (!selectedCourse || !editingQuiz) return;
    updateQuizQuestion(selectedCourse.id, editingQuiz.moduleId, editingQuiz.lessonId, editingQuiz.question.id, {
      question: quizQuestion,
      type: quizType,
      options: quizType === 'multiple-choice' ? quizOptions : undefined,
      correctAnswer: quizCorrectAnswer,
      explanation: quizExplanation,
    });
    setEditingQuiz(null);
    setQuizQuestion('');
    setQuizOptions(['', '', '', '']);
    setQuizCorrectAnswer(0);
    setQuizExplanation('');
    refreshCourses();
  };

  const handleDeleteQuiz = (moduleId: string, lessonId: string, question: QuizQuestion) => {
    if (!selectedCourse) return;
    deleteQuizQuestion(selectedCourse.id, moduleId, lessonId, question.id);
    refreshCourses();
  };

  // Exercise operations
  const handleAddExercise = (moduleId: string, lessonId: string) => {
    if (!selectedCourse || !exerciseTitle.trim()) return;
    setExercise(selectedCourse.id, moduleId, lessonId, {
      id: `exercise-${Date.now()}`,
      title: exerciseTitle,
      description: exerciseDescription,
      starterCode: exerciseStarterCode,
      expectedOutput: exerciseExpectedOutput,
      language: exerciseLanguage,
    });
    setExerciseTitle('');
    setExerciseDescription('');
    setExerciseStarterCode('');
    setExerciseExpectedOutput('');
    setExerciseLanguage('python');
    setShowAddExercise(null);
    refreshCourses();
  };

  const handleDeleteExercise = (moduleId: string, lessonId: string) => {
    if (!selectedCourse) return;
    deleteExercise(selectedCourse.id, moduleId, lessonId);
    refreshCourses();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Course Management</h1>
        <p className="text-surface-500">Add, edit, and delete modules and lessons</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-surface-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-surface-900">Courses</h2>
              <button
                onClick={() => setShowAddCourse(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Course
              </button>
            </div>
            <div className="space-y-2">
              {courses.map(course => (
                <div
                  key={course.id}
                  className={`group relative p-3 rounded-lg transition-colors ${
                    selectedCourse?.id === course.id
                      ? 'bg-primary-50 border border-primary-200 text-primary-700'
                      : 'hover:bg-surface-50 border border-transparent'
                  }`}
                >
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full text-left"
                  >
                    <p className="font-medium text-sm">{course.title}</p>
                    <p className="text-xs text-surface-500 mt-1">
                      {course.modules?.length || 0} modules
                    </p>
                  </button>
                  <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCourse(course);
                        setCourseTitle(course.title);
                        setCourseDescription(course.description || '');
                        setCourseSubject(course.subject);
                        setCourseDifficulty(course.difficulty || 'beginner');
                        setCourseHours(course.estimatedHours || 10);
                      }}
                      className="p-1 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                      title="Edit course"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(course.id, course.title);
                      }}
                      className="p-1 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-surface-900">{selectedCourse.title}</h2>
                <button
                  onClick={() => setShowAddModule(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Module
                </button>
              </div>

              {/* Modules */}
              <div className="space-y-4">
                {selectedCourse.modules?.map((module, index) => (
                  <div key={module.id} className="border border-surface-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-surface-500">Module {index + 1}</span>
                        </div>
                        <h3 className="font-semibold text-surface-900">{module.title}</h3>
                        {module.description && (
                          <p className="text-sm text-surface-500 mt-1">{module.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingModule(module);
                            setModuleTitle(module.title);
                            setModuleDescription(module.description || '');
                          }}
                          className="p-2 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit module"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteModule(module.id, module.title)}
                          className="p-2 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete module"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="ml-4 space-y-2">
                      {module.lessons?.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center justify-between p-2 bg-surface-50 rounded-lg">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-xs text-surface-400">{lessonIndex + 1}.</span>
                            <span className="text-sm text-surface-700">{lesson.title}</span>
                            <span className="text-xs px-2 py-0.5 bg-surface-200 text-surface-600 rounded">
                              {lesson.contentType}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingLesson({ moduleId: module.id, lesson });
                                setLessonTitle(lesson.title);
                                setLessonContent(lesson.content || '');
                                setLessonType(lesson.contentType as any);
                              }}
                              className="p-1.5 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                              title="Edit lesson"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLesson(module.id, lesson)}
                              className="p-1.5 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete lesson"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Lesson Button */}
                      {showAddLesson === module.id ? (
                        <div className="p-3 border border-primary-200 bg-primary-50 rounded-lg space-y-3">
                          <input
                            type="text"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            placeholder="Lesson title"
                            className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <select
                            value={lessonType}
                            onChange={(e) => setLessonType(e.target.value as any)}
                            className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="text">Text</option>
                            <option value="video">Video</option>
                            <option value="exercise">Exercise</option>
                            <option value="quiz">Quiz</option>
                            <option value="project">Project</option>
                          </select>
                          <textarea
                            value={lessonContent}
                            onChange={(e) => setLessonContent(e.target.value)}
                            placeholder="Lesson content (markdown supported)"
                            rows={4}
                            className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddLesson(module.id)}
                              className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
                            >
                              Add Lesson
                            </button>
                            <button
                              onClick={() => {
                                setShowAddLesson(null);
                                setLessonTitle('');
                                setLessonContent('');
                              }}
                              className="px-3 py-1.5 bg-surface-200 text-surface-700 rounded-lg text-sm font-medium hover:bg-surface-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAddLesson(module.id)}
                          className="w-full p-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add Lesson
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-200 p-12 text-center">
              <BookOpen className="w-12 h-12 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-600 font-medium">Select a course to manage</p>
              <p className="text-surface-400 text-sm mt-1">Choose a course from the list to add, edit, or delete modules and lessons</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Add New Course</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g., Introduction to Python"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Brief description of the course..."
                  rows={3}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Subject</label>
                <select
                  value={courseSubject}
                  onChange={(e) => setCourseSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="data-science">Data Science</option>
                  <option value="web-development">Web Development</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="humanities">Humanities</option>
                  <option value="natural-sciences">Natural Sciences</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Difficulty</label>
                <select
                  value={courseDifficulty}
                  onChange={(e) => setCourseDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Estimated Hours</label>
                <input
                  type="number"
                  value={courseHours}
                  onChange={(e) => setCourseHours(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
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
                  setCourseTitle('');
                  setCourseDescription('');
                  setCourseSubject('computer-science');
                  setCourseDifficulty('beginner');
                  setCourseHours(10);
                }}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Edit Course</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g., Introduction to Python"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Brief description of the course..."
                  rows={3}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Subject</label>
                <select
                  value={courseSubject}
                  onChange={(e) => setCourseSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="data-science">Data Science</option>
                  <option value="web-development">Web Development</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="humanities">Humanities</option>
                  <option value="natural-sciences">Natural Sciences</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Difficulty</label>
                <select
                  value={courseDifficulty}
                  onChange={(e) => setCourseDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Estimated Hours</label>
                <input
                  type="number"
                  value={courseHours}
                  onChange={(e) => setCourseHours(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdateCourse}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditingCourse(null);
                  setCourseTitle('');
                  setCourseDescription('');
                  setCourseSubject('computer-science');
                  setCourseDifficulty('beginner');
                  setCourseHours(10);
                }}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Module Modal */}
      {showAddModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Add New Module</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="Module title"
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <textarea
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
                placeholder="Module description (optional)"
                rows={3}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddModule}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Add Module
              </button>
              <button
                onClick={() => {
                  setShowAddModule(false);
                  setModuleTitle('');
                  setModuleDescription('');
                }}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {editingModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Edit Module</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="Module title"
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <textarea
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
                placeholder="Module description (optional)"
                rows={3}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdateModule}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditingModule(null);
                  setModuleTitle('');
                  setModuleDescription('');
                }}
                className="flex-1 px-4 py-2 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lesson Modal */}
      {editingLesson && !showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-surface-900 mb-4">Edit Lesson</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Lesson title"
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <select
                value={lessonType}
                onChange={(e) => setLessonType(e.target.value as any)}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="text">Text</option>
                <option value="video">Video</option>
                <option value="exercise">Exercise</option>
                <option value="quiz">Quiz</option>
                <option value="project">Project</option>
              </select>
              <textarea
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                placeholder="Lesson content (markdown supported)"
                rows={6}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdateLesson}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditingLesson(null);
                  setLessonTitle('');
                  setLessonContent('');
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
            <p className="text-surface-600 mb-2">
              Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>?
            </p>
            {showDeleteConfirm.type === 'course' && (
              <p className="text-red-600 text-sm font-medium mb-4">
                ⚠️ This will delete the entire course including all modules, lessons, and their progress data.
              </p>
            )}
            {showDeleteConfirm.type === 'module' && (
              <p className="text-red-600 text-sm font-medium mb-4">
                ⚠️ This will also delete all lessons under this module and their progress data.
              </p>
            )}
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
