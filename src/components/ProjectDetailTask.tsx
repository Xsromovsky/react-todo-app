import React, { useState } from "react";
import { Task } from "../utils/todo_task";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import useProjectContext from "../hooks/useProjectContext";
import * as Accordion from "@radix-ui/react-accordion";
import DialogModal from "./DialogModal";
import {
  CheckIcon,
  DividerHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import TodoEdit from "./TodoEdit";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Separator from "@radix-ui/react-separator";
import DeleteComponent from "./DeleteComponent";

type Props = {
  task: Task;
  index: number;
};

const ProjectDetailTask = (props: Props) => {
  const [isDone, setIsDone] = useState(props.task.isDone);
  const projectContext = useProjectContext();
  //   const [isAccordionCLicked, setIsAccordionCLicked] = useState();
  
  const handleChecked = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDone(!isDone);
    props.task.isDone = !props.task.isDone;
    handleProjectTaskEdit(props.task.id, props.task)
  };

  const handleProjectTaskEdit = (id: string, task: Task) => {
    projectContext.updateTaskById(task);
  };
  const handleProjectTaskDelete = () => {
    projectContext.deleteTaskById(props.task.id, props.task.projectId!);
  };

  const martProjectTask = twMerge(
    classNames(
      "flex border-t-2 border-[#6e5774] w-full justify-between items-center p-1 ",
      {
        "bg-red-500 hover:bg-red-600": isDone,
      }
    )
  );

  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue="item-1"
      className="relative"
      key={props.task.id}
    >
      <Accordion.Item value={`value-${props.index}`} className=" ">
        <Accordion.Trigger className={martProjectTask}>
          <div className="flex items-center">
            <Checkbox.Root
              className="flex-shrink-0 text-[#5b5271] hover:bg-red flex h-5 w-5 items-center justify-center rounded-[4px] bg-white"
              id={props.task.id}
              checked={props.task.isDone}
              onClick={handleChecked}
            >
              <Checkbox.Indicator className="text-violet11 w-[20px] items-center flex justify-center">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <p className="m-0 px-2 text-justify">{props.task.title}</p>
          </div>
          <div className="flex items-center space-x-1">
            <DialogModal>
              <DialogModal.Button className="" asChild>
                <Pencil1Icon className="hover:bg-[#484564] rounded-full p-1 size-[25px]" />
              </DialogModal.Button>
              <TodoEdit
                todo={props.task}
                editTaskById={handleProjectTaskEdit}
                key={props.index}
              />
            </DialogModal>
            <DialogModal>
              <DialogModal.Button asChild>
                <TrashIcon className="hover:bg-[#484564] rounded-full p-1 size-[25px]" />
              </DialogModal.Button>
              <DeleteComponent title={`Delete task: ${props.task.title}`} description="Do you want to delete this task?" delete={handleProjectTaskDelete} key={props.task.id}/>
            </DialogModal>
          </div>
        </Accordion.Trigger>
        <Accordion.Content className="bg-[#484564] p-1 rounded-b-lg">
          {props.task.description}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ProjectDetailTask;
