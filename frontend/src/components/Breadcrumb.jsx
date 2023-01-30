import { Link, useParams } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";

import Loading from "@components/Loading";

import { HomeIcon } from "@heroicons/react/solid";

export default function Breadcrumb({ navigation, themeTitle, tutorialTitle }) {
  const { themeId, tutorialId, userId } = useParams();
  const { userInfos } = useContext(AuthContext);

  const pages = [];
  if (navigation === "home") {
    pages.push({ name: "Bienvenue", href: "/home", current: true });
  }
  if (navigation === "theme") {
    pages.push({ name: themeTitle, href: `/theme/${themeId}`, current: true });
  }
  if (navigation === "tutorial") {
    // check windows width to display the theme title or not
    if (window.innerWidth > 768) {
      pages.push(
        { name: themeTitle, href: `/theme/${themeId}`, current: false },
        {
          name: tutorialTitle,
          href: `/theme/${themeId}/tutorial/${tutorialId}`,
          current: true,
        }
      );
    } else {
      pages.push({
        name: tutorialTitle,
        href: `/theme/${themeId}/tutorial/${tutorialId}`,
        current: true,
      });
    }
  }
  if (navigation === "search") {
    pages.push({
      name: "Rechercher un tutoriel",
      href: "/search",
      current: true,
    });
  }
  if (navigation === "profil") {
    if (userInfos.isAdmin && userId !== userInfos.userId) {
      pages.push({
        name: `Profil d'un utilisateur`,
        href: "",
        current: true,
      });
    } else {
      pages.push({
        name: "Bienvenue sur votre profil",
        href: "",
        current: true,
      });
    }
  }

  // wait for the data to be fetched
  if (pages.length < 1) return <Loading />;

  return (
    <nav
      className="bg-white border-b sm:h-12 md:h-16 border-gray-300 flex"
      aria-label="Breadcrumb"
    >
      <ol className="max-w-screen-xl w-full mx-auto flex sm:space-x-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link to="/home" className="text-blue-700 hover:text-blue-600">
              <HomeIcon
                className="ml-2 sm:ml-0 flex-shrink-0 h-5 w-5 sm:h-7 sm:w-7"
                aria-hidden="true"
              />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={`${page.name}:crumb`} className="flex">
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-6 h-full text-gray-300"
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
                className="ml-4 text-lg sm:text-lg font-semibold antialiased text-blue-700 hover:text-blue-600"
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
