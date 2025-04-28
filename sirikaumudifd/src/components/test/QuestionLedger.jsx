function QuestionLedger({ questions, currentQuestion, answers, setCurrentQuestion }) {
    return (
      <div className="w-64 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Question Ledger</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`p-2 rounded text-white text-center ${
                index === currentQuestion
                  ? 'bg-blue-500'
                  : answers[q.id]
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  export default QuestionLedger;