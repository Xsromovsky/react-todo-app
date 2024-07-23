import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TodoTasksList } from "../todo_task";
import TodoEdit from "./TodoEdit";
import * as Checkbox from "@radix-ui/react-checkbox";
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

  const handleOpenEditClick = () => {
    setShowEdit(true);
  };

  const handleDeleteClick = () => {
    props.onDelete(props.todo.id);
  };

  const handleChecked = () => {
    setChecked(!checked);
  }

  const markTitle = twMerge(
    classNames({
        "bg-red-600": checked
    })
  )

  return (
    <>
      <div>
        <form
        //   className="bg-[#5b5271] flex items-center px-3 w-80 h-10 justify-between text-white rounded-lg"
        className={`flex items-center px-3 w-80 h-10 justify-between text-white rounded-lg ${
            checked ? 'bg-red-500' : 'bg-[#5b5271]'
          }`}
          
        >
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
    </>
  );
};

export default TodoTask;
