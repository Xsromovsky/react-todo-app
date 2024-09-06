import React from "react";
// import useAuthContext from "../hooks/useAuthContext";

type Props = {
  title: string;
  children?: React.ReactNode
};

const HeaderComponent = (props: Props) => {
  // const authContext = useAuthContext();
  // const user = authContext.user;
  return (
    <div className="flex flex-col bg-[#2a2b47] items-center text-white ">
      <div className="mt-3">
        <h1>{props.title}</h1>
      </div>
        {props.children}
    </div>
  );
};

export default HeaderComponent;
