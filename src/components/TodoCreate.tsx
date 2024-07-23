import React, { useState } from 'react';
import { Button, Theme } from '@radix-ui/themes';


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
    
    <div className='bg-[#2a2b47] flex flex-col items-center p-4 text-white'>
        <h2 className='text-3xl mb-4'>Create new todo</h2>
        <form className='flex space-x-3 items-center' onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={title} onChange={handleChange} className='rounded p-1 text-[#231c35]'/>
            <button className='bg-[#242039] p-2 rounded-full'>create</button>
            
        </form>
    </div>
    
  )
}

export default TodoCreate