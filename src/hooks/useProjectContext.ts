import { useContext } from "react";
import ProjectContext from "../contexts/ProjectContext";


function useProjectContext(){
    return useContext(ProjectContext);
}

export default useProjectContext;