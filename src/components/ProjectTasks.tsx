import React, { useEffect, useState } from "react";
import { Task } from "../utils/todo_task";
import * as Checkbox from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  Cross1Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import DialogModal from "./DialogModal";
import TodoEdit from "./TodoEdit";
import useProjectContext from "../hooks/useProjectContext";

type Props = {
  task: Task;
  index: number;
  handleProjectTaskEdit: (id: string, task: Task) => void;
  handleProjectTaskCreate: (title: string, description: string) => void;
};

const ProjectTasks = (props: Props) => {
    const [isDone, setIsDone] = useState(props.task.isDone)
    const projectContext = useProjectContext();

    // useEffect(()=>{
    //     console.log(props.task);
    //     console.log(isDone);
        
    // },[])

    const handleChecked = (event: React.MouseEvent) => {
        setIsDone(!isDone);
        props.task.isDone = !props.task.isDone;

        projectContext.updateTaskById(props.task)
        
        // console.log(props.task);
        // console.log(isDone);
    }
  return (
    <div
      key={props.index}
      className="hover:bg-[#484564]  flex items-center justify-between w-[350px]"
    >
        
      <div className="flex items-center m-1  max-w-full truncate">
        <Checkbox.Root
          className="flex-shrink-0 text-[#5b5271] flex h-5 w-5 
                 justify-center rounded-[4px] bg-white items-center"
          checked={isDone}
          onClick={handleChecked}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <p className="flex items-center m-0 px-2 ">{props.task.title}</p>
      </div>
      <div className="flex space-x-2">
        <DialogModal>
          <DialogModal.Button>
            <Pencil1Icon className="cursor-pointer size-[20px]" />
          </DialogModal.Button>
          <DialogModal.Content
            title="Edit Task"
            description="Edit exist task here"
          >
            <TodoEdit
              todo={props.task}
              key={props.task.id}
              editTaskById={props.handleProjectTaskEdit}
            />
          </DialogModal.Content>
        </DialogModal>
        <DialogModal>
          <DialogModal.Button>
            <TrashIcon className="cursor-pointer size-[20px]" />
          </DialogModal.Button>
          <DialogModal.Content
            title={`Delete task: ${props.task.title}`}
            contentClassname="relative bg-[#231c35]  w-4/12 p-2 rounded-lg text-white"
            overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
            dialogTitle="truncate"
          >
            <DialogModal.Close className="absolute top-1 right-1  hover:bg-[#484564] rounded-full p-1">
              <Cross1Icon className="size-[25px] " />
            </DialogModal.Close>
            <div className="flex flex-col">
              <p>Do you want delete a task?</p>
              <div className="flex justify-end">
                <DialogModal.Close
                  className="bg-red-500 p-2 rounded-lg hover:bg-red-600 font-bold"
                  onClick={() => {
                    projectContext.deleteTaskById(props.task.id, props.task.projectId!);
                  }}
                >
                  Delete
                </DialogModal.Close>
              </div>
            </div>
          </DialogModal.Content>
        </DialogModal>
      </div>
    </div>
  );
};

export default ProjectTasks;
