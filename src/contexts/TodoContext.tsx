import { createContext, ReactNode, useState } from "react"
import { TodoTasksList } from "../utils/todo_task"
import axios from "../instances/axiosInstance";

type Todos = {
    todos: TodoTasksList[];
    fetchTodos: () => void;
    deletoTodoById: (id: number) => void;
    editTodoById: (id: number, todo: TodoTasksList) => void;
    createTodo: (title: string, description: string) => void;
}

const TodosContext = createContext<Todos>({} as Todos);

type ProviderProps = {
    children: ReactNode
}


function Provider(props: ProviderProps) {
    const [todos, setTodos] = useState<TodoTasksList[]>([]);


    const fetchTodos = async () => {
        const response = await axios.get("/task/all");
        setTodos(response.data);
    };

    const deletoTodoById = async (id: number) => {
        await axios.delete(`/task/${id}`);
        const updatedTodos = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(updatedTodos);
    };

    const editTodoById = async (id: number, todo: TodoTasksList) => {
        const response = await axios.put(`/task/${id}`, todo);
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
        const response = await axios.post(`/task/add`, {
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
        editTodoById,
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