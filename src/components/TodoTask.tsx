import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { TodoTasksList } from "../todo_task";
type Props = {
  todo: TodoTasksList;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const TodoTask = (props: Props) => {

const handleDeleteClick = () => {
    props.onDelete(props.todo.id);
}

  return (
    <form className="bg-gray-500 flex items-center px-3 w-80 h-10 justify-between rounded text-white m-4">
      <div className="space-x-4">
        <input type="checkbox" name="" id="" />
        <span>{props.todo.title}</span>
      </div>
      <div className="items-center flex space-x-2">
        <span >
          <MdEdit />
        </span>
        <span onClick={handleDeleteClick}>
          <MdDelete />
        </span>
      </div>
    </form>
  );
};

export default TodoTask;
