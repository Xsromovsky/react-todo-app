import React, { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PlusIcon, SizeIcon } from "@radix-ui/react-icons";
import { ProjectType, Task } from "../utils/todo_task";
import DialogModal from "./DialogModal";
import useProjectContext from "../hooks/useProjectContext";
import TodoCreate from "./TodoCreate";
import ProjectDetails from "./ProjectDetails";
import ProjectTasks from "./ProjectTasks";

type Props = {
  project: ProjectType;
};

const Project = (props: Props) => {
  const projectContext = useProjectContext();

  const handleProjectTaskEdit = (id: string, task: Task) => {
    projectContext.updateTaskById(task);
  };
  const handleProjectTaskCreate = (title: string, description: string) => {
    projectContext.newTask(title, description, props.project.id);
  };

  const renderProjectTasks = props.project.tasks.map((task, index) => {
    return (
      <ProjectTasks
        handleProjectTaskCreate={handleProjectTaskCreate}
        handleProjectTaskEdit={handleProjectTaskEdit}
        index={index}
        key={task.id}
        task={task}
      />
    );
  });

  return (
    <div className="relative bg-[#2a2b47] w-[350px] h-[400px] rounded-lg text-white">
      <ScrollArea.Root className="h-full ">
        <ScrollArea.Viewport className="h-full">
          <div className="sticky top-0 bg-[#242039] flex rounded-t-lg justify-center font-bold text-lg py-2 ">
            <label> {props.project.label} </label>
            <DialogModal>
              <DialogModal.Button aria-label="projectTask-add">
                <PlusIcon className="absolute top-1 right-1 size-[30px] cursor-pointer hover:bg-[#484564] rounded-full" />
              </DialogModal.Button>
              <DialogModal.Content title="Create a new task">
                <TodoCreate handleCreateTodo={handleProjectTaskCreate} />
              </DialogModal.Content>
            </DialogModal>
            <DialogModal>
              <DialogModal.Button>
                <SizeIcon className="absolute left-1 top-1 size-[30px] cursor-pointer hover:bg-[#484564] rounded-full" />
              </DialogModal.Button>
              <ProjectDetails
                project={props.project}
                key={props.project.id}
              ></ProjectDetails>
            </DialogModal>
          </div>
          {renderProjectTasks}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="" orientation="vertical">
          <ScrollArea.Thumb className="" />
        </ScrollArea.Scrollbar>
        {/* <ScrollArea.Scrollbar orientation="horizontal">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar> */}
        <ScrollArea.Corner className="bg-blackA5" />
      </ScrollArea.Root>
    </div>
  );
};

export default Project;