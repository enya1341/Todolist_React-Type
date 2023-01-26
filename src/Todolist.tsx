import "./Todolist.css";
import Todo from "./todo";
import React from "react";

export const Todolist: React.FC<any> = ({ todos, toggleTodo }) => {
  return todos.map((todo: any) => (
    <Todo todo={todo} toggleTodo={toggleTodo} key={todo.id} />
  ));
};

export default Todolist;
