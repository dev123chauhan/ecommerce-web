import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// import React from 'react'
export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  // Check localStorage first, then fall back to "light"
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage if it exists
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    // Update localStorage whenever theme changes
    localStorage.setItem("theme", theme);
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// import PropTypes from "prop-types";
// import { createContext, useEffect, useState } from "react";

// // import React from 'react'
// export const ThemeContext = createContext();

// export default function ThemeContextProvider({ children }) {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };
//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }
// ThemeContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };