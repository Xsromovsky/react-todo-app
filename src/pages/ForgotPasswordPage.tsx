import React from "react";
import FormComponent from "../components/FormComponent";
import { Form, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  const navigate = useNavigate();

  const handleBackNavigaiton = () => {
    navigate(-1);
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center h-full w-full">
        <div className="relative flex flex-col items-center rounded-lg w-[400px] h-[250px] bg-[#2a2b47] text-white caret-white">
          <ArrowLeftIcon
            className="absolute top-2 left-2 size-[25px] cursor-pointer hover:bg-[#5b5271] rounded-full"
            onClick={handleBackNavigaiton}
          />
          <h3 className="mt-3">Forgot password</h3>
          <p>enter your email address</p>
          <FormComponent
            handler={() => {}}
            className="h-full w-full flex flex-col items-center justify-center"
          >
            <div className="flex flex-col space-y-3 w-[300px] justify-center px-3">
              <FormComponent.Field
                name="email"
                useLabel
                useMessage
                labelName="Email"
                messageName="Enter your valid email"
                labelMessageClassname="flex justify-between items-center"
                fieldClassname=""
              >
                <FormComponent.Control
                  isRequired
                  type="email"
                  placeholder="example@mail.com"
                  controlClassname="p-2 w-full rounded bg-[#231c35] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </FormComponent.Field>
              <FormComponent.Submit className="">
                <button className='p-1 w-full py-2 font-bold rounded-lg bg-red-500 hover:bg-red-400'>
                  Submit
                </button>
              </FormComponent.Submit>
            </div>
          </FormComponent>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
