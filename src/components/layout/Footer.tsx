import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LearnHub</span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed">
              Your personal learning platform. Explore courses, track progress, and build knowledge at your own pace.
            </p>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Learning</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-sm hover:text-white transition-colors">Explore Courses</Link></li>
              <li><Link to="/learning-paths" className="text-sm hover:text-white transition-colors">Learning Paths</Link></li>
              <li><Link to="/my-learning" className="text-sm hover:text-white transition-colors">My Learning</Link></li>
              <li><Link to="/bookmarks" className="text-sm hover:text-white transition-colors">Bookmarks</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-surface-400">Help Center</span></li>
              <li><span className="text-sm text-surface-400">Documentation</span></li>
              <li><span className="text-sm text-surface-400">Community</span></li>
              <li><Link to="/history" className="text-sm hover:text-white transition-colors">Learning History</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">About</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-surface-400">About LearnHub</span></li>
              <li><span className="text-sm text-surface-400">Contact Us</span></li>
              <li><span className="text-sm text-surface-400">Privacy Policy</span></li>
              <li><span className="text-sm text-surface-400">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-700">
          <p className="text-sm text-surface-500 text-center">
            © {new Date().getFullYear()} LearnHub. A personal learning platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
