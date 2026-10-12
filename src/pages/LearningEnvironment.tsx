import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen, Home, Menu, X, Bookmark, BookmarkCheck } from 'lucide-react';
import { getLessonWithContext, getAllLessonsForCourse, getCourseById } from '../services/content';
import { useLearner } from '../context/LearnerContext';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';

export default function LearningEnvironment() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { isLessonCompleted, markLessonComplete, markLessonIncomplete, recordAccess, addToHistory, isBookmarked, toggleBookmark, isEnrolled } = useLearner();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const context = courseId && lessonId ? getLessonWithContext(courseId, lessonId) : null;
  const course = courseId ? getCourseById(courseId) : null;
  const completed = lessonId ? isLessonCompleted(lessonId) : false;
  const bookmarked = lessonId ? isBookmarked(lessonId, 'lesson') : false;
  const enrolled = courseId ? isEnrolled(courseId) : false;

  useEffect(() => {
    // Check if user is enrolled
    if (courseId && !enrolled) {
      navigate(`/courses/${courseId}`, { replace: true });
      return;
    }

    if (courseId && lessonId && course) {
      recordAccess(lessonId, courseId);
      addToHistory({
        type: 'lesson',
        targetId: lessonId,
        courseId,
        title: context?.lesson.title || 'Lesson',
        description: course.title,
      });
      
      // Redirect to quiz interface if this is a quiz lesson
      if (context?.lesson.contentType === 'quiz') {
        navigate(`/quiz/${courseId}/${lessonId}`, { replace: true });
      }
    }
    window.scrollTo(0, 0);
  }, [courseId, lessonId]);

  if (!context || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<BookOpen className="w-8 h-8 text-surface-400" />}
          title="Lesson not found"
          description="The lesson you're looking for doesn't exist."
          action={{ label: 'Browse Courses', to: '/courses' }}
        />
      </div>
    );
  }

  const { lesson, module, previousLesson, nextLesson, lessonIndex, totalLessons } = context;
  const allLessons = getAllLessonsForCourse(courseId!);
  const completedCount = allLessons.filter(l => isLessonCompleted(l.id)).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleToggleComplete = () => {
    if (completed) {
      markLessonIncomplete(lessonId!, courseId!);
    } else {
      markLessonComplete(lessonId!, courseId!);
    }
  };

  const handleBookmark = () => {
    toggleBookmark({
      type: 'lesson',
      targetId: lesson.id,
      title: lesson.title,
      description: course.title,
    });
  };

  const navigateToLesson = (targetLessonId: string) => {
    navigate(`/learn/${courseId}/${targetLessonId}`);
    setSidebarOpen(false);
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-3xl font-bold text-surface-900 mb-4 mt-8 first:mt-0">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-semibold text-surface-800 mb-3 mt-8">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-semibold text-surface-700 mb-2 mt-6">{line.slice(4)}</h3>;
        }
        if (line.startsWith('- ')) {
          return <li key={i} className="ml-4 text-surface-700 leading-relaxed mb-1 list-disc">{renderInline(line.slice(2))}</li>;
        }
        if (line.match(/^\d+\. /)) {
          return <li key={i} className="ml-4 text-surface-700 leading-relaxed mb-1 list-decimal">{renderInline(line.replace(/^\d+\. /, ''))}</li>;
        }
        if (line.trim() === '') {
          return <div key={i} className="h-3" />;
        }
        return <p key={i} className="text-surface-700 leading-relaxed mb-3">{renderInline(line)}</p>;
      });
  };

  const renderInline = (text: string) => {
    // Handle bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-surface-800">{part.slice(2, -2)}</strong>;
      }
      // Handle inline code
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, j) => {
        if (cp.startsWith('`') && cp.endsWith('`')) {
          return <code key={`${i}-${j}`} className="px-1.5 py-0.5 bg-surface-100 rounded text-sm font-mono text-primary-700">{cp.slice(1, -1)}</code>;
        }
        return <span key={`${i}-${j}`}>{cp}</span>;
      });
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-surface-200">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-50"
              aria-label="Toggle course navigation"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link
              to={`/courses/${courseId}`}
              className="flex items-center gap-2 text-sm text-surface-500 hover:text-primary-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{course.title}</span>
            </Link>
            <span className="text-surface-300">/</span>
            <span className="text-sm text-surface-700 font-medium truncate max-w-[200px] sm:max-w-none">
              {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-surface-400 hidden sm:block">
              {lessonIndex + 1} / {totalLessons}
            </span>
            <div className="w-24 sm:w-32">
              <ProgressBar percentage={progressPercent} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Course Navigation */}
        <aside className={`fixed lg:sticky top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-80 bg-white border-r border-surface-200 overflow-y-auto transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4">
            <div className="mb-4">
              <h2 className="font-semibold text-surface-900 text-sm">{course.title}</h2>
              <p className="text-xs text-surface-400 mt-1">{completedCount} of {totalLessons} lessons complete</p>
            </div>

            <nav className="space-y-1">
              {course.modules?.map((mod) => {
                const isExpanded = expandedModules[mod.id] !== false; // Default to expanded
                return (
                  <div key={mod.id} className="mb-3">
                    <button
                      onClick={() => setExpandedModules(prev => ({ ...prev, [mod.id]: !isExpanded }))}
                      className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-surface-50 rounded-lg transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-surface-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-surface-400" />
                      )}
                      <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
                        {mod.title}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="ml-2 space-y-0.5 mt-1">
                        {mod.lessons?.map((l) => {
                          const isCompleted = isLessonCompleted(l.id);
                          const isCurrent = l.id === lessonId;
                          return (
                            <button
                              key={l.id}
                              onClick={() => navigateToLesson(l.id)}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                                isCurrent
                                  ? 'bg-primary-50 text-primary-700 font-medium'
                                  : 'text-surface-600 hover:bg-surface-50'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-surface-300 flex-shrink-0" />
                              )}
                              <span className="truncate">{l.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-surface-400 mb-6">
              <Link to={`/courses/${courseId}`} className="hover:text-primary-600 transition-colors">
                {course.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-surface-500">{module.title}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-surface-700 font-medium">{lesson.title}</span>
            </nav>

            {/* Lesson Content */}
            <article className="lesson-content">
              {lesson.contentType === 'quiz' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-surface-900 mb-2">Ready to test your knowledge?</h2>
                  <p className="text-surface-600 mb-6">
                    This lesson contains {lesson.quizQuestions?.length || 0} quiz questions.
                  </p>
                  <button
                    onClick={() => navigate(`/quiz/${courseId}/${lessonId}`)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>
              ) : lesson.content ? (
                renderContent(lesson.content)
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-500">Lesson content will be available soon.</p>
                </div>
              )}
            </article>

            {/* Lesson Actions */}
            <div className="mt-12 pt-8 border-t border-surface-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={handleToggleComplete}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
                    completed
                      ? 'bg-accent-100 text-accent-800 border border-accent-300 hover:bg-accent-200'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {completed ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5" />
                      Mark as Complete
                    </>
                  )}
                </button>

                <button
                  onClick={handleBookmark}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    bookmarked
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'bg-surface-50 text-surface-600 border border-surface-200 hover:bg-surface-100'
                  }`}
                >
                  {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-8 border-t border-surface-200 flex items-center justify-between">
              {previousLesson ? (
                <button
                  onClick={() => navigateToLesson(previousLesson.id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-surface-600 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <span className="text-xs text-surface-400 block">Previous</span>
                    <span className="text-sm font-medium">{previousLesson.title}</span>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <button
                  onClick={() => navigateToLesson(nextLesson.id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-surface-600 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
                >
                  <div className="text-right">
                    <span className="text-xs text-surface-400 block">Next</span>
                    <span className="text-sm font-medium">{nextLesson.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to={`/courses/${courseId}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <div className="text-right">
                    <span className="text-xs text-surface-400 block">Course complete</span>
                    <span className="text-sm font-medium">Back to course</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
