import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LearnerProvider } from './context/LearnerContext';
import ThemeProvider from './ThemeProvider';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ExploreCourses from './pages/ExploreCourses';
import CourseDetails from './pages/CourseDetails';
import MyLearning from './pages/MyLearning';
import LearningEnvironment from './pages/LearningEnvironment';
import LearningPaths from './pages/LearningPaths';
import LearningPathDetail from './pages/LearningPathDetail';
import Bookmarks from './pages/Bookmarks';
import History from './pages/History';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LearnerProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Learning environment has its own layout (no header/footer) */}
            <Route path="/learn/:courseId/:lessonId" element={<LearningEnvironment />} />
            
            {/* All other pages use the main layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<ExploreCourses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/learning-paths/:pathId" element={<LearningPathDetail />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LearnerProvider>
  );
}

export default App;
