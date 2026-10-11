import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, CheckCircle2, Clock, ArrowRight, BarChart3, Award } from 'lucide-react';
import { getAllCourses } from '../services/content';
import { getInProgressCourses, getCompletedCourses, getFullCourseProgress } from '../services/progress';
import { useLearner } from '../context/LearnerContext';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';
import CourseCard from '../components/ui/CourseCard';

export default function MyLearning() {
  const { state } = useLearner();
  const courses = getAllCourses();
  const inProgress = getInProgressCourses(courses);
  const completed = getCompletedCourses(courses);
  const hasStartedLearning = state.history.length > 0;

  // Calculate overall stats
  const totalLessons = courses.reduce((sum, c) => sum + (c.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0), 0);
  const completedLessons = Object.values(state.lessonProgress).filter(lp => lp.completed).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Recent history
  const recentHistory = state.history.slice(0, 5);

  if (!hasStartedLearning) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">My Learning</h1>
        <p className="text-surface-500 mb-8">Track your learning progress and continue where you left off</p>
        
        <EmptyState
          icon={<BookOpen className="w-8 h-8 text-surface-400" />}
          title="Start your learning journey"
          description="You haven't started any courses yet. Browse our catalogue to find something interesting and begin learning."
          action={{ label: 'Explore Courses', to: '/courses' }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">My Learning</h1>
        <p className="text-surface-500">Track your progress and continue learning</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{overallProgress}%</p>
              <p className="text-xs text-surface-500">Overall Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{completedLessons}</p>
              <p className="text-xs text-surface-500">Lessons Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{inProgress.length}</p>
              <p className="text-xs text-surface-500">Courses In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{completed.length}</p>
              <p className="text-xs text-surface-500">Courses Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/quiz-history"
          className="bg-white rounded-xl border border-surface-200 p-5 hover:border-primary-200 hover:bg-primary-50/30 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <Award className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-surface-900 group-hover:text-primary-700 transition-colors">Quiz History</p>
              <p className="text-xs text-surface-500">View your quiz performance and analytics</p>
            </div>
          </div>
        </Link>
        <Link
          to="/history"
          className="bg-white rounded-xl border border-surface-200 p-5 hover:border-primary-200 hover:bg-primary-50/30 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-surface-100 rounded-lg flex items-center justify-center group-hover:bg-surface-200 transition-colors">
              <Clock className="w-5 h-5 text-surface-600" />
            </div>
            <div>
              <p className="font-semibold text-surface-900 group-hover:text-primary-700 transition-colors">Learning History</p>
              <p className="text-xs text-surface-500">View all your recent activity</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Continue Learning */}
      {inProgress.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-surface-900">Continue Learning</h2>
          </div>
          <div className="space-y-3">
            {inProgress.map(({ course, progress }) => (
              <Link
                key={course.id}
                to={progress.lastLessonId
                  ? `/learn/${course.id}/${progress.lastLessonId}`
                  : `/courses/${course.id}`
                }
                className="card-hover flex items-center gap-4 bg-white rounded-xl border border-surface-200 p-4 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-7 h-7 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-surface-900 group-hover:text-primary-700 transition-colors truncate">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="text-sm text-surface-500">
                      {progress.completedLessons.length} / {progress.totalLessons} lessons
                    </span>
                    <div className="flex-1 max-w-[200px]">
                      <ProgressBar percentage={progress.percentage} size="sm" />
                    </div>
                    <span className="text-sm font-medium text-primary-600">{progress.percentage}%</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-surface-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Completed Courses */}
      {completed.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-surface-900">Completed</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map(({ course }) => (
              <CourseCard key={course.id} course={course} showProgress />
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      {recentHistory.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-surface-900">Recent Activity</h2>
            <Link to="/history" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-surface-200 divide-y divide-surface-100">
            {recentHistory.map(entry => (
              <Link
                key={entry.id}
                to={entry.type === 'lesson' && entry.courseId
                  ? `/learn/${entry.courseId}/${entry.targetId}`
                  : `/courses/${entry.targetId}`
                }
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-surface-100 rounded-lg flex items-center justify-center">
                  {entry.type === 'lesson'
                    ? <BookOpen className="w-4 h-4 text-surface-500" />
                    : <Clock className="w-4 h-4 text-surface-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-800 truncate group-hover:text-primary-700 transition-colors">
                    {entry.title}
                  </p>
                  {entry.description && (
                    <p className="text-xs text-surface-400 truncate">{entry.description}</p>
                  )}
                </div>
                <span className="text-xs text-surface-400 flex-shrink-0">
                  {new Date(entry.accessedAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-surface-900">All Courses</h2>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
            Explore more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} showProgress />
          ))}
        </div>
      </section>
    </div>
  );
}
