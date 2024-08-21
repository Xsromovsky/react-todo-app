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
  dialogTitle?: string;
  buttonTitle?: boolean;
  childrenTitle?: React.ReactNode;
};

function ModalContent(props: ContentProps) {
  const renderTitle = (children: React.ReactNode) => {
    if (props.buttonTitle) {
      return (
        <div className="flex">
          <Dialog.Title className={props.dialogTitle}>
            {props.title}
          </Dialog.Title>
         {children}
        </div>
      );
    }else{
      return (<Dialog.Title className={props.dialogTitle}>{props.title}</Dialog.Title>)
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={props.overlayClassname}>
        <Dialog.Content className={props.contentClassname}>
          <div className="m-4">
            {renderTitle(props.childrenTitle)}
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
DialogModal.Close = Dialog.Close;
export default DialogModal;
