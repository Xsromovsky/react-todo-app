import React, { useContext, useEffect } from "react";

import "./App.css";

import TodoTask from "./components/TodoTask";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import TodosContext from "./contexts/TodoContext";
import SideBar from "./components/SideBar";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from "./pages/Nopage";
import ProfilePage from "./pages/ProfilePage";
import TaskHistory from "./pages/TaskHistory";

function App() {
  // const [todos, setTodos] = useState<TodoTasksList[]>([]);

  const todosContext = useContext(TodosContext);

  useEffect(() => {
    todosContext.fetchTodos();
  }, []);


  return (
    <>

     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<TodoPage />} />
        <Route path="/history" element={<TaskHistory/>}/>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
