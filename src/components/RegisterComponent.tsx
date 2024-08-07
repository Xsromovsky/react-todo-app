import React, { useState } from "react";
import DialogModal from "./DialogModal";
import { Dialog } from "@radix-ui/themes";
import FormComponent from "./FormComponent";
import { Cross1Icon } from "@radix-ui/react-icons";
import useAuthContext from "../hooks/useAuthContext";

type Props = {};

const RegisterComponent = (props: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authContext = useAuthContext();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    console.log(confirmPassword);
  };

  const passwordMatchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password mismatch");
      setPassword("");
      setConfirmPassword("");
    } else {
      const form = new FormData(event.currentTarget);
      const email = form.get("email") as string;
      const username = form.get("username") as string;
      authContext.signup(username, password, email);
    }
    console.log("register user");
  };

  return (
    <>
      <DialogModal>
        <DialogModal.Button asChild>
          <span>Sign up</span>
        </DialogModal.Button>
        <DialogModal.Content
          title="Sign up"
          overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
          contentClassname="relative bg-[#231c35]  w-[450px] h-[500px] p-2 rounded-lg text-white"
        >
          <Dialog.Close>
            <Cross1Icon className="absolute top-2 right-2 cursor-pointer size-[25px]" />
          </Dialog.Close>
          <FormComponent className="" handler={passwordMatchHandler}>
            <div className="flex flex-col space-y-3 flex-1">
              <FormComponent.Field
                name="username"
                useLabel
                useMessage
                labelName="Username"
                messageName="Please type username"
                fieldClassname="flex flex-col w-full"
                labelMessageClassname="flex justify-between"
              >
                <FormComponent.Control
                  isRequired
                  type="username"
                  placeholder="Username"
                  controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </FormComponent.Field>
              <FormComponent.Field
                name="email"
                useLabel
                useMessage
                useSecondMessage
                labelName="Email"
                messageName="Enter your email"
                secondMessageName="Please provide valid email"
                fieldClassname="flex flex-col w-full"
                labelMessageClassname="flex justify-between"
              >
                <FormComponent.Control
                  isRequired
                  type="email"
                  placeholder="example@mail.com"
                  controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </FormComponent.Field>
              <FormComponent.Field
                name="password"
                useLabel
                useMessage
                labelName="Password"
                messageName="Enter your password"
                fieldClassname="flex flex-col w-full"
                labelMessageClassname="flex justify-between"
              >
                <FormComponent.Control
                  isRequired
                  type="password"
                  placeholder="Password"
                  onChange={handleChangePassword}
                  controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </FormComponent.Field>
              <FormComponent.Field
                name="confirmPassword"
                useLabel
                useMessage
                labelName="Confirm Password"
                messageName="Confirm your password"
                fieldClassname="flex flex-col w-full"
                labelMessageClassname="flex justify-between"
              >
                <FormComponent.Control
                  isRequired
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChangeConfirmPassword}
                  controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </FormComponent.Field>
              <Dialog.Close>
                <FormComponent.Submit className="mt-4 p-1 w-full py-2 font-bold rounded-lg bg-[#2a2b47] hover:bg-[#484564]">
                  <span className="">Sign up</span>
                </FormComponent.Submit>
              </Dialog.Close>
            </div>
          </FormComponent>
        </DialogModal.Content>
      </DialogModal>
    </>
  );
};

export default RegisterComponent;
