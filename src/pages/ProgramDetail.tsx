import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Clock, BookOpen, Award, CheckCircle2, Lock, ChevronDown, ChevronRight } from 'lucide-react';
import { getProgramById, getProgramCourses, getProgramProgress, getCourseById } from '../services/content';
import { useLearner } from '../context/LearnerContext';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';
import { useState } from 'react';

export default function ProgramDetail() {
  const { programId } = useParams<{ programId: string }>();
  const { isLessonCompleted, state } = useLearner();
  const hasStartedLearning = state.history.length > 0;
  const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>({});

  const program = programId ? getProgramById(programId) : undefined;

  if (!program) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<GraduationCap className="w-8 h-8 text-surface-400" />}
          title="Program not found"
          description="The program you're looking for doesn't exist."
          action={{ label: 'View All Programs', to: '/programs' }}
        />
      </div>
    );
  }

  const programCourses = getProgramCourses(program.id);
  const progress = hasStartedLearning ? getProgramProgress(program.id) : null;

  const levelLabels = {
    certificate: 'Certificate',
    diploma: 'Diploma',
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    professional: 'Professional Certificate',
  };

  // Group courses by year
  const coursesByYear: Record<number, typeof programCourses> = {};
  programCourses.forEach(pc => {
    const year = pc.programCourse.year || 1;
    if (!coursesByYear[year]) coursesByYear[year] = [];
    coursesByYear[year].push(pc);
  });

  // Check if a course is completed
  const isCourseCompleted = (courseId: string) => {
    const course = getCourseById(courseId);
    if (!course?.modules) return false;
    const totalLessons = course.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
    if (totalLessons === 0) return false;
    const completedLessons = course.modules.reduce((sum, m) => 
      sum + (m.lessons?.filter(l => isLessonCompleted(l.id)).length || 0), 0);
    return completedLessons === totalLessons;
  };

  // Check if prerequisites are met
  const arePrerequisitesMet = (prerequisites?: string[]) => {
    if (!prerequisites || prerequisites.length === 0) return true;
    return prerequisites.every(prereqId => isCourseCompleted(prereqId));
  };

  // Find first incomplete course with met prerequisites
  const firstAvailableCourse = programCourses.find(pc => {
    if (isCourseCompleted(pc.programCourse.courseId)) return false;
    return arePrerequisitesMet(pc.programCourse.prerequisites);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/programs" className="inline-flex items-center gap-1 text-surface-500 hover:text-primary-600 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Programs
        </Link>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 mb-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20">
              {levelLabels[program.level]}
            </span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{program.title}</h1>
        <p className="text-primary-100 text-lg max-w-3xl mb-6">{program.description}</p>
        
        <div className="flex flex-wrap items-center gap-6 text-primary-200 text-sm mb-6">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {program.courses.length} courses
          </span>
          {program.totalCredits && (
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              {program.totalCredits} credits
            </span>
          )}
          {program.estimatedDuration && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {program.estimatedDuration}
            </span>
          )}
        </div>

        {progress && progress.totalCourses > 0 && (
          <div className="max-w-md mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary-200">
                {progress.completedCourses} of {progress.totalCourses} courses • {progress.completedCredits} of {progress.totalCredits} credits
              </span>
              <span className="text-sm font-bold">{progress.percentage}%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
            </div>
          </div>
        )}

        {firstAvailableCourse && (
          <Link
            to={`/courses/${firstAvailableCourse.programCourse.courseId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            {progress && progress.percentage > 0 ? 'Continue Program' : 'Start Program'}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        )}
      </div>

      {/* Objectives */}
      {program.objectives && program.objectives.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-surface-900 mb-4">Learning Objectives</h2>
          <div className="bg-white rounded-xl border border-surface-200 p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span className="text-surface-700 text-sm">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Program Structure */}
      <section>
        <h2 className="text-xl font-bold text-surface-900 mb-4">Program Structure</h2>
        
        {Object.keys(coursesByYear).length > 1 ? (
          // Year-based structure with accordion
          <div className="space-y-6">
            {Object.entries(coursesByYear).sort(([a], [b]) => Number(a) - Number(b)).map(([year, courses]) => {
              const isExpanded = expandedYears[Number(year)] !== false; // Default to expanded
              const completedCount = courses.filter(({ programCourse }) => isCourseCompleted(programCourse.courseId)).length;
              
              return (
                <div key={year} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedYears(prev => ({ ...prev, [Number(year)]: !isExpanded }))}
                    className="w-full bg-surface-50 px-6 py-4 border-b border-surface-200 hover:bg-surface-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-surface-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-surface-600" />
                        )}
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-surface-900">Year {year}</h3>
                          <p className="text-sm text-surface-500">
                            {courses.reduce((sum, c) => sum + c.programCourse.credits, 0)} credits • {courses.length} courses • {completedCount} completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary-600">
                          {Math.round((completedCount / courses.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="p-6">
                      <div className="space-y-3">
                        {courses.map(({ course, programCourse }) => {
                          const completed = isCourseCompleted(programCourse.courseId);
                          const prereqsMet = arePrerequisitesMet(programCourse.prerequisites);
                          const locked = !prereqsMet && !completed;
                          
                          return (
                            <Link
                              key={programCourse.courseId}
                              to={locked ? '#' : `/courses/${programCourse.courseId}`}
                              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                                locked
                                  ? 'bg-surface-50 border-surface-200 opacity-60 cursor-not-allowed'
                                  : completed
                                  ? 'bg-accent-50 border-accent-200 hover:bg-accent-100'
                                  : 'bg-white border-surface-200 hover:border-primary-200 hover:bg-primary-50/30'
                              }`}
                              onClick={(e) => locked && e.preventDefault()}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                completed ? 'bg-accent-500' : locked ? 'bg-surface-200' : 'bg-primary-50'
                              }`}>
                                {completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                ) : locked ? (
                                  <Lock className="w-5 h-5 text-surface-500" />
                                ) : (
                                  <BookOpen className="w-5 h-5 text-primary-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className={`font-medium ${locked ? 'text-surface-500' : 'text-surface-900'}`}>
                                    {course.title}
                                  </h4>
                                  {!programCourse.required && (
                                    <span className="text-xs px-2 py-0.5 bg-surface-100 text-surface-600 rounded">Elective</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-surface-500">
                                  <span>{programCourse.credits} credits</span>
                                  {programCourse.semester && <span className="capitalize">{programCourse.semester}</span>}
                                  {programCourse.prerequisites && programCourse.prerequisites.length > 0 && (
                                    <span className={locked ? 'text-red-500' : ''}>
                                      Requires: {programCourse.prerequisites.map(id => getCourseById(id)?.title || id).join(', ')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Sequential structure (no years)
          <div className="bg-white rounded-xl border border-surface-200 p-6">
            <div className="space-y-3">
              {programCourses.map(({ course, programCourse }, index) => {
                const completed = isCourseCompleted(programCourse.courseId);
                const prereqsMet = arePrerequisitesMet(programCourse.prerequisites);
                const locked = !prereqsMet && !completed;
                
                return (
                  <Link
                    key={programCourse.courseId}
                    to={locked ? '#' : `/courses/${programCourse.courseId}`}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                      locked
                        ? 'bg-surface-50 border-surface-200 opacity-60 cursor-not-allowed'
                        : completed
                        ? 'bg-accent-50 border-accent-200 hover:bg-accent-100'
                        : 'bg-white border-surface-200 hover:border-primary-200 hover:bg-primary-50/30'
                    }`}
                    onClick={(e) => locked && e.preventDefault()}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      completed ? 'bg-accent-500 text-white' : locked ? 'bg-surface-200 text-surface-500' : 'bg-primary-50 text-primary-700'
                    }`}>
                      {completed ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${locked ? 'text-surface-500' : 'text-surface-900'}`}>
                          {course.title}
                        </h4>
                        {!programCourse.required && (
                          <span className="text-xs px-2 py-0.5 bg-surface-100 text-surface-600 rounded">Elective</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-surface-500">
                        <span>{programCourse.credits} credits</span>
                        {programCourse.prerequisites && programCourse.prerequisites.length > 0 && (
                          <span className={locked ? 'text-red-500' : ''}>
                            Requires: {programCourse.prerequisites.map(id => getCourseById(id)?.title || id).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
