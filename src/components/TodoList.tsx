import React from 'react'
import { TodoTasksList } from '../todo_task'
import TodoTask from './TodoTask';
import { createPortal } from 'react-dom';

type Props = {
    todos: TodoTasksList[];
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
}



const TodoList = (props: Props) => {

    const renderedTasks = props.todos.map((todo) => {
        return <TodoTask todo={todo} onDelete={props.onDelete} onEdit={props.onEdit} key={todo.id}/>
    })

  return (
    
    <div className='flex flex-wrap gap-3 justify-center '>
        {renderedTasks}
    </div>
  )
}

export default TodoList