import React from "react";
import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import SideBar from "../components/SideBar";

type Props = {};

const TodoPage = (props: Props) => {
  return (
    <div className="flex bg-[#231c35] h-screen">
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
