import { Link } from 'react-router-dom';
import { Clock, BookOpen, BarChart3 } from 'lucide-react';
import { Course } from '../../types';
import { calculateCoursePercentage } from '../../services/progress';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-accent-50 text-accent-600 border-accent-200',
  intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  advanced: 'bg-orange-50 text-orange-700 border-orange-200',
  expert: 'bg-red-50 text-red-700 border-red-200',
};

const subjectColors: Record<string, string> = {
  'computer-science': 'bg-blue-50 text-blue-700',
  'mathematics': 'bg-purple-50 text-purple-700',
  'data-science': 'bg-emerald-50 text-emerald-700',
  'web-development': 'bg-cyan-50 text-cyan-700',
  'design': 'bg-pink-50 text-pink-700',
  'business': 'bg-amber-50 text-amber-700',
  'humanities': 'bg-indigo-50 text-indigo-700',
  'natural-sciences': 'bg-teal-50 text-teal-700',
};

export default function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const progress = showProgress ? calculateCoursePercentage(course) : null;
  const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
  const subjectColor = subjectColors[course.subject] || 'bg-surface-100 text-surface-700';
  const diffColor = difficultyColors[course.difficulty || ''] || 'bg-surface-100 text-surface-600';

  return (
    <Link
      to={`/courses/${course.id}`}
      className="card-hover block bg-white rounded-xl border border-surface-200 overflow-hidden group"
    >
      {/* Thumbnail area */}
      <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl opacity-50">
            {course.subject === 'computer-science' && '💻'}
            {course.subject === 'mathematics' && '📐'}
            {course.subject === 'data-science' && '📊'}
            {course.subject === 'web-development' && '🌐'}
            {course.subject === 'design' && '🎨'}
            {course.subject === 'business' && '📈'}
            {course.subject === 'humanities' && '📚'}
            {course.subject === 'natural-sciences' && '🔬'}
          </div>
        </div>
        {progress !== null && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-200">
            <div
              className="h-full bg-primary-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${subjectColor}`}>
            {course.subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {course.difficulty && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${diffColor}`}>
              {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-surface-900 group-hover:text-primary-700 transition-colors mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-surface-500 line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-surface-400">
          {course.estimatedHours && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.estimatedHours}h
            </span>
          )}
          {totalLessons > 0 && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {totalLessons} lessons
            </span>
          )}
          {progress !== null && progress > 0 && (
            <span className="flex items-center gap-1 text-primary-600 font-medium">
              <BarChart3 className="w-3.5 h-3.5" />
              {progress}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
