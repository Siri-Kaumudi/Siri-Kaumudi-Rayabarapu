import { useState } from 'react';
import QuestionLedger from './QuestionLedger';
import NumericKeypad from './NumericKeypad';

function QuestionLayout({ test }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = test.questions[currentQuestion];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">{test.sections[question.section].name}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">{question.text}</p>
          {question.type === 'MCQ' ? (
            <div>
              {question.options.map((option, index) => (
                <label key={index} className="block mb-2">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={() => handleAnswer(question.id, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <NumericKeypad
              onSubmit={(value) => handleAnswer(question.id, value)}
            />
          )}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={currentQuestion === test.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <QuestionLedger
        questions={test.questions}
        currentQuestion={currentQuestion}
        answers={answers}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
}

export default QuestionLayout;