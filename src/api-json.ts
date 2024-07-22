import axios from "axios";


export const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3001/todos');
    console.log(response.data);
    
}