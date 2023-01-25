import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export function HashtagInput({ handleInput, defaultValue }) {
  function ToLettersOnLowerCase(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/[0-9]/g, "")
      .toLowerCase();
  }

  const [hashtags, setHashtags] = useState([]);
  useEffect(() => {
    handleInput(hashtags);
  }, [hashtags]);

  const [inputValue, setInputValue] = useState("");

  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    if (currentIndex !== -1) {
      setTimeout(() => {
        setCurrentIndex(-1);
      }, 300);
    }
  }, [currentIndex]);

  const shake = {
    animationName: "shake",
    animationDuration: "0.7s",
    animationIterationCount: "1",
    animationTimingFunction: "ease-in-out",
    animationDirection: "alternate",
  };

  function handleValidateChange() {
    const newHashtag = inputValue.trim();

    if (newHashtag.length > 2 && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setInputValue("");
    }

    if (hashtags.includes(newHashtag)) {
      setCurrentIndex(hashtags.indexOf(newHashtag));
    }
  }

  function handleInputChange(event) {
    const { value } = event.target;
    setInputValue(ToLettersOnLowerCase(value));
  }

  function handleKeyPress(event) {
    if (event.key === " " || event.key === "Enter") {
      const newHashtag = inputValue.trim();

      if (hashtags.includes(newHashtag)) {
        setCurrentIndex(hashtags.indexOf(newHashtag));
      }

      if (newHashtag.length > 2 && !hashtags.includes(newHashtag)) {
        setHashtags([...hashtags, newHashtag]);
        setInputValue("");
      } else if (event.key === " ") {
        setInputValue("");
      }
    }
  }

  function handleRemoveHashtag(index) {
    const newHashtags = [...hashtags];
    newHashtags.splice(index, 1);
    setHashtags(newHashtags);
  }

  function removeHashtagList() {
    setHashtags([]);
  }

  useEffect(() => {
    if (defaultValue) {
      setHashtags(defaultValue);
    }
  }, []);

  return (
    <div className="">
      <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <h2 className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          Hashtag
        </h2>
        <div className="sm:col-span-2 flex space-x-5">
          <input
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Vos hashtag"
            name="hashtag"
            id="hashtag"
            type="text"
            className="block w-fit rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => handleValidateChange()}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleValidateChange();
              }
            }}
          >
            Ajouter
          </button>
          <button
            type="button"
            disabled={hashtags.length === 0}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={removeHashtagList}
          >
            <HiOutlineTrash
              color={`${hashtags.length > 0 ? "red" : "gray"}`}
              size={17}
            />
          </button>
        </div>
      </div>
      <div className="p-4 sm:space-y-0 sm:px-6">
        <div className="flex flex-wrap gap-3">
          {hashtags.map((hashtag, index) => (
            <div
              className="hashtag-button flex items-center gap-3"
              key={hashtag}
              style={index === currentIndex ? shake : {}}
            >
              {hashtag}
              <button
                type="button"
                className="rounded-full border border-transparent bg-gray-600 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => handleRemoveHashtag(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HashtagInput;
