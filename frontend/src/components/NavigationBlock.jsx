function NavigationBlock({ title, navigate }) {
  return (
    <div className="min-w-screen bg-blue-700 flex">
      {title !== "Bienvenue" && (
        <div className="flex flex-col justify-center items-center w-1/6">
          <p className="text-white text-l font-title">⇦</p>
          <button
            type="button"
            className="text-white text-l font-button"
            onClick={navigate}
          >
            Retour
          </button>
        </div>
      )}
      <p className="text-white text-xl p-4 font-title">{title}</p>
    </div>
  );
}

export default NavigationBlock;
