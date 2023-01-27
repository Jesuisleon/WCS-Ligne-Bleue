export function TextInput({
  type,
  name,
  placeholder,
  defaultValue,
  handleInput,
  invalid,
  isSubmit,
}) {
  return (
    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
      <div>
        <label
          htmlFor={type}
          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
        >
          {name}
        </label>
      </div>

      <div className="sm:col-span-2 flex items-center gap-5">
        <input
          onChange={handleInput}
          placeholder={placeholder}
          name={type}
          id={type}
          type="text"
          defaultValue={defaultValue}
          className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            invalid && isSubmit ? "border-red-500 " : "border-gray-300"
          }`}
        />
      </div>
    </div>
  );
}

export default TextInput;
