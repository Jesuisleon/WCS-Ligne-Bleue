import { IoArrowBackSharp } from "react-icons/io5";

function NavigationBlock({ title, navigate }) {
  return (
    <div
      className="
      min-w-screen
      h-11
      sm:h-20
     bg-blue-800
      relative
      shadow-xl
      z-20
       "
    >
      {title !== "Bienvenue" && (
        <button
          type="button"
          onClick={navigate}
          className="
            text-white
            text-4xl
            font-title
            float-left
            absolute
            top-3
            sm:top-5
            left-3
            "
        >
          <IoArrowBackSharp className="text-2xl sm:text-4xl" />
        </button>
      )}
      <p
        className="
        text-white
        text-xl
        sm:text-3xl
        py-2
        sm:py-6
        font-title
        text-center
        antialiased
        font-bold
        "
      >
        {title}
      </p>
    </div>
  );
}

export default NavigationBlock;
