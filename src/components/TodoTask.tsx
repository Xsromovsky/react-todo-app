import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TodoTasksList } from "../todo_task";
import TodoEdit from "./TodoEdit";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

type Props = {
  todo: TodoTasksList;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoTask = (props: Props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const [newTitle, setNewTitle] = useState(props.todo.title);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };

  const handleSaveClick = () => {
    props.onEdit(props.todo.id, newTitle);
  };

  const handleOpenEditClick = () => {
    setShowEdit(true);
    console.log("shoedit: ", showEdit);
  };

  const handleDeleteClick = () => {
    props.onDelete(props.todo.id);
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  const markTitle = twMerge(
    classNames(
      "flex items-center px-3 w-80 h-10 justify-between text-white rounded-lg ",
      {
        "bg-red-600 transition duration-150 hover:bg-red-700 ": checked,
        "bg-[#5b5271] transition duration-150 hover:bg-[#6e5774]": !checked,
      }
    )
  );

  const editMe = () => {
    <TodoEdit todo={props.todo} onEdit={props.onEdit} />;
  };

  return (
    <div>
      <form className={markTitle} onClick={handleOpenEditClick}>
        <div className="space-x-4 flex items-center">
          <Checkbox.Root
            className="text-[#5b5271]  hover:bg-red flex h-5 w-5 items-center justify-center rounded-[4px] bg-white"
            id={props.todo.id}
            checked={checked}
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
            <TodoEdit todo={props.todo} onEdit={props.onEdit} />
          </span>
          <span onClick={handleDeleteClick}>
            <MdDelete />
          </span>
        </div>
      </form>
    </div>
  );
};

export default TodoTask;
