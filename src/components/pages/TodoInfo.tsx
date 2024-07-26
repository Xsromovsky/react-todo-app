import React from 'react'
import PopoverComponent from '../PopoverComponent'
import { DragHandleHorizontalIcon, FaceIcon } from '@radix-ui/react-icons'
import { TodoTasksList } from '../../todo_task'

type Props = {
    todo: TodoTasksList
}

const TodoInfo = (props: Props) => {
  return (
    <PopoverComponent>
        <PopoverComponent.Button>
            <DragHandleHorizontalIcon/>
        </PopoverComponent.Button>
        <PopoverComponent.Content>
            <div className='text-white bg-blue-400 p-2 rounded-lg'>
                <p>{props.todo.title}</p>
            </div>
        </PopoverComponent.Content>
    </PopoverComponent>
  );
}

export default TodoInfo