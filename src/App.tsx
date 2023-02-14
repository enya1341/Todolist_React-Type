import { TodoList } from "./Todolist";
import { APIBody } from "./APIBody";
import axios, { AxiosResponse } from "axios";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface TodoObj {
  id: string;
  name: string;
  completed: boolean;
}

export interface PublicAPIs {
  count: number;
  entries: PublicAPIEntry[];
}

export interface PublicAPIEntry {
  API: string;
  Category: string;
  Description: string;
  Link: string;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoObj[]>([{
    id: "",
    name: "",
    completed:true
  }]);
  const todoNameRef = useRef<HTMLInputElement>(null);
  const handleAddTodo: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (todoNameRef.current !== null && todoNameRef.current.value !== "") {
      const todoName: string = todoNameRef.current.value;
      todoNameRef.current.value = "";
      setTodos((prevTodos: TodoObj[]) => {
        return [
          ...prevTodos,
          { id: uuidv4(), name: todoName, completed: false }
        ];
      });
    }
  };

  const toggleTodo = (id: string) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (todo !== undefined) {
      todo.completed = !todo.completed;
    }
    setTodos(newTodos);
  };

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };
  const [apiData, setAPIData] = useState<PublicAPIs>({
    count: 0,
    entries: [],
  });
  const baseURL = "https://api.publicapis.org/entries";
  const [viewCompleted, setViewCompleted] = React.useState<boolean>(false);
  useEffect(() => {
    const getUser: () => Promise<void> = async () => {
      await axios
        .get(baseURL)
        .then((response: AxiosResponse<PublicAPIs>) => {
          const { data, status } = response;
          if (status !== 200) {
            return;
          }
          setAPIData(data);
        })
        .catch(() => "test");
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUser();
  }, []);

  const handleShowAPI: React.MouseEventHandler<HTMLButtonElement> = () => {
    setViewCompleted(!viewCompleted);
  };
  if (!viewCompleted) {
    return (
      <div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input type="text" ref={todoNameRef} />
        <button onClick={handleAddTodo}>タスクを追加</button>
        <button onClick={handleClear}>選択したタスクを削除</button>
        <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
        <div>APITable</div>
        <button onClick={handleShowAPI}>APIを表示</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>APITable</div>
        <button onClick={handleShowAPI}>タスクを表示</button>
        <table>
          <thead>
            <tr>
              <th>番号</th>
              <th>タイトル</th>
              <th>カテゴリー</th>
              <th>概要</th>
              <th>リンク</th>
            </tr>
          </thead>
          <APIBody data={apiData}></APIBody>
        </table>
      </div>
    );
  }
};
