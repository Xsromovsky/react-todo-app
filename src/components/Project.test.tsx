/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import Project from "./Project";
import { ProjectType } from "../utils/todo_task";
import { Wrapper } from "../__test__/Wrapper";
import TodoCreate from "./TodoCreate";
import userEvent from "@testing-library/user-event";

const project: ProjectType = {
  id: "048af525-915a-425f-b6ad-0d1b4b0b4793",
  label: "project label",
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  ownerId: "clzmwggca0001r1601198ys52",
  tasks: [
    {
      id: "cm0wpyjdk000cr90yfffwcz1w",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      title: "first task",
      description: "",
      isDone: false,
      projectId: "048af525-915a-425f-b6ad-0d1b4b0b4793",
      inbox_taskId: "null",
    },
    {
      id: "cm0xokrpp0000ivkv0t2asica",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      title: " second task",
      description: "",
      isDone: false,
      projectId: "048af525-915a-425f-b6ad-0d1b4b0b4793",
      inbox_taskId: "null",
    },
  ],
};

describe("test project with tasks", () => {
  it("should render project with tasks", async () => {
    render(<Project project={project} />, { wrapper: Wrapper });
    expect(screen.getByText("project label")).toBeInTheDocument();
    expect(screen.getByText("first task")).toBeInTheDocument();
    expect(screen.getByText("second task")).toBeInTheDocument();

    const addTask = screen.getByLabelText("projectTask-add");

    await userEvent.click(addTask);

    const projectTasks = screen.getAllByLabelText("projectTask");
    expect(projectTasks.length).toBe(2);
  });
});
