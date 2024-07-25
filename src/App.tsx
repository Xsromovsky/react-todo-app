import React, { useContext, useEffect, useState } from "react";

import "./App.css";

import { TodoTasksList } from "./todo_task";
import TodoTask from "./components/TodoTask";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import TodosContext from "./contexts/TodoContext";

function App() {
  // const [todos, setTodos] = useState<TodoTasksList[]>([]);

  const todosContext = useContext(TodosContext);

  useEffect(() => {
    todosContext.fetchTodos();
  }, []);

  // const fetchTodos = async () => {
  //   const response = await axios.get("http://localhost:3001/todos");
  //   setTodos(response.data);
  // };

  // const deletoTodoById = async (id: string) => {
  //   await axios.delete(`http://localhost:3001/todos/${id}`);
  //   const updatedTodos = todos.filter((todo) => {
  //     return todo.id !== id;
  //   });
  //   setTodos(updatedTodos);
  // };

  // const editTodoById = async (id: string, todo: TodoTasksList) => {
  //   const response = await axios.put(`http://localhost:3001/todos/${id}`, todo);
  //   const updatedTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       return {
  //         ...todo,
  //         ...response.data,
  //       };
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // };

  // const createTodo = async (
  //   title: string,
  //   description: string,
  //   isDone: boolean = false
  // ) => {
  //   const response = await axios.post(`http://localhost:3001/todos`, {
  //     title,
  //     description,
  //     isDone,
  //   });
  //   const newTodos = [...todos, response.data];
  //   setTodos(newTodos);
  // };

  // const markTask = async (id: string, isDone: boolean) => {
  //   const response = await axios.put(`http://localhost:3001/todos/${id}`, {
  //     isDone,
  //   });
  //   const updatedTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       return {
  //         ...todo,
  //         ...response.data,
  //       };
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  //   console.log('do something');
  // };

  return (
    <div className="bg-[#231c35] min-h-screen">
      <TodoCreate />
      <div className="m-4">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
