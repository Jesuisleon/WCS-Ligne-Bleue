function NavigationBlock({ title }) {
  return (
    <div
      className="
      min-w-screen
      h-[4em]
      sm:h-20
     bg-gray-50
      shadow-xl
      z-20
      flex
      justify-center
      items-center
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
