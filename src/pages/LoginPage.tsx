import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import RegisterComponent from "../components/RegisterComponent";
import useAuthContext from "../hooks/useAuthContext";
import { Toaster } from "react-hot-toast";

type Props = {};

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuthContext();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNavigate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const form = new FormData(event.currentTarget);
    // const email = form.get("email") as string;
    // const password = form.get("password") as string;
    
    authContext.login(email, password);

    // try {
    //   authContext.login(email, password);
    // } catch (error) {
    //   console.error("There was a problem with the login request:", error);
    //   alert("An error occurred. Please try again.");
    // }
    // console.log("login user");
  };

  return (
    <>
      {/* <Toaster /> */}
      <div className="flex justify-end">
        <div className="w-[50%] bg-[#2a2b47] h-screen flex justify-center items-center">
          <div className=" bg-[#231c35] h-[400px] w-[400px] text-white rounded-lg">
            <div className="flex flex-col w-full h-full items-center">
              <h3
                className="flex justify-center mt-2"
                data-testid="login-heading"
              >
                Sign in
              </h3>
              <FormComponent
                className="p-1 w-full  mt-5 flex flex-col items-center "
                handler={handleNavigate}
              >
                <div className="h-full space-y-2 w-full px-4 flex flex-col justify-center items-center caret-white">
                  <FormComponent.Field
                    name="email"
                    useLabel
                    useMessage
                    labelName="Email"
                    messageName="Please enter your email"
                    labelMessageClassname="flex justify-between items-center"
                    fieldClassname=" w-full flex flex-col"
                  >
                    <FormComponent.Control
                      type="email"
                      isRequired
                      placeholder="Username"
                      value={email}
                      onChange={handleEmailChange}
                      controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                    />
                  </FormComponent.Field>
                  <FormComponent.Field
                    name="password"
                    useLabel
                    useMessage
                    labelName="Password"
                    messageName="Please enter your password"
                    labelMessageClassname="flex justify-between items-center"
                    fieldClassname="flex flex-col w-full"
                  >
                    <FormComponent.Control
                      isRequired
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                    />
                  </FormComponent.Field>
                  <FormComponent.Submit className="w-full mt-4">
                    <span
                      data-testid="sign-btn"
                      className="flex justify-center p-1 w-full py-2 font-bold rounded-lg bg-[#2a2b47] hover:bg-[#484564]"
                    >
                      Sign in
                    </span>
                  </FormComponent.Submit>
                </div>
              </FormComponent>

              <div className="flex justify-between w-full px-4">
                <Link
                  to={"/forgot-password"}
                  className="text-red-600 hover:text-red-500"
                  data-testid="forgot-password-link"
                >
                  Forgot Password?
                </Link>
                {/* <button className="">Register</button> */}
                <RegisterComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LoginPage;
