import { Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import EmptyState from '../components/ui/EmptyState';

export default function History() {
  const { state } = useLearner();
  const history = state.history;

  // Group by date
  const groupedHistory: Record<string, typeof history> = {};
  history.forEach(entry => {
    const date = new Date(entry.accessedAt).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!groupedHistory[date]) {
      groupedHistory[date] = [];
    }
    groupedHistory[date].push(entry);
  });

  // Get unique dates in order
  const dates = Object.keys(groupedHistory).sort((a, b) => {
    return new Date(groupedHistory[b][0].accessedAt).getTime() - new Date(groupedHistory[a][0].accessedAt).getTime();
  });

  if (history.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Learning History</h1>
        <p className="text-surface-500 mb-8">Your recently accessed courses and lessons</p>
        
        <EmptyState
          icon={<Clock className="w-8 h-8 text-surface-400" />}
          title="No history yet"
          description="Start exploring courses and lessons. Your learning activity will appear here."
          action={{ label: 'Explore Courses', to: '/courses' }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Learning History</h1>
        <p className="text-surface-500">{history.length} {history.length === 1 ? 'item' : 'items'} in your history</p>
      </div>

      {/* History List */}
      <div className="space-y-8">
        {dates.map(date => (
          <div key={date}>
            <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">{date}</h2>
            <div className="bg-white rounded-xl border border-surface-200 divide-y divide-surface-100">
              {groupedHistory[date].map(entry => {
                const link = entry.type === 'lesson' && entry.courseId
                  ? `/learn/${entry.courseId}/${entry.targetId}`
                  : `/courses/${entry.targetId}`;
                
                return (
                  <Link
                    key={entry.id}
                    to={link}
                    className="flex items-center gap-4 px-4 py-3.5 hover:bg-surface-50 transition-colors group"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      entry.type === 'lesson' ? 'bg-accent-50' : 'bg-primary-50'
                    }`}>
                      {entry.type === 'lesson'
                        ? <BookOpen className="w-4.5 h-4.5 text-accent-600" />
                        : <Clock className="w-4.5 h-4.5 text-primary-600" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-800 truncate group-hover:text-primary-700 transition-colors">
                        {entry.title}
                      </p>
                      {entry.description && (
                        <p className="text-xs text-surface-400 truncate mt-0.5">{entry.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-surface-400">
                        {new Date(entry.accessedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <ArrowRight className="w-4 h-4 text-surface-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
