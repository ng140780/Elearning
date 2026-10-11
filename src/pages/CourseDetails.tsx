import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Play, Bookmark, BookmarkCheck, ChevronRight, Target, AlertCircle } from 'lucide-react';
import { getCourseById, getAllLessonsForCourse } from '../services/content';
import { getFullCourseProgress } from '../services/progress';
import { useLearner } from '../context/LearnerContext';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';
import { useEffect } from 'react';

export default function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark, isLessonCompleted } = useLearner();

  const course = courseId ? getCourseById(courseId) : undefined;
  const progress = course ? getFullCourseProgress(course) : null;
  const bookmarked = courseId ? isBookmarked(courseId, 'course') : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<BookOpen className="w-8 h-8 text-surface-400" />}
          title="Course not found"
          description="The course you're looking for doesn't exist or has been removed."
          action={{ label: 'Browse Courses', to: '/courses' }}
        />
      </div>
    );
  }

  const allLessons = getAllLessonsForCourse(course.id);
  const firstLesson = allLessons[0];
  const hasStarted = progress && progress.percentage > 0;
  const isCompleted = progress && progress.percentage === 100 && progress.totalLessons > 0;

  const handleBookmark = () => {
    toggleBookmark({
      type: 'course',
      targetId: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
    });
  };

  const handleStartLearning = () => {
    if (progress?.lastLessonId) {
      navigate(`/learn/${course.id}/${progress.lastLessonId}`);
    } else if (firstLesson) {
      navigate(`/learn/${course.id}/${firstLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Course Banner */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link to="/courses" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/20">
                  {course.subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                {course.difficulty && (
                  <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/20">
                    {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-primary-100 text-lg leading-relaxed mb-6">{course.description}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-primary-200 text-sm">
                {course.estimatedHours && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {course.estimatedHours} hours
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {allLessons.length} lessons
                </span>
                {course.modules && (
                  <span className="flex items-center gap-1.5">
                    {course.modules.length} modules
                  </span>
                )}
                {course.provider && (
                  <span>by {course.provider}</span>
                )}
              </div>
            </div>

            {/* Action Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                {progress && progress.totalLessons > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-surface-700">Progress</span>
                      <span className="text-sm font-bold text-primary-600">{progress.percentage}%</span>
                    </div>
                    <ProgressBar percentage={progress.percentage} size="md" />
                    <p className="text-xs text-surface-400 mt-2">
                      {progress.completedLessons.length} of {progress.totalLessons} lessons completed
                    </p>
                  </div>
                )}

                <button
                  onClick={handleStartLearning}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors mb-3"
                >
                  <Play className="w-5 h-5" />
                  {isCompleted ? 'Review Course' : hasStarted ? 'Continue Learning' : 'Start Learning'}
                </button>

                <button
                  onClick={handleBookmark}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors border ${
                    bookmarked
                      ? 'bg-primary-50 border-primary-200 text-primary-700'
                      : 'bg-white border-surface-200 text-surface-700 hover:bg-surface-50'
                  }`}
                >
                  {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Objectives */}
            {course.learningObjectives && course.learningObjectives.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-600" />
                  What You'll Learn
                </h2>
                <div className="bg-white rounded-xl border border-surface-200 p-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                        <span className="text-surface-700 text-sm">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Prerequisites
                </h2>
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-amber-800">
                        <ChevronRight className="w-4 h-4" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Course Structure */}
            <section>
              <h2 className="text-xl font-bold text-surface-900 mb-4">Course Structure</h2>
              <div className="space-y-4">
                {course.modules?.map((module, moduleIndex) => (
                  <div key={module.id} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
                    <div className="p-5 border-b border-surface-100">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-sm font-bold text-primary-700">
                          {moduleIndex + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-surface-900">{module.title}</h3>
                          {module.description && (
                            <p className="text-sm text-surface-500 mt-0.5">{module.description}</p>
                          )}
                        </div>
                        <span className="ml-auto text-xs text-surface-400">
                          {module.lessons?.length || 0} lessons
                        </span>
                      </div>
                    </div>
                    <div className="divide-y divide-surface-100">
                      {module.lessons?.map((lesson, lessonIndex) => {
                        const completed = isLessonCompleted(lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            to={`/learn/${course.id}/${lesson.id}`}
                            className="flex items-center gap-3 px-5 py-3 hover:bg-surface-50 transition-colors group"
                          >
                            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              completed
                                ? 'bg-accent-500 border-accent-500'
                                : 'border-surface-300 group-hover:border-primary-400'
                            }`}>
                              {completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </span>
                            <span className="text-sm text-surface-700 group-hover:text-primary-700 transition-colors flex-1">
                              {lesson.title}
                            </span>
                            <span className="text-xs text-surface-400 capitalize">
                              {lesson.contentType}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl border border-surface-200 p-5">
                <h3 className="font-semibold text-surface-900 mb-4">Course Details</h3>
                <dl className="space-y-3">
                  {course.estimatedHours && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-surface-500">Duration</dt>
                      <dd className="text-sm font-medium text-surface-800">{course.estimatedHours} hours</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-surface-500">Lessons</dt>
                    <dd className="text-sm font-medium text-surface-800">{allLessons.length}</dd>
                  </div>
                  {course.modules && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-surface-500">Modules</dt>
                      <dd className="text-sm font-medium text-surface-800">{course.modules.length}</dd>
                    </div>
                  )}
                  {course.difficulty && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-surface-500">Level</dt>
                      <dd className="text-sm font-medium text-surface-800 capitalize">{course.difficulty}</dd>
                    </div>
                  )}
                  {course.provider && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-surface-500">Provider</dt>
                      <dd className="text-sm font-medium text-surface-800">{course.provider}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
