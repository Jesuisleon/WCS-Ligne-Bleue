import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { setUserTokenCookie, setUserFirstName, setUserLastName } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const login = { email, password };
      const { VITE_BACKEND_URL } = import.meta.env;
      const response = await axios.post(`${VITE_BACKEND_URL}/login`, login);

      if (response.data.token) {
        setUserTokenCookie(response.data.token);
        setUserFirstName(response.data.user.firstname);
        setUserLastName(response.data.user.lastname);
        navigate("/");
      }
    } catch (error) {
      error("une erreur s'est produite lors de la connexion");
    }
  };

  return (
    <div
      className="
    flex-grow
    flex
    flex-col
    px-20
    justify-center
    align-center
    "
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >
            Veuillez insérer votre adresse email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >
            Veuillez rentrer votre mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-start mb-6" />
        <div>
          <Link to="/Register">Vous n'avez pas de compte ?</Link>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
