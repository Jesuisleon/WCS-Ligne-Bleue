import { Link, useParams } from "react-router-dom";

import { HomeIcon } from "@heroicons/react/solid";

export default function SubHeader({ navigation, themeTitle, tutorialTitle }) {
  const pages = [];

  if (navigation === "home") {
    pages.push({ name: "Bienvenue", href: "/home", current: true });
  }
  if (navigation === "theme") {
    const { themeId } = useParams();
    pages.push({ name: themeTitle, href: `/theme/${themeId}`, current: true });
  }
  if (navigation === "tutorial") {
    const { tutorialId, themeId } = useParams();
    pages.push(
      { name: themeTitle, href: `/theme/${themeId}`, current: false },
      {
        name: tutorialTitle,
        href: `/theme/${themeId}/tutorial/${tutorialId}`,
        current: true,
      }
    );
  }

  return (
    <nav
      className="bg-white border-b h-14 border-gray-300 flex"
      aria-label="Breadcrumb"
    >
      <ol className="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link to="/home" className="text-gray-600 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-6 h-full text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                to={page.href}
                className="ml-4 text-md font-medium text-gray-600 hover:text-gray-500"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
