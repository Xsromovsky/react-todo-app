import React from "react";
import * as Form from "@radix-ui/react-form";
import classNames from "classnames";
type Props = {
  children: React.ReactNode;
  className?: string;
  handler: (event: React.FormEvent<HTMLFormElement>) => void;
};

const FormComponent = (props: Props) => {
  return <Form.Root className={props.className} onSubmit={props.handler}>{props.children}</Form.Root>;
};

type FormControlInputProps = {
  placeholder?: string;
  controlClassname?: string;
  isRequired: boolean;
  type: string;
};

function FormControlInput(props: FormControlInputProps) {
  return (
    <Form.Control asChild>
      <input
        placeholder={props.placeholder || "Input"}
        className={props.controlClassname}
        required={props.isRequired}
        type={props.type}
      />
    </Form.Control>
  );
}

type FormFieldProps = {
  name: string;
  children: React.ReactNode;
  fieldClassname?: string;
  labelMessageClassname?: string;
  useLabel?: boolean;
  useMessage?: boolean;
  labelName?: string;
  messageName?: string;
};

function FormField(props: FormFieldProps) {
    
  return (
    <Form.Field name={props.name} className={props.fieldClassname}>
      <div className={props.labelMessageClassname}>
        {props.useLabel && <Form.Label>{props.labelName || 'label'}</Form.Label>}
        {props.useMessage && <Form.Message match={"valueMissing"} className="text-red-500">{props.messageName || 'Message'}</Form.Message>}
      </div>
      {props.children}
    </Form.Field>
  );
}

type FormSubmitProps = {
  children: React.ReactNode;
  className?: string;
};

function FormSubmit(props: FormSubmitProps) {
  return (
    <Form.Submit className={props.className}>
      {props.children}
    </Form.Submit>
  );
}

FormComponent.Submit = FormSubmit;
FormComponent.Field = FormField;
FormComponent.Control = FormControlInput;
export default FormComponent;
