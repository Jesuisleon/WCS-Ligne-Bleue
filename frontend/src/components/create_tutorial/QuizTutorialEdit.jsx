import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import Quiz from "@components/tutorial/Quiz";
import { HiOutlineTrash } from "react-icons/hi";

const QuizTutorialEdit = forwardRef(({ getData, close, previewAll }, ref) => {
  const [quizData, setQuizData] = useState([]);

  const childRef = useRef([]);
  useImperativeHandle(ref, () => ({
    getData: () => {
      return quizData;
    },
  }));

  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (previewAll) {
      setPreview(true);
    } else {
      setPreview(false);
    }
  }, [previewAll]);

  useEffect(() => {
    if (getData) {
      setQuizData(getData);
    }
    setPreview(false);
  }, []);

  const setQuestion = () => {
    const question = {
      id: quizData.length + 1,
      question: "",
      answers: [
        { id: 1, text: "", correct: false },
        { id: 2, text: "", correct: false },
      ],
    };
    const newQuestion = [...quizData, question];
    setQuizData(newQuestion);
  };

  const setAnswer = (questionIndex) => {
    const answer = {
      id: quizData[questionIndex].answers.length + 1,
      text: "",
      correct: false,
    };

    const newAnswer = quizData.map((question) => {
      if (question.id === questionIndex + 1) {
        return {
          ...question,
          answers: [...question.answers, answer],
        };
      }
      return question;
    });

    setQuizData(newAnswer);
  };

  const updateIndex = (element) => {
    element.map((item, index) => {
      return item.id === index + 1;
    });
  };

  const removeQuestion = (id) => {
    const updatedQuestion = quizData.filter((question) => question.id !== id);
    updateIndex(updatedQuestion);
    setQuizData(updatedQuestion);
  };

  const removeAnswer = (questionId, answerId) => {
    const updatedAnswer = quizData[questionId - 1].answers.filter(
      (answer) => answer.id !== answerId
    );
    updateIndex(updatedAnswer);

    const updatedQuestion = quizData.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          answers: updatedAnswer,
        };
      }
      return question;
    });
    setQuizData(updatedQuestion);
  };

  const handleChange = (element) => {
    const { value, id, name } = element.target;
    const updatedQuestion = [...quizData];
    const answerIndex = name.split(":")[1];

    if (element.target.name.includes("question")) {
      updatedQuestion[id].question = value;
    } else if (element.target.name.includes("answer")) {
      updatedQuestion[id].answers[answerIndex].text = value;
    } else if (element.target.name.includes("checkbox")) {
      updatedQuestion[id].answers[answerIndex].correct =
        !updatedQuestion[id].answers[answerIndex].correct;
    }

    setQuizData(updatedQuestion);
  };

  return (
    <div ref={childRef} className="p-4 relative w-full">
      {previewAll === false && (
        <div className="flex justify-between ">
          <button type="button" className="text-xl font-bold" onClick={close}>
            <HiOutlineTrash color="red" />
          </button>
          <button
            type="button"
            className=""
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Editer" : "Voir"}
          </button>
        </div>
      )}

      {preview ? (
        <Quiz data={quizData} />
      ) : (
        <>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Créer un quiz</h1>
            <button
              type="button"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={setQuestion}
            >
              Ajouter une question
            </button>
          </div>

          {quizData.map((question, questionIndex) => (
            <div
              key={question.id}
              className="flex flex-col items-start gap-4 mb-4"
            >
              <div className="border-b-[1px] flex gap-4 items-center w-full">
                <button
                  type="button"
                  className="bg-red-600 text-sm text-white rounded px-1"
                  onClick={() => {
                    removeQuestion(question.id);
                  }}
                >
                  -
                </button>
                <label htmlFor="question" className="text-xl font-bold">
                  {question.id}.
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
                    className="text-xl font-bold"
                  />
                </label>
              </div>
              {question.answers.map((answer, answerIndex) => (
                <div key={answer.id} className="flex gap-4 items-center w-full">
                  <button
                    type="button"
                    className="bg-red-600 text-sm text-white rounded px-1"
                    onClick={() => {
                      removeAnswer(question.id, answer.id);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="checkbox"
                    id={questionIndex}
                    name={`checkbox:${answerIndex}`}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    checked={answer.correct}
                  />
                  <input
                    type="text"
                    id={questionIndex}
                    name={`answer:${answerIndex}`}
                    value={answer.text}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Votre réponse"
                    className={`${answer.correct && "text-green-500"}`}
                    size={answer.text.length}
                  />
                </div>
              ))}
              <button
                className="bg-green-500 text-white text-sm px-1 rounded"
                type="button"
                onClick={() => setAnswer(questionIndex)}
              >
                +
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
});

export default QuizTutorialEdit;
