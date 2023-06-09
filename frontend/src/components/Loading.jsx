export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <svg
        className="animate-spin h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="blue"
          strokeWidth="4"
        />
        <path className="opacity-75" fill="blue" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      <span className="text-gray-700">Chargement...</span>
    </div>
  );
}
