import React from "react";
import * as Popover from "@radix-ui/react-popover";

type Props = {
  children: React.ReactNode;
};

const PopoverComponent = (props: Props) => {
  return <Popover.Root>{props.children}</Popover.Root>;
};
type PopoverProps = {
  children: React.ReactNode;
};
function PopoverContent(props: PopoverProps) {
  return (
    <Popover.Portal>
      <Popover.Content sideOffset={4}  className="max-w-[50%] bg-yellow-200 flex justify-center">
        <div className="m-3">{props.children}</div>
      </Popover.Content>
    </Popover.Portal>
  );
}

PopoverComponent.Content = PopoverContent;
PopoverComponent.Button = Popover.Trigger;


export default PopoverComponent;
