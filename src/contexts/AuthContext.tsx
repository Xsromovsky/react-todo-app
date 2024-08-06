import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../instances/axiosInstance";

type UserData = {
    name: string;
    email: string;
    
}

type Auth = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfileData: () => Promise<void>;
  accessToken: string | null,
  isAuthenticated: boolean
  user: UserData
};

const AuthContext = createContext<Auth>({} as Auth);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider(props: AuthProviderProps) {
  const [accessToken, setAccessToken_] = useState(
    localStorage.getItem("accessToken")
  );
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [user, setUser] = useState<UserData>({name: 'unknown', email: 'not defined'});

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
      
      try {
        console.log('trying to login');
      const response = await axios.post("/user/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setAccessToken_(response.data.accessToken)
        setAuthenticated(true);
        navigate("/home");
      }
    } catch (error) {
      console.log(`login failed ${error}`);
    }
  };
  
  const logout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.log("logout failed: ", error);
    }
  };

  const signup = async (username: string, password: string, email: string)=>{

  }


  const fetchProfileData = async () => {
    try{
        const response = await axios.get('/user/profile');
        if(response.status === 200) {
            setUser({email: response.data.email, name: response.data.name,})
            navigate('/profile')
        }
    }catch(err){
        console.log('profile fetching error: ', err);
        
        
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, fetchProfileData, isAuthenticated, accessToken, user}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
