import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";


function useAuthContext(){
    return useContext(AuthContext)
}

export default useAuthContext;