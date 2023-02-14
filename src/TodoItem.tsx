import React from "react";
import "./Todolist.css";
import { TodoObj } from "./App";

interface TodoProp {
  todo: TodoObj;
  toggleTodo: (id: string) => void;
}

export const TodoItem: React.FC<TodoProp> = ({ todo, toggleTodo }) => {
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
