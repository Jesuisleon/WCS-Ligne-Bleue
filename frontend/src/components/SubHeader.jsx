function SubHeader({ title }) {
  return (
    <div
      className="
      mx-10
      h-[4em]
      sm:h-20
     bg-white
      z-20
      flex
      justify-center
      items-center
      border-b-[0.1em]
      border-gray-200
       "
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
