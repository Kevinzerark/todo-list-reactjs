import React, { useRef, useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdChecklist } from "react-icons/md";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const [error, setError] = useState(false);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      setError(true);
      setTimeout(() => setError(false), 900);
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div
      className="bg-[var(--card)] border border-[var(--hover)] place-self-center
             w-11/12 max-w-[90vw] p-5 min-h-[70vh] rounded-xl shadow-sm
             transition-colors duration-500
             sm:w-11/12 sm:max-w-md sm:p-7 sm:min-h-[550px]"
    >
      {/* Title */}
      <div className="flex items-center mt-2 gap-2">
        <FaClipboardList className="w-6 h-6 text-[var(--accent)]" />
        <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
          To-Do List
        </h1>
      </div>

      {/* Input Box */}
      <div className="flex flex-col my-7">
        <div
          className={`flex items-center bg-[var(--bg)] rounded-full transition-all duration-300
                      ${
                        error
                          ? "border-2 border-[var(--danger)] animate-shake"
                          : ""
                      }`}
        >
          <input
            ref={inputRef}
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2
                       text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]
                       focus:ring-2 focus:ring-[var(--accent)] rounded-full transition-colors duration-500"
            type="text"
            placeholder="Adicione uma nova tarefa"
            onKeyDown={(e) => {
              if (e.key === "Enter") add();
            }}
          />
          <button
            onClick={add}
            className="border-none rounded-full w-32 h-14 text-white text-lg font-medium
             cursor-pointer bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-md
             active:scale-95 transition-all duration-300"
          >
            Add +
          </button>
        </div>

        {/* Mensagem de erro com fade */}
        <p
          className={`text-[var(--danger)] text-sm mt-1 ml-3 select-none
                      transition-opacity duration-500
                      ${error ? "opacity-100" : "opacity-0"}`}
        >
          Digite uma tarefa antes de adicionar
        </p>
      </div>

      {/* Todo list */}
      <div>
        {todoList.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
        {todoList.length === 0 && (
          <p className="text-center text-[var(--text-secondary)] mt-8">
            Nenhuma tarefa ainda.
          </p>
        )}
      </div>
    </div>
  );
};

export default Todo;
