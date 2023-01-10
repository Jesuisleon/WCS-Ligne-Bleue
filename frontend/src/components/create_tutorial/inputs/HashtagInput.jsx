import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export function HashtagInput({ handleInput, defaultValue }) {
  const [hashtags, setHashtags] = useState([]);
  useEffect(() => {
    handleInput(hashtags);
  }, [hashtags]);

  useEffect(() => {
    if (defaultValue) {
      setHashtags(defaultValue);
    }
  }, []);

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
    setInputValue(event.target.value);
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
          <button
            type="button"
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
          </button>
        ))}
      </div>
    </div>
  );
}

export default HashtagInput;
