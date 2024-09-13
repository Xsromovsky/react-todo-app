import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { Provider } from "../contexts/TodoContext";
import { ProjectProvider } from "../contexts/ProjectContext";

const queryCLient = new QueryClient();

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryCLient}>
      <BrowserRouter>
        <AuthProvider>
          <ProjectProvider>
            <Provider>{children}</Provider>
          </ProjectProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
