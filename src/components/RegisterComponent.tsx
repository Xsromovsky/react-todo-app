import React, { useState } from "react";
import DialogModal from "./DialogModal";
import { Dialog } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof signUpSchema>;

type Props = {};

const RegisterComponent = (props: Props) => {
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [isSignUp, setIsSignUp] = useState(false);
  const authContext = useAuthContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    authContext.signup(data.email, data.password, data.username);
  };

  return (
    <>
      <Toaster />
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

          <Form.Root className=" space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <Form.Field name="username">
              <Form.Control asChild>
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-1 rounded-lg bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="email">
              {errors.email && (
                <p className="text-red-500 m-0">{errors.email.message}</p>
              )}
              <Form.Control asChild>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full p-1 rounded-lg bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="password">
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <Form.Control asChild>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  placeholder="password"
                  className="w-full p-1 rounded-lg bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="confirmPassword">
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
              <Form.Control asChild>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  className="w-full p-1 rounded-lg bg-[#2a2b47] focus:outline-none focus:border-[#6e5774] focus:ring-[#6e5774] focus:ring-2"
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <button
                disabled={isSubmitting}
                className="bg-[#2a2b47] hover:bg-[#484564] p-2 rounded-lg w-full"
              >
                {isSubmitting ? "Loading..." : "Sign up"}
              </button>
            </Form.Submit>
          </Form.Root>
        </DialogModal.Content>
      </DialogModal>
    </>
  );
};

export default RegisterComponent;
