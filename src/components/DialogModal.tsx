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
  description?: string;
  children: React.ReactNode;
  contentClassname?: string;
  overlayClassname?: string;
};

function ModalContent(props: ContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={props.overlayClassname}>
        <Dialog.Content className={props.contentClassname}>
          <div className="m-4">
            <Dialog.Title className="">{props.title}</Dialog.Title>
            <Dialog.Description>{props.description}</Dialog.Description>

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
