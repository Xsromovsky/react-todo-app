import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Checkbox from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  Pencil1Icon,
  PlusIcon,
  SizeIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ProjectType } from "../utils/todo_task";


type Props = {
    project: ProjectType
};

const Project = (props: Props) => {


  return (
    <div className="relative bg-[#2a2b47] w-[350px] h-[400px] rounded-lg text-white">
      <ScrollArea.Root className="h-full">
        <ScrollArea.Viewport className="h-full">
          <div className="sticky top-0 bg-[#242039] flex rounded-t-lg justify-center font-bold text-lg py-2">
            <label> {props.project.label} </label>
            <PlusIcon className="absolute top-1 right-1 size-[25px] cursor-pointer hover:bg-[#484564] rounded-full"/>
            <SizeIcon className="absolute left-1 top-1 size-[25px] cursor-pointer hover:bg-[#484564] rounded-full"/>
          </div>
          {props.project.tasks.map((task, index) => (
            <div
              key={index}
              className="hover:bg-[#484564] m-1 flex items-center justify-between "
            >
              <div className="flex items-center m-1 ">
                <Checkbox.Root
                  className="flex-shrink-0 text-[#5b5271] hover:bg-red flex h-5 w-5 
                 justify-center rounded-[4px] bg-white items-center"
                >
                  <Checkbox.Indicator>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <p className="flex items-center m-0 px-2 ">{task.title}</p>
              </div>
              <div className="flex space-x-2">
                <Pencil1Icon className="cursor-pointer" />
                <TrashIcon className="cursor-pointer" />
              </div>
            </div>
          ))}
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
