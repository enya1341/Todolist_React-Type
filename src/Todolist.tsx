import Todo from "./todo";
import "./todolist.css";
import React from "react";

interface todoObj {
  id: number;
  name: string;
  completed: boolean;
}

export const Todolist: React.FC<any> = ({ todos, toggleTodo }) => {
  return todos.map((todo: todoObj) => (
    <Todo todo={todo} toggleTodo={toggleTodo} key={todo.id} />
  ));
};

export default Todolist;
