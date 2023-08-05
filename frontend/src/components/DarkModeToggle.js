import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const colorModes = [
    { name: "Light Mode", class: "light", bg: "#f9fafb", text: "#1f2937" },
    { name: "Dark Mode", class: "dark", bg: "#1f2937", text: "#f9fafb" },
    { name: "Custom Mode", class: "custom", bg: "#212121", text: "#f5f5f5" },
  ];

  const [colorModeIndex, setColorModeIndex] = useState(0);

  useEffect(() => {
    const savedModeIndex = localStorage.getItem("colorModeIndex");
    if (savedModeIndex !== null) {
      setColorModeIndex(Number(savedModeIndex));
    }
  }, []);

  useEffect(() => {
    const currentMode = colorModes[colorModeIndex];
    document.documentElement.classList.remove("light", "dark", "custom");
    document.documentElement.classList.add(currentMode.class);
    localStorage.setItem("colorModeIndex", colorModeIndex);
  }, [colorModeIndex]);

  const toggleColorMode = () => {
    setColorModeIndex((prevIndex) => (prevIndex + 1) % colorModes.length);
  };

  return (
    <button
      className={`fixed bottom-4 right-4 p-2 px-6 rounded-full bg-gray-800 text-white focus:outline border ${
        colorModes[colorModeIndex].class === "dark"
          ? "dark:bg-gray-400 dark:text-gray-800"
          : ""
      }`}
      style={{
        backgroundColor: colorModes[colorModeIndex].bg,
        color: colorModes[colorModeIndex].text,
      }}
      onClick={toggleColorMode}
    >
      {colorModes[colorModeIndex].name}
    </button>
  );
};

export default DarkModeToggle;
