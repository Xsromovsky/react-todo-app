import { createContext, ReactNode, useState } from "react";
import axios from "../instances/axiosInstance";
import { ProjectType, Task } from "../utils/todo_task";

export type ProjectApi = {
  newProject: (label: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (id: string, label: string) => Promise<void>;
  getAllProjects: () => Promise<void>;
  projects: ProjectType[];

  newTask: (
    title: string,
    description: string,
    projectId: string
  ) => Promise<void>;
  //   projectTasks: (projectId: string) => Promise<void>;
  updateTaskById: (
    task: Task
  ) => Promise<void>;
  deleteTaskById: (taskId: string, projectId: string) => Promise<void>;
};

const ProjectContext = createContext<ProjectApi>({} as ProjectApi);

type ProjectProviderProps = {
  children: ReactNode;
};

function ProjectProvider(props: ProjectProviderProps) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const getAllProjects = async () => {
    try {
      const response = await axios.get("/project/all");
      if (response.status === 200) {
        setProjects(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newProject = async (label: string) => {
    try {
      const response = await axios.post("/project/add", {
        label,
      });
      if (response.status === 201) {
        const newProject = response.data;
        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await axios.delete(`/project/${id}`);
      if (response.status === 200) {
        const updateProjects = projects.filter((project) => {
          return project.id !== id;
        });
        setProjects(updateProjects)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateProject = async(id: string, label: string)=>{
    try{
        const response = await axios.put(`/project/${id}`,{
            label,
        });
        if(response.status === 200) {
            const updatedProject = projects.map(project => {
                if(project.id === id) {
                    return {
                        ...project,
                        ...response.data
                    }
                }
                return project;
            })
            setProjects(updatedProject);
        }

    }catch (err) {
        console.log(err);
        
    }
  }

  // Project tasks

  const newTask = async (
    title: string,
    description: string,
    projectId: string
  ) => {
    try {
      const response = await axios.post("/project/task/add", {
        title,
        description,
        projectId,
      });
      if (response.status === 201) {
        const newTask = response.data
        // const project = projects.find(p => p.id === projectId);
        // project?.tasks.push(newTask)
        setProjects((prevProjects) => {
            return prevProjects.map((project) =>{
                if(project.id === projectId){
                    return{
                        ...project,
                        tasks: [...project.tasks, newTask]
                    };
                }
                return project;
            })
        })
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskById = async(
   updatedTask: Task
  ) => {
    try{
        const response = await axios.put("/project/task/update", updatedTask)
        if(response.status === 200) {
            const updatedTaskResponse = response.data;
            setProjects((prevProjects) => {
               return prevProjects.map((project) => {
                    if(project.id === updatedTask.projectId){
                        return {
                            ...project,
                            tasks: project.tasks.map((task) =>{
                                if(task.id === updatedTask.id){
                                    return{
                                        ...task,
                                        ...updatedTaskResponse
                                    }
                                }
                                return task;
                            })
                        }
                    }
                    return project;
               })
            })
        }
    }catch (err) {
        console.log(err);
        
    }
  };

  const deleteTaskById = async (taskId: string, projectId: string)=>{
    try{
        const response = await axios.delete(`/project/task/${projectId}/${taskId}`)
        if(response.status === 200){
            setProjects((prevProjects) => {
                return prevProjects.map((project) => {
                    if(project.id === projectId){
                        return {
                            ...project,
                            tasks: project.tasks.filter((task) => {
                                return task.id !== taskId;
                            })
                        }
                    }
                    return project
                })
            })
        }
    }catch(err){
        console.log(err);
        
    }
  }

  const valueToShare = {
    projects,
    getAllProjects,
    newProject,
    deleteProject,
    updateProject,
    newTask,
    updateTaskById,
    deleteTaskById
  };
  return (
    <ProjectContext.Provider value={valueToShare}>
      {props.children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider };
export default ProjectContext;
