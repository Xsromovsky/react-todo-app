import React, { useState } from "react";
import { TodoTasksList } from "../todo_task";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";

type Props = {
  todo: TodoTasksList;
  //   show: boolean;
  //   // onShow: () => {},
  //   onHide: () => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoEdit = (props: Props) => {
  const [newTitle, setNewTitle] = useState(props.todo.title);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };

  const handleSaveClick = () => {
    props.onEdit(props.todo.id, newTitle);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Pencil1Icon />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" >
        <Dialog.Content className="bg-[#231c35] w-3/12 m-1 p-2 rounded-lg text-white">
          <Dialog.Title className="justify-center flex mt-2">Edit Task</Dialog.Title>
          <fieldset className="space-x-2 flex items-center">
            <input
              value={newTitle}
              className=" rounded-lg p-1 w-full bg-[#242039] border-1 focus:outline-none focus:border-[#6e5774]"
              onChange={handleChange}

            />
          </fieldset>
          <div className="flex justify-end mt-4 space-x-2">
            <Dialog.Close asChild>
              <button className="hover:bg-[#2a2b47] py-2 rounded-full">cancel</button>
            </Dialog.Close>
            <Dialog.Close className="">
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
    // <div className='rounded-lg bg-yellow-400'>
    //     <h2>task here</h2>
    //     <p>description of this task is here</p>
    //     <button type='button'>cancel</button>
    // </div>
  );
};

export default TodoEdit;
