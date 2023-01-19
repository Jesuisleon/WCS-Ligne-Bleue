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
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-2xl font-bold">Hashtag</h2>
      <div className="flex">
        <button
          type="button"
          className="black-button"
          onClick={() => handleValidateChange()}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleValidateChange();
            }
          }}
        >
          Ajouter
        </button>
        <input
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Vos hashtag"
          name="hashtag"
          id="hashtag"
          type="textarea"
        />
      </div>
      <div className="flex">
        {hashtags.length > 0 && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={removeHashtagList}
          >
            <HiOutlineTrash color="red" size={28} />
          </button>
        )}
        {hashtags.map((hashtag, index) => (
          <div
            className="hashtag-button"
            key={hashtag}
            style={index === currentIndex ? shake : {}}
          >
            {hashtag}
            <button
              type="button"
              className="ml-2 close-button"
              onClick={() => handleRemoveHashtag(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HashtagInput;
