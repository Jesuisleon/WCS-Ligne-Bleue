/* This example requires Tailwind CSS v2.0+ */
import { Link } from "react-router-dom";

export default function TutorialCard({
  title,
  objective,
  date,
  difficulties,
  themeId,
  tutorialId,
  validate,
}) {
  // convert date to a local date string
  const stringDate = new Date(date).toLocaleDateString();

  let difficulty;

  const difficultyColor = document.getElementById(
    `tutorial-card-${tutorialId}`
  );

  if (difficultyColor !== null) {
    if (difficulties === "Débutant") {
      difficulty = "Débutant 🐣";
      difficultyColor.classList.add("bg-blue-100", "text-blue-800");
    } else if (difficulties === "Intermédiaire") {
      difficulty = "Intermédiaire 🐥";
      difficultyColor.classList.add("bg-yellow-100", "text-yellow-800");
    } else if (difficulties === "Avancé") {
      difficulty = "Avancé 🐔";
      difficultyColor.classList.add("bg-red-100", "text-red-800");
    }
  }

  return (
    <div className="bg-white shadow-lg overflow-hidden border-2 my-2">
      <div className="px-4 py-4 sm:px-6 flex flex-col gap-4 sm:gap-3">
        <div className="space-y-1 sm:flex sm:gap-3 sm:space-y-0 border-b pb-2 mb-2">
          <p className="text-base sm:text-xl px-2 font-bold text-gray-700 truncate first-letter:capitalize">
            {title}
          </p>
          <p
            id={`tutorial-card-${tutorialId}`}
            className="py-1 sm:py-0 px-2 inline-flex items-center text-sm leading-5 font-semibold rounded-full"
          >
            {difficulty}
          </p>
        </div>
        <p className="text-base text-gray-700 italic">
          <span className="not-italic">objectif: </span> "{objective}"
        </p>
        <div className="flex sm:float-right sm:mt-0">
          <Link to={`/theme/${themeId}/tutorial/${tutorialId}`}>
            {validate ? (
              <p className="rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                revoir le tutoriel
              </p>
            ) : (
              <p className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 py-2 px-4 text-base font-medium text-blue-700 shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">
                commencer le tutoriel
              </p>
            )}
          </Link>
        </div>
        {validate && (
          <div className="mt-2 flex items-center text-base text-gray-500 sm:mt-0 gap-2">
            <p className="rounded-full bg-green-100 text-green-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </p>
            <p>Validée le {stringDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
