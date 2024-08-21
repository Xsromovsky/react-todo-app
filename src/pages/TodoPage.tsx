import React, { useContext, useEffect } from "react";
import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import SideBar from "../components/SideBar";
import TodosContext from "../contexts/TodoContext";
import HeaderComponent from "../components/HeaderComponent";
import { Dialog } from "@radix-ui/themes";
import DialogModal from "../components/DialogModal";

type Props = {};

const TodoPage = (props: Props) => {

  const todosContext = useContext(TodosContext);

  useEffect(() => {
    todosContext.fetchTodos();
  }, []);

  const handleCreateTodo = (title: string, description: string) => {
    todosContext.createTodo(title, description);
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full">
        <HeaderComponent title="My todo app">
          <DialogModal>
            <DialogModal.Button className="p-2 rounded-full bg-[#484564] hover:bg-[#5b5271] mb-2">
              New Task
            </DialogModal.Button>
            <DialogModal.Content title="Create a new task">
              <TodoCreate handleCreateTodo={handleCreateTodo}/>
            </DialogModal.Content>
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
