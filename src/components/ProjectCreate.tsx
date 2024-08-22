import React, { useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import DialogModal from "./DialogModal";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
type Props = {
  onCreate: (label:string) => void
  title: string
  description?: string
};

const ProjectCreate = (props: Props) => {
  const [label, setLabel] = useState("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleCreate = () => {
    props.onCreate(label)
  };

  return (
    <DialogModal.Content
      title={props.title}
      description={props.description}
      contentClassname="relative bg-[#231c35] w-4/12 p-2 rounded-lg text-white"
      overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
    >
      <fieldset>
        <input
          type="text"
          placeholder="Project name"
          onChange={handleChangeInput}
          className="rounded-lg p-1 w-full bg-[#242039] border-1 focus:outline-none focus:border-[#6e5774]"
          required
        />
      </fieldset>
      <div className="flex justify-end">
        <Dialog.Close onClick={handleCreate} className="bg-[#242039] p-2 rounded-full m-2 hover:bg-[#2a2b47] font-bold text-lg">
          Create
        </Dialog.Close>
      </div>

      <Dialog.Close className="absolute top-1 right-1  hover:bg-[#484564] rounded-full p-1">
        <Cross1Icon className="size-[25px] " />
      </Dialog.Close>
    </DialogModal.Content>
  );
};

export default ProjectCreate;
