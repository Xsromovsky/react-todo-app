import React, { useState } from 'react'
import { Task } from '../utils/todo_task'
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import useProjectContext from '../hooks/useProjectContext';
import * as Accordion from "@radix-ui/react-accordion";
import DialogModal from './DialogModal';
import { Pencil1Icon } from '@radix-ui/react-icons';
import TodoEdit from './TodoEdit';
type Props = {
    task: Task
    index: number
}

const ProjectDetailTask = (props: Props) => {
    const [isDone, setIsDone] = useState(props.task.isDone);
    const [isAccordionCLicked, setIsAccordionCLicked] = useState();
    const projectContext = useProjectContext();

    const handleChecked = (event: React.MouseEvent) => {
        setIsDone(!isDone);
        props.task.isDone = !props.task.isDone;
        projectContext.updateTaskById(props.task);
      };

    const handleProjectTaskEdit = (id: string, task: Task) => {
        projectContext.updateTaskById(task);
      };


  return (
    <Accordion.Root
        type="single"
        collapsible
        defaultValue="item-1"
        className=""
        key={props.task.id}
      >
        <Accordion.Item value={`value-${props.index}`} className="">
          <Accordion.Trigger className="flex bg-[#2a2b47] w-full justify-between  rounded-t-lg items-center p-1 hover:bg-[#484564]">
            {props.task.title}
            <div className="flex space-x-2 items-center">
              <DialogModal>
                <DialogModal.Button>
                  <Pencil1Icon />
                </DialogModal.Button>
                <TodoEdit
                  todo={props.task}
                  editTaskById={handleProjectTaskEdit}
                  key={props.index}
                />
              </DialogModal>
            </div>
          </Accordion.Trigger>
          <Accordion.Content className="bg-[#2a2b47] p-1 rounded-b-lg">
            {props.task.description}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
  )
}

export default ProjectDetailTask