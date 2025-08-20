import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div
      className="flex items-center my-3 gap-2 px-3 py-2 rounded-lg
                 hover:bg-[var(--hover)] transition-colors duration-500"
    >
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer select-none"
      >
        {isComplete ? (
          <FaCheckCircle className="w-6 h-6 text-[var(--success)] transition-colors duration-500" />
        ) : (
          <FaRegCircle className="w-6 h-6 text-[var(--text-secondary)] transition-colors duration-500" />
        )}

        <p
          className={`ml-4 text-[17px] transition-colors duration-500
            ${
              isComplete
                ? "line-through text-[var(--text-muted)]"
                : "text-[var(--text-primary)]"
            }
          `}
        >
          {text}
        </p>
      </div>

      <FaTrash
        onClick={() => deleteTodo(id)}
        className="w-5 h-5 text-[var(--danger)] cursor-pointer
                   hover:text-[var(--danger-hover)] transition-colors duration-500"
        title="Excluir"
      />
    </div>
  );
};

export default TodoItems;
