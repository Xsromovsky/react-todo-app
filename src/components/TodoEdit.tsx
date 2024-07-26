import React, { useState } from "react";
import { TodoTasksList } from "../todo_task";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import DialogModal from "./DialogModal";
import useTodosContext from "../hooks/useTodosContext";

type Props = {
  todo: TodoTasksList;
  //   show: boolean;
  //   // onShow: () => {},
  //   onHide: () => void;
  //   onEdit: (id: string, todo: TodoTasksList) => void;
};

const TodoEdit = (props: Props) => {
  const [newTitle, setNewTitle] = useState(props.todo.title);
  const [newDescription, setNewDescription] = useState(props.todo.description);
  const todosContext = useTodosContext();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTitle(event.target.value);
    props.todo.title = event.target.value;
  };
  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(event.target.value);
    props.todo.description = event.target.value;
  };

  const handleSaveClick = () => {
    if (newTitle.trim()) {
      //   props.onEdit(props.todo.id, props.todo);
      todosContext.editTodoById(props.todo.id, props.todo);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    todosContext.editTodoById(props.todo.id, props.todo);
    console.log(newTitle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogModal.Content title="Edit Task">
        <fieldset className="space-x-2 flex items-center">
          <input
            value={newTitle}
            className=" rounded-lg p-1 w-full bg-[#242039] border-1 focus:outline-none focus:border-[#6e5774]"
            onChange={handleChangeInput}
          />
        </fieldset>
        <textarea
          className="bg-[#242039] rounded-lg text-white mt-2 w-full active:outline-none p-1 h-3/6"
          placeholder="Task description"
          value={newDescription}
          onChange={handleChangeTextArea}
        ></textarea>
        <div className="flex justify-end">
          <Dialog.Close>
            <button className="hover:bg-[#2a2b47] p-2  rounded-full">
              cancel me
            </button>
          </Dialog.Close>
          <Dialog.Close>
            <button
              className="bg-[#242039] p-2 rounded-full m-2 hover:bg-[#2a2b47]"
              onClick={handleSaveClick}
            >
              Save changes
            </button>
          </Dialog.Close>
        </div>
      </DialogModal.Content>
    </form>
  );
};

export default TodoEdit;
