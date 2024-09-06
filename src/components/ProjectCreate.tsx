import React, { useState } from "react";
import DialogModal from "./DialogModal";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import FormComponent from "./FormComponent";

type Props = {
  onCreate: (label: string) => void;
  title: string;
  description?: string;
};

const ProjectCreate = (props: Props) => {
  const [label, setLabel] = useState("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onCreate(label);
    setLabel("");
  };

  return (
    <DialogModal.Content
      title={props.title}
      description={props.description}
      contentClassname="relative bg-[#231c35] w-4/12 p-2 rounded-lg text-white"
      overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
    >
      <FormComponent handler={handleCreate} className="w-full">
        <FormComponent.Field
          name="Label"
          labelName="Project label"
          useLabel
          useMessage
          messageName="Enter Project name"
          labelMessageClassname="flex justify-between px-1"
        >
          <FormComponent.Control
            placeholder="Project name"
            type="text"
            isRequired
            value={label}
            onChange={handleChangeInput}
            controlClassname="w-full p-1 rounded-lg bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
          />
        </FormComponent.Field>
        <div className="flex justify-end mt-3">
            
          <FormComponent.Submit>
              <span className="bg-[#2a2b47] hover:bg-[#484564] p-2 rounded-lg ">
                Create
              </span>
          </FormComponent.Submit>
            
        </div>
      </FormComponent>

      <Dialog.Close className="absolute top-1 right-1  hover:bg-[#484564] rounded-full p-1">
        <Cross1Icon className="size-[25px] " />
      </Dialog.Close>
    </DialogModal.Content>
  );
};

export default ProjectCreate;
