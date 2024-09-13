import React, { useContext, useEffect } from "react";
import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import SideBar from "../components/SideBar";
import TodosContext from "../contexts/TodoContext";
import HeaderComponent from "../components/HeaderComponent";
import DialogModal from "../components/DialogModal";

// import toast, { Toaster } from "react-hot-toast";

type Props = {};

const TodoPage = (props: Props) => {
  const todosContext = useContext(TodosContext);

  useEffect(() => {
    todosContext.fetchTodos();
  }, []);

  const handleCreateTodo = (title: string, description: string) => {
    todosContext.createTodo(title, description);
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full">
        <HeaderComponent title="My todo app">
          <DialogModal>
            <DialogModal.Button
              className="p-2 rounded-full bg-[#484564] hover:bg-[#5b5271] mb-2"
              aria-label="todopage-new-task-btn"
            >
              New Task
            </DialogModal.Button>
            <TodoCreate handleCreateTodo={handleCreateTodo} />
          </DialogModal>
        </HeaderComponent>
        <div className=" m-4">
          <TodoList isDone={false}/>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
