import { useContext } from "react";
import TodosContext from "../contexts/TodoContext";



function useTodosContext(){
    return useContext(TodosContext);
}

export default useTodosContext;