import React, { useState } from "react";
import DialogModal from "./DialogModal";
import { ProjectType, Task } from "../utils/todo_task";
import { ChevronUpIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/themes";
import TodoEdit from "./TodoEdit";
import useProjectContext from "../hooks/useProjectContext";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import ProjectDetailTask from "./ProjectDetailTask";

type Props = {
  project: ProjectType;
};

const ProjectDetails = (props: Props) => {
  const [isLabel, setIsLabel] = useState(false);
  const projectContext = useProjectContext();
  const [isButtonTitle, setIsButtonTitle] = useState(false);
  
  const renderedTasks = props.project.tasks.map((task, index) => {
    return (
      <ProjectDetailTask index={index} task={task}/>
    );
  });

  const buttonTitle = () => {
    return (
      <div className="flex items-center px-2">
        <Pencil1Icon className="size-[30px] cursor-pointer hover:bg-[#484564] rounded-full p-1" />
      </div>
    );
  };

  return (
    <DialogModal.Content
      title={props.project.label}
      buttonTitle
      childrenTitle={buttonTitle()}
      contentClassname="relative bg-[#231c35]  w-5/12 p-2 rounded-lg text-white"
      overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
    >
      <DialogModal.Close className="absolute right-1 top-1">
        <Cross1Icon className="size-[25px]" />
      </DialogModal.Close>
      {renderedTasks}
    </DialogModal.Content>
  );
};

export default ProjectDetails;
