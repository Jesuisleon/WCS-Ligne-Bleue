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
      <div className="sm:col-span-2">
        <input
          onChange={handleInput}
          placeholder={placeholder}
          name={type}
          id={type}
          type="text"
          defaultValue={defaultValue}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {invalid && isSubmit ? (
          <p className="text-red-500 text-sm italic sm:mt-px sm:pt-2">
            *** Ce champ est requis ***
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default TextInput;
