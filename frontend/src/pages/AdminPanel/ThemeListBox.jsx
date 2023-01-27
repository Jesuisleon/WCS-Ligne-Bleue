import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiChevronDown } from "react-icons/hi";

export default function ThemeListBox({
  adminThemes,
  setAdminThemes,
  render,
  setRender,
}) {
  // const [adminThemes, setAdminThemes] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUnSelect = () => {
    const themeFiltersChangedToFalse = adminThemes;
    themeFiltersChangedToFalse.forEach(function f(element) {
      // eslint-disable-next-line no-param-reassign
      element.isChecked = false;
    });
    setAdminThemes(themeFiltersChangedToFalse);
    setRender(!render);
  };

  const handleSelectAll = () => {
    const themeFiltersChangedToTrue = adminThemes;
    themeFiltersChangedToTrue.forEach(function f(element) {
      // eslint-disable-next-line no-param-reassign
      element.isChecked = true;
    });
    setAdminThemes(themeFiltersChangedToTrue);
    setRender(!render);
  };

  useEffect(() => {
    const themeTemp = [];
    if (!adminThemes) {
      axios.get(`/home`).then((response) => {
        response.data.map((e) =>
          themeTemp.push({ id: e.id, name: e.name, isChecked: true })
        );
        setAdminThemes(themeTemp);
      });
    }
  }, []);

  const handleboxchange = (index) => {
    const adminThemesTemp = [...adminThemes];
    adminThemesTemp[index].isChecked = !adminThemesTemp[index].isChecked;
    setAdminThemes(adminThemesTemp);
  };

  return (
    <fieldset
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      className="w-1/4 px-4 sm:px-6 lg:px-8 mt-2"
    >
      <button
        id="dropdownDefaultButton"
        onClick={handleDropdownToggle}
        data-dropdown-toggle="dropdown"
        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
      >
        Choix Thèmes <HiChevronDown size="20" />
      </button>
      <div
        className={`${showDropdown ? "absolute" : "hidden"}  bg-gradient-to-b 
        from-gray-100 
        to-gray-200 border-t border-b border-gray-200 divide-y divide-gray-200 py-1 px-4`}
      >
        <button
          type="button"
          className="inline-flex items-center mx-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleUnSelect}
        >
          Aucun
        </button>
        <button
          type="button"
          className="inline-flex items-center mx-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          onClick={handleSelectAll}
        >
          Tous
        </button>
        {adminThemes &&
          adminThemes.map((theme, index) => (
            <div key={theme.id} className="relative flex items-start px-2 py-2">
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor={`theme-${theme.id}`}
                  className="font-medium text-gray-700 select-none"
                >
                  {theme.name}
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  id={`theme-${theme.id}`}
                  name={`theme-${theme.name}`}
                  type="checkbox"
                  checked={theme.isChecked}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={() => handleboxchange(index)}
                />
              </div>
            </div>
          ))}
      </div>
    </fieldset>
  );
}
