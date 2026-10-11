import { Link } from 'react-router-dom';
import { GraduationCap, Clock, BookOpen, ArrowRight, Award } from 'lucide-react';
import { getAllPrograms, getProgramProgress } from '../services/content';
import { useLearner } from '../context/LearnerContext';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';

export default function Programs() {
  const { state } = useLearner();
  const programs = getAllPrograms();
  const hasStartedLearning = state.history.length > 0;

  const levelLabels = {
    certificate: 'Certificate',
    diploma: 'Diploma',
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    professional: 'Professional Certificate',
  };

  const levelColors = {
    certificate: 'bg-blue-50 text-blue-700 border-blue-200',
    diploma: 'bg-purple-50 text-purple-700 border-purple-200',
    bachelor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    master: 'bg-amber-50 text-amber-700 border-amber-200',
    professional: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  if (programs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Programs</h1>
        <EmptyState
          icon={<GraduationCap className="w-8 h-8 text-surface-400" />}
          title="No programs available"
          description="Programs will be added soon. Check back later!"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Programs</h1>
        <p className="text-surface-500">Structured degree programs and professional certificates</p>
      </div>

      {/* Programs Grid */}
      <div className="space-y-6">
        {programs.map(program => {
          const progress = hasStartedLearning ? getProgramProgress(program.id) : null;
          
          return (
            <div key={program.id} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
              {/* Program Header */}
              <div className="p-6 border-b border-surface-100">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-7 h-7 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${levelColors[program.level]}`}>
                        {levelLabels[program.level]}
                      </span>
                    </div>
                    <Link to={`/programs/${program.id}`} className="text-xl font-bold text-surface-900 hover:text-primary-700 transition-colors mb-1 block">
                      {program.title}
                    </Link>
                    <p className="text-surface-500 text-sm mb-4">{program.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-surface-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {program.courses.length} courses
                      </span>
                      {program.totalCredits && (
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {program.totalCredits} credits
                        </span>
                      )}
                      {program.estimatedDuration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {program.estimatedDuration}
                        </span>
                      )}
                    </div>

                    {progress && progress.totalCourses > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-surface-500">
                            {progress.completedCourses} of {progress.totalCourses} courses • {progress.completedCredits} of {progress.totalCredits} credits
                          </span>
                          <span className="text-xs font-medium text-primary-600">{progress.percentage}%</span>
                        </div>
                        <ProgressBar percentage={progress.percentage} size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Preview */}
              <div className="p-6 bg-surface-50">
                <h3 className="text-sm font-semibold text-surface-700 mb-3">
                  {program.courses.length <= 3 ? 'Courses' : `First ${Math.min(3, program.courses.length)} of ${program.courses.length} courses`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {program.courses.slice(0, 3).map((pc, index) => (
                    <span key={pc.courseId} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-surface-200 text-xs">
                      <span className="text-surface-400">{index + 1}.</span>
                      <span className="text-surface-700">{pc.courseId}</span>
                      {pc.required ? (
                        <span className="text-primary-600 ml-1">•</span>
                      ) : (
                        <span className="text-surface-400 ml-1">(elective)</span>
                      )}
                    </span>
                  ))}
                  {program.courses.length > 3 && (
                    <span className="inline-flex items-center px-3 py-1.5 text-xs text-surface-500">
                      +{program.courses.length - 3} more
                    </span>
                  )}
                </div>
                <Link
                  to={`/programs/${program.id}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View full program <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
