import React from "react";
import SideBar from "../components/SideBar";
import TodoList from "../components/TodoList";

type Props = {};

const TaskHistory = (props: Props) => {
  return (
    <div className="bg-[#231c35] h-screen flex">
      <SideBar />
      <div className=" flex-1 p-4 flex flex-col items-center">
        <h1 className="text-white text-center ">History</h1>

        <div className="mt-3">
          <TodoList isDone={true}/>
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;
