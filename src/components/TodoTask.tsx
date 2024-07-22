import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
type Props = {};

const TodoTask = (props: Props) => {
  return (
    <form className="bg-blue-300 flex items-center px-3 w-80 h-10 justify-between">
      <span>todo</span>
      <div className="items-center flex space-x-2">
        <MdEdit />
        <MdDelete />
      </div>
    </form>
  );
};

export default TodoTask;
