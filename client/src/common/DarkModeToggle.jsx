import  { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
const DarkModeToggle = () => {
  const { toggleTheme,theme } = useContext(ThemeContext);
  return (
    <div className="containerTheme" onClick={toggleTheme}>
      <div className="iconTheme"><Moon color="gray" size={15}/></div>
      <div className="iconTheme"><Sun color="gray" size={15}/></div>
      <div
        className="ball"
        style={theme === "light" ? { left: "2px" } : { right: "2px" }}
      />
    </div>
  );
};

export default DarkModeToggle;