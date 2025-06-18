import { useEffect, useState } from "react";

const useScrollVisibility = (customHeight: number) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ticking, setTicking] = useState(false);

  const toggleVisibility = () => {
    const scrollY = window.pageYOffset;
    if (scrollY > customHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setTicking(false);
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(toggleVisibility);
      setTicking(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [customHeight]); // Ensure we track changes to customHeight

  return { isVisible, scrollToTop };
};

export default useScrollVisibility;
