import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TodoTasksList } from "../todo_task";
import TodoEdit from "./TodoEdit";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import useTodosContext from "../hooks/useTodosContext";

type Props = {
    todo: TodoTasksList;
  //   onDelete: (id: string) => void;
  //   onEdit: (id: string, todo: TodoTasksList) => void;
};

const TodoTask = (props: Props) => {
  const todosContext = useTodosContext();
  const [showEdit, setShowEdit] = useState(false);
  const [isDone, setIsDone] = useState(props.todo.isDone);
  //   const [newTitle, setNewTitle] = useState(props.todo.title);
  //   const [newDescription, setNewDescription] = useState(props.todo.description);
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     event.preventDefault();
  //     setNewTitle(event.target.value);
  //   };

  //   const handleSaveClick = () => {
  //     props.onEdit(props.todo.id, newTitle, newDescription);
  //   };

  const handleOpenEditClick = () => {
    setShowEdit(true);
    console.log("show edit: ", showEdit);
  };

  const handleDeleteClick = () => {
    // props.onDelete(props.todo.id);
    todosContext.deletoTodoById(props.todo.id)
  };

  const handleChecked = () => {
    setIsDone(!isDone);
    props.todo.isDone = !props.todo.isDone;
    // props.onEdit(props.todo.id, props.todo);
    todosContext.editTodoById(props.todo.id, props.todo)
  };

  const markTitle = twMerge(
    classNames(
      "flex items-center px-3 w-80 h-10 justify-between text-white rounded-lg ",
      {
        "bg-red-600 transition duration-150 hover:bg-red-700 ": isDone,
        "bg-[#5b5271] transition duration-150 hover:bg-[#6e5774]": !isDone,
      }
    )
  );

  return (
    <div>
      <form className={markTitle} onClick={handleOpenEditClick}>
        <div className="space-x-4 flex items-center">
          <Checkbox.Root
            className="text-[#5b5271]  hover:bg-red flex h-5 w-5 items-center justify-center rounded-[4px] bg-white"
            id={props.todo.id}
            checked={isDone}
            onClick={handleChecked}
          >
            <Checkbox.Indicator className="text-violet11">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span>{props.todo.title}</span>
        </div>
        <div className="items-center flex space-x-2">
          <span>
            <TodoEdit todo={props.todo} />
          </span>
          <span onClick={handleDeleteClick} className="cursor-pointer">
            <MdDelete />
          </span>
        </div>
      </form>
    </div>
  );
};

export default TodoTask;
