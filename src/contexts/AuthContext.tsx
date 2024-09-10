import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../instances/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UserData = {
  name: string;
  email: string;
  decription?: string;
};

type Auth = {
  login: (email: string, password: string) => void;
  signup: (username: string, password: string, email: string) => void;
  logout: () => void;
  fetchProfileData: () => void;
  accessToken: string | null;
  isAuthenticated: boolean;
  user: UserData | undefined;
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
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("/user/login", { email, password });

    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      return new Error("Authentication failed");
    }
  };

  const signup = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    const response = await axios.post("/user/signup", {
      email,
      password,
      username,
    });
    return response.data;
  };

  const fetchProfileData = async () => {
    const response = await axios.get("/user/profile");
    return response.data;
  };

  const logout = async () => {
    await axios.get("/user/logout");
  };

  const { data: user, refetch } = useQuery<UserData>({
    queryFn: fetchProfileData,
    queryKey: ["profile"],
    enabled: isAuthenticated,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAuthenticated(false);
      queryClient.clear();
      navigate("/");
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // console.log('login success');
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setAccessToken_(data.accessToken);
      setAuthenticated(true);
      // console.log("################################################################");
      // console.log("SUCCESS ");
      
      
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/home");
      // toast('login success')
    },
    onError: (error) => {
      console.log("Login failed", error);
      // toast.error(`Login Failed: ${error.message}`);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        login: (email, password) => loginMutation.mutate({ email, password }),
        logout: () => logoutMutation.mutate(),
        fetchProfileData: refetch,
        signup: (email, password, username) =>
          signupMutation.mutate({ email, password, username }),
        isAuthenticated,
        accessToken,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
