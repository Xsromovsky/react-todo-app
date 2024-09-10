import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from "@testing-library/react";
import RegisterComponent from "./RegisterComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const queryCLient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryCLient}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Test the register component", () => {
  it("should render the register component after click sign up", async () => {
    render(<RegisterComponent />, { wrapper: Wrapper });
    expect(screen.getByTestId("register-dialogShow-btn")).toBeInTheDocument();

    const registerBtn = screen.getByTestId("register-dialogShow-btn");

    await userEvent.click(registerBtn);

    expect(screen.getByTestId("register-signup-btn")).toBeInTheDocument();
    expect(screen.getByTestId("register-cross-icon-btn")).toBeInTheDocument();

    expect(
      screen.getByLabelText("register-username-input")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("register-email-input")).toBeInTheDocument();
    expect(
      screen.getByLabelText("register-password-input")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("register-confirmPassword-input")
    ).toBeInTheDocument();

    // // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
  });
  it("should close the dialog modal when clicking close btn", async () => {
    render(<RegisterComponent />, { wrapper: Wrapper });

    const registerBtn = screen.getByTestId("register-dialogShow-btn");
    await userEvent.click(registerBtn);

    const closeBtn = screen.getByTestId("register-cross-icon-btn");
    await userEvent.click(closeBtn);

    expect(screen.getByTestId("register-dialogShow-btn")).toBeInTheDocument();

    expect(screen.queryByTestId("register-signup-btn")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("register-cross-icon-btn")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText("register-username-input")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("register-email-input")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("register-password-input")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("register-confirmPassword-input")
    ).not.toBeInTheDocument();

    // // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
  });

  it("test register endpoint", async () => {
    render(<RegisterComponent />, { wrapper: Wrapper });
    const registerBtn = screen.getByTestId("register-dialogShow-btn");

    await userEvent.click(registerBtn);

    // // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();

    const usernameInput = screen.getByLabelText("register-username-input");
    const emailInput = screen.getByLabelText("register-email-input");
    const passInput = screen.getByLabelText("register-password-input");
    const confirmPassInput = screen.getByLabelText(
      "register-confirmPassword-input"
    );
    const signUpBtn = screen.getByTestId("register-signup-btn");

    await userEvent.type(usernameInput, "username");
    await userEvent.type(emailInput, "username@mail.com");
    await userEvent.type(passInput, "password");
    await userEvent.type(confirmPassInput, "password");

    expect(usernameInput).toHaveValue("username");
    expect(emailInput).toHaveValue("username@mail.com");
    expect(passInput).toHaveValue("password");
    expect(confirmPassInput).toHaveValue("password");

    await userEvent.click(signUpBtn);

    await waitFor(() => {
      expect(screen.getByText("User successfully created")).toBeInTheDocument();
    });

    // // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
  });
});
