import React, { useContext, useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Dialog from "@radix-ui/react-dialog";
import DialogModal from "./DialogModal";
import TodosContext from "../contexts/TodoContext";

type Props = {};

const TodoCreate = (props: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const todosContext = useContext(TodosContext);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    // event.preventDefault();
    // props.onCreate(title, description);
    todosContext.createTodo(title, description, false);
    setDescription("");
    setTitle("");
  };

  return (
    <div className="bg-[#2a2b47] flex flex-col items-center p-4 text-white">
      <h2 className="text-3xl mb-4">My personal Todo app</h2>
      <DialogModal>
        <DialogModal.Button asChild>
          <button className="p-2 rounded-full bg-[#484564]">Create Task</button>
        </DialogModal.Button>
        <DialogModal.Content title="Create new Task">
          <fieldset>
            <input
              type="text"
              placeholder="Task name"
              className="rounded-lg p-1 w-full bg-[#242039] border-1 focus:outline-none focus:border-[#6e5774]"
              onChange={handleChangeInput}
            />
          </fieldset>
          <fieldset>
            <textarea
              name="description"
              placeholder="Task description"
              className="bg-[#242039] rounded-lg text-white mt-2 w-full active:outline-none p-1"
              onChange={handleChangeTextArea}
            ></textarea>
          </fieldset>
          <div className=" flex justify-end space-x-2">
            <Dialog.Close>
              <button className="hover:bg-[#2a2b47] p-2  rounded-full">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close>
              <button
                className="bg-[#242039] p-2 rounded-full m-2 hover:bg-[#2a2b47]"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </button>
            </Dialog.Close>
          </div>
        </DialogModal.Content>
      </DialogModal>
    </div>
  );
};

export default TodoCreate;
