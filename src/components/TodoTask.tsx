import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { TodoTasksList } from "../todo_task";
import { createPortal } from "react-dom";
import TodoEdit from "./TodoEdit";
type Props = {
  todo: TodoTasksList;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoTask = (props: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleOpenEditClick = () => {
    setShowEdit(true);
  };
  const handleCloseEditClick = () => {
    setShowEdit(false);
  };


  const handleDeleteClick = () => {
    props.onDelete(props.todo.id);
  };

  

  return (
    <>
    <div>
    <form
      className="bg-gray-500 flex items-center px-3 w-80 h-10 justify-between rounded text-white m-4"
      onClick={handleOpenEditClick}
    >
      <div className="space-x-4">
        <input type="checkbox" name="" id="" />
        <span>{props.todo.title}</span>
      </div>
      <div className="items-center flex space-x-2">
        <span>
          <MdEdit />
        </span>
        <span onClick={handleDeleteClick}>
          <MdDelete />
        </span>
      </div>
    </form>
    
    </div>
    <TodoEdit todo={props.todo} onHide={handleCloseEditClick} show={showEdit} onEdit={props.onEdit}/>
    </>
  );
};

export default TodoTask;
