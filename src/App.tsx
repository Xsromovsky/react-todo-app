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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const [todos, setTodos] = useState<TodoTasksList[]>([]);

  

  return (
    <>
      <div className="bg-[#231c35] h-screen w-screen">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="*" element={<Nopage />} />

              <Route path="/home" element={<ProtectedRoute element={<TodoPage/>}/>} />
              <Route path="/history" element={<ProtectedRoute element={<TaskHistory/>}/>} />
              <Route path="/profile" element={<ProtectedRoute element={<ProfilePage/>}/>}/>
              
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
