import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Sample quiz data - in a real app, this would come from an API
const quizData = {
  id: 1,
  title: 'Introduction to Robotics Quiz',
  questions: [
    {
      id: 1,
      text: 'What is the main purpose of a robot?',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e0e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      options: [
        { id: 'a', text: 'To perform tasks automatically' },
        { id: 'b', text: 'To look like humans' },
        { id: 'c', text: 'To replace all human jobs' },
        { id: 'd', text: 'To entertain people' },
      ],
      correctAnswer: 'a',
    },
    {
      id: 2,
      text: 'Which of these is NOT a basic component of a robot?',
      options: [
        { id: 'a', text: 'Sensors' },
        { id: 'b', text: 'Actuators' },
        { id: 'c', text: 'Processor' },
        { id: 'd', text: 'Solar panels' },
      ],
      correctAnswer: 'd',
    },
    {
      id: 3,
      text: 'What is the first step in programming a robot?',
      video: 'https://example.com/robot-programming.mp4',
      options: [
        { id: 'a', text: 'Writing complex code' },
        { id: 'b', text: 'Understanding the task' },
        { id: 'c', text: 'Buying expensive equipment' },
        { id: 'd', text: 'Designing the robot' },
      ],
      correctAnswer: 'b',
    },
  ],
  passingScore: 2,
};

export default function Quiz() {
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleConfirm = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers, { questionId: currentQuestion.id, answer: selectedAnswer }];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer) => {
      const question = quizData.questions.find(q => q.id === answer.questionId);
      return score + (answer.answer === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const passed = calculateScore() >= quizData.passingScore;

  if (showResults) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Quiz Results</h2>
            <div className="mt-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-indigo-100">
                <span className="text-4xl font-bold text-indigo-600">
                  {calculateScore()}/{quizData.questions.length}
                </span>
              </div>
              <p className="mt-4 text-lg text-gray-600">
                {passed
                  ? 'Congratulations! You passed the quiz.'
                  : 'Keep learning and try again!'}
              </p>
              {passed && (
                <div className="mt-8">
                  <button
                    onClick={() => window.print()}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Download Certificate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{quizData.title}</h2>
            <p className="mt-2 text-gray-600">
              Question {currentQuestionIndex + 1} of {quizData.questions.length}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            {currentQuestion.image && (
              <div className="mb-6">
                <img
                  src={currentQuestion.image}
                  alt="Question illustration"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {currentQuestion.video && (
              <div className="mb-6">
                <video
                  src={currentQuestion.video}
                  controls
                  className="w-full rounded-lg"
                />
              </div>
            )}

            <p className="text-lg font-medium text-gray-900 mb-6">{currentQuestion.text}</p>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedAnswer === option.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium text-gray-900">{option.text}</span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={handleConfirm}
                disabled={!selectedAnswer}
                className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${
                  selectedAnswer
                    ? 'bg-indigo-600 hover:bg-indigo-500'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 