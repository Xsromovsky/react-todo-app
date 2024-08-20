import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import tiborImage from "../images/hlava_tibor.png";
import useAuthContext from "../hooks/useAuthContext";
import HeaderComponent from "../components/HeaderComponent";

type Props = {};

const ProfilePage = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  // authContext.fetchProfileData();

  useEffect(() => {
    authContext.fetchProfileData();
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full">
        <HeaderComponent title="Profile">
          <h3>{authContext.user.name}</h3>
        </HeaderComponent>
      </div>
    </div>
  );
};

export default ProfilePage;
