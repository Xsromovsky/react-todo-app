import { createContext, ReactNode, useContext, useState } from "react";
import axios from "../instances/axiosInstance";
import { ProjectType } from "../utils/todo_task";

export type ProjectApi = {
  newProject: (label: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getAllProjects: () => Promise<void>;
  projects: ProjectType[]

//   newTask: (
//     title: string,
//     description: string,
//     projectId: string
//   ) => Promise<void>;
//   projectTasks: (projectId: string) => Promise<void>;
//   updateTaskById: (
//     projectId: string,
//     taskId: string,
//     isDone: boolean,
//     title: string,
//     description: string
//   ) => Promise<void>;
//   deleteTaskById: (taskId: string, projectId: string) => Promise<void>;
};

const ProjectContext = createContext<ProjectApi>({} as ProjectApi);

type ProjectProviderProps = {
    children: ReactNode
}

function ProjectProvider(props: ProjectProviderProps) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

    const getAllProjects = async() => {
        try{

            const response = await axios.get('/project/all')
            if(response.status === 200) {
                setProjects(response.data);
            }
        }catch(err){
            console.log(err);
            
        }
    }

    const newProject = async(label: string) => {
        try{

            const response = await axios.post('/project/add', {
                label
            })
            if(response.status === 201) {
                const newProject = response.data
                setProjects((prevProjects) => [...prevProjects, newProject])
            }
        }catch(err){
            console.log(err);
            
        }
    }

    const deleteProject = async(id: string)=>{
        try{
            const response = await axios.delete(`/project/${id}`);
            if(response.status === 200){
                const updateProjects = projects.filter((project) => {
                    return project.id !== id;
                })
            }
        }catch(err){
            console.log(err);
            
        }
    }

    const valueToShare={
        projects,
        getAllProjects,
        newProject,
        deleteProject
    }
    return(
        <ProjectContext.Provider value={valueToShare}>
            {props.children}
        </ProjectContext.Provider>
    )



}

export { ProjectProvider }
export default ProjectContext
