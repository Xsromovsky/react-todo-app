import React, { useState } from "react";
import DialogModal from "./DialogModal";
import { ProjectType, Task } from "../utils/todo_task";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/themes";
import TodoEdit from "./TodoEdit";
import useProjectContext from "../hooks/useProjectContext";

type Props = {
  project: ProjectType;
};

const ProjectDetails = (props: Props) => {
  const [isLabel, setIsLabel] = useState(false);
  const projectContext = useProjectContext();

  const handleProjectTaskEdit = (id: string, task: Task) => {
    projectContext.updateTaskById(task);
  };

  const renderedTasks = props.project.tasks.map((task, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDone, setIsDone] = useState(task.isDone);
    const handleChecked = (event: React.MouseEvent) => {
      setIsDone(!isDone);
      task.isDone = !task.isDone;

      projectContext.updateTaskById(task);

      // console.log(props.task);
      // console.log(isDone);
    };
    return (
      <Accordion.Root
        type="single"
        collapsible
        defaultValue="item-1"
        className=""
        key={task.id}
      >
        <Accordion.Item value={`value-${index}`} className="">
          <Accordion.Trigger className="flex bg-[#2a2b47] w-full justify-between  rounded-t-lg items-center p-1 hover:bg-[#484564]">
            {task.title}
            <div className="flex space-x-2 items-center">
              <DialogModal>
                <DialogModal.Button>
                  <Pencil1Icon />
                </DialogModal.Button>
                <TodoEdit
                  todo={task}
                  editTaskById={handleProjectTaskEdit}
                  key={index}
                />
              </DialogModal>
              <ChevronDownIcon className="size-[15px]" />
            </div>
          </Accordion.Trigger>
          <Accordion.Content className="bg-[#2a2b47] p-1 rounded-b-lg">
            {task.description}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
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
