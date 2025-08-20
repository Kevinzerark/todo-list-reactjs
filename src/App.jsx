import { useState } from "react";
import Todo from "./components/Todo";
import { FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const [lightMode, setLightMode] = useState(false);

  return (
    <div
      className={`${
        lightMode ? "light" : ""
      } bg-[var(--bg)] grid py-10 min-h-screen transition-colors duration-500`}
    >
      {/* Botão de toggle minimalista */}
      <div className="flex justify-end px-8 mb-4">
        <button
          onClick={() => setLightMode(!lightMode)}
          className="bg-transparent border-none p-0 m-0 cursor-pointer inline-flex items-center justify-center"
          style={{
            width: "20px",
            height: "20px",
            lineHeight: 0,
          }}
        >
          {lightMode ? (
            <FaMoon className="w-5 h-5 text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-300" />
          ) : (
            <FaSun className="w-5 h-5 text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-300" />
          )}
        </button>
      </div>

      <Todo />
    </div>
  );
};

export default App;
