import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, ArrowRight, BookOpen, Compass, BarChart3, Route, Clock, TrendingUp } from 'lucide-react';
import { getAllCourses, getAllSubjects, getAllLearningPaths } from '../services/content';
import { getInProgressCourses } from '../services/progress';
import CourseCard from '../components/ui/CourseCard';
import { useLearner } from '../context/LearnerContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { state } = useLearner();
  
  const courses = getAllCourses();
  const subjects = getAllSubjects();
  const learningPaths = getAllLearningPaths();
  const inProgress = getInProgressCourses(courses);
  const hasStartedLearning = state.history.length > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const recentItems = state.history.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Learn without limits
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl">
              Explore courses, follow structured learning paths, and track your progress. 
              Build knowledge at your own pace with a platform designed for focused learning.
            </p>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="flex max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, topics, or skills..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-l-xl text-surface-800 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-primary-800 text-white font-medium rounded-r-xl hover:bg-primary-900 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                <Compass className="w-4 h-4" />
                Explore Courses
              </Link>
              <Link
                to="/learning-paths"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                <Route className="w-4 h-4" />
                Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      {hasStartedLearning && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-surface-900">Continue Learning</h2>
              <p className="text-surface-500 mt-1">Pick up where you left off</p>
            </div>
            <Link to="/my-learning" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {inProgress.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgress.slice(0, 3).map(({ course, progress }) => (
                <Link
                  key={course.id}
                  to={progress.lastLessonId 
                    ? `/learn/${course.id}/${progress.lastLessonId}`
                    : `/courses/${course.id}`
                  }
                  className="card-hover bg-white rounded-xl border border-surface-200 p-5 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-surface-900 group-hover:text-primary-700 transition-colors truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-surface-500 mt-1">
                        {progress.completedLessons.length} of {progress.totalLessons} lessons
                      </p>
                      <div className="mt-3">
                        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full transition-all"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-surface-400 mt-1">{progress.percentage}% complete</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-200 p-8 text-center">
              <Clock className="w-10 h-10 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-600 font-medium">No courses in progress</p>
              <p className="text-surface-400 text-sm mt-1">Start a course to see it here</p>
            </div>
          )}
        </section>
      )}

      {/* Recently Accessed */}
      {recentItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-surface-900">Recently Accessed</h2>
            <Link to="/history" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
              View history <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentItems.map(item => (
              <Link
                key={item.id}
                to={item.type === 'lesson' && item.courseId
                  ? `/learn/${item.courseId}/${item.targetId}`
                  : `/courses/${item.targetId}`
                }
                className="card-hover bg-white rounded-lg border border-surface-200 p-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-surface-100 rounded-lg flex items-center justify-center">
                    {item.type === 'lesson' ? <BookOpen className="w-4 h-4 text-surface-500" /> : <Compass className="w-4 h-4 text-surface-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-800 truncate group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-surface-400">
                      {new Date(item.accessedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-surface-900">Featured Courses</h2>
            <p className="text-surface-500 mt-1">Start your learning journey</p>
          </div>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map(course => (
            <CourseCard key={course.id} course={course} showProgress={hasStartedLearning} />
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="bg-white border-y border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-surface-900">Browse by Subject</h2>
              <p className="text-surface-500 mt-1">Find courses in your area of interest</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {subjects.filter(s => s.courseCount && s.courseCount > 0).map(subject => (
              <Link
                key={subject.id}
                to={`/courses?subject=${subject.id}`}
                className="card-hover flex items-center gap-3 p-4 bg-surface-50 rounded-xl border border-surface-100 group hover:border-primary-200"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div>
                  <p className="font-medium text-surface-800 group-hover:text-primary-700 transition-colors text-sm">
                    {subject.name}
                  </p>
                  <p className="text-xs text-surface-400">
                    {subject.courseCount} {subject.courseCount === 1 ? 'course' : 'courses'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-surface-900">Learning Paths</h2>
            <p className="text-surface-500 mt-1">Structured programmes to guide your learning</p>
          </div>
          <Link to="/learning-paths" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.slice(0, 3).map(path => (
            <Link
              key={path.id}
              to={`/learning-paths/${path.id}`}
              className="card-hover bg-white rounded-xl border border-surface-200 p-6 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Route className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 group-hover:text-primary-700 transition-colors">
                    {path.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-surface-500 line-clamp-2 mb-4">{path.description}</p>
              <div className="flex items-center gap-4 text-xs text-surface-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {path.courses.length} courses
                </span>
                {path.estimatedHours && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {path.estimatedHours}h
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {path.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats / CTA for new learners */}
      {!hasStartedLearning && (
        <section className="bg-gradient-to-r from-primary-50 to-primary-100 border-y border-primary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Ready to start learning?</h2>
            <p className="text-surface-600 max-w-2xl mx-auto mb-8">
              Browse our course catalogue, choose a learning path, and begin building your knowledge today. 
              Track your progress and bookmark courses to come back to later.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                <Compass className="w-5 h-5" />
                Explore Courses
              </Link>
              <Link
                to="/learning-paths"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors border border-primary-200"
              >
                <Route className="w-5 h-5" />
                View Learning Paths
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
