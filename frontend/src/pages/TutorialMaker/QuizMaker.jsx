import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";

import ModaleSimple from "@components/notifications/ModalSimple";

import Quiz from "@components/Quiz";

const QuizMaker = forwardRef(({ data, preview }, ref) => {
  const [content, setContent] = useState([]);

  const [openModalSimple, setOpenModalSimple] = useState(false);

  const childRef = useRef([]);
  useImperativeHandle(ref, () => ({
    getData: () => {
      return content
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
    if (content[questionId - 1].answers.length === 2) {
      return;
    }
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
      if (updatedQuestion[id].answers[answerIndex].text === "") return;
      updatedQuestion[id].answers[answerIndex].correct =
        !updatedQuestion[id].answers[answerIndex].correct;
    }

    setContent(updatedQuestion);
  };

  useEffect(() => {
    if (data) {
      setContent(data);
    }
    if (data === null) {
      setQuestion();
    }
  }, [data]);


  return (
    <div ref={childRef} className="bg-white py-4 px-8 border-t">
      <ModaleSimple
        title="Erreur"
        message="Un quiz doit avoir au moins une réponse correct par question."
        open={openModalSimple}
        setOpen={setOpenModalSimple}
      />
      {preview ? (
        <Quiz data={content} />
      ) : (
        <>
          {content.map((question, questionIndex) => (
            <div
              key={question.id}
              className="flex flex-col items-start gap-4 mb-4 pt-4"
            >
              <div className="flex gap-4 items-center w-full bg-blue-700 pb-1 pl-2">
                <button
                  type="button"
                  onClick={() => {
                    removeQuestion(question.id);
                  }}
                  className="border border-transparent bg-red-500 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
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
                  className="block text-base font-medium text-white"
                >
                  {question.id}
                </label>

                <div className="mt-1 border-b border-gray-300 focus-within:border-blue-600">
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
                    className="block w-full border-0 border-b border-transparent bg-white focus:border-blue-700 focus:ring-0 sm:text-base"
                  />
                </div>
              </div>
              {question.answers.map((answer, answerIndex) => (
                <div
                  key={answer.id}
                  className="flex gap-4 items-center w-full pl-2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      removeAnswer(question.id, answer.id);
                    }}
                    className="border border-transparent bg-red-500 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
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
                      className={`block w-full border-0 border-b border-transparent focus:border-blue-700 focus:ring-0 sm:text-base ${
                        answer.correct && "text-green-500"
                      }`}
                      size={answer.text.length}
                    />
                  </div>
                </div>
              ))}
              <button
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
