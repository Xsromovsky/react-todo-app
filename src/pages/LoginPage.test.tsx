import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import LoginPage from "./LoginPage";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../contexts/AuthContext";

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

describe("testing login page", () => {
  it("render a login page", () => {
    render(<LoginPage />, { wrapper: Wrapper });
    expect(screen.getByTestId("login-heading")).toBeInTheDocument();
    expect(screen.getByTestId("sign-btn")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    expect(screen.getByTestId("register-btn")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });

  it("show toaster when bad credentials typed", () => {});

  it("test value inputs", () => {
    render(<LoginPage />, { wrapper: Wrapper });

    const userNameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameInput, {
      target: { value: "sam@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });

    expect(userNameInput).toHaveValue("sam@mail.com");
    expect(passwordInput).toHaveValue("password");
  });

  it("test successfull login with fetching profile data", async () => {
    render(<LoginPage />, { wrapper: Wrapper });
    const userNameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signbtn = screen.getByTestId("sign-btn");

    fireEvent.change(userNameInput, {
      target: { value: "sam@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    expect(userNameInput).toHaveValue("sam@mail.com");
    expect(passwordInput).toHaveValue("password");

    userEvent.click(signbtn);

    // // eslint-disable-next-line testing-library/render-result-naming-convention
    // const authContext = renderHook(()=>useAuthContext())
    
    await waitFor(() => {
        expect(localStorage.getItem('accessToken')).toBe('mocked-access-token');
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(localStorage.getItem('refreshToken')).toBe('mocked-refresh-token');
    });
  });
  it('should render a register component', () => {
    render(<LoginPage />, { wrapper: Wrapper });
    expect(screen.getByTestId('register-dialogShow-btn')).toBeInTheDocument()
    const registerBtn = screen.getByTestId('register-dialogShow-btn')

    fireEvent.click(registerBtn)
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()

    // expect(screen.getByTestId('register-component-header')).toBeInTheDocument()
    // expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    // expect(screen.getByLabelText('email-input')).toBeInTheDocument()
    // expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
    // expect(screen.getByPlaceholderText('confirm password')).toBeInTheDocument()

    // expect(screen.getByTestId('register-signup-btn')).toBeInTheDocument()
    // expect(screen.getByTestId('register-cross-icon')).toBeInTheDocument()
    

  })
});
