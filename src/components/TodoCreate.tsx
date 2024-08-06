import React, { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogModal from "./DialogModal";
import TodosContext from "../contexts/TodoContext";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const TodoCreate = (props: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const todosContext = useContext(TodosContext);
  const navigate = useNavigate();

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
    todosContext.createTodo(title, description);
    setDescription("");
    setTitle("");
  };


  return (
    <div className="bg-[#2a2b47] flex flex-col items-center p-4 text-white">
      <h2 className="text-3xl mb-4">My personal Todo app</h2>
      <DialogModal>
        <DialogModal.Button asChild>
          <span className="p-2 rounded-full bg-[#484564]">Create Task</span>
        </DialogModal.Button>
        <DialogModal.Content
          title="Create new Task"
          contentClassname="relative bg-[#231c35]  w-4/12 p-2 rounded-lg text-white"
          overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
        >
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
