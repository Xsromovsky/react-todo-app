import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import useAuthContext from "../hooks/useAuthContext";
import HeaderComponent from "../components/HeaderComponent";
import useProjectContext from "../hooks/useProjectContext";
// import useTodosContext from "../hooks/useTodosContext";

type Props = {};

const ProfilePage = (props: Props) => {
  const authContext = useAuthContext();
  const projectContext = useProjectContext();
  // const TodoContext = useTodosContext();

  let projectTasks = projectContext.projects?.length;
  

  // authContext.fetchProfileData();

  useEffect(() => {
    authContext.fetchProfileData();
  }, []);


  return (
    
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full flex flex-col">
        <HeaderComponent title="Profile">
          <h3>{authContext.user?.name}</h3>
        </HeaderComponent>
        <div className="text-white">
          <div className="bg-[#2a2b47] w-[15%] m-2 flex flex-col items-center justify-center">
            <h2 className="bg-[#242039] w-full flex justify-center p-2">Task summary</h2>
            <label>Total tasks: {projectTasks}</label>
          </div>  
        </div>
      </div>
      
    </div>
  );
};

export default ProfilePage;
