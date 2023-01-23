function NavigationBlock({ title }) {
  return (
    <div
      className="
      min-w-screen
      h-11
      sm:h-20
     bg-gray-50
      relative
      shadow-xl
      z-20
       "
    >
      <p
        className="
        text-gray-700
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
