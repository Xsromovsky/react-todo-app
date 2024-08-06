import React, { useContext, useEffect } from "react";
import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import SideBar from "../components/SideBar";
import TodosContext from "../contexts/TodoContext";

type Props = {};

const TodoPage = (props: Props) => {

  const todosContext = useContext(TodosContext);

  useEffect(() => {
    todosContext.fetchTodos();
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full">
        <TodoCreate />
        <div className=" m-4">
          <TodoList isDone={false}/>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
