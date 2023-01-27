import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoPoste from "../../public/image/logo_la_poste.png";

export default function NotFound404() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-full pt-16 pb-12 flex flex-col">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">Workflow</span>
            <img className="h-12 w-auto" src={logoPoste} alt="" />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Page non trouvée
            </h1>
            <p className="mt-2 text-base text-gray-500">
              désoler nous n'avons pas pu trouver votre courrier
            </p>
            <div className="mt-6">
              <Link
                to="/home"
                className="text-base font-medium text-blue-600 hover:text-blue-500"
              >
                Retour à la page d'acceuil
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
