import { IoArrowBackSharp } from "react-icons/io5";

function NavigationBlock({ title, navigate }) {
  return (
    <div
      className="
      min-w-screen
      h-15
     bg-blue-800
      relative
      shadow-xl
       ">
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
            left-3
            ">
            <IoArrowBackSharp className="text-4xl" />
          </button>
      )}
      <p
        className="
        text-white
        text-2xl
        py-4
        font-title
        text-center
        antialiased
        font-bold
        ">{title}</p>
    </div>
  );
}

export default NavigationBlock;
