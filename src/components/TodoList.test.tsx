/* eslint-disable testing-library/no-debugging-utils */
import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from "@testing-library/react";
import TodoList from "./TodoList";
import { Wrapper } from "../__test__/Wrapper";
import useAuthContext from "../hooks/useAuthContext";

describe("todo list tests", () => {
  it("should render a list of todos", () => {
    // const view = renderHook(useAuthContext)

    render(<TodoList isDone={false} />, { wrapper: Wrapper });
    
    screen.debug();
  });
});
