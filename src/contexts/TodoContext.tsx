import { createContext, ReactNode, useState } from "react"
import { Task } from "../utils/todo_task"
import axios from "../instances/axiosInstance";

export type Todos = {
    todos: Task[];
    fetchTodos: () => void;
    deletoTodoById: (id: string) => void;
    editTaskById: (id: string, todo: Task) => void;
    createTodo: (title: string, description: string) => void;
}

const TodosContext = createContext<Todos>({} as Todos);

type ProviderProps = {
    children: ReactNode
}


function Provider(props: ProviderProps) {
    const [todos, setTodos] = useState<Task[]>([]);

    const fetchTodos = async () => {
        const response = await axios.get("/task/inbox/all");
        setTodos(response.data);
    };

    const deletoTodoById = async (id: string) => {
        await axios.delete(`/task/inbox/${id}`);
        const updatedTodos = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(updatedTodos);
    };

    const editTaskById = async (id: string, todo: Task) => {
        const response = await axios.put(`/task/inbox`, todo);
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    ...response.data,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const createTodo = async (
        title: string,
        description: string,
    ) => {
        const response = await axios.post(`/task/inbox/add`, {
            title,
            description,
        });
        const newTodos = [...todos, response.data];
        setTodos(newTodos);
    };
    const valueToShare = {
        todos,
        fetchTodos,
        deletoTodoById,
        editTaskById,
        createTodo
    };
    
    return (
        <TodosContext.Provider value={valueToShare}>
            {props.children}
        </TodosContext.Provider>
    );
}

export { Provider };
export default TodosContext