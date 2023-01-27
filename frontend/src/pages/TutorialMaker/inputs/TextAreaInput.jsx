export function TextAreaInput({
  defaultValue,
  handleInput,
  invalid,
  isSubmit,
}) {
  return (
    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
      <div>
        <label
          htmlFor="project-description"
          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
        >
          {" "}
          Description{" "}
        </label>
      </div>
      <div className="sm:col-span-2">
        <textarea
          placeholder="Veuillez décrire votre tutoriel"
          onChange={handleInput}
          id="project-description"
          name="project-description"
          rows={3}
          style={{ resize: "none" }}
          className={`block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            invalid && isSubmit ? "border-red-500 " : "border-gray-300"
          }`}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

export default TextAreaInput;
