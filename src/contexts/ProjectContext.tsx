import { createContext, ReactNode, useState } from "react";
import axios from "../instances/axiosInstance";
import { ProjectType, Task } from "../utils/todo_task";
import useAuthContext from "../hooks/useAuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ProjectApi = {
  newProject: (label: string) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, label: string) => void;
  getAllProjects: () => void;
  projects: ProjectType[] | undefined;

  newTask: (title: string, description: string, projectId: string) => void;
  //   projectTasks: (projectId: string) => void;
  updateTaskById: (task: Task) => void;
  deleteTaskById: (taskId: string, projectId: string) => void;
};

const ProjectContext = createContext<ProjectApi>({} as ProjectApi);

type ProjectProviderProps = {
  children: ReactNode;
};

function ProjectProvider(props: ProjectProviderProps) {
  const authContext = useAuthContext();
  const queryClient = useQueryClient();
  // const [projects, setProjects] = useState<ProjectType[]>([]);

  const getAllProjects = async () => {
    // try {
    //   const response = await axios.get("/project/all");
    //   if (response.status === 200) {
    //     setProjects(response.data);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.get("/project/all");
    return response.data;
  };

  const { data: projects, refetch } = useQuery<ProjectType[]>({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    enabled: authContext.isAuthenticated,
  });

  const newProject = async ({ label }: { label: string }) => {
    // try {
    //   const response = await axios.post("/project/add", {
    //     label,
    //   });
    //   if (response.status === 201) {
    //     const newProject = response.data;
    //     setProjects((prevProjects) => [...prevProjects, newProject]);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.post("/project/add", {
      label,
    });
    return response.data;
  };

  const newProjectMutation = useMutation({
    mutationFn: newProject,
    onSuccess: (data) => {
      queryClient.setQueriesData<ProjectType[]>(
        { queryKey: ["projects"] },
        (oldProjects) => [...(oldProjects || []), data]
      );
    },
  });

  const deleteProject = async (id: string) => {
    // try {
    //   const response = await axios.delete(`/project/${id}`);
    //   if (response.status === 200) {
    //     const updateProjects = projects.filter((project) => {
    //       return project.id !== id;
    //     });
    //     setProjects(updateProjects);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.delete(`/project/${id}`);
    return response.data;
  };

  const projectDeleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      queryClient.setQueriesData<ProjectType[]>(
        { queryKey: ["projects"] },
        (oldProjects) =>
          oldProjects?.filter((project) => project.id !== data.id) || []
      );
    },
  });

  const updateProject = async ({
    id,
    label,
  }: {
    id: string;
    label: string;
  }) => {
    // try {
    //   const response = await axios.put(`/project/${id}`, {
    //     label,
    //   });
    //   if (response.status === 200) {
    //     const updatedProject = projects.map((project) => {
    //       if (project.id === id) {
    //         return {
    //           ...project,
    //           ...response.data,
    //         };
    //       }
    //       return project;
    //     });
    //     setProjects(updatedProject);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.put(`/project/${id}`, {
      label,
    });
    return response.data;
  };

  const projectEditMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      queryClient.setQueriesData<ProjectType[]>(
        { queryKey: ["projects"] },
        (oldProjects) =>
          oldProjects?.map((project) =>
          {
            if(project.id === data.id){
              project.label = data.label;
            }
            return project;
          }
          ) || []
      );
    },
  });

  // Project tasks

  const newTask = async ({
    title,
    description,
    projectId,
  }: {
    title: string;
    description: string;
    projectId: string;
  }) => {
    // try {
    //   const response = await axios.post("/project/task/add", {
    //     title,
    //     description,
    //     projectId,
    //   });
    //   if (response.status === 201) {
    //     const newTask = response.data;
    //     // const project = projects.find(p => p.id === projectId);
    //     // project?.tasks.push(newTask)
    //     setProjects((prevProjects) => {
    //       return prevProjects.map((project) => {
    //         if (project.id === projectId) {
    //           return {
    //             ...project,
    //             tasks: [...project.tasks, newTask],
    //           };
    //         }
    //         return project;
    //       });
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.post("/project/task/add", {
      title,
      description,
      projectId,
    });
    return response.data;
  };

  const createProjectTaskMutation = useMutation({
    mutationFn: newTask,
    onSuccess: (data) => {
      queryClient.setQueriesData<ProjectType[]>(
        { queryKey: ["projects"] },
        (projects) => {
          if (!projects) return projects;
          return projects.map((project) => {
            if (project.id === data.projectId) {
              return {
                ...project,
                tasks: [...project.tasks, data],
              };
            }
            return project;
          });
        }
      );
    },
  });

  const updateTaskById = async ({ updatedTask }: { updatedTask: Task }) => {
    // try {
    //   const response = await axios.put("/project/task/update", updatedTask);
    //   if (response.status === 200) {
    //     const updatedTaskResponse = response.data;
    //     setProjects((prevProjects) => {
    //       return prevProjects.map((project) => {
    //         if (project.id === updatedTask.projectId) {
    //           return {
    //             ...project,
    //             tasks: project.tasks.map((task) => {
    //               if (task.id === updatedTask.id) {
    //                 return {
    //                   ...task,
    //                   ...updatedTaskResponse,
    //                 };
    //               }
    //               return task;
    //             }),
    //           };
    //         }
    //         return project;
    //       });
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.put("/project/task/update", updatedTask);
    return response.data;
  };

  const editProjectTaskMutation = useMutation({
    mutationFn: updateTaskById,
    onSuccess: (data) => {
      queryClient.setQueriesData<ProjectType[]>(
        { queryKey: ["projects"] },
        (projects) => {
          if (!projects) return projects;
          return projects.map((project) => {
            if (project.id === data.projectId) {
              return {
                ...project,
                tasks: project.tasks.map((task) => {
                  if (task.id === data.id) {
                    return {
                      ...task,
                      ...data,
                    };
                  }
                  return task;
                }),
              };
            }
            return project;
          });
        }
      );
    },
  });

  const deleteTaskById = async ({
    taskId,
    projectId,
  }: {
    taskId: string;
    projectId: string;
  }) => {
    // try {
    //   const response = await axios.delete(
    //     `/project/task/${projectId}/${taskId}`
    //   );
    //   if (response.status === 200) {
    //     setProjects((prevProjects) => {
    //       return prevProjects.map((project) => {
    //         if (project.id === projectId) {
    //           return {
    //             ...project,
    //             tasks: project.tasks.filter((task) => {
    //               return task.id !== taskId;
    //             }),
    //           };
    //         }
    //         return project;
    //       });
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.delete(`/project/task/${projectId}/${taskId}`);
    return response.data;
  };

  const deleteProjectTaskMutation = useMutation({
    mutationFn: deleteTaskById,
    onSuccess: (data) => {
      queryClient.setQueriesData<ProjectType[]>(
        { queryKey: ["projects"] },
        (projects) => {
          if (!projects) return projects;
          return projects.map((project) => {
            if (project.id === data.projectId) {
              return {
                ...project,
                tasks: project.tasks.filter((task) => task.id !== data.taskId),
              };
            }
            return project;
          });
        }
      );
    },
  });

  const valueToShare = {
    projects,
    getAllProjects: refetch,
    newProject: (label: string) => newProjectMutation.mutate({ label }),
    deleteProject: (id: string) => projectDeleteMutation.mutate(id),
    updateProject: (id: string, label: string) =>
      projectEditMutation.mutate({ id, label }),
    newTask: (title: string, description: string, projectId: string) =>
      createProjectTaskMutation.mutate({ title, description, projectId }),
    updateTaskById: (updatedTask: Task) => editProjectTaskMutation.mutate({updatedTask}),
    deleteTaskById: (taskId: string, projectId: string) => deleteProjectTaskMutation.mutate({taskId, projectId}),
  };
  return (
    <ProjectContext.Provider value={valueToShare}>
      {props.children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider };
export default ProjectContext;
