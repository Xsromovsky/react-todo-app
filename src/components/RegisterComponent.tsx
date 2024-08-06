import React from "react";
import DialogModal from "./DialogModal";
import { Dialog } from "@radix-ui/themes";
import FormComponent from "./FormComponent";
import { Cross1Icon } from "@radix-ui/react-icons";

type Props = {};

const RegisterComponent = (props: Props) => {
  return (
    <>
        <DialogModal>
          <DialogModal.Button asChild>
            <button>Sign up</button>
          </DialogModal.Button>
          <DialogModal.Content
            title="Sign up"
            overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
            contentClassname="relative bg-[#231c35]  w-[450px] h-[500px] p-2 rounded-lg text-white"
          >
            <Dialog.Close>
            <Cross1Icon className="absolute top-2 right-2 cursor-pointer size-[25px]"/>
            </Dialog.Close>
           <FormComponent className="  " handler={()=>{}}>
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
                labelName="Email"
                messageName="Enter your email"
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
                  controlClassname="p-2 rounded bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </FormComponent.Field>
            <Dialog.Close >
              <FormComponent.Submit className="mt-4">
                <button className="p-1 w-full py-2 font-bold rounded-lg bg-[#2a2b47] hover:bg-[#484564]">
                  Sign up
                </button>
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
