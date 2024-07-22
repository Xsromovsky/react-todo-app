import React from 'react'
import { TodoTasksList } from '../todo_task'
import TodoTask from './TodoTask';

type Props = {
    todos: TodoTasksList[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const TodoList = (props: Props) => {

    const renderedTasks = props.todos.map((todo) => {
        return <TodoTask todo={todo} onDelete={props.onDelete} onEdit={props.onEdit} key={todo.id}/>
    })

  return (
    <div>
        {renderedTasks}
    </div>
  )
}

export default TodoList