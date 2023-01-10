export function SelectInput({ type, name, optionValues, handleInput }) {
  return (
    <div className="flex flex-col gap-2 items-start ">
      <h2 className="text-2xl font-bold">{name}</h2>
      <select onChange={handleInput} name={type} id={type}>
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
