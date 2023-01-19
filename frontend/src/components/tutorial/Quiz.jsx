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
<<<<<<< HEAD
    <div className="bg-white pb-6 rounded-lg">
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
=======
    <div className="bg-white p-4 rounded-lg">
      {data &&
        data.map((item, index) => (
          <Question
            key={item.id}
            questionIndex={index}
            currentQuestion={currentQuestion}
            question={item.question}
            answers={item.answers}
            onValidate={(correct) => handleValidate(correct)}
          />
        ))}
      {data && currentQuestion === data.length && (
>>>>>>> dev
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
  const correctAnswers = answers.filter((answer) => answer.correct);
  const isMultipleCorrect = correctAnswers.length > 1;

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleChange = (event) => {
    if (!isMultipleCorrect) {
      setSelectedAnswer(event.target.value);
      return;
    }
    if (isMultipleCorrect) {
      const { id } = event.target;
      if (selectedAnswer.includes(id)) {
        setSelectedAnswer(selectedAnswer.replace(`${id},`, ""));
        return;
      }
      setSelectedAnswer(`${selectedAnswer}${id},`);
    }
  };

  const handleValidate = () => {
    if (!selectedAnswer) {
      return;
    }
    if (!isSubmitted) {
      setIsSubmitted(true);
      if (!isMultipleCorrect) {
        setIsCorrect(selectedAnswer === "correct");
      } else if (isMultipleCorrect) {
        const selectedAnswers = selectedAnswer
          .split(",")
          .filter((answer) => answer)
          .map((answer) => parseInt(answer, 10));
        const correctAnswersIds = correctAnswers.map((answer) => answer.id);
        const selectedAnswersIds = selectedAnswers.map((answer) => answer);

        const validate =
          correctAnswersIds.length === selectedAnswersIds.length &&
          correctAnswersIds.every((answer) =>
            selectedAnswersIds.includes(answer)
          );
        setIsCorrect(validate);
      }
    }
    if (isSubmitted) {
      onValidate(isCorrect);
    }
  };

  return (
    <div>
      <div
        className={`border-b-2 pt-4 pl-4 flex gap-4 items-center ${
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
          {answers.map((answer, answerIndex) => (
            <div key={answer.id} className="mt-2 mx-4">
              <input
                type={isMultipleCorrect ? "checkbox" : "radio"}
                name={`question-${questionIndex}`}
                id={`${answerIndex + 1}`}
                disabled={isSubmitted}
                value={answer.correct ? "correct" : "incorrect"}
                onChange={(e) => handleChange(e)}
              />

              <label
                htmlFor={`${answerIndex + 1}`}
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
            className={`font-button antialiased font-semibold rounded-lg text-white px-4 py-2 mt-4 
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
