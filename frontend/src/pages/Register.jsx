import React, { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "@components/notifications/ErrorAlert";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/users`, {
        email,
        password,
        firstname: firstName,
        lastname,
      })
      .then((response) => {
        if (!response) {
          throw new Error("La connection a échoué");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorMessage(true);
        setErrorText(error.response.statusText);
        console.error(error);
      });
  };

  const btn =
    email === "" ||
    password === "" ||
    password !== confirmPassword ||
    firstName === "" ||
    lastname === "" ? (
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit"
        disabled
      >
        S'inscrire
      </button>
    ) : (
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit"
      >
        S'inscrire
      </button>
    );

  return (
    <div className="min-h-full flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/image/logo_la_poste.png"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Inscris-toi gratuitement{" "}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{" "}
          <Link
            to="/home"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            commence les tutoriels directement
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" py-8 px-4 sm:rounded-lg sm:px-10">
          {errorMessage && <ErrorAlert alertMessage={errorText} />}
          <form
            onSubmit={handleSubmit}
            className="space-y-2 md:space-y-4"
            action="#"
            method="POST"
          >
            <div className="grid md:grid-cols-2 gap-2 md:gap-6">
              <div className="relative z-0 w-full  group">
                <label
                  htmlFor="floating_last_name"
                  className="block text-sm font-medium text-gray-800"
                >
                  Nom
                </label>
                <div className="mt-1 ">
                  <input
                    id="name"
                    name="floating_last_name"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=" "
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="relative z-0 w-full group">
                <label
                  htmlFor="floating_first_name"
                  className="block text-sm font-medium text-gray-800"
                >
                  Prénom
                </label>
                <div className="mt-1 ">
                  <input
                    id="first_name"
                    name="floating_first_name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=" "
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="floating_email"
                className="block text-sm font-medium text-gray-800"
              >
                Adresse email
              </label>
              <div className="">
                <input
                  id="email"
                  name="floating_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2 md:gap-6">
              <div className="relative z-0 w-full  group">
                <label
                  htmlFor="floating_password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Mot de passe
                </label>
                <div className="mt-1 ">
                  <input
                    id="password"
                    name="floating_password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="floating_repeat_password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Confirmer mot de passe
                </label>
                <div className="mt-1  ">
                  <input
                    id="floating_repeat_password"
                    name="repeat_password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=" "
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>{btn}</div>
          </form>
          <div className="mt-6 flex flex-col items-center justify-center text-sm">
            <span className="px-2 text-gray-600">
              Vous êtes déja membre de ligne Bleue ?
            </span>
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Cliquez ici pour vous connecter.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
