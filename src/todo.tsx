import React from "react";
import "./todolist.css";

export const TodoBlock: React.FC<any> = ({ todo, toggleTodo }) => {
  const handleToggleTodo: React.FC = () => {
    toggleTodo(todo.id);
    return <></>;
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleTodo}
          readOnly
        />
      </label>
      {todo.name}
    </div>
  );
};

export default TodoBlock;
