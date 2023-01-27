import { useLocation } from "react-router-dom";

function SubHeader({ title }) {
  const location = useLocation();

  return (
    <div
      className={`
      ${location.pathname.includes("createTutorial") && "hidden"}
      mx-10
      h-[4em]
      sm:h-20
<<<<<<< HEAD
     bg-gray-50
=======
>>>>>>> S3_Token_Fix_Admin
      z-20
      flex
      justify-center
      items-center
      border-b-[0.2em]
      border-blue-700
       `}
    >
      <p
        className="
        text-blue-700
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

export default SubHeader;
