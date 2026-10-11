import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { getAllCourses, getAllSubjects, searchCourses } from '../services/content';
import { Course } from '../types';
import CourseCard from '../components/ui/CourseCard';
import EmptyState from '../components/ui/EmptyState';
import { Compass } from 'lucide-react';
import { useLearner } from '../context/LearnerContext';

type SortOption = 'title' | 'difficulty' | 'hours' | 'lessons';

export default function ExploreCourses() {
  const [searchParams] = useSearchParams();
  const { state } = useLearner();
  const hasStartedLearning = state.history.length > 0;
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [showFilters, setShowFilters] = useState(false);

  // Sync with URL params when they change
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlSubject = searchParams.get('subject') || '';
    if (urlSearch) setSearchQuery(urlSearch);
    if (urlSubject) setSelectedSubject(urlSubject);
  }, [searchParams]);

  const subjects = getAllSubjects();

  const filteredCourses = useMemo(() => {
    let courses: Course[];
    
    if (searchQuery.trim()) {
      courses = searchCourses(searchQuery);
    } else {
      courses = getAllCourses();
    }

    // Filter by subject
    if (selectedSubject) {
      courses = courses.filter(c => c.subject === selectedSubject || c.subjects?.includes(selectedSubject));
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      courses = courses.filter(c => c.difficulty === selectedDifficulty);
    }

    // Sort
    courses = [...courses].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty': {
          const order = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
          return (order[a.difficulty || 'beginner'] || 0) - (order[b.difficulty || 'beginner'] || 0);
        }
        case 'hours':
          return (a.estimatedHours || 0) - (b.estimatedHours || 0);
        case 'lessons': {
          const aLessons = a.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
          const bLessons = b.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
          return bLessons - aLessons;
        }
        default:
          return 0;
      }
    });

    return courses;
  }, [searchQuery, selectedSubject, selectedDifficulty, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setSelectedDifficulty('');
  };

  const hasActiveFilters = searchQuery || selectedSubject || selectedDifficulty;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Explore Courses</h1>
        <p className="text-surface-500">Discover courses across all subjects and difficulty levels</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-surface-200 rounded-lg text-surface-800 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg font-medium text-sm transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-primary-600 text-white rounded-full text-xs flex items-center justify-center">
                {(selectedSubject ? 1 : 0) + (selectedDifficulty ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-white border border-surface-200 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-surface-200 rounded-lg text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-surface-200 rounded-lg text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 bg-white border border-surface-200 rounded-lg text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="title">Title (A-Z)</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="hours">Duration</option>
                  <option value="lessons">Number of Lessons</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-surface-500">
          {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} showProgress={hasStartedLearning} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Compass className="w-8 h-8 text-surface-400" />}
          title="No courses found"
          description={hasActiveFilters
            ? "Try adjusting your search or filters to find what you're looking for."
            : "No courses are available yet. Check back soon!"
          }
          action={hasActiveFilters ? { label: 'Clear filters', to: '/courses' } : undefined}
        />
      )}
    </div>
  );
}
