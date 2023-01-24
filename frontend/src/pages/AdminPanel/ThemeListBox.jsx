import React, { useState, useEffect } from "react";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

export default function ThemeListBox() {
  const [adminThemes, setAdminThemes] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (!adminThemes) {
      axios.get(`${VITE_BACKEND_URL}/home`).then((response) => {
        setAdminThemes(response.data);
      });
    }
  }, []);

  return (
    <fieldset className="w-1/4 px-4 sm:px-6 lg:px-8">
      <button
        id="dropdownDefaultButton"
        onClick={handleDropdownToggle}
        data-dropdown-toggle="dropdown"
        className="text-lg font-medium text-gray-900"
        type="button"
      >
        Thèmes
      </button>
      {/* <legend className="text-lg font-medium text-gray-900">Thèmes</legend> */}

      <div
        className={`${showDropdown ? "absolute" : "hidden"}  bg-gradient-to-b 
        from-yellow-100 
        to-yellow-200 mt-4 border-t border-b border-gray-200 divide-y divide-gray-200`}
      >
        {adminThemes &&
          adminThemes.map((theme) => (
            <div key={theme.id} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor={`person-${theme.id}`}
                  className="font-medium text-gray-700 select-none"
                >
                  {theme.name}
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  id={`person-${theme.id}`}
                  name={`person-${theme.name}`}
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
      </div>
    </fieldset>
  );
}
