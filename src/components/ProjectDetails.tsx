import React, { useState } from "react";
import DialogModal from "./DialogModal";
import { ProjectType, Task } from "../utils/todo_task";
import {
  Cross1Icon,
  PaperPlaneIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import useProjectContext from "../hooks/useProjectContext";
import ProjectDetailTask from "./ProjectDetailTask";
import DeleteComponent from "./DeleteComponent";
import ProjectCreate from "./ProjectCreate";

type Props = {
  project: ProjectType;
};

const ProjectDetails = (props: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const projectContext = useProjectContext();

  //   const handleProjectTaskEdit = (id: string, task: Task) => {
  //     projectContext.updateTaskById(task);
  //   };
  const handleProjectDelete = () => {
    projectContext.deleteProject(props.project.id);
  };
  const handleProjectTaskCreate = () => {
    projectContext.newTask(taskTitle, "", props.project.id);
    setTaskTitle("");
  };

  const handleProjectLabelChange = (label: string) => {
    projectContext.updateProject(props.project.id,label)
 }
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };



  const renderedTasks = props.project.tasks.map((task, index) => {
    return <ProjectDetailTask index={index} task={task} key={index} />;
  });

  const buttonTitle = () => {
    return (
      <DialogModal>
        <DialogModal.Button className="flex items-center">
        <Pencil1Icon className="size-[30px] cursor-pointer hover:bg-[#484564] rounded-full p-1" />

        </DialogModal.Button>
        <ProjectCreate onCreate={handleProjectLabelChange} title="Edit project name"/>
      </DialogModal>
      
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
      <DialogModal.Close className="absolute right-2 top-2" asChild>
        <Cross1Icon className="size-[25px]" />
      </DialogModal.Close>

      <div className="max-h-[300px] overflow-y-auto">
        {renderedTasks}
       
          <div className="flex p-1 px-1 items-center space-x-2 w-full border-t-2 border-[#6e5774]">
            <input
              type="text"
              value={taskTitle}
              onChange={handleChangeInput}
              placeholder="New task"
              className="bg-[#2a2b47] w-full rounded-lg p-1  focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
            />
            <PaperPlaneIcon
              onClick={handleProjectTaskCreate}
              className="size-[30px] p-1 text-red-500 hover:bg-[#484564] rounded-full"
            />
          </div>
    
      </div>
      <div className=" border-t-2">
        <div className="flex justify-between mt-2">
          <DialogModal>
            <DialogModal.Button className="bg-red-500 rounded-full p-2 hover:bg-red-600">
              Delete project
            </DialogModal.Button>
            <DeleteComponent
              title={`Delete project: ${props.project.label}`}
              description="Do you want to delete this project?"
              delete={handleProjectDelete}
            />
          </DialogModal>
          <DialogModal.Close className="bg-[#242039] p-2 rounded-full  hover:bg-[#2a2b47]">
            Save
          </DialogModal.Close>
        </div>
      </div>
    </DialogModal.Content>
  );
};

export default ProjectDetails;
