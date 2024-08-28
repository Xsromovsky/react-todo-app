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
  // fetchProfileData: () => void;
  accessToken: string | null;
  isAuthenticated: boolean;
  // user: UserData | undefined;
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

  // const [user, setUser] = useState<UserData>({
  //   name: "unknown",
  //   email: "not defined",
  // });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const login = async (email: string, password: string) => {
  //   try {
  //     console.log("trying to login");
  //     const response = await axios.post("/user/login", { email, password });
  //     if (response.status === 200) {
  //       localStorage.setItem("accessToken", response.data.accessToken);
  //       localStorage.setItem("refreshToken", response.data.refreshToken);
  //       setAccessToken_(response.data.accessToken);
  //       setAuthenticated(true);
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     console.log(`login failed ${error}`);
  //   }
  // };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("/user/login", { email, password });

    // if (response.status === 200) {
    //   return response.data;
    // }
    // if (response.status === 401) {
    //   return new Error("Authentication failed");
    // }
    return response.data;
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

  const logout = async () => {
    await axios.get("/user/logout");
  };
  const ProfileData = async () => {
    const response = await axios.get("/user/profile");
    return response.data;
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAuthenticated(false);
      navigate("/");
    },
  });

  // const { data: user, refetch } = useQuery<UserData>({
  //   queryKey: ["profile"],
  //   queryFn: ProfileData,
  // });
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // console.log('login success');
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setAccessToken_(data.accessToken);
      setAuthenticated(true);
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

  // const signup = async (username: string, password: string, email: string): Promise<boolean> => {
  //   // console.log(
  //   //   `username: ${username}, password: ${password}, email: ${email}`
  //   // );
  //   try {
  //     const response = await axios.post("/user/signup", {
  //       username,
  //       password,
  //       email,
  //     });
  //     if (response.status === 201) {
  //       console.log("register successful");
  //       return true;

  //     }
  //     console.log(response.data);
  //     return false;
  //   } catch (error) {
  //     console.log("registering failed: ", error);
  //     return false;
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        login: (email, password) => loginMutation.mutate({ email, password }),
        logout: () => logoutMutation.mutate(),
        // fetchProfileData: refetch,
        signup: (email, password, username) =>
          signupMutation.mutate({ email, password, username }),
        isAuthenticated,
        accessToken,
        // user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
