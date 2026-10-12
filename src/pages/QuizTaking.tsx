import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Award, RotateCcw } from 'lucide-react';
import { getLessonWithContext } from '../services/content';
import { useLearner } from '../context/LearnerContext';
import type { QuizQuestion } from '../types';

interface QuizAttempt {
  id: string;
  lessonId: string;
  courseId: string;
  questions: QuizQuestion[];
  answers: Record<string, string | number>;
  score: number;
  totalPoints: number;
  percentage: number;
  completedAt: string;
  timeSpent: number; // seconds
}

export default function QuizTaking() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { addToHistory, isEnrolled } = useLearner();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [quizContext, setQuizContext] = useState<any>(null);

  useEffect(() => {
    // Check if user is enrolled
    if (courseId && !isEnrolled(courseId)) {
      navigate(`/courses/${courseId}`, { replace: true });
      return;
    }

    if (courseId && lessonId) {
      const context = getLessonWithContext(courseId, lessonId);
      if (context && context.lesson.contentType === 'quiz' && context.lesson.quizQuestions) {
        setQuizContext(context);
        addToHistory({
          type: 'lesson',
          targetId: lessonId,
          courseId,
          title: `${context.lesson.title} - Quiz`,
          description: context.course.title,
        });
      } else {
        navigate(`/learn/${courseId}/${lessonId}`);
      }
    }
  }, [courseId, lessonId]);

  if (!quizContext) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-surface-600">Loading quiz...</p>
      </div>
    );
  }

  const { lesson, course, previousLesson, nextLesson } = quizContext;
  const questions = lesson.quizQuestions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    const score = calculateScore();
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // Save quiz attempt
    const attempt: QuizAttempt = {
      id: `quiz-${Date.now()}`,
      lessonId: lesson.id,
      courseId: course.id,
      questions,
      answers,
      score: score.correct,
      totalPoints: score.total,
      percentage: score.percentage,
      completedAt: new Date().toISOString(),
      timeSpent,
    };

    // Save to localStorage
    const attempts = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
    attempts.push(attempt);
    localStorage.setItem('quiz_attempts', JSON.stringify(attempts));

    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    questions.forEach((question: QuizQuestion) => {
      const points = question.points || 1;
      total += points;

      const userAnswer = answers[question.id];
      if (userAnswer !== undefined) {
        if (question.type === 'multiple-choice') {
          if (userAnswer === question.correctAnswer) {
            correct += points;
          }
        } else if (question.type === 'true-false') {
          const correctBool = String(question.correctAnswer) === 'true';
          const userBool = String(userAnswer) === 'true';
          if (correctBool === userBool) {
            correct += points;
          }
        } else if (question.type === 'short-answer') {
          const correctText = String(question.correctAnswer).toLowerCase().trim();
          const userText = String(userAnswer).toLowerCase().trim();
          if (correctText === userText) {
            correct += points;
          }
        }
      }
    });

    return {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Quiz Complete!</h1>
              <p className="text-primary-100">{lesson.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-primary-100 text-sm mb-1">Score</p>
              <p className="text-3xl font-bold">{score.correct}/{score.total}</p>
              <p className="text-primary-100 text-sm">{score.percentage}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-primary-100 text-sm mb-1">Time</p>
              <p className="text-3xl font-bold">{minutes}:{seconds.toString().padStart(2, '0')}</p>
              <p className="text-primary-100 text-sm">minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-primary-100 text-sm mb-1">Questions</p>
              <p className="text-3xl font-bold">{totalQuestions}</p>
              <p className="text-primary-100 text-sm">total</p>
            </div>
          </div>
        </div>

        {/* Review Questions */}
        <div className="bg-white rounded-xl border border-surface-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-surface-900 mb-4">Review Your Answers</h2>
          <div className="space-y-4">
            {questions.map((question: QuizQuestion, index: number) => {
              const userAnswer = answers[question.id];
              const isCorrect = checkAnswer(question, userAnswer);

              return (
                <div key={question.id} className={`p-4 rounded-lg border-2 ${
                  isCorrect ? 'border-accent-200 bg-accent-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-surface-900 mb-2">
                        Question {index + 1}: {question.question}
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Your answer: </span>
                          <span className={isCorrect ? 'text-accent-700' : 'text-red-700'}>
                            {formatAnswer(question, userAnswer)}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p>
                            <span className="font-medium">Correct answer: </span>
                            <span className="text-accent-700">
                              {formatAnswer(question, question.correctAnswer)}
                            </span>
                          </p>
                        )}
                        {question.explanation && (
                          <div className="mt-3 p-3 bg-white rounded border border-surface-200">
                            <p className="text-xs font-medium text-surface-700 mb-1">Explanation:</p>
                            <p className="text-sm text-surface-600">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Quiz
          </button>
          <Link
            to={`/learn/${courseId}/${lessonId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300"
          >
            Back to Lesson
          </Link>
          {nextLesson && (
            <Link
              to={`/learn/${courseId}/${nextLesson.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700"
            >
              Next Lesson
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Quiz Header */}
      <div className="mb-6">
        <Link
          to={`/learn/${courseId}/${lessonId}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lesson
        </Link>
        <h1 className="text-2xl font-bold text-surface-900 mb-2">{lesson.title}</h1>
        <p className="text-surface-500">{course.title}</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-surface-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-surface-700">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-surface-500">
            {Object.keys(answers).length} answered
          </span>
        </div>
        <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl border border-surface-200 p-6 mb-6">
        <div className="mb-6">
          <p className="text-xs font-medium text-surface-500 mb-2">
            {currentQuestion.type === 'multiple-choice' && 'Multiple Choice'}
            {currentQuestion.type === 'true-false' && 'True or False'}
            {currentQuestion.type === 'short-answer' && 'Short Answer'}
          </p>
          <h2 className="text-xl font-semibold text-surface-900">
            {currentQuestion.question}
          </h2>
          {currentQuestion.points && currentQuestion.points > 1 && (
            <p className="text-sm text-surface-500 mt-2">
              ({currentQuestion.points} points)
            </p>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <>
              {currentQuestion.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion.id] === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion.id] === index
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-surface-300'
                    }`}>
                      {answers[currentQuestion.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-surface-800">{option}</span>
                  </div>
                </button>
              ))}
            </>
          )}

          {currentQuestion.type === 'true-false' && (
            <>
              <button
                onClick={() => handleAnswerSelect(currentQuestion.id, 'true')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === 'true'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion.id] === 'true'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-surface-300'
                  }`}>
                    {answers[currentQuestion.id] === 'true' && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-surface-800">True</span>
                </div>
              </button>
              <button
                onClick={() => handleAnswerSelect(currentQuestion.id, 'false')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === 'false'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion.id] === 'false'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-surface-300'
                  }`}>
                    {answers[currentQuestion.id] === 'false' && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-surface-800">False</span>
                </div>
              </button>
            </>
          )}

          {currentQuestion.type === 'short-answer' && (
            <input
              type="text"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-5 py-2.5 bg-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// Helper functions
function checkAnswer(question: QuizQuestion, userAnswer: string | number | undefined): boolean {
  if (userAnswer === undefined) return false;

  if (question.type === 'multiple-choice') {
    return userAnswer === question.correctAnswer;
  } else if (question.type === 'true-false') {
    const correctBool = String(question.correctAnswer) === 'true';
    const userBool = String(userAnswer) === 'true';
    return correctBool === userBool;
  } else if (question.type === 'short-answer') {
    const correctText = String(question.correctAnswer).toLowerCase().trim();
    const userText = String(userAnswer).toLowerCase().trim();
    return correctText === userText;
  }
  return false;
}

function formatAnswer(question: QuizQuestion, answer: string | number | undefined): string {
  if (answer === undefined) return 'No answer';

  if (question.type === 'multiple-choice' && question.options) {
    const index = typeof answer === 'number' ? answer : parseInt(String(answer));
    return question.options[index] || 'Unknown';
  } else if (question.type === 'true-false') {
    return String(answer) === 'true' ? 'True' : 'False';
  } else {
    return String(answer);
  }
}
