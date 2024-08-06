import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import RegisterComponent from "../components/RegisterComponent";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const handleNavigate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      // const response = await axios.post("http://localhost:3100/user/login", {
      //   email,
      //   password,
      // });

      // if (response.status === 200) {
        
      //   navigate("/home");
      // } else {
      //   alert("Login failed: " + response.data);
      // }
      authContext.login(email, password)
    } catch (error) {
      console.error("There was a problem with the login request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="w-[50%] bg-[#2a2b47] h-screen flex justify-center items-center">
          <div className=" bg-[#231c35] h-[400px] w-[400px] text-white rounded-lg">
            <h3 className="flex justify-center mt-2">Sign in</h3>
            <div className="flex w-full h-full justify-center items-center ">
              <FormComponent
                className="p-1 w-full h-full flex flex-col items-center "
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
                      controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                    />
                  </FormComponent.Field>
                  <FormComponent.Submit className="w-full mt-4">
                    <span className="flex justify-center p-1 w-full py-2 font-bold rounded-lg bg-[#2a2b47] hover:bg-[#484564]">
                      Sign in
                    </span>
                  </FormComponent.Submit>
                  <div className="flex w-full justify-between items-center">
                    <Link
                      to={"/forgot-password"}
                      className="text-red-600 hover:text-red-500"
                    >
                      Forgot Password?
                    </Link>
                    {/* <button className="">Register</button> */}
                    <RegisterComponent />
                  </div>
                </div>
              </FormComponent>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LoginPage;
