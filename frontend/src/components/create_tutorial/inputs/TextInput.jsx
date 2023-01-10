export function TextInput({
  type,
  name,
  placeholder,
  defaultValue,
  handleInput,
  invalid,
  isSubmit,
}) {
  const validator = invalid && isSubmit ? "invalid" : null;

  return (
    <div className="flex flex-col">
      <label htmlFor={type} className={`text-2xl font-bold ${validator}`}>
        {name}
      </label>
      <input
        onChange={handleInput}
        placeholder={placeholder}
        name={type}
        id={type}
        type="text"
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default TextInput;
