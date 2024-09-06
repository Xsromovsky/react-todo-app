import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoTask from "./TodoTask";
import { Task } from "../utils/todo_task";



const todo: Task = {
  id: "clzzzo1y20002dqbfoglcq4kj",
  createdAt: new Date("2024-08-18T19:57:32.762Z"),
  updatedAt: new Date("2024-08-22T07:16:43.171Z"),
  title: "jammerss",
  description: "",
  isDone: true,
  projectId: "null",
  inbox_taskId: "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8",
};
// class ResizeObserver {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// }

describe("test task", () => {
//   window.ResizeObserver = ResizeObserver;
  it("should render a task", () => {
    render(<TodoTask todo={todo} />);
    expect(screen.getByTestId('simple-task')).toBeInTheDocument()
    expect(screen.getByText('jammerss')).toBeInTheDocument()
  });
});
