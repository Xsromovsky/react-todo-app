import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import tiborImage from "../images/hlava_tibor.png";

type Props = {};

const ProfilePage = (props: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleLogout = () => {
    navigate("/");
  };
  const handleRickRolling = () => {
    window.open("https://www.youtube.com/watch?v=G7yg7ejn8qY");
  };
  const handleNotClick = () => {
    alert("Your computer has a virus. Click OK button to feed my family");
  };
  return (
    <div className="bg-[#231c35] flex text-white h-screen">
      <SideBar />
      <div className="flex items-center flex-1 flex-col">
        <div>
          <h1>profile page</h1>
        </div>
      </div>
      {/* <h1 className="">Profile page</h1> */}
      {/* <button onClick={handleBack}>go back</button>
      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default ProfilePage;
