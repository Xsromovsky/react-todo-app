import React, { useEffect, useState } from "react";

import "./App.css";

import { TodoTasksList } from "./todo_task";
import TodoTask from "./components/TodoTask";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";

function App() {
  const [todos, setTodos] = useState<TodoTasksList[]>([]);
  
  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3001/todos");
    setTodos(response.data);
    
  };

  const deletoTodoById = async (id: string) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    })
    setTodos(updatedTodos);
  }

  const editTodoById = async (id: string, newTitle: string) => {
    const response = await axios.put(`http://localhost:3001/todos/${id}`,{
      title: newTitle
    });
    const updatedTodos = todos.map((todo) =>{
      if(todo.id === id){
        return {
          ...todo,
          ...response.data,
        };
      }
      return todo;
    });
    setTodos(updatedTodos)

  }

  const createTodo = async (title: string) => {
    const response = await axios.post(`http://localhost:3001/todos`, {
      title,
    })
    const newTodos = [
      ...todos, response.data
    ]
    setTodos(newTodos)
  }



  useEffect(() => {
    fetchTodos();
  },[])


  return (
    <div className="">
      <TodoCreate onCreate={createTodo}/>
      <TodoList todos={todos} onDelete={deletoTodoById} onEdit={editTodoById}/>
      
    </div>
  );
}

export default App;
