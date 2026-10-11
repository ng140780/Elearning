import { useLearner } from '../context/LearnerContext';
import { Moon, Sun, Monitor, Type, RotateCcw, Database } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const { state, updateSettings, clearData } = useLearner();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [lessonView, setLessonView] = useState('reading');
  const [autoAdvance, setAutoAdvance] = useState(false);

  const handleReset = () => {
    clearData();
    setShowConfirmReset(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Settings</h1>
        <p className="text-surface-500">Customize your learning experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <section className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-primary-600" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {(['light', 'dark', 'system'] as const).map(theme => {
                  const icons = { light: Sun, dark: Moon, system: Monitor };
                  const Icon = icons[theme];
                  return (
                    <button
                      key={theme}
                      onClick={() => updateSettings({ theme })}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                        state.settings.theme === theme
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="capitalize">{theme}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Font Size</label>
              <div className="grid grid-cols-3 gap-3">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updateSettings({ fontSize: size })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                      state.settings.fontSize === size
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'
                    }`}
                  >
                    <Type className="w-4 h-4" />
                    <span className="capitalize">{size}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Learning Preferences */}
        <section className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary-600" />
            Learning Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-surface-700">Default lesson view</p>
                <p className="text-xs text-surface-400 mt-0.5">Choose how lessons are displayed by default</p>
              </div>
              <select
                value={lessonView}
                onChange={(e) => setLessonView(e.target.value)}
                className="px-3 py-2 bg-white border border-surface-200 rounded-lg text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="reading">Reading view</option>
                <option value="focus">Focus mode</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-surface-700">Auto-advance lessons</p>
                <p className="text-xs text-surface-400 mt-0.5">Automatically go to next lesson after completion</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAdvance}
                  onChange={(e) => setAutoAdvance(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-red-500" />
            Data Management
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-surface-700">Learning data</p>
                <p className="text-xs text-surface-400 mt-0.5">
                  Progress, bookmarks, and history are stored locally in your browser
                </p>
              </div>
            </div>
            
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                Reset All Learning Data
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 font-medium mb-3">
                  Are you sure? This will permanently delete all your progress, bookmarks, and history.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-4 py-2 bg-white text-surface-700 border border-surface-200 rounded-lg text-sm font-medium hover:bg-surface-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* About */}
        <section className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="text-lg font-semibold text-surface-900 mb-4">About</h2>
          <div className="text-sm text-surface-500 space-y-2">
            <p><strong className="text-surface-700">LearnHub</strong> — Personal Learning Platform</p>
            <p>Version 1.0.0</p>
            <p className="text-xs text-surface-400 mt-4">
              This is a personal learning environment. All data is stored locally in your browser. 
              No account or registration is required. Your data will persist between sessions but 
              will be lost if you clear your browser data.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
