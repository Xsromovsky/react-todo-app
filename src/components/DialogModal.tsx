import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const DialogModal = (props: Props) => {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      {props.children}
    </Dialog.Root>
  );
};

type ContentProps = {
  title: string;
  children: React.ReactNode;
};

function ModalContent(props: ContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white">
        <Dialog.Content className="relative bg-[#231c35]  w-4/12 p-2 rounded-lg text-white">
          <Dialog.Title
            className="flex justify-center mt-1"
            id="create-task-title">
            {props.title}
          </Dialog.Title>
          <div className="m-4">
            {props.children}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
DialogModal.Button = Dialog.Trigger;
DialogModal.Content = ModalContent;
export default DialogModal;
