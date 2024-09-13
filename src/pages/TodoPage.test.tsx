/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wrapper } from "../__test__/Wrapper";
import TodoPage from "./TodoPage";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("test LoginPage", () => {
  it("should render login page", () => {
    render(<TodoPage />, { wrapper: Wrapper });

    expect(screen.getByText("My todo app")).toBeInTheDocument();
    expect(screen.getByLabelText("todopage-new-task-btn")).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });
  it("should render a navBar", ()=>{
    render(<TodoPage />, { wrapper: Wrapper });
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  })
  it("render creating task form", async () => {
    render(<TodoPage />, { wrapper: Wrapper });
    const taskBtn = screen.getByLabelText("todopage-new-task-btn");

    await userEvent.click(taskBtn);
    
    const titleInput = screen.getByPlaceholderText("Enter title");
    const descriptionInput = screen.getByPlaceholderText("Enter description");

    // // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
    expect(screen.getByText("Create new Task")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    expect(screen.getByTestId("todoCreate-close-btn")).toBeInTheDocument();
    expect(screen.getByTestId("todoCreate-create-btn")).toBeInTheDocument();

    await userEvent.type(titleInput, "Task title");
    await userEvent.type(descriptionInput, "Task description");

    expect(titleInput).toHaveValue("Task title");
    expect(descriptionInput).toHaveValue("Task description");

    await userEvent.click(screen.getByTestId("todoCreate-create-btn"));

    const createdTask = await screen.findAllByTestId('todoTask-component')
    expect(createdTask.length).toBeGreaterThan(1)
    // expect(screen.getByText('Task title')).toBeInTheDocument()
  });
  it('fetch all tasks', async () => {
    render(<TodoPage />, { wrapper: Wrapper });
    // const task = await screen.findByText('first title');
    // expect(task).toBeInTheDocument()
    const createdTask = await screen.findAllByTestId('todoTask-component')

    // expect only not checked tasks 
    expect(createdTask.length).toBe(3)
    
    screen.debug()
  })
});
