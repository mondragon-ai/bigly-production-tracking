"use client";
import {useState} from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(0);
  if (!window) return width;

  setWidth(window.innerWidth);

  return width;
};
