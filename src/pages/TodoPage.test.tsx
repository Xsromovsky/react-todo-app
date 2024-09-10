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
    server.use(
      http.post("http://localhost:3100/task/inbox/add", () => {
        return HttpResponse.json({
          id: "cm0wxcj3c000dr90yh0ru3lxx",
          created_at: "2024-09-10T21:08:59.688Z",
          updated_at: "2024-09-10T21:08:59.688Z",
          title: "Task title",
          description: "Task description",
          isDone: false,
          projectId: null,
          inbox_taskId: "ca3e0cf9-b93e-4bac-8903-b655d0dd5af8",
        });
      })
    );

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

    const createdTask = await screen.findByText('Task title')
    expect(createdTask).toBeInTheDocument()
  });
});
