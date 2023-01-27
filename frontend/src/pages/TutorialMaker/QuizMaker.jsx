import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";

import Quiz from "@components/Quiz";

const QuizMaker = forwardRef(({ data, preview }, ref) => {
  const [content, setContent] = useState([]);

  const childRef = useRef([]);
  useImperativeHandle(ref, () => ({
    getData: () => {
      if (content.length > 0) return content;
      return null;
    },
    setData: () => {
      setContent(data);
    },
  }));

  const setQuestion = () => {
    const question = {
      id: content.length + 1,
      question: "",
      answers: [
        { id: 1, text: "", correct: false },
        { id: 2, text: "", correct: false },
      ],
    };
    const newQuestion = [...content, question];
    setContent(newQuestion);
  };

  const setAnswer = (questionIndex) => {
    const answer = {
      id: content[questionIndex].answers.length + 1,
      text: "",
      correct: false,
    };

    const newAnswer = content.map((question) => {
      if (question.id === questionIndex + 1) {
        return {
          ...question,
          answers: [...question.answers, answer],
        };
      }
      return question;
    });

    setContent(newAnswer);
  };

  const updateIndex = (element) => {
    const updatedIndex = element.map((item, index) => {
      return { ...item, id: index + 1 };
    });
    return updatedIndex;
  };

  const removeQuestion = (id) => {
    const updatedQuestion = content.filter((question) => question.id !== id);
    setContent(updateIndex(updatedQuestion));
  };

  const removeAnswer = (questionId, answerId) => {
    const updatedAnswer = content[questionId - 1].answers.filter(
      (answer) => answer.id !== answerId
    );

    const updatedQuestion = content.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          answers: updateIndex(updatedAnswer),
        };
      }
      return question;
    });
    setContent(updatedQuestion);
  };

  const handleChange = (element) => {
    const { value, id, name } = element.target;
    const updatedQuestion = [...content];
    const answerIndex = name.split(":")[1];

    if (element.target.name.includes("question")) {
      updatedQuestion[id].question = value;
    } else if (element.target.name.includes("answer")) {
      updatedQuestion[id].answers[answerIndex].text = value;
    } else if (element.target.name.includes("checkbox")) {
      updatedQuestion[id].answers[answerIndex].correct =
        !updatedQuestion[id].answers[answerIndex].correct;
    }

    setContent(updatedQuestion);
  };

  useEffect(() => {
    if (data) {
      setContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (content.length === 0) {
      setQuestion();
    }
  }, [content]);

  return (
    <div ref={childRef} className="bg-white py-4 px-8">
      {preview ? (
        <Quiz data={content} />
      ) : (
        <>
          {content.map((question, questionIndex) => (
            <div
              key={question.id}
              className="flex flex-col items-start gap-4 mb-4 pt-4"
            >
              <div className="border-b-[1px] flex gap-4 items-center w-full">
                <button
                  type="button"
                  onClick={() => {
                    removeQuestion(question.id);
                  }}
                  className="border border-transparent bg-gray-300 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700"
                >
                  {question.id}
                </label>

                <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                  <input
                    type="text"
                    id={questionIndex}
                    name={`question:${questionIndex}`}
                    value={question.question}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Votre Question"
                    size={question.question.length}
                    className="block w-full border-0 border-b border-transparent focus:border-blue-700 focus:ring-0 sm:text-sm"
                  />
                </div>
              </div>
              {question.answers.map((answer, answerIndex) => (
                <div key={answer.id} className="flex gap-4 items-center w-full">
                  <button
                    type="button"
                    onClick={() => {
                      removeAnswer(question.id, answer.id);
                    }}
                    className="border border-transparent bg-gray-300 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <input
                    type="checkbox"
                    id={questionIndex}
                    name={`checkbox:${answerIndex}`}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    checked={answer.correct}
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                  />
                  <div className="mt-1 border-b border-gray-300 focus-within:border-green-600">
                    <input
                      type="text"
                      id={questionIndex}
                      name={`answer:${answerIndex}`}
                      value={answer.text}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      placeholder="Votre réponse"
                      className={`block w-full border-0 border-b border-transparent focus:border-blue-700 focus:ring-0 sm:text-sm ${
                        answer.correct && "text-green-500"
                      }`}
                      size={answer.text.length}
                    />
                  </div>
                </div>
              ))}
              <button
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                type="button"
                onClick={() => setAnswer(questionIndex)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Ajouter une réponse
              </button>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onClick={setQuestion}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Ajouter une question
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default QuizMaker;
