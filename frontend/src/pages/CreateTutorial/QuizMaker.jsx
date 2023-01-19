import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import Quiz from "@components/tutorial/Quiz";

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
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={setQuestion}
            >
              Ajouter une question
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default QuizMaker;
