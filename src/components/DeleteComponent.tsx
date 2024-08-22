import React from 'react'
import DialogModal from './DialogModal';
import { Task } from '../utils/todo_task';
import { Cross1Icon } from '@radix-ui/react-icons';

type Props = {
    
    delete: ()=>void
    title: string

    description: string
}

const DeleteComponent = (props: Props) => {
  return (
    <DialogModal.Content
            title={props.title}
            contentClassname="relative bg-[#231c35]  w-4/12 p-2 rounded-lg text-white"
            overlayClassname="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
            dialogTitle="truncate"
          >
            <DialogModal.Close className="absolute top-1 right-1  hover:bg-[#484564] rounded-full p-1">
              <Cross1Icon className="size-[25px] " />
            </DialogModal.Close>
            <div className="flex flex-col">
              <p>{props.description}</p>
              <div className="flex justify-end">
                <DialogModal.Close
                  className="bg-red-500 p-2 rounded-lg hover:bg-red-600 font-bold"
                  onClick={props.delete}
                >
                  Delete
                </DialogModal.Close>
              </div>
            </div>
          </DialogModal.Content>
  )
}

export default DeleteComponent