import { createContext, ReactNode } from "react";
import { Task } from "../utils/todo_task";
import axios from "../instances/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthContext from "../hooks/useAuthContext";

export type Todos = {
  todos: Task[] | undefined;
  fetchTodos: () => void;
  deletoTodoById: (id: string) => void;
  editTaskById: (id: string, todo: Task) => void;
  createTodo: (title: string, description: string) => void;
};

const TodosContext = createContext<Todos>({} as Todos);

type ProviderProps = {
  children: ReactNode;
};

function Provider(props: ProviderProps) {
  // const [todos, setTodos] = useState<Task[]>([]);
  const queryClient = useQueryClient();
  const authContext = useAuthContext();

  const fetchTodos = async () => {
    const response = await axios.get("/task/inbox/all");
    // setTodos(response.data);
    return response.data;
  };

  const { data: todos, refetch } = useQuery<Task[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: authContext.isAuthenticated
  });

  const deletoTodoById = async (id: string) => {
    const response = await axios.delete(`/task/inbox/${id}`);
    return response.data
    // const updatedTodos = todos.filter((todo) => {
    //   return todo.id !== id;
    // });
    // setTodos(updatedTodos);
  };

  const deleteMutation = useMutation({
    mutationFn: deletoTodoById,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.setQueriesData<Task[]>(
        {queryKey: ["todos"]},
        (todos)=>{
          return todos?.filter((todo)=>{
            return todo.id !== data.taskId;
          })
        }
      )
    },
  });

  const editTaskById = async ({ id, todo }: { id: string; todo: Task }) => {
    // try {
    //   const response = await axios.put(`/task/inbox`, todo);
    //   if (response.status === 200) {
    //     const updatedTodos = todos.map((todo) => {
    //       if (todo.id === id) {
    //         return {
    //           ...todo,
    //           ...response.data,
    //         };
    //       }
    //       return todo;
    //     });
    //     setTodos(updatedTodos);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    const response = await axios.put(`/task/inbox`, todo);
    return response.data;
  };

  const editMutation = useMutation({
    mutationFn: editTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const createTodo = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const response = await axios.post(`/task/inbox/add`, {
      title,
      description,
    });
    // const newTodos = [...todos, response.data];
    // setTodos(newTodos);
    return response.data;
  };
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.setQueriesData<Task[]>({queryKey:['todos']}, (oldTodos)=>[...(oldTodos || []), data])
    },
  });

  const valueToShare = {
    todos,
    fetchTodos: refetch,
    deletoTodoById: (id: string) => deleteMutation.mutate(id),
    editTaskById: (id: string, todo: Task) => editMutation.mutate({ id, todo }),
    createTodo: (title: string, description: string) =>
      createMutation.mutate({ title, description }),
  };

  return (
    <TodosContext.Provider value={valueToShare}>
      {props.children}
    </TodosContext.Provider>
  );
}

export { Provider };
export default TodosContext;
