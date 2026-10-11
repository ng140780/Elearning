import { Link } from 'react-router-dom';
import { Route, Clock, BookOpen, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { getAllLearningPaths, getCourseById } from '../services/content';
import { useLearner } from '../context/LearnerContext';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';

export default function LearningPaths() {
  const { state, isLessonCompleted } = useLearner();
  const paths = getAllLearningPaths();
  const hasStartedLearning = state.history.length > 0;

  const getPathProgress = (pathId: string, courseIds: string[]) => {
    if (!hasStartedLearning) return { completed: 0, total: courseIds.length, percentage: 0 };
    
    let completedLessons = 0;
    let totalLessons = 0;
    
    for (const courseId of courseIds) {
      const course = getCourseById(courseId);
      if (course?.modules) {
        for (const mod of course.modules) {
          if (mod.lessons) {
            totalLessons += mod.lessons.length;
            for (const lesson of mod.lessons) {
              if (isLessonCompleted(lesson.id)) {
                completedLessons++;
              }
            }
          }
        }
      }
    }
    
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    };
  };

  if (paths.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Learning Paths</h1>
        <EmptyState
          icon={<Route className="w-8 h-8 text-surface-400" />}
          title="No learning paths available"
          description="Learning paths will be added soon. Check back later!"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Learning Paths</h1>
        <p className="text-surface-500">Structured programmes that guide you through a complete learning journey</p>
      </div>

      {/* Learning Path Cards */}
      <div className="space-y-6">
        {paths.map(path => {
          const progress = getPathProgress(path.id, path.courses);
          const pathCourses = path.courses.map(id => getCourseById(id)).filter(Boolean);
          
          return (
            <div key={path.id} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
              {/* Path Header */}
              <div className="p-6 border-b border-surface-100">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Route className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <Link to={`/learning-paths/${path.id}`} className="text-xl font-bold text-surface-900 hover:text-primary-700 transition-colors mb-1 block">
                      {path.title}
                    </Link>
                    <p className="text-surface-500 text-sm mb-4">{path.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-surface-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {path.courses.length} courses
                      </span>
                      {path.estimatedHours && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          ~{path.estimatedHours} hours
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {path.difficulty}
                      </span>
                    </div>

                    {hasStartedLearning && progress.total > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-surface-500">
                            {progress.completed} of {progress.total} lessons completed
                          </span>
                          <span className="text-xs font-medium text-primary-600">{progress.percentage}%</span>
                        </div>
                        <ProgressBar percentage={progress.percentage} size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Courses in Path */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-surface-700 mb-3">Courses in this path</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {pathCourses.map((course, index) => {
                    if (!course) return null;
                    const courseLessons = course.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0;
                    const completedCount = course.modules?.reduce((s, m) => 
                      s + (m.lessons?.filter(l => isLessonCompleted(l.id)).length || 0), 0) || 0;
                    const coursePercent = courseLessons > 0 ? Math.round((completedCount / courseLessons) * 100) : 0;
                    
                    return (
                      <Link
                        key={course.id}
                        to={`/courses/${course.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-surface-100 hover:border-primary-200 hover:bg-primary-50/30 transition-colors group"
                      >
                        <span className="w-7 h-7 bg-surface-100 rounded-full flex items-center justify-center text-xs font-bold text-surface-500 group-hover:bg-primary-100 group-hover:text-primary-700">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-surface-800 truncate group-hover:text-primary-700">
                            {course.title}
                          </p>
                          {hasStartedLearning && courseLessons > 0 && (
                            <p className="text-xs text-surface-400">
                              {coursePercent > 0 ? `${coursePercent}% complete` : `${courseLessons} lessons`}
                            </p>
                          )}
                        </div>
                        {coursePercent === 100 && courseLessons > 0 && (
                          <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {path.objectives && path.objectives.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-surface-100">
                    <h3 className="text-sm font-semibold text-surface-700 mb-2">Learning objectives</h3>
                    <ul className="space-y-1">
                      {path.objectives.map((obj, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-surface-600">
                          <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
