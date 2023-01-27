function SubHeader({ title }) {
  return (
    <div
      className="
      mx-10
      h-[4em]
      sm:h-20
     bg-gray-50
      z-20
      flex
      justify-center
      items-center
      border-b-[0.2em]
      border-blue-700
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
