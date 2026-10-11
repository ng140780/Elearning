import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Clock, TrendingUp, BookOpen, ArrowLeft } from 'lucide-react';
import { getCourseById } from '../services/content';

interface QuizAttempt {
  id: string;
  lessonId: string;
  courseId: string;
  questions: any[];
  answers: Record<string, string | number>;
  score: number;
  totalPoints: number;
  percentage: number;
  completedAt: string;
  timeSpent: number;
}

export default function QuizHistory() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quiz_attempts');
    if (stored) {
      setAttempts(JSON.parse(stored));
    }
  }, []);

  // Calculate statistics
  const totalAttempts = attempts.length;
  const averageScore = totalAttempts > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts)
    : 0;
  const bestScore = totalAttempts > 0
    ? Math.max(...attempts.map(a => a.percentage))
    : 0;
  const totalTime = attempts.reduce((sum, a) => sum + a.timeSpent, 0);
  const totalMinutes = Math.floor(totalTime / 60);

  // Group by course
  const attemptsByCourse = attempts.reduce((acc, attempt) => {
    if (!acc[attempt.courseId]) {
      acc[attempt.courseId] = [];
    }
    acc[attempt.courseId].push(attempt);
    return acc;
  }, {} as Record<string, QuizAttempt[]>);

  if (totalAttempts === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/my-learning" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to My Learning
        </Link>
        <div className="text-center py-16">
          <Award className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-surface-900 mb-2">No Quiz Attempts Yet</h2>
          <p className="text-surface-500 mb-6">
            Complete your first quiz to see your performance history here.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/my-learning" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to My Learning
      </Link>

      <h1 className="text-3xl font-bold text-surface-900 mb-2">Quiz History</h1>
      <p className="text-surface-500 mb-8">Track your quiz performance and improvement over time</p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{totalAttempts}</p>
              <p className="text-xs text-surface-500">Total Quizzes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{averageScore}%</p>
              <p className="text-xs text-surface-500">Average Score</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{bestScore}%</p>
              <p className="text-xs text-surface-500">Best Score</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-900">{totalMinutes}m</p>
              <p className="text-xs text-surface-500">Total Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attempts by Course */}
      <div className="space-y-6">
        {Object.entries(attemptsByCourse).map(([courseId, courseAttempts]) => {
          const course = getCourseById(courseId);
          if (!course) return null;

          return (
            <div key={courseId} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-200 bg-surface-50">
                <h2 className="text-lg font-semibold text-surface-900">{course.title}</h2>
                <p className="text-sm text-surface-500 mt-1">
                  {courseAttempts.length} {courseAttempts.length === 1 ? 'attempt' : 'attempts'}
                </p>
              </div>
              <div className="divide-y divide-surface-100">
                {courseAttempts
                  .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                  .map((attempt) => {
                    const minutes = Math.floor(attempt.timeSpent / 60);
                    const seconds = attempt.timeSpent % 60;
                    const date = new Date(attempt.completedAt);

                    return (
                      <div key={attempt.id} className="px-6 py-4 hover:bg-surface-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                attempt.percentage >= 80
                                  ? 'bg-accent-100'
                                  : attempt.percentage >= 60
                                  ? 'bg-amber-100'
                                  : 'bg-red-100'
                              }`}>
                                <Award className={`w-5 h-5 ${
                                  attempt.percentage >= 80
                                    ? 'text-accent-600'
                                    : attempt.percentage >= 60
                                    ? 'text-amber-600'
                                    : 'text-red-600'
                                }`} />
                              </div>
                              <div>
                                <p className="font-medium text-surface-900">
                                  {attempt.score}/{attempt.totalPoints} correct
                                </p>
                                <p className="text-xs text-surface-500">
                                  {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${
                              attempt.percentage >= 80
                                ? 'text-accent-600'
                                : attempt.percentage >= 60
                                ? 'text-amber-600'
                                : 'text-red-600'
                            }`}>
                              {attempt.percentage}%
                            </p>
                            <p className="text-xs text-surface-500">
                              {minutes}:{seconds.toString().padStart(2, '0')} min
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
