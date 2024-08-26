import React from "react";

import "./App.css";

import { Provider } from "./contexts/TodoContext";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from "./pages/Nopage";
import ProfilePage from "./pages/ProfilePage";
import TaskHistory from "./pages/TaskHistory";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectPage from "./pages/ProjectPage";
import { ProjectProvider } from "./contexts/ProjectContext";



function App() {
  // const [todos, setTodos] = useState<TodoTasksList[]>([]);

  return (
    <>
      <div className="bg-[#231c35] h-screen w-screen">
        <BrowserRouter>
          <AuthProvider>
            <ProjectProvider>
            <Provider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/home"
                  element={<ProtectedRoute element={<TodoPage />} />}
                />
                <Route
                  path="/history"
                  element={<ProtectedRoute element={<TaskHistory />} />}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute element={<ProfilePage />} />}
                />
                <Route
                  path="/projects"
                  element={<ProtectedRoute element={<ProjectPage />} />}
                />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="*" element={<Nopage />} />
              </Routes>
            </Provider>
            </ProjectProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
