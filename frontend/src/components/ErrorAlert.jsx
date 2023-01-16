import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

export default function ErrorAlert({ alertMessage }) {
  return (
    <div
      className="flex mb-6"
      style={{ display: "flex", alignItems: "center" }}
    >
      <AiOutlineWarning color="red" />
      <h1 className="text-red-500 font-medium ml-1">{alertMessage}</h1>
    </div>
  );
}
