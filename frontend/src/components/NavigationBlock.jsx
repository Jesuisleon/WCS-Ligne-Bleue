function NavigationBlock({ title }) {
  return (
    <div
      className="
      min-w-screen
      h-[4em]
      sm:h-20
     bg-white
      z-20
      flex
      justify-center
      items-center
      border-b-2
      border-yellow-300
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

export default NavigationBlock;
