import React, { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogModal from "./DialogModal";
import FormComponent from "./FormComponent";

type Props = {
  handleCreateTodo: (title: string, description: string) => void;
};

const TodoCreate = (props: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const todosContext = useContext(TodosContext);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log(title);
  };
  const handleChangeTextArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    console.log(description);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // props.onCreate(title, description);
    // todosContext.createTodo(title, description);
    props.handleCreateTodo(title, description);
    setDescription("");
    setTitle("");
  };

  return (
    <DialogModal.Content
      title="Create new Task"
      contentClassname="relative bg-[#231c35]  w-4/12 p-2 rounded-lg text-white"
      overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
    >
      
      <FormComponent handler={handleSubmit} className="w-full">
        <FormComponent.Field
          name="title"
          useLabel
          labelName="title"
          labelMessageClassname="flex justify-between px-2 font-bold text-lg"
          useMessage
          messageName="Enter task title"
          

        >
          <FormComponent.Control
            value={title}
            onChange={handleChangeInput}
            isRequired
            
            type="text"
            placeholder="Enter title"
            controlClassname="w-full p-1 rounded-lg bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
          />
        </FormComponent.Field>
        <FormComponent.Field
          name="description"
          useLabel
          labelName="description"
          labelMessageClassname="px-2 font-bold text-lg"
        >
          <FormComponent.Control
            value={description}
            onChange={handleChangeTextArea}
            type="text"
            placeholder="Enter description"
            controlClassname="w-full p-1 rounded-lg bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
          />
        </FormComponent.Field>
        <div className="flex space-x-3 justify-end items-center mt-2">
        <DialogModal.Close className="flex items-center p-2 hover:bg-[#484564] rounded-lg">
          Close
        </DialogModal.Close>

        <FormComponent.Submit className=" flex justify-end ">
            <span className="bg-[#2a2b47]  hover:bg-[#484564] p-2 rounded-lg ">
              Create
            </span>
        </FormComponent.Submit>
        </div>
      </FormComponent>
    </DialogModal.Content>
  );
};

export default TodoCreate;
