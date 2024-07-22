import React, { useState } from 'react'
import { TodoTasksList } from '../todo_task';

type Props = {
    onCreate: (title: string) => void
}

const TodoCreate = (props: Props) => {

    const [title, setTitle] = useState('');
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.onCreate(title);
        setTitle('');
    }

  return (
    <div className='bg-slate-400 flex flex-col items-center p-4'>
        <h2 className='text-3xl mb-4'>Create new todo</h2>
        <form className='flex space-x-3 items-center' onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={title} onChange={handleChange}/>
            <button className='bg-blue-300 p-2 rounded-full'>create</button>
        </form>
    </div>
  )
}

export default TodoCreate