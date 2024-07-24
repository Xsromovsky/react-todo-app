import React, { useState } from "react";
import { TodoTasksList } from "../todo_task";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import DialogModal from "./DialogModal";

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
    <DialogModal>
      <DialogModal.Button>
        <Pencil1Icon />
      </DialogModal.Button>
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
    </DialogModal>
  );
};

export default TodoEdit;
