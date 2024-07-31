import React from "react";
import * as Form from "@radix-ui/react-form";
import { Outlet, useNavigate } from "react-router-dom";
type Props = {};

const LoginPage = (props: Props) => {

    const navigate = useNavigate();

    const handleNavigate = (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        navigate('/home')
    }

  return (
    <>
    <div className="flex justify-end min-h-screen bg-[#231c35]">
      <div className="text-white bg-[#2a2b47] w-[50%] flex flex-col justify-center items-center">
        <div className="bg-[#231c35] flex flex-col w-[50%] h-[50%]  p-4 rounded-lg items-center">
          <h3 className="mb-4">Login Page</h3>
          <Form.Root className="w-full h-full flex flex-col justify-center " onSubmit={handleNavigate}>
            <div className="h-full space-y-1 flex flex-col justify-center items-center caret-white">
              <Form.Field name="email" className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                <Form.Label>Username</Form.Label>
                <Form.Message className="text-red-500 text-sm" match={"valueMissing"}>
                    Please enter your username
                </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    type="text"
                    className=" p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                    placeholder="Username"
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field name="password" className="flex flex-col w-full  ">
                <div className="flex justify-between items-center">
                <Form.Label>Password</Form.Label>
                <Form.Message className="text-red-500 text-sm" match={"valueMissing"}>Please enter your password</Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    type="password"
                    className="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                    placeholder="Password"
                    required
                  />
                </Form.Control>
              </Form.Field>
              
              <Form.Submit className="w-full mt-4 " asChild>
                <button className="p-1 w-full py-2 font-bold rounded-lg bg-[#2a2b47] hover:bg-[#484564]">
                  Login
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </div>
      </div>
    </div>
    <Outlet />
    </>
  );
};

export default LoginPage;
