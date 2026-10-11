import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Trash2 } from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import EmptyState from '../components/ui/EmptyState';

export default function Bookmarks() {
  const { state, toggleBookmark } = useLearner();
  const bookmarks = state.bookmarks;

  const handleRemove = (targetId: string, type: 'course' | 'lesson' | 'learning-path') => {
    toggleBookmark({ type, targetId, title: '' });
  };

  const getLink = (bookmark: typeof bookmarks[0]) => {
    switch (bookmark.type) {
      case 'course':
        return `/courses/${bookmark.targetId}`;
      case 'lesson':
        // We need courseId for lesson links - stored in description or we navigate to bookmarks
        return `/courses/${bookmark.targetId}`;
      case 'learning-path':
        return `/learning-paths/${bookmark.targetId}`;
      default:
        return '/';
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Bookmarks</h1>
        <p className="text-surface-500 mb-8">Save courses and lessons to revisit later</p>
        
        <EmptyState
          icon={<Bookmark className="w-8 h-8 text-surface-400" />}
          title="No bookmarks yet"
          description="Bookmark courses or lessons to save them for later. You'll find them here."
          action={{ label: 'Explore Courses', to: '/courses' }}
        />
      </div>
    );
  }

  // Group by type
  const courseBookmarks = bookmarks.filter(b => b.type === 'course');
  const lessonBookmarks = bookmarks.filter(b => b.type === 'lesson');
  const pathBookmarks = bookmarks.filter(b => b.type === 'learning-path');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Bookmarks</h1>
        <p className="text-surface-500">{bookmarks.length} saved {bookmarks.length === 1 ? 'item' : 'items'}</p>
      </div>

      {/* Course Bookmarks */}
      {courseBookmarks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-surface-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-600" />
            Courses ({courseBookmarks.length})
          </h2>
          <div className="space-y-2">
            {courseBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="flex items-center gap-4 bg-white rounded-xl border border-surface-200 p-4 group"
              >
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/courses/${bookmark.targetId}`}
                    className="text-sm font-medium text-surface-800 hover:text-primary-700 transition-colors block truncate"
                  >
                    {bookmark.title}
                  </Link>
                  {bookmark.description && (
                    <p className="text-xs text-surface-400 truncate mt-0.5">{bookmark.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(bookmark.targetId, bookmark.type)}
                  className="p-2 text-surface-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lesson Bookmarks */}
      {lessonBookmarks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-surface-800 mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-accent-600" />
            Lessons ({lessonBookmarks.length})
          </h2>
          <div className="space-y-2">
            {lessonBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="flex items-center gap-4 bg-white rounded-xl border border-surface-200 p-4 group"
              >
                <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-accent-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-800 truncate">{bookmark.title}</p>
                  {bookmark.description && (
                    <p className="text-xs text-surface-400 truncate mt-0.5">{bookmark.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(bookmark.targetId, bookmark.type)}
                  className="p-2 text-surface-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Learning Path Bookmarks */}
      {pathBookmarks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-surface-800 mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-purple-600" />
            Learning Paths ({pathBookmarks.length})
          </h2>
          <div className="space-y-2">
            {pathBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="flex items-center gap-4 bg-white rounded-xl border border-surface-200 p-4 group"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bookmark className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/learning-paths/${bookmark.targetId}`}
                    className="text-sm font-medium text-surface-800 hover:text-primary-700 transition-colors block truncate"
                  >
                    {bookmark.title}
                  </Link>
                </div>
                <button
                  onClick={() => handleRemove(bookmark.targetId, bookmark.type)}
                  className="p-2 text-surface-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
