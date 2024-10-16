"use client";
import {useState, useEffect} from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (window) {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
};
