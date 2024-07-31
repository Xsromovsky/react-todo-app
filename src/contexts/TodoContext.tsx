import { createContext, ReactNode, useState } from "react"
import { TodoTasksList } from "../utils/todo_task"
import axios from "axios";

type Todos = {
    todos: TodoTasksList[];
    fetchTodos: () => void;
    deletoTodoById: (id: string) => void;
    editTodoById: (id: string, todo: TodoTasksList) => void;
    createTodo: (title: string, description: string, isDone: boolean) => void;
}

const TodosContext = createContext<Todos>({} as Todos);

type ProviderProps = {
    children: ReactNode
}


function Provider(props: ProviderProps) {
    const [todos, setTodos] = useState<TodoTasksList[]>([]);


    const fetchTodos = async () => {
        const response = await axios.get("http://localhost:3001/todos");
        setTodos(response.data);
    };

    const deletoTodoById = async (id: string) => {
        await axios.delete(`http://localhost:3001/todos/${id}`);
        const updatedTodos = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(updatedTodos);
    };

    const editTodoById = async (id: string, todo: TodoTasksList) => {
        const response = await axios.put(`http://localhost:3001/todos/${id}`, todo);
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
        isDone: boolean,
    ) => {
        const response = await axios.post(`http://localhost:3001/todos`, {
            title,
            description,
            isDone,
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