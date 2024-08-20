import {
  ArchiveIcon,
  ClockIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
  RowsIcon,
} from "@radix-ui/react-icons";
import classNames from "classnames";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useAuthContext from "../hooks/useAuthContext";
type Props = {};

const SideBar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const classes = twMerge(
    classNames(
      "relative top-0 left-0 h-full bg-[#242039] text-white transition-width duration-300 flex flex-col",
      {
        "w-[250px]": open,
        "w-[50px]": !open,
      }
    )
  );

  const itemClass = twMerge(
    classNames(
      " p-1 mx-2 hover:bg-[#2a2b47] border-b-2 border-[#231c35] flex items-center"
    )
  );

  const labelClass = twMerge(
    classNames("flex-1 px-3 cursor-pointer", {
      hidden: !open,
    })
  );
  const handleSidebar = () => {
    setOpen(!open);
  };

  const handleNavigateHome = () => {
    // event.preventDefault();
    navigate("/home");
  };
  const handleProjects = () => {
    navigate("/projects");
  }
  const handleNavigateProfile = () => {
    // event.preventDefault();
    // authContext.fetchProfileData();
    navigate('/profile');
  };
  const handleNavigateHistory = () => {
    // event.preventDefault();
    navigate("/history");
  };
  const handleNavigateLogout = () => {
    // event.preventDefault();
    authContext.logout();
  };

  return (
    <div className={classes}>
      <div className="flex items-center px-3 mt-4">
        <div className="hover:bg-[#484564] absolute cursor-pointer right-3 p-1 rounded items-center flex justify-center" onClick={handleSidebar}>
          <RowsIcon className="size-[20px]"  />
        </div>
      </div>
      <div className="mt-5 min-w-full flex-grow">
        <ul className="space-y-1 px-0">
          <li className={itemClass} onClick={handleNavigateHome}>
            <HomeIcon className="size-[25px]" />
            <label className={labelClass}>Home</label>
          </li>
          <li className={itemClass} onClick={handleProjects}>
            <ArchiveIcon className="size-[25px]" />
            <label className={labelClass}>Projects</label>
          </li>
          <li className={itemClass} onClick={handleNavigateProfile}>
            <PersonIcon className="size-[25px]" />
            <label className={labelClass}>Profile</label>
          </li>
          <li className={itemClass} onClick={handleNavigateHistory}>
            <ClockIcon className="size-[25px]" />
            <label className={labelClass}>History</label>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="px-0">
          <li className="flex p-2 cursor-pointer  bg-[#5b5271] hover:bg-[#6e5774]" onClick={handleNavigateLogout}>
            <ExitIcon className="size-[25px]" />
            <label className={labelClass}>Logout</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
