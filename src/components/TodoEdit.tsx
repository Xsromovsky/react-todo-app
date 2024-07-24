import React, { useState } from "react";
import { TodoTasksList } from "../todo_task";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";

type Props = {
  todo: TodoTasksList;
  //   show: boolean;
  //   // onShow: () => {},
  //   onHide: () => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
};

const TodoEdit = (props: Props) => {
  const [newTitle, setNewTitle] = useState(props.todo.title);
  const [newDescription, setNewDescription] = useState(props.todo.description);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };
  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(event.target.value);
  };

  const handleSaveClick = () => {
    if (newTitle.trim()) {
      props.onEdit(props.todo.id, newTitle, newDescription);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button aria-label="Edit Task">
          <Pencil1Icon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <Dialog.Content
            className="relative bg-[#231c35] h-3/6 w-4/12 p-2 rounded-lg text-white"
            aria-labelledby="edit-task-title"
            aria-describedby="edit-task-description"
          >
            <Dialog.Title className="justify-center flex mt-2">
              Edit Task
            </Dialog.Title>
            <div className="m-5">
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
            </div>
            <div className="absolute flex bottom-4 right-4 space-x-2">
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
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoEdit;
