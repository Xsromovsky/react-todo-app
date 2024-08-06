import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import tiborImage from "../images/hlava_tibor.png";
import useAuthContext from "../hooks/useAuthContext";

type Props = {};

const ProfilePage = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  // authContext.fetchProfileData();

  useEffect(()=>{
    authContext.fetchProfileData()
  },[])

  return (
    <div className="bg-[#231c35] flex text-white h-screen">
      <SideBar />
      <div className="flex items-center flex-1 flex-col">
        <div>
          <h1>profile page</h1>
        </div>
        <p>
        {authContext.user.email}
        </p>
        <p>
        {authContext.user.name}
        </p>
      </div>
     
    </div>
  );
};

export default ProfilePage;
