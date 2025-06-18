"use client";
import useScrollVisibility from "@/hooks/use-scroll-visibility";

const BackToTop = () => {
  const { isVisible, scrollToTop } = useScrollVisibility(300);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-purple-300/80  p-2  shadow-md hover:bg-primary transition duration-300 animate-fadeIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
