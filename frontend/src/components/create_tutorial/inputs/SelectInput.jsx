export function SelectInput({
  type,
  name,
  defaultValue,
  optionValues,
  handleInput,
  invalid,
  isSubmit,
}) {
  const validator = invalid && isSubmit ? "invalid" : null;
  return (
    <div className="flex flex-col gap-2 items-start ">
      <h2 className={`text-2xl font-bold ${validator}`}>{name}</h2>
      <select
        defaultValue={defaultValue}
        onChange={handleInput}
        name={type}
        id={type}
      >
        <option value="">Veuillez Selectionner</option>
        {optionValues.map((option, index) => (
          <option key={option} value={index + 1}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
