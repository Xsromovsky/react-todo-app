import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TodoTasksList } from "../todo_task";
import TodoEdit from "./TodoEdit";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import useTodosContext from "../hooks/useTodosContext";
import DialogModal from "./DialogModal";

type Props = {
  todo: TodoTasksList;
  //   onDelete: (id: string) => void;
  //   onEdit: (id: string, todo: TodoTasksList) => void;
};

const TodoTask = (props: Props) => {
  const todosContext = useTodosContext();
  const [isDone, setIsDone] = useState(props.todo.isDone);

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // props.onDelete(props.todo.id);
    todosContext.deletoTodoById(props.todo.id);
  };

  const handleChecked = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDone(!isDone);
    props.todo.isDone = !props.todo.isDone;
    // props.onEdit(props.todo.id, props.todo);
    todosContext.editTodoById(props.todo.id, props.todo);
  };

  const markTitle = twMerge(
    classNames(
      "flex px-2 w-[300px] h-10 justify-between text-white rounded-lg  space-x-2",
      {
        "bg-red-600 transition duration-150 hover:bg-red-700 ": isDone,
        "bg-[#5b5271] transition duration-150 hover:bg-[#6e5774]": !isDone,
      }
    )
  );

  return (
    <div className="">
      <DialogModal>
        <DialogModal.Button>
          <form className={markTitle}>
            <div className="space-x-1 flex items-center truncate">
              <Checkbox.Root
                className="flex-shrink-0 text-[#5b5271] hover:bg-red flex h-5 w-5 items-center justify-center rounded-[4px] bg-white"
                id={props.todo.id}
                checked={isDone}
                onClick={handleChecked}
              >
                <Checkbox.Indicator className="text-violet11 w-[20px] items-center flex justify-center">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <div className="">
                <p className="m-0">{props.todo.title}</p>
              </div>
            </div>
            <div className="items-center flex">
              <span onClick={handleDeleteClick} className="cursor-pointer">
                <MdDelete />
              </span>
            </div>
          </form>
        </DialogModal.Button>
        <DialogModal.Content title={props.todo.title}>
          <TodoEdit todo={props.todo} />
        </DialogModal.Content>
      </DialogModal>
    </div>
    // <div className="bg-yellow-300 w-[300px] text-red-600">
    //   <p className="truncate">{props.todo.title}</p>
    //   <span className="truncate"></span>
    // </div>
  );
};

export default TodoTask;
