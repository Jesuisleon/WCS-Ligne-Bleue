import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function Quiz({ data }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleValidate = (correct) => {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      {data.map((item, index) => (
        <Question
          key={item.id}
          questionIndex={index}
          currentQuestion={currentQuestion}
          question={item.question}
          answers={item.answers}
          onValidate={(correct) => handleValidate(correct)}
        />
      ))}
      {currentQuestion === data.length && (
        <div className="pt-2">
          <h2 className="text-xl font-bold w-fit">
            {`Vous avez trouvé ${score} réponse sur ${data.length}`}
          </h2>
        </div>
      )}
    </div>
  );
}

function Question({
  questionIndex,
  currentQuestion,
  question,
  answers,
  onValidate,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleValidate = () => {
    if (!selectedAnswer) {
      return;
    }
    if (!isSubmitted) {
      setIsSubmitted(true);
      setIsCorrect(selectedAnswer === "correct");
    }
    if (isSubmitted) {
      onValidate(isCorrect);
    }
  };

  return (
    <div>
      <div
        className={`border-b-2 p-1 flex gap-4 items-center ${
          isSubmitted && isCorrect && "bg-green-500 text-white"
        }
        ${isSubmitted && !isCorrect && "bg-red-500 text-white"}`}
      >
        <h2
          className={`text-xl font-bold ${
            currentQuestion < questionIndex && "text-gray-400"
          } `}
        >
          {questionIndex + 1}. {question}
        </h2>
        {currentQuestion > questionIndex && (
          <div
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setShowAnswers(!showAnswers);
              }
            }}
            role="button"
            tabIndex={questionIndex}
            onClick={() => setShowAnswers(!showAnswers)}
            className="rounded-full text-2xl"
          >
            {!showAnswers ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
          </div>
        )}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleValidate();
        }}
      >
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out
        ${
          currentQuestion !== questionIndex && !showAnswers
            ? "max-h-0"
            : "max-h-fit"
        }`}
        >
          {answers.map((answer, index) => (
            <div key={answer.id} className="my-2 mx-4">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                id={`question-${questionIndex}-answer-${index}`}
                disabled={isSubmitted}
                value={answer.correct ? "correct" : "incorrect"}
                onChange={(response) => handleChange(response)}
              />

              <label
                htmlFor={`question-${questionIndex}-answer-${index}`}
                className={`ml-2 ${
                  isSubmitted &&
                  answer.correct &&
                  "text-green-500 font-semibold"
                }`}
              >
                {answer.text}
              </label>
            </div>
          ))}
        </div>

        {currentQuestion === questionIndex && (
          <button
            type="submit"
            disabled={!selectedAnswer}
            className={`font-button antialiased font-semibold rounded-lg text-white px-4 py-2 
            ${isSubmitted && isCorrect ? "bg-green-500" : "bg-red-500"} 
            ${!isSubmitted && "bg-gray-800 hover:bg-gray-700"}
            `}
          >
            {isSubmitted && isCorrect && "Bravo, c'est la bonne réponse !"}
            {isSubmitted &&
              !isCorrect &&
              "Désolé, ce n'est pas la bonne réponse."}
            {!isSubmitted && "Valider"}
          </button>
        )}
      </form>
    </div>
  );
}

export default Quiz;
