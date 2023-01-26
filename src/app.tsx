import Todolist from "./Todolist";
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  interface todoObj {
    id: number;
    name: string;
    completed: boolean;
  }
  const [todos, setTodos] = useState<todoObj[]>([]);
  const todoNameRef = useRef<HTMLInputElement>(null);
  const handleAddTodo: React.FC = () => {
    if (todoNameRef.current !== null && todoNameRef.current.value !== "") {
      const todoName: string = todoNameRef.current.value;
      todoNameRef.current.value = "";
      setTodos((prevTodos: any) => {
        return [
          ...prevTodos,
          { id: uuidv4(), name: todoName, completed: false },
        ];
      });
    }
    return <></>;
  };

  const toggleTodo: any = (id: number) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (todo !== undefined) {
      todo.completed = !todo.completed;
    }
    setTodos(newTodos);
  };

  const handleClear: any = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div>
      <Todolist todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>選択したタスクを削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
};

export default App;
