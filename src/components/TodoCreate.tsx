import React, { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogModal from "./DialogModal";
import TodosContext from "../contexts/TodoContext";

type Props = {
  handleCreateTodo: (title: string, description: string)=>void
};

const TodoCreate = (props: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const todosContext = useContext(TodosContext);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log(title);
    
  };
  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    console.log(description);
    
  };
  const handleSubmit = (event: React.FormEvent) => {
    // event.preventDefault();
    // props.onCreate(title, description);
    // todosContext.createTodo(title, description);
    props.handleCreateTodo(title, description);
    setDescription("");
    setTitle("");
  };


  return (
    
        
        <DialogModal.Content
          title="Create new Task"
          description="Add a new task here"
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
      
  );
};

export default TodoCreate;
