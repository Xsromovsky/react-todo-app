/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoTask from "./TodoTask";
import { Task } from "../utils/todo_task";
import userEvent from "@testing-library/user-event";
import { Wrapper } from "../__test__/Wrapper";

const todo: Task = {
  id: "clzzzo1y20002dqbfoglcq4kj",
  createdAt: new Date("2024-08-18T19:57:32.762Z"),
  updatedAt: new Date("2024-08-22T07:16:43.171Z"),
  title: "task 1",
  description: "task description",
  isDone: false,
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
  it("should render a task", async () => {
    render(<TodoTask todo={todo} />, { wrapper: Wrapper });

    const task = screen.getByTestId("todoTask-component");
    expect(task.querySelector("form")).toHaveClass("bg-[#5b5271]");

    screen.debug();
    
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(task.querySelector("form")).toHaveClass("bg-red-600");
  });

  it("should show task edit form", async () => {
    render(<TodoTask todo={todo} />, { wrapper: Wrapper });

    const task = screen.getByTestId("todoTask-component-form");
    await userEvent.click(task);

    const editTaskForm = await screen.findByText("Edit Task");
    const taskInput = await screen.findByLabelText("todoEdit-title-input");
    const descriptionInput = await screen.findByLabelText(
      "todoEdit-description-input"
    );

    const cancelBtn = await screen.findByLabelText("todoEdit-cancel-btn");

    const saveBtn = await screen.findByLabelText("todoEdit-save-btn");

    expect(saveBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    expect(taskInput).toBeInTheDocument();
    expect(taskInput).toHaveValue(todo.title);
    expect(descriptionInput).toBeInTheDocument();
    expect(editTaskForm).toBeInTheDocument();

    screen.debug();
  });

  it('should test edit task', async () => {
    render(<TodoTask todo={todo} />, { wrapper: Wrapper });

    await userEvent.click(screen.getByTestId("todoTask-component-form"));

    const taskInput = await screen.findByLabelText("todoEdit-title-input");
    const descriptionInput = await screen.findByLabelText(
      "todoEdit-description-input"
    );
    const saveBtn = await screen.findByLabelText("todoEdit-save-btn");

    await userEvent.clear(taskInput)
    await userEvent.clear(descriptionInput)
    await userEvent.type(taskInput, "updated task");
    await userEvent.type(descriptionInput, "updated description")

    await userEvent.click(saveBtn)
    
    expect(taskInput).toHaveValue('updated task')
    // expect(descriptionInput).toHaveValue('updated description')
    
    screen.debug()
  })
});
