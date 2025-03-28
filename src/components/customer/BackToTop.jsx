import React, { useEffect, useState } from "react";


const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Listen to scroll event
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
   <>
      {/* Conditionally render button if visible */}
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="back-to-top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default BackToTop;
