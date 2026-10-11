import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Route, Clock, BookOpen, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { getLearningPathById, getCourseById } from '../services/content';
import { useLearner } from '../context/LearnerContext';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';

export default function LearningPathDetail() {
  const { pathId } = useParams<{ pathId: string }>();
  const { isLessonCompleted, state } = useLearner();
  const hasStartedLearning = state.history.length > 0;

  const path = pathId ? getLearningPathById(pathId) : undefined;

  if (!path) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<Route className="w-8 h-8 text-surface-400" />}
          title="Learning path not found"
          description="The learning path you're looking for doesn't exist."
          action={{ label: 'View All Learning Paths', to: '/learning-paths' }}
        />
      </div>
    );
  }

  const pathCourses = path.courses.map(id => getCourseById(id)).filter(Boolean);

  // Calculate progress
  let completedLessons = 0;
  let totalLessons = 0;
  for (const course of pathCourses) {
    if (course?.modules) {
      for (const mod of course.modules) {
        if (mod.lessons) {
          totalLessons += mod.lessons.length;
          for (const lesson of mod.lessons) {
            if (isLessonCompleted(lesson.id)) completedLessons++;
          }
        }
      }
    }
  }
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find first incomplete course
  const firstIncompleteCourse = pathCourses.find(course => {
    if (!course?.modules) return true;
    let courseCompleted = 0;
    let courseTotal = 0;
    for (const mod of course.modules) {
      if (mod.lessons) {
        courseTotal += mod.lessons.length;
        for (const lesson of mod.lessons) {
          if (isLessonCompleted(lesson.id)) courseCompleted++;
        }
      }
    }
    return courseCompleted < courseTotal;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/learning-paths" className="inline-flex items-center gap-1 text-surface-500 hover:text-primary-600 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Learning Paths
        </Link>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 mb-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <Route className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{path.title}</h1>
          </div>
        </div>
        <p className="text-primary-100 text-lg max-w-2xl mb-6">{path.description}</p>
        
        <div className="flex flex-wrap items-center gap-6 text-primary-200 text-sm mb-6">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {path.courses.length} courses
          </span>
          {path.estimatedHours && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              ~{path.estimatedHours} hours
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            {path.difficulty}
          </span>
        </div>

        {hasStartedLearning && totalLessons > 0 && (
          <div className="max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary-200">{completedLessons} of {totalLessons} lessons</span>
              <span className="text-sm font-bold">{progressPercent}%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        {firstIncompleteCourse && (
          <Link
            to={`/courses/${firstIncompleteCourse.id}`}
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-white text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            {progressPercent > 0 ? 'Continue Learning' : 'Start Learning'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Objectives */}
      {path.objectives && path.objectives.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-surface-900 mb-4">Learning Objectives</h2>
          <div className="bg-white rounded-xl border border-surface-200 p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {path.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span className="text-surface-700 text-sm">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Courses */}
      <section>
        <h2 className="text-xl font-bold text-surface-900 mb-4">Courses in this Path</h2>
        <div className="space-y-4">
          {pathCourses.map((course, index) => {
            if (!course) return null;
            const courseLessons = course.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0;
            const courseCompleted = course.modules?.reduce((s, m) =>
              s + (m.lessons?.filter(l => isLessonCompleted(l.id)).length || 0), 0) || 0;
            const coursePercent = courseLessons > 0 ? Math.round((courseCompleted / courseLessons) * 100) : 0;

            return (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="flex items-center gap-4 bg-white rounded-xl border border-surface-200 p-5 group card-hover"
              >
                <span className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-lg font-bold text-primary-700 flex-shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-surface-900 group-hover:text-primary-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-surface-500 mt-1 line-clamp-1">{course.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-surface-400">
                    <span>{courseLessons} lessons</span>
                    {course.estimatedHours && <span>~{course.estimatedHours}h</span>}
                    <span className="capitalize">{course.difficulty}</span>
                  </div>
                  {hasStartedLearning && courseLessons > 0 && (
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 max-w-[200px]">
                        <ProgressBar percentage={coursePercent} size="sm" />
                      </div>
                      <span className="text-xs font-medium text-primary-600">{coursePercent}%</span>
                    </div>
                  )}
                </div>
                {coursePercent === 100 && courseLessons > 0 && (
                  <CheckCircle2 className="w-6 h-6 text-accent-500 flex-shrink-0" />
                )}
                <ArrowRight className="w-5 h-5 text-surface-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
