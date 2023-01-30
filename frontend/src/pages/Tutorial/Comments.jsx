import React, { useState, useEffect } from "react";

function Comments({ validate, data, setData }) {
  const [comments, setComments] = useState("");
  useEffect(() => {
    if (comments && validate === false) {
      const newComments = {
        ...data,
        comments,
      };
      setData(newComments);
    }
  }, [comments]);

  useEffect(() => {
    if (validate) setComments(data.comments);
  }, [data]);

  if (validate && data.comments === null) return false;

  if (validate) {
    return (
      <div className="flex flex-col gap-2 w-full px-10">
        <p className="h1-font">Mon Commentaire: </p>
        <p className="bg-white w-full text-black p-2">{comments}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full px-10">
      <label htmlFor="comments" className="h1-font">
        Mon commentaire:{" "}
      </label>
      <textarea
        style={{ resize: "none" }}
        className="block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        name="comments"
        id="comments"
        maxLength="500"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
    </div>
  );
}

export default Comments;
