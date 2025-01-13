"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleBtn = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.classList.replace(theme, newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex justify-center items-center rounded-full text-text cursor-pointer transition-all duration-300"
    >
      {theme === "light" ? <FaMoon size={25} /> : <FaSun size={25} />}
    </button>
  );
};

export default ToggleBtn;
