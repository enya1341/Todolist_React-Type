import Todolist from "./Todolist";
import APIList from "./apiList";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  interface todoObj {
    id: number;
    name: string;
    completed: boolean;
  }
  interface apiObj {
    count: number;
    entries: Object[];
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
  const [apiDatas, setAPIDatas] = React.useState<apiObj[]>([]);
  const baseURL: string = "https://api.publicapis.org/entries";
  const [viewCompleted, setViewCompleted] = React.useState<boolean>(false);
  useEffect(() => {
    const getUser: any = async () => {
      await axios
        .get(baseURL)
        .then((response) => {
          setAPIDatas(response.data);
          console.log("apiを取得");
        })
        .catch(() => "test");
    };
    getUser();
  }, []);

  const viewAPI: React.FC = () => {
    setViewCompleted(!viewCompleted);
    console.log("apiページを展開");
    return null;
  };
  if (!viewCompleted) {
    return (
      <div>
        <Todolist todos={todos} toggleTodo={toggleTodo} />
        <input type="text" ref={todoNameRef} />
        <button onClick={handleAddTodo}>タスクを追加</button>
        <button onClick={handleClear}>選択したタスクを削除</button>
        <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
        <div>APITable</div>
        <button onClick={viewAPI}>APIを表示</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>APITable</div>
        <button onClick={viewAPI}>タスクを表示</button>
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
          <APIList apiDatas={apiDatas.entries}></APIList>
        </table>
      </div>
    );
  }
};

export default App;
