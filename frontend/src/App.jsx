
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from 'framer-motion';
import Header from "@components/Header";
import AnimatedRoutes from "@components/AnimatedRoutes";
import { HiArrowDownCircle, HiArrowUpCircle } from "react-icons/hi2";

function App() {
  
  const [isScrollUpPlaying, setIsScrollUpPlaying] = useState(true);
  const [isScrollDownPlaying, setIsScrollDownPlaying] = useState(true);

function scrollDown() {
  window.scrollTo(0, window.scrollY + window.innerHeight);
}

function scrollUp() {
  window.scrollTo(0, window.scrollY - window.innerHeight);
}

  const [showBottomArrow, setShowBottomArrow] = useState(true);
  const [showTopArrow, setShowTopArrow] = useState(false);

  function handleScroll() {
    setShowBottomArrow(window.scrollY < document.body.offsetHeight - window.innerHeight);
  setShowTopArrow(window.scrollY > 0);
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <div
      className="
      flex
      flex-col
      min-h-screen
      min-w-screen 
      bg-gradient-to-b 
      from-yellow-100 
      to-yellow-200
      "
    >
      <Router>
        <Header />
        <AnimatedRoutes />
        {showTopArrow && <motion.div
          className="fixed top-10 right-10"
          animate={isScrollUpPlaying ?
            {
              y: 10,
              transition: {
              type: "spring",
              stiffness: 260,
              damping: 50,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              delay: 0.5,
            },
                }
            : "init"}
          initial="init"

          onHoverStart={() => setIsScrollUpPlaying(false)}
          onHoverEnd={() => setIsScrollUpPlaying(true)}
        >
          <HiArrowUpCircle
            className="text-5xl text-blue-700 cursor-pointer hover:text-blue-800"
            onClick={scrollUp} />
        </motion.div>}
        {showBottomArrow && <motion.div
          className="fixed bottom-10 right-10"
          animate={isScrollDownPlaying ? {
        y: -10,
        transition: {
        type: "spring",
        stiffness: 260,
        damping: 50,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
      },
          } :
            "init"}
          initial="init"
          onHoverStart={() => setIsScrollDownPlaying(false)}
          onHoverEnd={() => setIsScrollDownPlaying(true)}
        >
          <HiArrowDownCircle
            className="text-5xl text-blue-700 cursor-pointer hover:text-blue-800"
            onClick={scrollDown} />
        </motion.div>}
      </Router>
      </div>
  );
}

export default App;
